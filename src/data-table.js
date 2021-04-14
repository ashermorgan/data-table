/**
 * Create a new table
 * @param {String} selector The element to create the table in
 * @param {Array} options The table options
 */
let DataTable = function(selector, options) {
    /**
     * The table body data
     */
    let _body = [];
    Object.defineProperty(this, "body", {
        get: function() { return _body; },
        set: function(value) {
            _body=value;
            loadTableData();
            this.render();
        }
    });

    /**
     * The table headers
     */
    let _headers = [];
    Object.defineProperty(this, "headers", {
        get: function() { return _headers; },
        set: function(value) {
            _headers=value;
            loadTableData();
            this.render();
        }
    });

    /**
     * The current search query
     */
    let _searchQuery = "";
    Object.defineProperty(this, "searchQuery", {
        get: function() { return _searchQuery; }
    });

    /**
     * The table selector
     */
    let _selector = null;
    Object.defineProperty(this, "selector", {
        get: function() { return _selector; }
    });

    /**
     * The processed table data
     */
    let tableData = { headers: [], body: [] };

    /**
     * Initialize the table
     * @param {DataTable} instance The DataTable instance
     * @param {String} selector The table selector
     * @param {Object} options The table options
     */
    let init = function(instance, selector, options) {
        // Set selector
        _selector = selector;

        // Set options
        if (options) {
            if (options.headers) _headers = options.headers;
            if (options.body) _body = options.body;
        }

        // Load tableData
        loadTableData();

        // Render table
        instance.render();
    };

    /**
     * Load table data from the body and headers properties
     */
    let loadTableData = function() {
        // Load table headers
        tableData.headers = _headers;

        // Load table body
        tableData.body = [];
        for (let row of _body) {
            tableData.body.push({
                visible: true,
                columns: row,
            });
        }

        // Update row visibilities
        _search(_searchQuery);
    };

    /**
     * Render the table
     */
    this.render = function() {
        // Get div
        let div = document.querySelector(this.selector);
        div.classList.add("data-table");

        // Create table
        let divHTML = "<table>";

        // Add table header
        if (tableData.headers.length > 0) {
            divHTML += "<thead><tr>";
            for (let i = 0; i < tableData.headers.length; i++) {
                divHTML += `<th>${tableData.headers[i]}</th>`;
            }
            divHTML += "</thead></tr>";
        }

        // Add table body
        if (tableData.body.length > 0) {
            divHTML += "<tbody>";
            for (let row of tableData.body) {
                // Make sure row is visible
                if (!row.visible) continue;

                // Add row
                divHTML += "<tr>";
                for (let column of row.columns) {
                    divHTML += `<td>${column}</td>`;
                }
                divHTML += "</tr>";
            }
            divHTML += "</tbody>";
        }

        // Set div content
        divHTML += "</table>";
        div.innerHTML = divHTML;
    };

    /**
     * Search for a query in the table and hide rows that do not contain a match
     * @param {String} query The search query
     */
    let _search = function(query) {
        // Search for query in table data
        for (let row of tableData.body) {
            row.visible = false;
            for (let column of row.columns) {
                if (column.toLowerCase().includes(query.toLowerCase())) {
                    row.visible = true;
                    break;
                }
            }
        }

        // Update searchQuery property
        _searchQuery = query;
    };
    this.search = function(query) {
        // Search for query
        _search(query);

        // Render table
        this.render();
    }

    // Initialize the table
    init(this, selector, options);
}



/**
 * The library version
 */
Object.defineProperty(DataTable, "version", {
    get: function() { return "0.1.0"; }
});



// Register library
if (typeof define === "function" && define.amd) {
    // AMD
    define(function() {
        root.DataTable = DataTable;
        return root.DataTable;
    });
}
else if (typeof exports === "object" && typeof module !== "undefined") {
    // Node
    module.exports = DataTable;
}
else {
    // Browser
    this.DataTable = DataTable;
}
