var dbdata =
    '[["C++ type", "shape rank", "backend", "version", "supported"],' +
    '["bool", 0, "SQLite", "v1.0", 1],' +
    '["int", 0, "SQLite", "v1.0", 1],' +
    '["float", 0, "SQLite", "v1.0", 1],' +
    '["double", 0, "SQLite", "v1.0", 1],' +
    '["std::string", 1, "SQLite", "v1.0", 1],' +
    '["std::string", 1, "SQLite", "v1.0", 1],' +
    '["cyclus::Blob", 0, "SQLite", "v1.0", 1],' +
    '["boost::uuids::uuid", 0, "SQLite", "v1.0", 1],' +
    '["std::vector<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<int>", 1, "SQLite", "v1.0", 1],' +
    '["std::vector<int>", 1, "SQLite", "v1.0", 1],' +
    '["std::vector<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.0", 1],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<int>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<int>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<int>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<int>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<float>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<int, bool>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<int, int>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, int>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, int>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, float>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, float>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, double>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, double>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.0", 0],' +
    '["bool", 0, "HDF5", "v1.0", 1],' +
    '["int", 0, "HDF5", "v1.0", 1],' +
    '["float", 0, "HDF5", "v1.0", 1],' +
    '["double", 0, "HDF5", "v1.0", 1],' +
    '["std::string", 1, "HDF5", "v1.0", 1],' +
    '["std::string", 1, "HDF5", "v1.0", 1],' +
    '["cyclus::Blob", 0, "HDF5", "v1.0", 1],' +
    '["boost::uuids::uuid", 0, "HDF5", "v1.0", 1],' +
    '["std::vector<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::vector<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.0", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.0", 1],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::set<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::set<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::list<int>", 1, "HDF5", "v1.0", 1],' +
    '["std::list<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<float>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<int, bool>", 0, "HDF5", "v1.0", 0],' +
    '["std::pair<int, int>", 0, "HDF5", "v1.0", 1],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.0", 0],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.0", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "HDF5", "v1.0", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, int>", 1, "HDF5", "v1.0", 1],' +
    '["std::map<int, int>", 1, "HDF5", "v1.0", 1],' +
    '["std::map<int, float>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, float>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, double>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, double>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.0", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.0", 0],' +
    '["bool", 0, "SQLite", "v1.1", 1],' +
    '["int", 0, "SQLite", "v1.1", 1],' +
    '["float", 0, "SQLite", "v1.1", 1],' +
    '["double", 0, "SQLite", "v1.1", 1],' +
    '["std::string", 1, "SQLite", "v1.1", 1],' +
    '["std::string", 1, "SQLite", "v1.1", 1],' +
    '["cyclus::Blob", 0, "SQLite", "v1.1", 1],' +
    '["boost::uuids::uuid", 0, "SQLite", "v1.1", 1],' +
    '["std::vector<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::vector<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::vector<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<double>", 1, "SQLite", "v1.1", 1],' +
    '["std::vector<double>", 1, "SQLite", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::set<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::set<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::list<int>", 1, "SQLite", "v1.1", 1],' +
    '["std::list<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<float>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<int, bool>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<int, int>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, int>", 1, "SQLite", "v1.1", 1],' +
    '["std::map<int, int>", 1, "SQLite", "v1.1", 1],' +
    '["std::map<int, float>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, float>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, double>", 1, "SQLite", "v1.1", 1],' +
    '["std::map<int, double>", 1, "SQLite", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.1", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.1", 0],' +
    '["int", 0, "HDF5", "v1.1", 1],' +
    '["float", 0, "HDF5", "v1.1", 1],' +
    '["double", 0, "HDF5", "v1.1", 1],' +
    '["std::string", 1, "HDF5", "v1.1", 1],' +
    '["std::string", 1, "HDF5", "v1.1", 1],' +
    '["cyclus::Blob", 0, "HDF5", "v1.1", 1],' +
    '["boost::uuids::uuid", 0, "HDF5", "v1.1", 1],' +
    '["std::vector<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::vector<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::vector<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::set<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::set<float>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<float>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::list<int>", 1, "HDF5", "v1.1", 1],' +
    '["std::list<float>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<float>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<int, bool>", 0, "HDF5", "v1.1", 0],' +
    '["std::pair<int, int>", 0, "HDF5", "v1.1", 1],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.1", 0],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.1", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "HDF5", "v1.1", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, int>", 1, "HDF5", "v1.1", 1],' +
    '["std::map<int, int>", 1, "HDF5", "v1.1", 1],' +
    '["std::map<int, float>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, float>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, double>", 1, "HDF5", "v1.1", 1],' +
    '["std::map<int, double>", 1, "HDF5", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.1", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.1", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.1", 0],' +
    '["bool", 0, "HDF5", "v1.1", 1],' +
    '["bool", 0, "SQLite", "v1.2", 1],' +
    '["int", 0, "SQLite", "v1.2", 1],' +
    '["float", 0, "SQLite", "v1.2", 1],' +
    '["double", 0, "SQLite", "v1.2", 1],' +
    '["std::string", 1, "SQLite", "v1.2", 1],' +
    '["std::string", 1, "SQLite", "v1.2", 1],' +
    '["cyclus::Blob", 0, "SQLite", "v1.2", 1],' +
    '["boost::uuids::uuid", 0, "SQLite", "v1.2", 1],' +
    '["std::vector<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::vector<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::vector<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<double>", 1, "SQLite", "v1.2", 1],' +
    '["std::vector<double>", 1, "SQLite", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::set<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::set<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::list<int>", 1, "SQLite", "v1.2", 1],' +
    '["std::list<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<float>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<int, bool>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<int, int>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, int>", 1, "SQLite", "v1.2", 1],' +
    '["std::map<int, int>", 1, "SQLite", "v1.2", 1],' +
    '["std::map<int, float>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, float>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, double>", 1, "SQLite", "v1.2", 1],' +
    '["std::map<int, double>", 1, "SQLite", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.2", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.2", 0],' +
    '["int", 0, "HDF5", "v1.2", 1],' +
    '["float", 0, "HDF5", "v1.2", 1],' +
    '["double", 0, "HDF5", "v1.2", 1],' +
    '["std::string", 1, "HDF5", "v1.2", 1],' +
    '["std::string", 1, "HDF5", "v1.2", 1],' +
    '["cyclus::Blob", 0, "HDF5", "v1.2", 1],' +
    '["boost::uuids::uuid", 0, "HDF5", "v1.2", 1],' +
    '["std::vector<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::vector<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::vector<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::set<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::set<float>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<float>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::list<int>", 1, "HDF5", "v1.2", 1],' +
    '["std::list<float>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<float>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<int, bool>", 0, "HDF5", "v1.2", 0],' +
    '["std::pair<int, int>", 0, "HDF5", "v1.2", 1],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.2", 0],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.2", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "HDF5", "v1.2", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, int>", 1, "HDF5", "v1.2", 1],' +
    '["std::map<int, int>", 1, "HDF5", "v1.2", 1],' +
    '["std::map<int, float>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, float>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, double>", 1, "HDF5", "v1.2", 1],' +
    '["std::map<int, double>", 1, "HDF5", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.2", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.2", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.2", 0],' +
    '["bool", 0, "HDF5", "v1.2", 1],' +
    '["bool", 0, "SQLite", "v1.3", 1],' +
    '["int", 0, "SQLite", "v1.3", 1],' +
    '["float", 0, "SQLite", "v1.3", 1],' +
    '["double", 0, "SQLite", "v1.3", 1],' +
    '["std::string", 1, "SQLite", "v1.3", 1],' +
    '["std::string", 1, "SQLite", "v1.3", 1],' +
    '["cyclus::Blob", 0, "SQLite", "v1.3", 1],' +
    '["boost::uuids::uuid", 0, "SQLite", "v1.3", 1],' +
    '["std::vector<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::vector<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::vector<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<double>", 1, "SQLite", "v1.3", 1],' +
    '["std::vector<double>", 1, "SQLite", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::set<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::set<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<double>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::set<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::list<int>", 1, "SQLite", "v1.3", 1],' +
    '["std::list<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<float>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<double>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::list<std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<int, bool>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<int, int>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<int, float>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<int, std::string>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, int>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, float>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, double>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, bool>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, int>", 1, "SQLite", "v1.3", 1],' +
    '["std::map<int, int>", 1, "SQLite", "v1.3", 1],' +
    '["std::map<int, float>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, float>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, double>", 1, "SQLite", "v1.3", 1],' +
    '["std::map<int, double>", 1, "SQLite", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, int>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, float>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, double>", 2, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "SQLite", "v1.3", 0],' +
    '["int", 0, "HDF5", "v1.3", 1],' +
    '["float", 0, "HDF5", "v1.3", 1],' +
    '["double", 0, "HDF5", "v1.3", 1],' +
    '["std::string", 1, "HDF5", "v1.3", 1],' +
    '["std::string", 1, "HDF5", "v1.3", 1],' +
    '["cyclus::Blob", 0, "HDF5", "v1.3", 1],' +
    '["boost::uuids::uuid", 0, "HDF5", "v1.3", 1],' +
    '["std::vector<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::vector<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::vector<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<float>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<double>", 1, "HDF5", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::vector<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::vector<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::vector<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::set<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::set<float>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<float>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<double>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::set<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::set<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::list<int>", 1, "HDF5", "v1.3", 1],' +
    '["std::list<float>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<float>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<double>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::list<std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::list<boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<int, bool>", 0, "HDF5", "v1.3", 0],' +
    '["std::pair<int, int>", 0, "HDF5", "v1.3", 1],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.3", 0],' +
    '["std::pair<int, float>", 0, "HDF5", "v1.3", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<int, std::string>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<int, cyclus::Blob>", 0, "HDF5", "v1.3", 0],' +
    '["std::pair<int, boost::uuids::uuid>", 0, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, int>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, float>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, double>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, std::string>", 2, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::pair<std::string, boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, bool>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, int>", 1, "HDF5", "v1.3", 1],' +
    '["std::map<int, int>", 1, "HDF5", "v1.3", 1],' +
    '["std::map<int, float>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, float>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, double>", 1, "HDF5", "v1.3", 1],' +
    '["std::map<int, double>", 1, "HDF5", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<int, std::string>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, cyclus::Blob>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<int, boost::uuids::uuid>", 1, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, bool>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, int>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, float>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, double>", 2, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, std::string>", 3, "HDF5", "v1.3", 1],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, cyclus::Blob>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, boost::uuids::uuid>", 2, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::map<int, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::vector<double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map<std::string, std::map<int, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map< std::pair<int, std::string>, double >", 2, "HDF5", "v1.3", 1],' +
    '["std::map< std::pair<int, std::string>, double >", 2, "SQLite", "v1.3", 0],' +
    '["std::map< std::string, std::pair<double, std::map<int, double> > >", 3, "SQLite", "v1.3", 1],' +
    '["std::map< int, std::map< std::string, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map< std::string, std::vector< std::pair< int, std::pair<std::string, std::string> > > >", 5, "SQLite", "v1.3", 1],' +
    '["std::map< std::pair<int, std::string>, double >", 2, "HDF5", "v1.3", 1],' +
    '["std::map< std::string, std::pair<double, std::map<int, double> > >", 3, "SQLite", "v1.3", 1],' +
    '["std::map< int, std::map< std::string, double> >", 3, "SQLite", "v1.3", 1],' +
    '["std::map< std::string, std::vector< std::pair< int, std::pair<std::string, std::string> > > >", 5, "SQLite", "v1.3", 1],' +
    '["std::map< std::string, std::pair<double, std::map<int, double> > >", 3, "HDF5", "v1.3", 0],' +
    '["std::map< int, std::map< std::string, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map< std::string, std::vector< std::pair< int, std::pair<std::string, std::string> > > >", 5, "HDF5", "v1.3", 0],' +
    '["std::map< std::pair<int, std::string>, double >", 2, "HDF5", "v1.3", 0],' +
    '["std::map< std::string, std::pair<double, std::map<int, double> > >", 3, "HDF5", "v1.3", 0],' +
    '["std::map< int, std::map< std::string, double> >", 3, "HDF5", "v1.3", 0],' +
    '["std::map< std::string, std::vector< std::pair< int, std::pair<std::string, std::string> > > >", 5, "HDF5", "v1.3", 0],' +
    '["bool", 0, "HDF5", "v1.3", 1]]';
dbdata = dbdata.replace(new RegExp('<', 'g'), '&lt;')
               .replace(new RegExp('>', 'g'), '&gt;');
