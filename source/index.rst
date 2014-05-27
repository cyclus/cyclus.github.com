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
    v0.4 has been released!</a></h2><br></div>

*Cyclus* is *the* agent-based nuclear :doc:`fuel cycle simulator
<basics/fcs_background>`, providing flexibility to users
and developers through a dynamic resource exchange solver and plugin,
user-developed agent framework.

The goal of *Cyclus* is to enable a broad specutrum of 
fuel cycle simulation while providing a 
low barrier to entry for new users and agent developers. Cyclus engages 
with potential module developers and 
encourages them to join a vibrant community in an 
:doc:`expanding ecosystem <basics/ecosystem>`.  
Users and developers are always welcome and encouraged to use or contribute 
to the cyclus project. 

The *Cyclus* project repository is located at http://github.com/cyclus/cyclus.

* User Interaction
   * Common physics infrastructure
   * Different user interface layers for different user audiences
     which vary based on the needs of the user.
* Modeling Paradigm
   * Agent-based simulation allows for the exploration of emergent phenomenon.
   * Flexible design of new fuel cycles and agents.
* Software Development Principles
   * Free and open source development licensing (BSD 3-clause)
   * Engagement with users, developers, and the fuel cycle community.

Learn More
----------

.. toctree::
    :maxdepth: 1

    basics/main
    user/main
    module/main
    kernel/main
    cep/cep0

TODO: Add publications on or using cyclus page, should contain bibtex entry for
citing cyclus (PHYSOR for now?)

Try It
-------

You can run a cyclus simulation right now from the comfort of your own browser:

.. raw:: html

    <br>
    <div id="infile-form">
    Cyclus input file: <br>
    <textarea id="infile-box" name="infile" rows=10></textarea>
    <br><button onclick="submitJob()">Submit</button><label>    Job Id: </label><label id="jobid"></label>
    </div>

    <br>
    <div id="dashboard"></div>
    <br>

    <script> 
        var server = "http://cycrun.fuelcycle.org"

        function submitJob() {
            var text = $('#infile-box').val();
            $.post(server + "/job/submit-infile", text, function(data) {
                $('#jobid').text(data);
                $('#dashboard').load(server + "/dashboard");
            })
        }
        function loadDash() {
            $('#dashboard').load(server + "/dashboard", function() {
                setTimeout("loadDash()", 30000)
            });
        }
        function loadDefaultInfile() {
            $.get(server + "/dashboard/default-infile", function( data ) {
                $('#infile-box').text(data);
            })
        }

        loadDefaultInfile();
        loadDash();
    </script>


Contact Us
----------

* `Users' mailing list and forum <https://groups.google.com/forum/#!forum/cyclus-users>`_
* `Developers' mailing list and forum <https://groups.google.com/forum/#!forum/cyclus-dev>`_
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

