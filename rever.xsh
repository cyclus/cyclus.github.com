$PROJECT = 'fuelcycle.org'
$GITHUB_ORG = 'cyclus'
$GITHUB_REPO = 'cyclus.github.com'

$ACTIVITIES = ['version_bump',
               #'tag', 'push_tag',
               ]

$DOCKER_CONDA_DEPS = ['sphinx', 'numpydoc', 'cyclus', 'cycamore', 'cymetric', 'rickshaw',
                      'sphinxcontrib-bibtex', 'cloud-sptheme', 'curl']
$DOCKER_INSTALL_COMMAND = ''

$VERSION_BUMP_PATTERNS = [
    ('source/atemplates/layout.html', 'Current version:.*', 'Current version: <b>$VERSION</b>'),
    ('source/user/install_from_tarball.rst',
     '- `cyclus-.*\.zip.*',
     '- `cyclus-$VERSION.zip  <https://github.com/cyclus/cyclus/archive/$VERSION.zip>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cyclus-.*\.tar\.gz.*',
     '- `cyclus-$VERSION.zip  <https://github.com/cyclus/cyclus/archive/$VERSION.tar.gz>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cycamore-.*\.zip.*',
     '- `cycamore-$VERSION.zip  <https://github.com/cyclus/cycamore/archive/$VERSION.zip>`_'),
    ('source/user/install_from_tarball.rst',
     '- `cyclus-.*\.tar\.gz.*',
     '- `cyclus-$VERSION.zip  <https://github.com/cyclus/cycamore/archive/$VERSION.tar.gz>`_'),
]
