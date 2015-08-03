
FROM cyclus/cycamore

RUN apt-get -y --force-yes update

RUN apt-get install -y wget

RUN wget https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py && python get-pip.py

RUN pip install -U \ 
    Sphinx \
    sphinxcontrib-bibtex \
    cloud_sptheme

COPY . /site
WORKDIR /site
RUN make gh-preview

