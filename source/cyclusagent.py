"""This module adds a reST directive to sphinx that generates cyclus agent
documentation based on its annotations and schema. The user simply specifies
the normal cyclus agent spec for the agent that they wish to document.
For example,

    .. cyclus-agent:: tests:TestFacility:TestFacility

"""
from __future__ import print_function, unicode_literals
import sys
import textwrap
import warnings
import subprocess
import xml.dom.minidom
from collections import OrderedDict
from collections.abc import Mapping, Sequence

try:
    import simplejson as json
    JSONDecodeError = json.JSONDecodeError
except ImportError:
    import json
    JSONDecodeError = ValueError

from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst import directives
#from docutils.parsers.rst.roles import set_classes
#from docutils.transforms import misc
from docutils.statemachine import ViewList

from sphinx.util.nodes import nested_parse_with_titles

if sys.version_info[0] == 2:
    STRING_TYPES = (str, unicode, basestring)
    IS_PY3 = False
    def indent(text, prefix):
        lines = text.splitlines(True)
        s = prefix + prefix.join(lines)
        return s
elif sys.version_info[0] >= 3:
    STRING_TYPES = (str,)
    IS_PY3 = True
    indent = textwrap.indent

def contains_resbuf(type_str):
    bufs = ('cyclus::toolkit::ResBuf',
            'cyclus::toolkit::ResMap',
            'cyclus::toolkit::TotalInvTracker')
    for buf in bufs:
        if buf in type_str:
            return True
    return False

def ensure_tuple_or_str(x):
    if isinstance(x, STRING_TYPES):
        return x
    else:
        return tuple(map(ensure_tuple_or_str, x))

def type_to_str(t):
    t = ensure_tuple_or_str(t)
    if isinstance(t, STRING_TYPES):
        return t
    else:
        s = t[0] + '<'
        s += type_to_str(t[1])
        for thing in t[2:]:
            s += ', ' + type_to_str(thing)
        s += '>'
        return s

def nicestr(x):
    if IS_PY3:
        newx = str(x)
    elif isinstance(x, STRING_TYPES):
        newx = str(x)
    elif isinstance(x, Sequence):
        newx = '[' + ', '.join(map(nicestr, x)) + ']'
    elif isinstance(x, Mapping):
        newx = '{'
        newxs = [nicestr(k) + ': ' + nicestr(v) for k, v in sorted(x.items())]
        newx += ', '.join(newxs)
        newx += '}'
    else:
        newx = str(x)
    return newx

def prepare_type(cpptype, othertype):
    """Updates othertype to conform to the length of cpptype using None's.
    """
    if not isinstance(cpptype, STRING_TYPES):
        if isinstance(othertype, STRING_TYPES):
            othertype = [othertype]

        if othertype is None:
            othertype = [None] * len(cpptype)
        elif len(othertype) < len(cpptype):
            othertype.extend([None] * (len(cpptype) - len(othertype)))
        return othertype
    else:
        return othertype

PRIMITIVES = {'bool', 'int', 'float', 'double', 'std::string', 'cyclus::Blob',
              'boost::uuids::uuid', }

alltypes = frozenset(['anyType', 'anySimpleType', 'string', 'boolean', 'decimal',
                      'float', 'double', 'duration', 'dateTime', 'time', 'date',
                      'gYearMonth', 'gYear', 'gMonthDay', 'gDay', 'gMonth',
                      'hexBinary', 'base64Binary', 'anyURI', 'QName', 'NOTATION',
                      'normalizedString', 'token', 'language', 'NMTOKEN',
                      'NMTOKENS', 'Name', 'NCName', 'ID', 'IDREF', 'IDREFS',
                      'ENTITY', 'ENTITIES', 'integer', 'nonPositiveInteger',
                      'negativeInteger', 'long', 'int', 'short', 'byte',
                      'nonNegativeInteger', 'unsignedLong', 'unsignedInt',
                      'unsignedShort', 'unsignedByte', 'positiveInteger'])

default_types = {
    # Primitive types
    'bool': 'boolean',
    'std::string': 'string',
    'int': 'int',
    'float': 'float',
    'double': 'double',
    'cyclus::Blob': 'string',
    'boost::uuids::uuid': 'token',
    # UI types
    'nuclide': 'string',
    'commodity': 'string',
    'incommodity': 'string',
    'outcommodity': 'string',
    'range': None,
    'combobox': None,
    'facility': None,
    'prototype': 'string',
    'recipe': 'string',
    'inrecipe': 'string',
    'outrecipe': 'string',
    'none': None,
    None: None,
    '': None,
    }

special_uitypes = {
    'nuclide': 'string',
    'recipe': 'string',
    'inrecipe': 'string',
    'outrecipe': 'string',
    'prototype': 'string',
    'commodity': 'string',
    'incommodity': 'string',
    'outcommodity': 'string',
    }

def _type(cpp, given=None):
    """Finds a schema type for a C++ type with a possible type given."""
    if given is not None:
        if given in alltypes:
            return given
        elif given in default_types:
            return default_types[given] or default_types[cpp]
        msg = ("Note that {0!r} is not a valid XML schema data type, see "
               "http://www.w3.org/TR/xmlschema-2/ for more information.")
        raise TypeError(msg.format(given))
    return default_types[cpp]


def build_xml_sample(cpptype, schematype=None, uitype=None, names=None, units=None):
    schematype = prepare_type(cpptype, schematype)
    uitype = prepare_type(cpptype, uitype)
    names = prepare_type(cpptype, names)
    units = prepare_type(cpptype, units)

    impl = ''
    t = cpptype if isinstance(cpptype, STRING_TYPES) else cpptype[0]
    if t in PRIMITIVES:
        name = 'val'
        if names is not None:
            name = names
        d_type = _type(t, schematype or uitype)
        d_type = uitype if uitype in special_uitypes else d_type

        if isinstance(units, STRING_TYPES):
            impl += '<{0}>[{1} ( {2} )]</{0}>'.format(name, d_type, units)
        else:
            impl += '<{0}>[{1}]</{0}>'.format(name, d_type)
    elif t in ['std::list', 'std::set', 'std::vector']:
        name = 'list' if names[0] is None else names[0]
        impl += '<{0}>'.format(name)
        impl += build_xml_sample(cpptype[1], schematype[1], uitype[1], names[1], units[1])
        impl += build_xml_sample(cpptype[1], schematype[1], uitype[1], names[1], units[1])
        impl += '...'
        impl += '</{0}>'.format(name)
    elif t == 'std::map':
        name = 'map'
        if isinstance(names[0], STRING_TYPES):
            names[0] = [names[0], None]
        elif names[0] is None:
            names[0] = [name, None]
        if names[0][0] is not None:
            name = names[0][0]
        itemname = 'item' if names[0][1] is None else names[0][1]
        keynames = 'key' if isinstance(cpptype[1], STRING_TYPES) else ['key']
        if names[1] is not None:
            keynames = names[1]
        valnames = 'val' if isinstance(cpptype[2], STRING_TYPES) else ['val']
        if names[1] is not None:
            valnames = names[2]
        impl += '<{0}>'.format(name)
        impl += '<{0}>'.format(itemname)
        impl += build_xml_sample(cpptype[1], schematype[1], uitype[1], keynames, units[1])
        impl += build_xml_sample(cpptype[2], schematype[2], uitype[2], valnames, units[2])
        impl += '</{0}>'.format(itemname)
        impl += '<{0}>'.format(itemname)
        impl += build_xml_sample(cpptype[1], schematype[1], uitype[1], keynames, units[1])
        impl += build_xml_sample(cpptype[2], schematype[2], uitype[2], valnames, units[2])
        impl += '</{0}>'.format(itemname)
        impl += '...'
        impl += '</{0}>'.format(name)
    elif t == 'std::pair':
        name = 'pair'
        if names[0] is not None:
            name = names[0]
        firstname = 'first' if isinstance(cpptype[1], STRING_TYPES) else ['first']
        if names[1] is not None:
            firstname = names[1]
        secondname = 'second' if isinstance(cpptype[2], STRING_TYPES) else ['second']
        if names[2] is not None:
            secondname = names[2]
        impl += '<{0}>'.format(name)
        impl += build_xml_sample(cpptype[1], schematype[1], uitype[1], firstname, units[1])
        impl += build_xml_sample(cpptype[2], schematype[2], uitype[2], secondname, units[2])
        impl += '</{0}>'.format(name)
    else:
        msg = 'Unsupported type {0}'.format(t)
        raise RuntimeError(msg)

    s = xml.dom.minidom.parseString(impl)
    s = s.toprettyxml(indent='  ')
    _, lines = s.split("\n", 1)
    return lines


def build_json_sample(cpptype, schematype=None, uitype=None, names=None, units=None, default=None):
    schematype = prepare_type(cpptype, schematype)
    uitype = prepare_type(cpptype, uitype)
    names = prepare_type(cpptype, names)
    units = prepare_type(cpptype, units)

    impl = ''
    t = cpptype if isinstance(cpptype, STRING_TYPES) else cpptype[0]
    if t in PRIMITIVES:
        name = 'val'
        if names is not None:
            name = names
        d_type = _type(t, schematype or uitype)
        d_type = uitype if uitype in special_uitypes else d_type

        defstr = json.dumps(default) if isinstance(default, STRING_TYPES) else default

        if default is None or defstr == '"null"':
            defstr = '"<required>"'

        if isinstance(units, STRING_TYPES):
            impl += '{{"{0}": {1}}}  # {2}, {3}'.format(name, defstr, d_type, units)
        else:
            impl += '{{"{0}": {1}}}  # {2}'.format(name, defstr, d_type)
    elif t in ['std::list', 'std::set', 'std::vector']:
        name = 'list' if names[0] is None else names[0]
        impl += '{{"{0}":'.format(name)
        x = build_json_sample(cpptype[1], schematype[1], uitype[1], names[1], units[1])
        pre, post = x.split(':', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(pre + ': [\n', "  ")
        impl += indent(post.rstrip() + ",\n", '  ')
        impl += indent(post.rstrip() + ",\n", '  ')
        impl += indent('...\n', '  ')
        impl += ']}}'
    elif t == 'std::map':
        name = 'map'
        if isinstance(names[0], STRING_TYPES):
            names[0] = [names[0], None]
        elif names[0] is None:
            names[0] = [name, None]
        if names[0][0] is not None:
            name = names[0][0]
        itemname = 'item' if names[0][1] is None else names[0][1]
        keynames = 'key' if isinstance(cpptype[1], STRING_TYPES) else ['key']
        if names[1] is not None:
            keynames = names[1]
        valnames = 'val' if isinstance(cpptype[2], STRING_TYPES) else ['val']
        if names[1] is not None:
            valnames = names[2]
        impl += '{{"{0}": {{\n'.format(name)
        impl += indent('"{0}": [{{\n'.format(itemname), '  ')
        x = build_json_sample(cpptype[1], schematype[1], uitype[1], keynames, units[1])
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(post.rstrip() + ',\n', '    ')
        y = build_json_sample(cpptype[2], schematype[2], uitype[2], valnames, units[2])
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post + '},\n', '    ')
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent('{' + post.rstrip() + ',\n', '    ')
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post + '},\n', '    ')
        impl += indent('...\n', '  ')
        impl += ']}}'
    elif t == 'std::pair':
        name = 'pair'
        if names[0] is not None:
            name = names[0]
        firstname = 'first' if isinstance(cpptype[1], STRING_TYPES) else ['first']
        if names[1] is not None:
            firstname = names[1]
        secondname = 'second' if isinstance(cpptype[2], STRING_TYPES) else ['second']
        if names[2] is not None:
            secondname = names[2]
        x = build_json_sample(cpptype[1], schematype[1], uitype[1], firstname, units[1])
        impl += '{{"{0}": {{\n'.format(name)
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(post.rstrip() + ',\n', '  ')
        y = build_json_sample(cpptype[2], schematype[2], uitype[2], secondname, units[2])
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post.rstrip() + '\n', '  ')
        impl += "  " + '}\n}'
    else:
        msg = 'Unsupported type {1}'.format(t)
        raise RuntimeError(msg)
    return impl


def build_py_sample(cpptype, schematype=None, uitype=None, names=None, units=None, default=None):
    schematype = prepare_type(cpptype, schematype)
    uitype = prepare_type(cpptype, uitype)
    names = prepare_type(cpptype, names)
    units = prepare_type(cpptype, units)

    impl = ''
    t = cpptype if isinstance(cpptype, STRING_TYPES) else cpptype[0]
    if t in PRIMITIVES:
        name = 'val'
        if names is not None:
            name = names
        d_type = _type(t, schematype or uitype)
        d_type = uitype if uitype in special_uitypes else d_type

        if isinstance(default, STRING_TYPES):
            defstr = repr(default)
        elif t == 'bool':
            defstr = bool(default)
        else:
            defstr = default

        required = False
        if default is None or defstr == 'None':
            if t == 'int':
                defstr = '0'
            elif t == 'float' or t == 'double':
                defstr = '0.0'
            elif t == 'bool':
                defstr = 'False'
            else:
                defstr = '""'
            required = True

        if isinstance(units, STRING_TYPES):
            impl += '{{"{0}": {1}}}  # {2}, {3}'.format(name, defstr, d_type, units)
        else:
            impl += '{{"{0}": {1}}}  # {2}'.format(name, defstr, d_type)
        if required:
            impl += ', required'
        else:
            impl += ', optional'
    elif t in ['std::list', 'std::set', 'std::vector']:
        name = 'list' if names[0] is None else names[0]
        impl += '{{"{0}":'.format(name)
        x = build_py_sample(cpptype[1], schematype[1], uitype[1], names[1], units[1])
        pre, post = x.split(':', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(pre + ': [\n', "  ")
        impl += indent(post.rstrip() + ",\n", '  ')
        impl += indent(post.rstrip() + ",\n", '  ')
        impl += indent('...\n', '  ')
        impl += ']}}'
    elif t == 'std::map':
        name = 'map'
        if isinstance(names[0], STRING_TYPES):
            names[0] = [names[0], None]
        elif names[0] is None:
            names[0] = [name, None]
        if names[0][0] is not None:
            name = names[0][0]
        itemname = 'item' if names[0][1] is None else names[0][1]
        keynames = 'key' if isinstance(cpptype[1], STRING_TYPES) else ['key']
        if names[1] is not None:
            keynames = names[1]
        valnames = 'val' if isinstance(cpptype[2], STRING_TYPES) else ['val']
        if names[1] is not None:
            valnames = names[2]
        impl += '{{"{0}": {{\n'.format(name)
        impl += indent('"{0}": [{{\n'.format(itemname), '  ')
        x = build_py_sample(cpptype[1], schematype[1], uitype[1], keynames, units[1])
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(post.rstrip() + ',\n', '    ')
        y = build_py_sample(cpptype[2], schematype[2], uitype[2], valnames, units[2])
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post + '},\n', '    ')
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent('{' + post.rstrip() + ',\n', '    ')
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post + '},\n', '    ')
        impl += indent('...\n', '  ')
        impl += ']}}'
    elif t == 'std::pair':
        name = 'pair'
        if names[0] is not None:
            name = names[0]
        firstname = 'first' if isinstance(cpptype[1], STRING_TYPES) else ['first']
        if names[1] is not None:
            firstname = names[1]
        secondname = 'second' if isinstance(cpptype[2], STRING_TYPES) else ['second']
        if names[2] is not None:
            secondname = names[2]
        x = build_py_sample(cpptype[1], schematype[1], uitype[1], firstname, units[1])
        impl += '{{"{0}": {{\n'.format(name)
        pre, post = x.split('{', 1)
        post, _ = post.rsplit('}', 1)
        impl += indent(post.rstrip() + ',\n', '  ')
        y = build_py_sample(cpptype[2], schematype[2], uitype[2], secondname, units[2])
        pre, post = y.split('{', 1)
        post, _, _ = post.rpartition('}')
        impl += indent(post.rstrip() + '\n', '  ')
        impl += "  " + '}\n}'
    else:
        msg = 'Unsupported type {1}'.format(t)
        raise RuntimeError(msg)
    return impl


class CyclusAgent(Directive):
    """The cyclus-agent directive, which is based on constructing a list of
    of string lines of restructured text and then parsing it into its own node.
    """
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {'no-sep': directives.flag}
    has_content = False

    def load_schema(self):
        cmd = 'cyclus --agent-schema {0}'.format(self.agentspec)
        stdout = subprocess.check_output(cmd, shell=True)
        self.schema = stdout.decode()

    def load_annotations(self):
        cmd = 'cyclus --agent-annotations {0}'.format(self.agentspec)
        stdout = subprocess.check_output(cmd, shell=True)
        try:
            j = json.loads(stdout.decode())
        except JSONDecodeError:
            raise ValueError("Error reading agent annotations for "\
                             "{0}.".format(self.agentspec))

        self.annotations = j

    def append_name(self):
        path, lib, agent = self.agentspec.split(':')
        name = path + ':' + lib + ':**' + agent + '**'
        self.lines += [name, '~' * len(name), '']

    skipdoc = {'doc', 'tooltip', 'vars', 'entity', 'parents', 'all_parents'}

    def append_doc(self):
        if 'tooltip' in self.annotations:
            self.lines += ['*' + self.annotations['tooltip'] + '*', '']
        if 'doc' in self.annotations:
            self.lines += self.annotations['doc'].splitlines()
        self.lines.append('')

    # must use list constructor to maintain order
    keynames = OrderedDict([
        ('name', 'Full Archetype Name'),
        ('entity', 'Simulation Entity Type'),
        ('parents', 'Interfaces'),
        ('all_parents', 'All Interfaces'),
    ])

    def append_otherinfo(self):
        header = 'Other Info'
        self.lines += [header, ';' * len(header), '']

        for key, name in self.keynames.items():
            val = self.annotations.get(key, None)
            if val is None:
                continue
            self.lines.append('* **{0}**: {1}'.format(name, nicestr(val)))
        for key, val in sorted(self.annotations.items()):
            if key in self.skipdoc or key in self.keynames.keys():
                continue
            self.lines.append('* **{0}**: {1}'.format(key, val))
        self.lines.append('')

    skipstatevar = {'type', 'index', 'shape', 'doc', 'tooltip', 'default',
                    'units', 'alias', 'uilabel', 'uitype', None}

    def _sort_statevars(self, item):
        key, val = item
        vars = self.annotations.get('vars', {})
        while not isinstance(val, Mapping):
            # resolves aliasing
            key = val
            val = vars[key]
        return val['index']

    def append_statevars(self):
        vars = OrderedDict(sorted(self.annotations.get('vars', {}).items(),
                           key=self._sort_statevars))
        if len(vars) == 0:
            return
        lines = self.lines
        header = 'State Variables'
        lines += [header, ';' * len(header), '']
        for name, info in vars.items():
            if isinstance(info, STRING_TYPES):
                # must be an alias entry - skip it
                continue
            elif contains_resbuf(type_to_str(info['type'])):
                # resbufs are not directly user accessible
                continue
            elif 'internal' in info:
                continue

            alias = info.get('alias', name)
            if isinstance(alias, STRING_TYPES):
                name = alias
            elif isinstance(alias[0], STRING_TYPES):
                name = alias[0]
            else:
                name = alias[0][0]

            # add name
            ts = type_to_str(info['type'])
            n = ":{0}: ``{1}``" .format(name, ts)

            if 'default' in info:
                n += ', optional ('
                if info['type'] == 'std::string':
                    n += 'default="{0}"'.format(info['default'])
                else:
                    n += 'default={0}'.format(info['default'])
                n += ')'
            if 'shape' in info:
                n += ', shape={0}'.format(info['shape'])
            lines += [n, '']

            # add docs
            ind = " " * 4
            if 'doc' in info:
                doc = ind + info['doc'].replace('\n', '\n'+ind)
                lines += doc.splitlines()
                lines.append('')

            t = info['type']
            uitype = info.get('uitype', None)
            units = info.get('units', None)
            schematype = info.get('schematype', None)
            labels = info.get('alias', None)
            if labels is None:
                labels = name if isinstance(t, STRING_TYPES) else [name]

            # add everything else
            for key, val in info.items():
                if key in self.skipstatevar:
                    continue
                self.lines.append(ind + ':{0}: {1}'.format(key, val))
            self.lines.append('')

            self.lines += [ind + '**XML:**', '', ind + '.. code-block:: xml', '']
            schemalines = build_xml_sample(t, schematype, uitype, labels, units).split('\n')
            previndent = ''
            for l in schemalines:
                if len(l.strip()) > 0:
                    if l.strip() == '...':
                        l = previndent + l.strip()
                    self.lines.append(ind + '    ' + l)
                    previndent = ' ' * (len(l) - len(l.lstrip()))
            self.lines.append('')

            self.lines += [ind + '**JSON:**', '', ind + '.. code-block:: yaml', '']
            schemalines = build_json_sample(t, schematype, uitype, labels, units, default=info.get('default', 'null')).split('\n')
            previndent = ''
            for l in schemalines:
                if len(l.strip()) > 0:
                    if l.strip() == '...':
                        l = previndent + l.strip()
                    self.lines.append(ind + '    ' + l)
                    previndent = ' ' * (len(l) - len(l.lstrip()))
            self.lines.append('')

            self.lines += [ind + '**Python:**', '', ind + '.. code-block:: python', '']
            schemalines = build_py_sample(t, schematype, uitype, labels, units, default=info.get('default', None)).split('\n')
            previndent = ''
            for l in schemalines:
                if len(l.strip()) > 0:
                    if l.strip() == '...':
                        l = previndent + l.strip()
                    self.lines.append(ind + '    ' + l)
                    previndent = ' ' * (len(l) - len(l.lstrip()))
            self.lines.append('')

    def append_schema(self):
        header = 'XML Input Schema'
        self.lines += [header, ';' * len(header), '']

        lines = self.lines
        lines += ['', '.. code-block:: xml', '']
        ind = " " * 4
        s = ind + self.schema.replace('\n', '\n' + ind) + '\n'
        lines += s.splitlines()

    def append_sep(self):
        if 'no-sep' in self.options:
            return
        self.lines += ['', '--------', '']

    def run(self):
        # load agent
        self.agentspec = self.arguments[0]
        self.schema = ""
        self.annotations= {}
        try:
            self.load_schema()
        except OSError:
            warnings.warn("WARNING: Failed to load schema, proceeding without schema",
                          RuntimeWarning)
        try:
            self.load_annotations()
        except OSError:
            warnings.warn("WARNING: Failed to load annotations, proceeding without "
                          "annotations", RuntimeWarning)

        # set up list of rst stirngs
        self.lines = []
        self.append_name()
        self.append_doc()
        self.append_statevars()
        self.append_otherinfo()
        self.append_schema()
        self.append_sep()

        # hook to docutils
        src, lineno = self.state_machine.get_source_and_line(self.lineno)
        vl = ViewList(self.lines, source=src)
        node = nodes.paragraph()
        nested_parse_with_titles(self.state, vl, node)
        return node.children

def setup(app):
    app.add_directive('cyclus-agent', CyclusAgent)

if __name__ == "__main__":
    t = ["std::vector", "double"]
    #t = 'double'
    s = build_json_sample(t, default=[42.0])
    print(s)
