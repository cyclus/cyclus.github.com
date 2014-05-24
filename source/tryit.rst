
Try It
-------

.. raw:: html

    <br>
    <div id="infile-form">
    Cyclus input file: <br>
    <textarea id="infile-box" name="infile" rows=20></textarea>
    <br><button onclick="submitJob()">Submit</button><label>    Job Id: </label><label id="jobid"></label>
    </div>

    <br>
    <div id="dashboard"></div>
    <br>

    <script> 
        function submitJob() {
            var text = $('#infile-box').val();
            $.post("http://cyc-submit.rwcr.net/job/submit-infile", text, function(data) {
                $('#jobid').text(data);
                $('#dashboard').load("http://cyc-submit.rwcr.net/dashboard");
            })
        }
        function loadDash() {
            $('#dashboard').load("http://cyc-submit.rwcr.net/dashboard", function() {
                setTimeout("loadDash()", 30000)
            });
        }
        function loadDefaultInfile() {
            $.get("http://cyc-submit.rwcr.net/dashboard/default-infile", function( data ) {
                $('#infile-box').text(data);
            })
        }

        loadDefaultInfile();
        loadDash();
    </script>

