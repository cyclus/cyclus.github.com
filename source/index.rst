*Cyclus*
=============

.. raw:: html

    <div style="text-align:center;"><br /><br />

.. image:: logos/logo2_bike.gif
    :align: center
    :alt: Cyclus

.. raw:: html

    </div>

.. raw:: html

    <div style="text-align:center;">
    <h2><a href="https://github.com/cyclus/cyclus/releases/tag/0.4">
    v0.4 has been released!</a></h2><br><br></div>

*Cyclus* is a next-generation nuclear :doc:`fuel cycle simulator
<basics/fcs_background>` environment, providing flexibility to users
and developers through an agent-based approach.

A principal goal of *Cyclus* is to present a
low barrier to adoption by new users and developers in order to
encourage them to join a vibrant community in an 
:doc:`expanding ecosystem <basics/ecosystem>`.  

Users and developers are always welcome and encouraged to use or contribute 
to the cyclus project. For inspiration and current research directions,
please consult the :doc:`development roadmap <basics/roadmap>`. 

Important Features
-------------------

* Modeling Paradigm
   * discrete facilities with discrete material transactions
   * flexible design of new fuel cycles
* Software Development Principles
   * Free and open source development licensing 
   * commonly used free software infrastructure
   * engagement with users, developers, and the fuel cycle community
* User Interaction
   * common physics infrastructure
   * different user interface layer for different user audiences, 
     with varying levels of both input control and output exploration

        * varying levels of input control
        * varying levels of output exploration

The *Cyclus* modeling paradigm lets users reconfigure the basic
building blocks of a simulation without changing the software. 

Learn More
----------

The *Cyclus* project repository is located at http://github.com/cyclus/cyclus.

Although you do not have to register with github to download and edit the code, 
if you desire your work to be integrated into the cyclus mainline of development 
you must fork the cyclus core repository into your own github account and submit 
patches via pull requests. 

.. toctree::
    :maxdepth: 1

    basics/main
    user/main
    module/main
    kernel/main
    cep/cep0

Once you have learned about the cyclus basics, please follow these instructions 
for :doc:`getting and building cyclus <kernel/build_from_source>`.

Try It
-------

.. raw:: html

    <style type="text/css">
        #dashboard table {width:80%;border-color:#a9a9a9;color:#333333;border-collapse:collapse;margin:auto;border-width:1px;text-align:center;}
        #dashboard th {padding:4px;border-style:solid;border-color:#a9a9a9;border-width:1px;background-color:#b8b8b8;text-align:left;}
        #dashboard tr {background-color:#ffffff;text-align:center;}
        #dashboard td {padding:4px;border-color:#a9a9a9;border-style:solid;border-width:1px;text-align:center;}
        .status-complete {background-color:#95C97E;}
        .status-queued {background-color:#FF9933;}
        .status-running {background-color:#FAA460;}
        .status-failed {background-color:#BD2C00;}
    </style>
  
    <br>
    <div id="dashboard"></div>

    <script> 
        function loadDash() {
            $('#dashboard').load("http://cyc-submit.rwcr.net/dashboard",
                function() {
                    $('head').append('<style e2.css" type="text/css" />');
                    setTimeout("loadDash()", 10000)
                });
        }
        loadDash();
    </script>


Contact Us
----------

* `Users' mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_
* `Developer's' mailing list <https://groups.google.com/forum/#!forum/cyclus-dev>`_
* Project PI, Paul Wilson: wilsonp AT engr.wisc.edu
* Project Lead, Anthony Scopatz:  scopatz AT gmail.com

Acknowledgments
----------------

Support for this research has included funding received from:

.. container:: image_band

    .. image :: astatic/neup_logo_large.png
        :height: 100 px
 
    .. image :: astatic/AnlLogo.png
        :height: 100 px

    .. image :: astatic/USNRC.png
        :height: 100 px

    .. image :: astatic/nsf_logo.png
        :height: 100 px

    .. image :: astatic/crest.png
        :height: 100 px

