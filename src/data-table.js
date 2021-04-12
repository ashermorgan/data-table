/**
 * Create a new table
 * @param {String} selector The element to create the table in
 * @param {Array} options The table options
 */
let DataTable = function(selector, options) {
    /**
     * The table data
     */
    let _data = [];
    Object.defineProperty(this, "data", {
        get: function() { return _data; },
        set: function(value) { _data=value; this.render(); }
    });

    /**
     * The table headers
     */
    let _headers = [];
    Object.defineProperty(this, "headers", {
        get: function() { return _headers; },
        set: function(value) { _headers=value; this.render(); }
    });

    /**
     * The table selector
     */
    let _selector = null;
    Object.defineProperty(this, "selector", {
        get: function() { return _selector; }
    });

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
            if (options.data) _data = options.data;
        }

        // Render table
        instance.render();
    }

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
        if (this.headers.length > 0) {
            divHTML += "<thead><tr>"
            for (let i = 0; i < this.headers.length; i++) {
                divHTML += `<th>${this.headers[i]}</th>`;
            }
            divHTML += "</thead></tr>";
        }

        // Add table body
        if (this.data.length > 0) {
            divHTML += "<tbody>";
            for (let row of this.data) {
                divHTML += "<tr>";
                for (let column of row) {
                    divHTML += `<td>${column}</td>`;
                }
                divHTML += "</tr>";
            }
            divHTML += "</tbody>";
        }

        // Set div content
        divHTML += "</table>";
        div.innerHTML = divHTML;
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
