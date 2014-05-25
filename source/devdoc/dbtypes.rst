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
    var dbdata = '[["id", "name", "C++ type", "backend", "version", "supported"],' +
        '[1, "INT", "", "HDF5", "v1.0", 0],' +
        '[2, "FLOAT", "", "HDF5", "v1.0", 0],' +
        '[3, "DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[4, "STRING", "", "HDF5", "v1.0", 0],' +
        '[5, "VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[6, "BLOB", "", "HDF5", "v1.0", 0],' +
        '[7, "UUID", "", "HDF5", "v1.0", 0],' +
        '[8, "VECTOR_BOOL", "", "HDF5", "v1.0", 0],' +
        '[9, "VL_VECTOR_BOOL", "", "HDF5", "v1.0", 0],' +
        '[10, "VECTOR_INT", "", "HDF5", "v1.0", 0],' +
        '[11, "VL_VECTOR_INT", "", "HDF5", "v1.0", 0],' +
        '[12, "VECTOR_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[13, "VL_VECTOR_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[14, "VECTOR_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[15, "VL_VECTOR_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[16, "VECTOR_STRING", "", "HDF5", "v1.0", 0],' +
        '[17, "VL_VECTOR_STRING", "", "HDF5", "v1.0", 0],' +
        '[18, "VECTOR_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[19, "VL_VECTOR_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[20, "VECTOR_BLOB", "", "HDF5", "v1.0", 0],' +
        '[21, "VL_VECTOR_BLOB", "", "HDF5", "v1.0", 0],' +
        '[22, "VECTOR_UUID", "", "HDF5", "v1.0", 0],' +
        '[23, "VL_VECTOR_UUID", "", "HDF5", "v1.0", 0],' +
        '[24, "SET_BOOL", "", "HDF5", "v1.0", 0],' +
        '[25, "VL_SET_BOOL", "", "HDF5", "v1.0", 0],' +
        '[26, "SET_INT", "", "HDF5", "v1.0", 0],' +
        '[27, "VL_SET_INT", "", "HDF5", "v1.0", 0],' +
        '[28, "SET_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[29, "VL_SET_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[30, "SET_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[31, "VL_SET_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[32, "SET_STRING", "", "HDF5", "v1.0", 0],' +
        '[33, "VL_SET_STRING", "", "HDF5", "v1.0", 0],' +
        '[34, "SET_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[35, "VL_SET_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[36, "SET_BLOB", "", "HDF5", "v1.0", 0],' +
        '[37, "VL_SET_BLOB", "", "HDF5", "v1.0", 0],' +
        '[38, "SET_UUID", "", "HDF5", "v1.0", 0],' +
        '[39, "VL_SET_UUID", "", "HDF5", "v1.0", 0],' +
        '[40, "LIST_BOOL", "", "HDF5", "v1.0", 0],' +
        '[41, "VL_LIST_BOOL", "", "HDF5", "v1.0", 0],' +
        '[42, "LIST_INT", "", "HDF5", "v1.0", 0],' +
        '[43, "VL_LIST_INT", "", "HDF5", "v1.0", 0],' +
        '[44, "LIST_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[45, "VL_LIST_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[46, "LIST_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[47, "VL_LIST_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[48, "LIST_STRING", "", "HDF5", "v1.0", 0],' +
        '[49, "VL_LIST_STRING", "", "HDF5", "v1.0", 0],' +
        '[50, "LIST_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[51, "VL_LIST_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[52, "LIST_BLOB", "", "HDF5", "v1.0", 0],' +
        '[53, "VL_LIST_BLOB", "", "HDF5", "v1.0", 0],' +
        '[54, "LIST_UUID", "", "HDF5", "v1.0", 0],' +
        '[55, "VL_LIST_UUID", "", "HDF5", "v1.0", 0],' +
        '[56, "PAIR_INT_BOOL", "", "HDF5", "v1.0", 0],' +
        '[57, "PAIR_INT_INT", "", "HDF5", "v1.0", 0],' +
        '[58, "PAIR_INT_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[59, "PAIR_INT_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[60, "PAIR_INT_STRING", "", "HDF5", "v1.0", 0],' +
        '[61, "PAIR_INT_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[62, "PAIR_INT_BLOB", "", "HDF5", "v1.0", 0],' +
        '[63, "PAIR_INT_UUID", "", "HDF5", "v1.0", 0],' +
        '[64, "PAIR_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[65, "PAIR_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[66, "PAIR_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[67, "PAIR_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[68, "PAIR_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[69, "PAIR_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[70, "PAIR_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[71, "PAIR_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[72, "PAIR_VL_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[73, "PAIR_VL_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[74, "PAIR_VL_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[75, "PAIR_VL_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[76, "PAIR_VL_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[77, "PAIR_VL_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[78, "PAIR_VL_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[79, "PAIR_VL_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[80, "MAP_INT_BOOL", "", "HDF5", "v1.0", 0],' +
        '[81, "VL_MAP_INT_BOOL", "", "HDF5", "v1.0", 0],' +
        '[82, "MAP_INT_INT", "", "HDF5", "v1.0", 0],' +
        '[83, "VL_MAP_INT_INT", "", "HDF5", "v1.0", 0],' +
        '[84, "MAP_INT_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[85, "VL_MAP_INT_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[86, "MAP_INT_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[87, "VL_MAP_INT_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[88, "MAP_INT_STRING", "", "HDF5", "v1.0", 0],' +
        '[89, "VL_MAP_INT_STRING", "", "HDF5", "v1.0", 0],' +
        '[90, "MAP_INT_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[91, "VL_MAP_INT_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[92, "MAP_INT_BLOB", "", "HDF5", "v1.0", 0],' +
        '[93, "VL_MAP_INT_BLOB", "", "HDF5", "v1.0", 0],' +
        '[94, "MAP_INT_UUID", "", "HDF5", "v1.0", 0],' +
        '[95, "VL_MAP_INT_UUID", "", "HDF5", "v1.0", 0],' +
        '[96, "MAP_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[97, "VL_MAP_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[98, "MAP_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[99, "VL_MAP_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[100, "MAP_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[101, "VL_MAP_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[102, "MAP_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[103, "VL_MAP_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[104, "MAP_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[105, "VL_MAP_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[106, "MAP_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[107, "VL_MAP_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[108, "MAP_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[109, "VL_MAP_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[110, "MAP_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[111, "VL_MAP_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[112, "MAP_VL_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[113, "VL_MAP_VL_STRING_BOOL", "", "HDF5", "v1.0", 0],' +
        '[114, "MAP_VL_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[115, "VL_MAP_VL_STRING_INT", "", "HDF5", "v1.0", 0],' +
        '[116, "MAP_VL_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[117, "VL_MAP_VL_STRING_FLOAT", "", "HDF5", "v1.0", 0],' +
        '[118, "MAP_VL_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[119, "VL_MAP_VL_STRING_DOUBLE", "", "HDF5", "v1.0", 0],' +
        '[120, "MAP_VL_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[121, "VL_MAP_VL_STRING_STRING", "", "HDF5", "v1.0", 0],' +
        '[122, "MAP_VL_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[123, "VL_MAP_VL_STRING_VL_STRING", "", "HDF5", "v1.0", 0],' +
        '[124, "MAP_VL_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[125, "VL_MAP_VL_STRING_BLOB", "", "HDF5", "v1.0", 0],' +
        '[126, "MAP_VL_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[127, "VL_MAP_VL_STRING_UUID", "", "HDF5", "v1.0", 0],' +
        '[0, "BOOL", "bool", "HDF5", "v1.0", 1]]';

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
        fields =[{name: 'id',        type: 'int',    filterable: true},
                 {name: 'name',      type: 'string', filterable: true},
                 {name: "C++ type",  type: 'string', filterable: true},
                 {name: 'backend',   type: 'string', filterable: true, 
                  columnLabelable: true},
                 {name: 'version',   type: 'string', filterable: true, 
                  columnLabelable: true},
                 {name: 'supported', type: 'integer', filterable: true,
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
                    filters: {version: "v1.0"}, 
                    rowLabels: ["id", "name", "C++ type"], 
                    columnLabels: ["backend"],
                    summaries: ["supported_sum"]});

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

