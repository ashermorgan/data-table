/**
 * Create a new table
 * @param {String} selector The element to create the table in
 * @param {Array} data The table data
 */
let DataTable = function(selector, data) {
    /**
     * The table data
     */
    let _data = data;
    Object.defineProperty(this, "data", {
        get: function() { return _data; },
        set: function(value) { _data=value; this.render(); }
    });

    /**
     * The table selector
     */
    let _selector = selector;
    Object.defineProperty(this, "selector", {
        get: function() { return _selector; }
    });

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
        if (this.data.length > 0) {
            divHTML += "<thead><tr>"
            for (let i = 0; i < this.data[0].length; i++) {
                divHTML += `<th>${this.data[0][i]}</th>`;
            }
            divHTML += "</thead></tr>";
        }

        // Add table body
        divHTML += "<tbody>";
        for (let row of this.data.slice(1)) {
            divHTML += "<tr>";
            for (let column of row) {
                divHTML += `<td>${column}</td>`;
            }
            divHTML += "</tr>";
        }
        divHTML += "</tbody>";

        // Set div content
        divHTML += "</table>";
        div.innerHTML = divHTML;
    }

    // Render table
    this.render();
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
