from rever.activity import activity

$PROJECT = 'fuelcycle.org'
$GITHUB_ORG = 'cyclus'
$GITHUB_REPO = 'cyclus.github.com'
$SPHINX_HOST_DIR = $REVER_DIR + '/sphinx-build'


@activity(name='docs-cleanup')
def docs_cleanup():
    """Cleans up documentation after it has been built"""
    rep = ('s/function top_offset([$$]node){ return [$$]node\[0\].getBoundingClientRect().top; }/'
           'function top_offset($$node){ return (typeof $$node[0] === "undefined") ? 0 : '
           '$$node[0].getBoundingClientRect().top; }/')
    ![sed -i.bak @(rep) $SPHINX_HOST_DIR/html/_static/cloud.js]
    rep = ('s/  if (state == "collapsed"){/  if (typeof state === "undefined") {\\n'
           '      var state = "uncollapsed";\\n  };\\n  if (state == "collapsed"){/')
    ![sed -i.bak @(rep) $SPHINX_HOST_DIR/html/_static/cloud.js]
    rm -f $SPHINX_HOST_DIR/_static/*.bak
    cp $SPHINX_HOST_DIR/html/cep/cep0.html $SPHINX_HOST_DIR/html/cep/index.html
    cp $SPHINX_HOST_DIR/html/_static/dbtypes.json $SPHINX_HOST_DIR/html/arche/


$ACTIVITIES = ['version_bump', 'sphinx', 'docs-cleanup', 'ghpages',
               'tag', 'push_tag',
               ]

$DOCKER_CONDA_DEPS = ['sphinx', 'numpydoc', 'cyclus', 'cycamore', 'cymetric', 'rickshaw',
                      'sphinxcontrib-bibtex', 'cloud_sptheme', 'curl']
$DOCKER_INSTALL_ENVVARS = {'PYTHONDONTWRITEBYTECODE': "TRUE"}
$DOCKER_INSTALL_COMMAND = (
    'git clean -fdx && '
    'curl https://raw.githubusercontent.com/cyclus/cyclus/main/INSTALL.rst -L -o source/user/CYCLUS_INSTALL.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cyclus/main/DEPENDENCIES.rst -L -o source/user/DEPENDENCIES.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cycamore/main/INSTALL.rst -L -o source/user/CYCAMORE_INSTALL.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cycamore/main/DEPENDENCIES.rst -L -o source/user/CYCAMORE_DEPS.rst && '
    'cp $(cyclus --install-path)/share/cyclus/dbtypes.json source/astatic/'
)

$VERSION_BUMP_PATTERNS = [
    ('source/atemplates/layout.html', 'Current version:.*', 'Current version: <b>$VERSION</b>'),
    ('source/user/install_from_tarball.rst',
     '- `cyclus-.*\.zip.*',
     '- `cyclus-$VERSION.zip  <https://github.com/cyclus/cyclus/archive/$VERSION.zip>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cyclus-.*\.tar\.gz.*',
     '- `cyclus-$VERSION.tar.gz  <https://github.com/cyclus/cyclus/archive/$VERSION.tar.gz>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cycamore-.*\.zip.*',
     '- `cycamore-$VERSION.zip  <https://github.com/cyclus/cycamore/archive/$VERSION.zip>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cycamore-.*\.tar\.gz.*',
     '- `cycamore-$VERSION.tar.gz  <https://github.com/cyclus/cycamore/archive/$VERSION.tar.gz>`_'),
]

$SPHINX_DOCS_DIR = '$DOCKER_HOME/$PROJECT/source'
$SPHINX_BUILD_DIR = '$DOCKER_HOME/$PROJECT/gh-build'
$GHPAGES_REPO = 'git@github.com:cyclus/cyclus.github.com.git'
