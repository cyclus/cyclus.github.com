.. _dbtypes:

Database Types
==============

Here is a listing of all supported data types that the various backends have
implemented, by |cyclus| version number. If your agents need a type that is not
yet supported, please let us know and we'll get to it as soon as possible!

**Description of fields:**

:id: enum identifier (value) for database type in the ``cyclus::DbTypes`` enum.
:name: enum name for database type in the ``cyclus::DbTypes`` enum.
:C++ type: the cooresponding C++ type.
:shape rank: the maximum rank (length) of the ``shape`` vector.
:backend: the database backend type.
:version: the |cyclus| version.
:supported: flag for if the backend supported this type in this release.

.. raw:: html

    <br />

    <link rel="stylesheet" href="../_static/pivot/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pivot/subnav.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pivot/pivot.css" type="text/css" />
    <link rel="stylesheet" href="../_static/cyclus.css" type="text/css" />
    <link rel="stylesheet" href="../_static/pygments.css" type="text/css" />

    <style>
    p {
      font-size: 100%;
    }

    img {
      max-height: 100px;
    }

    img.logo {
      max-height: none;
    }
    </style>

    <!-- jquery_pivot must be loaded after pivot.js and jQuery -->
    <script type="text/javascript" src="../_static/pivot/subnav.js"></script>
    <script type="text/javascript" src="../_static/pivot/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="../_static/pivot/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="../_static/pivot/pivot.min.js"></script>
    <script type="text/javascript" src="../_static/pivot/jquery_pivot.js"></script>

    <script type="text/javascript">
    var dbdata = []
    $.getJSON("/arche/dbtypes.json", function(json) {
        dbdata = json;

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
          $('#pivot-display').pivot_display('setup', input);
        };

        $(document).ready(function() {
            fields =[{name: 'id',         type: 'integer', filterable: true},
                     {name: 'name',       type: 'string',  filterable: true,
                      displayFunction: function(value){
                        return '<div style="font-family:Courier,monospace;">' +
                               value + '</div>';}},
                     {name: "C++ type",   type: 'string',  filterable: true,
                      displayFunction: function(value){
                        return '<div style="font-family:Courier,monospace;">' +
                               value + '</div>';}},
                     {name: 'shape rank', type: 'integer', filterable: true},
                     {name: 'backend',    type: 'string',  filterable: true,
                      columnLabelable: true},
                     {name: 'version',    type: 'string',  filterable: true,
                      columnLabelable: true},
                     {name: 'supported',  type: 'integer', filterable: true,
                      rowLabelable: true, summarizable: 'sum',
                      displayFunction: function(value){
                        if (value)
                          return '<div style="text-align:center;' +
                                 'background-color:#c8e8b0">Yes</div>';
                        else
                          return '<div style="text-align:center;' +
                                 'background-color:#fcf1df">No</div>';
                        }
                      }
                     ];

            setupPivot({json: dbdata, fields: fields,
                        filters: {version: "v1.2"},
                        rowLabels: ["C++ type"],
                        columnLabels: ["backend"],
                        summaries: ["supported_sum"]});

            // prevent dropdown from closing after selection
            $('.stop-propagation').click(function(event){
              event.stopPropagation();
            });
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
      <br />
      <span id="pivot-detail"></span>
      <hr/>
      <div id="results"></div>
    </div>

