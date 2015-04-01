"""This module adds a reST directive to sphinx that generates cyclus agent 
documentation based on its annotations and schema. The user simply specifies 
the normal cyclus agent spec for the agent that they wish to document. 
For example, 

    .. cyclus-agent:: tests:TestFacility:TestFacility

"""
from __future__ import print_function
import sys
import os.path
import re
import time
import warnings
import subprocess
from collections import OrderedDict, Mapping, Sequence

try:
    import simplejson as json
    JSONDecodeError = json.JSONDecodeError
except ImportError:
    import json
    JSONDecodeError = ValueError

from docutils import io, nodes, statemachine, utils
try:
    from docutils.utils.error_reporting import ErrorString  # the new way 
except ImportError:
    from docutils.error_reporting import ErrorString        # the old way
from docutils.parsers.rst import Directive, convert_directive_function
from docutils.parsers.rst import directives, roles, states
from docutils.parsers.rst.roles import set_classes
from docutils.transforms import misc
from docutils.statemachine import ViewList

from sphinx.util.nodes import nested_parse_with_titles

if sys.version_info[0] == 2:
    STRING_TYPES = (str, unicode, basestring)
    IS_PY3 = False
elif sys.version_info[0] >= 3:
    STRING_TYPES = (str,)
    IS_PY3 = True

def contains_resbuf(type_str):
    bufs = ('cyclus::toolkit::ResBuf',
            'cyclus::toolkit::ResMap',
            'cyclus::toolkit::ResourceBuff')
    for buf in bufs:
        if buf in type_str:
            return True
    return False

def ensure_tuple_or_str(x):
    if isinstance(x, STRING_TYPES):
        return x
    else:
        return tuple([ensure_tuple_or_str(elem) for elem in x])

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
        for key in ('entity', 'parents', 'all_parents'):
            val = self.annotations.get(key, None)
            if val is None:
                continue
            self.lines.append(':{0}: {1}'.format(key, nicestr(val)))
        for key, val in sorted(self.annotations.items()):
            if key in self.skipdoc:
                continue
            self.lines.append(':{0}: {1}'.format(key, val))
        self.lines.append('')

    skipstatevar = {'type', 'index', 'shape', 'doc', 'tooltip', 'default', None}

    def append_statevars(self):
        vars = OrderedDict(sorted(self.annotations.get('vars', {}).items(), 
                           key=lambda x: x[1]['index'] if not isinstance(x[1], STRING_TYPES) else 0))
        if len(vars) == 0:
            return
        lines = self.lines
        lines += ['', '**State Variables:**', '']
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
            name = alias if isinstance(alias, STRING_TYPES) else alias[0]

            # add name
            n = ":{0}: ``{1}``" .format(name, type_to_str(info['type']))
            if 'default' in info:
                n += ', default={0}'.format(info['default'])
            if 'shape' in info:
                n += ', shape={0}'.format(info['shape'])
            lines += [n, '']

            # add docs
            ind = " " * 4
            if 'tooltip' in info:
                self.lines += [ind + '*' + info['tooltip'] + '*', '']
            if 'doc' in info:
                doc = ind + info['doc'].replace('\n', '\n'+ind) 
                lines += doc.splitlines()
                lines.append('')

            # add everything else
            for key, val in info.items():
                if key in self.skipstatevar:
                    continue
                self.lines.append(ind + ':{0}: {1}'.format(key, val))
            self.lines.append('')

    def append_schema(self):
        lines = self.lines
        lines += ['', '**Schema:**', '', '.. code-block:: xml', '']
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
                          RuntimeWraning)
        try:
            self.load_annotations()
        except OSError:
            warnings.warn("WARNING: Failed to load annotations, proceeding without "
                          "annotations", RuntimeWraning)

        # set up list of rst stirngs
        self.lines = []
        self.append_name()
        self.append_doc()
        self.append_statevars()
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

