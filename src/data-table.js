/**
 * Create a new table
 * @param {String} selector The element to create the table in
 * @param {Array} options The table options
 */
let DataTable = function(selector, options) {
    "use strict";

    /**
     * The table body data
     */
    let _body = [];
    Object.defineProperty(this, "body", {
        get: function() { return _body; }
    });

    /**
     * The table headers
     */
    let _headers = [];
    Object.defineProperty(this, "headers", {
        get: function() { return _headers; }
    });

    /**
     * The table icons
     */
    let icons = {
        up:     `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-up"><polyline points="18 16 12 8 6 16 18 16"></polyline></svg>`,
        down:   `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-down"><polyline points="18 8 12 16 6 8 18 8"></polyline></svg>`,
        updown: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-updown"><polyline points="15 10 12 6 9 10 15 10"></polyline><polyline points="15 14 12 18 9 14 15 14"></polyline></svg>`
    };
    Object.defineProperty(this, "downIcon", {
        get: function() { return icons.down; },
        set: function(value) {
            icons.down = value;
            this.render();
        }
    });
    Object.defineProperty(this, "upIcon", {
        get: function() { return icons.up; },
        set: function(value) {
            icons.up = value;
            this.render();
        }
    });
    Object.defineProperty(this, "updownIcon", {
        get: function() { return icons.updown; },
        set: function(value) {
            icons.updown = value;
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
     * Whether the table can be sorted by the user
     */
    let _sortable = false;
    Object.defineProperty(this, "sortable", {
        get: function() { return _sortable; },
        set: function(value) {
            _sortable=value;
            this.render();
        }
    });

    /**
     * Whether the table is sorted in ascending order
     */
    let _sortAscending = null;
    Object.defineProperty(this, "sortAscending", {
        get: function() { return _sortAscending; }
    });

    /**
     * The index of the column that the table is sorted by
     */
    let _sortIndex = null;
    Object.defineProperty(this, "sortIndex", {
        get: function() { return _sortIndex; }
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
            if (options.body !== undefined) _body = options.body;
            if (options.headers !== undefined) _headers = options.headers;
            if (options.sortable !== undefined) _sortable = options.sortable;
            if (options.searchQuery !== undefined) _searchQuery = options.searchQuery;
            if (options.sortAscending !== undefined) _sortAscending = options.sortAscending;
            if (options.sortIndex !== undefined) _sortIndex = options.sortIndex;
            if (options.downIcon !== undefined) icons.down = options.downIcon;
            if (options.upIcon !== undefined) icons.up = options.upIcon;
            if (options.updownIcon !== undefined) icons.updown = options.updownIcon;
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
        for (let i = 0; i < _body.length; i++) {
            tableData.body.push({
                visible: true,
                columns: _body[i],
                row: i,
            });
        }

        // Update row visibilities
        _search(_searchQuery);

        // Save current sort properties
        let sortIndex = _sortIndex;
        let sortAscending = _sortAscending;

        // Update sort properties
        // _sort method will not sort rows if they already appear to be sorted
        _sortIndex = null;
        _sortAscending = null;

        // Sort rows
        _sort(sortIndex, sortAscending);
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
                divHTML += `<th>${tableData.headers[i]}`;
                if (_sortable) {
                    if (_sortIndex !== i) divHTML += `<button>${icons.updown}</button>`;
                    else if (_sortIndex === i && _sortAscending === true) divHTML += `<button>${icons.up}</button>`;
                    else if (_sortIndex === i && _sortAscending === false) divHTML += `<button>${icons.down}</button>`;
                }
                divHTML += "</th>";
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

        // Add event handlers
        if (_sortable) {
            let headers = document.querySelectorAll(`${this.selector} th`);
            for (let i = 0; i < headers.length; i++) {
                headers[i].addEventListener("click", () => {
                    if (_sortIndex !== i) this.sort(i, true);
                    else if (_sortIndex === i && _sortAscending === true) this.sort(i, false);
                    else if (_sortIndex === i && _sortAscending === false) this.sort(i, null);
                });
            }
        }
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

    /**
     * Set the table body data
     * @param {Array} value The table body data
     */
    this.setBody = function(value) {
        _body = value;
        loadTableData();
        this.render();
    }

    /**
     * Set the table headers
     * @param {Array} value The table headers
     */
    this.setHeaders = function(value) {
        _headers = value;
        loadTableData();
        this.render();
    }

    /**
     * Sort the table by the values in a column
     * @param {Number} index The column index
     * @param {Boolean} ascending Whether to sort the column in ascending order
     */
    let _sort = function(index, ascending) {
        if (_sortIndex === index && _sortAscending === ascending) {
            // Data is already sorted by correct column AND in correct direction
        }
        else if (index < 0 || index >= tableData.headers.length || ascending === null) {
            // Restore original order
            tableData.body.sort((a, b) => {
                if (a.row < b.row) return -1;
                else return 1;
            });

            // Set sort properties
            index = null;
            ascending = null;
        }
        else if (_sortIndex === index && _sortAscending !== ascending) {
            // Data is sorted by correct column but in wrong direction
            tableData.body.reverse();
        }
        else {
            // Data is sorted by incorrect column
            tableData.body.sort((a, b) => {
                if (a.columns[index] === b.columns[index]) return 0;
                else if (a.columns[index] < b.columns[index]) return -1;
                else return 1;
            });
            if (!ascending) tableData.body.reverse();
        }

        // Set sort properties
        _sortIndex = index;
        _sortAscending = ascending;
    }
    this.sort = function(index, ascending) {
        // Sort table
        _sort(index, ascending);

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
    get: function() { return "0.2.0"; }
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
