
FROM cyclus/cycamore

RUN apt-get install -y --force-yes python3-pip
RUN pip3 install sphinx sphinxcontrib-bibtex cloud-sptheme

WORKDIR /
RUN git clone https://github.com/cyclus/cymetric
WORKDIR /cymetric
RUN python setup.py install
WORKDIR /

