/**
 * Create a new table
 * @param {String} selector The element to create the table in
 * @param {Array} data The table data
 */
let DataTable = function(selector, data) {
    // Fields
    let _selector = selector;
    let _data = data;

    // Properties
    Object.defineProperty(this, "selector", {
        get: function() { return _selector; }
    });
    Object.defineProperty(this, "data", {
        get: function() { return _data; },
        set: function(value) { _data=value; this.render(); }
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
            divHTML += "<tr>"
            for (let i = 0; i < this.data[0].length; i++) {
                divHTML += `<th>${this.data[0][i]}</th>`;
            }
            divHTML += "</tr>";
        }

        // Add table body
        for (let row of this.data.slice(1)) {
            divHTML += "<tr>";
            for (let column of row) {
                divHTML += `<td>${column}</td>`;
            }
            divHTML += "</tr>";
        }

        // Set div content
        divHTML += "</table>";
        div.innerHTML = divHTML;
    }

    // Render table
    this.render();
}



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
