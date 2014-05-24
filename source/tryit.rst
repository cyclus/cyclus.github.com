
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
        var server = "http://23.253.61.86"

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

