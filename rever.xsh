$PROJECT = 'fuelcycle.org'
$GITHUB_ORG = 'cyclus'
$GITHUB_REPO = 'cyclus.github.com'

$ACTIVITIES = ['version_bump', 'sphinx',
               #'tag', 'push_tag',
               ]

$DOCKER_CONDA_DEPS = ['sphinx', 'numpydoc', 'cyclus', 'cycamore', 'cymetric', 'rickshaw',
                      'sphinxcontrib-bibtex', 'cloud_sptheme', 'curl']
$DOCKER_INSTALL_ENVVARS = {'PYTHONDONTWRITEBYTECODE': "TRUE"}
$DOCKER_INSTALL_COMMAND = (
    'git clean -fdx && '
    'curl https://raw.githubusercontent.com/cyclus/cyclus/master/INSTALL.rst -L -o source/user/CYCLUS_INSTALL.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cyclus/master/DEPENDENCIES.rst -L -o source/user/DEPENDENCIES.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cycamore/master/INSTALL.rst -L -o source/user/CYCAMORE_INSTALL.rst && '
    'curl https://raw.githubusercontent.com/cyclus/cycamore/master/DEPENDENCIES.rst -L -o source/user/CYCAMORE_DEPS.rst && '
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
