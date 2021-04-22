const DataTable = require("../src/data-table.js");
const expect = require("chai").expect;
const { JSDOM } = require("jsdom");
const sinon = require("sinon");



describe("DataTable class", function() {
    let oldDocument;
    beforeEach(function() {
        oldDocument = global.document;
        global.document = new JSDOM(`<div id="mytable"></div>`).window.document;
    });
    afterEach(function() {
        global.document = oldDocument;
    });

    describe("Constructor", function() {
        it("Should set isSortable property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert isSortable property is correct
            expect(dt.isSortable).to.equal(false);
        });

        it("Should set searchQuery property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert searchQuery property is correct
            expect(dt.searchQuery).to.equal("");
        });

        it("Should set selector property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert selector property is correct
            expect(dt.selector).to.equal("#mytable");
        });

        it("Should set sortAscending property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert sortAscending property is correct
            expect(dt.sortAscending).to.equal(null);
        });

        it("Should set sortIndex property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert sortIndex property is correct
            expect(dt.sortIndex).to.equal(null);
        });

        it("Should set properties to default values if options is undefined", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert properties are correct
            expect(dt.body).to.deep.equal([]);
            expect(dt.headers).to.deep.equal([]);
            expect(dt.isSortable).to.be.false;
        });

        it("Should set properties to default values if options is empty", function() {
            // Create table
            let dt = new DataTable("#mytable", {});

            // Assert properties are correct
            expect(dt.body).to.deep.equal([]);
            expect(dt.headers).to.deep.equal([]);
            expect(dt.isSortable).to.be.false;
        });

        it("Should set properties to values in options parameter", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["a", "b", "c"],
                body: [
                    ["a1", "b1", "c1"],
                    ["a2", "b2", "c2"],
                    ["a3", "b3", "c3"]
                ],
                sortable: true
            });

            // Assert properties are correct
            expect(dt.body).to.deep.equal([
                ["a1", "b1", "c1"],
                ["a2", "b2", "c2"],
                ["a3", "b3", "c3"]
            ]);
            expect(dt.headers).to.deep.equal(["a", "b", "c"]);
            expect(dt.isSortable).to.be.true;
        });
    });

    describe("body property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change body
            dt.body = [["a1", "b1"], ["a2", "b2"]];

            // Assert body not set
            expect(dt.body).to.deep.equal([]);
        });
    });

    describe("headers property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change headers
            dt.headers = ["header 1", "header 2"];

            // Assert headers not set
            expect(dt.headers).to.deep.equal([]);
        });
    });

    describe("isSortable property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set isSortable
                dt.isSortable = true;

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert isSortable is correct
                expect(dt.isSortable).to.be.true;
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("searchQuery property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change searchQuery
            dt.searchQuery = "query2";

            // Assert searchQuery not set
            expect(dt.searchQuery).to.equal("");
        });
    });

    describe("selector property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change selector
            dt.selector = "#mytable2";

            // Assert selector not set
            expect(dt.selector).to.equal("#mytable");
        });
    });

    describe("sortAscending property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change sortAscending
            dt.sortAscending = false;

            // Assert sortAscending not set
            expect(dt.sortAscending).to.equal(null);
        });
    });

    describe("sortIndex property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change sortIndex
            dt.sortIndex = 2;

            // Assert sortIndex not set
            expect(dt.sortIndex).to.equal(null);
        });
    });

    describe("version static property", function() {
        it("Should be equal to the version in package.json", function() {
            expect(DataTable.version).to.equal(require("../package.json").version);
        })
    });

    describe("render method", function() {
        it("Should create basic table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                headers: ["h1", "h2", "h3"],
                body: [
                    ["a1", "b1", "c1"],
                    ["a2", "b2", "c2"],
                    ["a3", "b3", "c3"],
                ]
            });

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>h1</th>
                        <th>h2</th>
                        <th>h3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>a1</td>
                        <td>b1</td>
                        <td>c1</td>
                    </tr>
                    <tr>
                        <td>a2</td>
                        <td>b2</td>
                        <td>c2</td>
                    </tr>
                    <tr>
                        <td>a3</td>
                        <td>b3</td>
                        <td>c3</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create table without headers correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                body: [
                    ["a1", "b1", "c1"],
                    ["a2", "b2", "c2"],
                    ["a3", "b3", "c3"],
                ],
            });

            // Assert table is correct
            let expected = `
            <table>
                <tbody>
                    <tr>
                        <td>a1</td>
                        <td>b1</td>
                        <td>c1</td>
                    </tr>
                    <tr>
                        <td>a2</td>
                        <td>b2</td>
                        <td>c2</td>
                    </tr>
                    <tr>
                        <td>a3</td>
                        <td>b3</td>
                        <td>c3</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create table without body correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                headers: ["h1", "h2", "h3"],
            });

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>h1</th>
                        <th>h2</th>
                        <th>h3</th>
                    </tr>
                </thead>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create empty table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable");

            // Assert table is correct
            let expected = `
            <table>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should add sorting controls if isSortable is true", function() {
            // Create table (calls render method)
            let dt = new DataTable("#mytable", {
                headers: ["One", "Two"],
                sortable: true
            });

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>
                            One
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-updown"><polyline points="15 10 12 6 9 10 15 10"></polyline><polyline points="15 14 12 18 9 14 15 14"></polyline></svg>
                            </button>
                        </th>
                        <th>
                            Two
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-updown"><polyline points="15 10 12 6 9 10 15 10"></polyline><polyline points="15 14 12 18 9 14 15 14"></polyline></svg>
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);

            // Sort table ascending (calls render method)
            dt.sort(0, true);

            // Assert table is correct
            expected = `
            <table>
                <thead>
                    <tr>
                        <th>
                            One
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-up"><polyline points="18 16 12 8 6 16 18 16"></polyline></svg>
                            </button>
                        </th>
                        <th>
                            Two
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-updown"><polyline points="15 10 12 6 9 10 15 10"></polyline><polyline points="15 14 12 18 9 14 15 14"></polyline></svg>
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);

            // Sort table descending (calls render method)
            dt.sort(0, false);

            // Assert table is correct
            expected = `
            <table>
                <thead>
                    <tr>
                        <th>
                            One
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-down"><polyline points="18 8 12 16 6 8 18 8"></polyline></svg>
                            </button>
                        </th>
                        <th>
                            Two
                            <button>
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="data-table-updown"><polyline points="15 10 12 6 9 10 15 10"></polyline><polyline points="15 14 12 18 9 14 15 14"></polyline></svg>
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });
    });

    describe("search method", function() {
        it("Should correctly show and hide rows", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Call search method
            dt.search("or");

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjado</td>
                    </tr>
                    <tr>
                        <td>Purple</td>
                        <td>Morado</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should show all rows if query is empty", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Search for a string that doesn't exist to hide rows
            dt.search("x");

            // Call search method with empty query
            dt.search("");

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Red</td>
                        <td>Rojo</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjado</td>
                    </tr>
                    <tr>
                        <td>Yellow</td>
                        <td>Amarillo</td>
                    </tr>
                    <tr>
                        <td>Green</td>
                        <td>Verde</td>
                    </tr>
                    <tr>
                        <td>Blue</td>
                        <td>Azúl</td>
                    </tr>
                    <tr>
                        <td>Purple</td>
                        <td>Morado</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should update searchQuery property", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Call search method
            dt.search("or");

            // Assert searchQuery is correct
            expect(dt.searchQuery).to.equal("or");
        });
    });

    describe("setBody method", function() {
        it("Should call render method", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Call setBody method
                dt.setBody([["a1", "b1", "c1"]]);

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert body property was updated
                expect(dt.body).to.deep.equal([["a1", "b1", "c1"]]);
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });

        it("Should not modify search query or sort properties", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Sort and filter table
            dt.search("or");
            dt.sort(1, false);

            // Call setBody method
            dt.setBody([
                ["Red",     "Roja"],
                ["Orange",  "Anaranjada"],
                ["Yellow",  "Amarilla"],
                ["Green",   "Verde"],
                ["Blue",    "Azúl"],
                ["Purple",  "Morada"]
            ]);

            // Assert search query and sort properties are correct
            expect(dt.searchQuery).to.equal("or");
            expect(dt.sortIndex).to.equal(1);
            expect(dt.sortAscending).to.be.false;

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Purple</td>
                        <td>Morada</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjada</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });
    });

    describe("setHeaders method", function() {
        it("Should call render method", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Call setHeaders method
                dt.setHeaders(["a", "b", "c"]);

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert headers property was updated
                expect(dt.headers).to.deep.equal(["a", "b", "c"]);
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });

        it("Should not modify search query or sort properties", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Sort and filter table
            dt.search("or");
            dt.sort(1, false);

            // Call setHeaders method
            dt.setHeaders(["English", "Español"]);

            // Assert search query and sort properties are correct
            expect(dt.searchQuery).to.equal("or");
            expect(dt.sortIndex).to.equal(1);
            expect(dt.sortAscending).to.be.false;

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Español</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Purple</td>
                        <td>Morado</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjado</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });
    });

    describe("sort method", function() {
        it("Should correctly sort table", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Sort tables
            dt.sort(1, false);

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Green</td>
                        <td>Verde</td>
                    </tr>
                    <tr>
                        <td>Red</td>
                        <td>Rojo</td>
                    </tr>
                    <tr>
                        <td>Purple</td>
                        <td>Morado</td>
                    </tr>
                    <tr>
                        <td>Blue</td>
                        <td>Azúl</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjado</td>
                    </tr>
                    <tr>
                        <td>Yellow</td>
                        <td>Amarillo</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);

            // Assert sort properties are correct
            expect(dt.sortIndex).to.equal(1);
            expect(dt.sortAscending).to.be.false;
        });

        it("Should reset order if the ascending parameter is null", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ]
            });

            // Sort tables
            dt.sort(1, true);

            // Reset order
            dt.sort(1, null);

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Red</td>
                        <td>Rojo</td>
                    </tr>
                    <tr>
                        <td>Orange</td>
                        <td>Anaranjado</td>
                    </tr>
                    <tr>
                        <td>Yellow</td>
                        <td>Amarillo</td>
                    </tr>
                    <tr>
                        <td>Green</td>
                        <td>Verde</td>
                    </tr>
                    <tr>
                        <td>Blue</td>
                        <td>Azúl</td>
                    </tr>
                    <tr>
                        <td>Purple</td>
                        <td>Morado</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);

            // Assert sort properties are correct
            expect(dt.sortIndex).to.equal(null);
            expect(dt.sortAscending).to.equal(null);
        });
    });
});
