Database Types
==============
Here is a listing of all supported data types that the various backends have 
implemented, by cyclus version number.

.. raw:: html

    <link rel="stylesheet" href="../_static/pivot/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pivot/subnav.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pivot/pivot.css" type="text/css" />
    <link rel="stylesheet" href="../_static/cyclus.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pygments.css" type="text/css" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Noticia+Text|Open+Sans|Droid+Sans+Mono" type="text/css" />

    <!-- jquery_pivot must be loaded after pivot.js and jQuery -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="../_static/pivot/subnav.js"></script>
    <script type="text/javascript" src="../_static/pivot/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../_static/pivot/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="../_static/pivot/pivot.min.js"></script>
    <script type="text/javascript" src="../_static/pivot/jquery_pivot.js"></script>

    <script type="text/javascript">
    function setupPivot(input){
      input.callbacks = {afterUpdateResults: function(){
        $('#results > table').dataTable({
          "sDom": "<'row'<'span6'l><'span6'f>>t<'row'<'span6'i><'span6'p>>",
          "iDisplayLength": -1,
          "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
          "sPaginationType": "bootstrap",
          "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
          }
        });
      }};
      $('#pivot-demo').pivot_display('setup', input);
    };

    $(document).ready(function() {
        csv = "last_name,first_name,email,date_ordered,date_delivered,sale_price,unit_identifier\n" +
              "doo, scooby, scoobydoo12512@gmail.com,2012-02-12,2012-02-17,9.99,big-bang-rpsls\n" +
              "flinstone,fred,freddyf12516@gmail.com,2012-02-12,2012-02-17,9.99,dr-who-bad-wolf\n" +
              "spiegel,spike,bebop1256@gmail.com,2012-02-12,2012-02-17,9.99,tng-engage\n"; 

        fields =[{name: 'last_name',      type: 'string',   filterable: true},
               {name: 'first_name',     type: 'string',   filterable: true},
               {name: 'email',          type: 'string',   filterable: true},
               {name: 'date_ordered',   type: 'date',     filterable: true},
               {name: 'date_delivered', type: 'date',     rowLabelable: false},
               {name: 'sale_price',     type: 'float',    filterable: true},
               {name: 'unit_identifier',type: 'string',   filterable: true, summarizable: 'count' }];

        //setupPivot({url:'./lib/csv/demo.csv', fields: fields, filters: {employer: 'Acme Corp'}, rowLabels:["city"], summaries:["billed_amount", "payment_amount"]})
        setupPivot({csv:csv, fields: fields,})

        // prevent dropdown from closing after selection
        $('.stop-propagation').click(function(event){
          event.stopPropagation();
        });
    });
    </script>

    <div class="subnav" style="position:static;">
      <ul class="nav nav-pills">
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            Filter Fields
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu stop-propagation" style="overflow:auto;max-height:450px;padding:10px;">
            <div id="filter-list"></div>
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            Row Label Fields
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu stop-propagation" style="overflow:auto;max-height:450px;padding:10px;">
            <div id="row-label-fields"></div>
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            Column Label Fields
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu stop-propagation" style="overflow:auto;max-height:450px;padding:10px;">
            <div id="column-label-fields"></div>
          </ul>
        </li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            Summary Fields
            <b class="caret"></b>
          </a>
          <ul class="dropdown-menu stop-propagation" style="overflow:auto;max-height:450px;padding:10px;">
            <div id="summary-fields"></div>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      <h1>Results</h1>
      <span id="pivot-detail"></span>
      <hr/>
      <div id="results"></div>
    </div>

