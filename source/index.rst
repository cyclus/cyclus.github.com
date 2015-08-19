|Cyclus|
==========

.. raw:: html

    <div style="text-align:center;"><br /><br />

.. image:: logos/logo2_bike.gif
    :align: center
    :alt: Cyclus

.. raw:: html

    </div>

.. raw:: html

|cyclus| is the next-generation agent-based nuclear :doc:`fuel cycle simulator
<basics/fcs_background>`, providing flexibility to users and developers
through a :term:`dynamic resource exchange` solver and :term:`plug-in`,
user-developed :term:`agent` framework.

The goal of |cyclus| is to enable a broad spectrum of :term:`fuel cycle
simulation <fuel cycle simulator>` while providing a low barrier to entry for
new users and agent developers. |Cyclus| engages with potential module
developers and encourages them to join a vibrant community in an
:doc:`expanding ecosystem <basics/ecosystem>`.  Users and developers are
always welcome and encouraged to use or contribute to the |cyclus| project. 

The |Cyclus| project repository is located at http://github.com/cyclus/cyclus.

News
-----

**August 13, 2015:** :doc:`Cyclus included in FY2016 workscopes for the NEUP program <news/fy16neup>`

**July 21-24, 2015:** Joint workshop with CLASS_ project held in Madison, WI

**June 10, 2015:** First Cyclus :doc:`user tutorial <user/tutorial/index>` and :doc:`developer tutorial <arche/tutorial/index>` are held at the 2015 ANS Annual Meeting in San Antonio, TX 

**June 7, 2015:** :doc:`Cyclus v1.3.1 is released <previous/v1.3>`

Learn More
----------

.. toctree::
    :maxdepth: 1

    basics/index
    user/index
    arche/index
    kernel/index
    cep/cep0
    previous/index
    cite/index

.. _try-it:

Try It
-------

You can run a simulation right now from the comfort of your own
browser.  Just paste in any |cyclus| input file (or use the default one below)
into the text box below and click submit.  A job ID will be created and
displayed - you should keep track of this in order to retrieve your results.
The job table below updates automatically every 30 seconds, or you can refresh
this page.  It contains all submitted jobs - their status, output, and database
(if completed) with some useful links:

* Clicking on the job ID link downloads the input file for the job.

* Clicking on the Status link shows the simulation output - useful for
  diagnosing failures.

* For completed jobs, download the database in a zip file by clicking the
  Results link. You can check out :doc:`user/dbdoc` for information on working
  with the data.

.. raw:: html

    <br>
    <div id="infile-form">
    Cyclus input file: <br>
    <textarea id="infile-box" name="infile" rows=10></textarea>
    <br><button onclick="submitJob()">Submit</button><label>    Job ID: </label><label id="jobid"></label>
    </div>

    <br>
    <div id="dashboard"></div>
    <br>

    <script> 
        var server = "http://cycrun.fuelcycle.org"

        function submitJob() {
            var text = $('#infile-box').val();
            $.post(server + "/api/v1/job-infile", text, function(data) {
                var resp = JSON.parse(data)
                $('#jobid').text(resp.Id);
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

Contributors
------------

* Robert Carlsen

* Denia Djokic

* Robert Flanagan

* `Matthew Gidden <http://mattgidden.com/>`_

* `Kathryn (Katy) Huff <http://katyhuff.github.io/>`_

* `Meghan McGarry <http://cnerg.github.io/people/mcgarry.html>`_

* `Arrielle Opotowsky <http://cnerg.github.io/people/opotowsky.html>`_

* Olzhas Rakhimov

* `Anthony Scopatz <http://scopatz.com/>`_

* Zach Welch

* `Paul Wilson <http://cnerg.github.io/people/pphw.html>`_

* John Xia

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


.. _CLASS: https://forge.in2p3.fr/projects/classforge
