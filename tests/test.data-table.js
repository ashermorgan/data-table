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
        it("Should not set properties if options is undefined", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert properties are correct
            expect(dt.body).to.deep.equal([]);
            expect(dt.bodyClasses).to.be.null;
            expect(dt.bodyEventHandlers).to.deep.equal({});
            expect(dt.headers).to.deep.equal([]);
            expect(dt.headerClasses).to.be.null;
            expect(dt.headerEventHandlers).to.deep.equal({});
            expect(dt.sortable).to.be.false;
            expect(dt.searchQuery).to.equal("");
            expect(dt.sortAscending).to.be.null;
            expect(dt.sortIndex).to.be.null;
            expect(dt.unsortable).to.be.true;
        });

        it("Should not set properties if options is empty", function() {
            // Create table
            let dt = new DataTable("#mytable", {});

            // Assert properties are correct
            expect(dt.body).to.deep.equal([]);
            expect(dt.bodyClasses).to.be.null;
            expect(dt.bodyEventHandlers).to.deep.equal({});
            expect(dt.headers).to.deep.equal([]);
            expect(dt.headerClasses).to.be.null;
            expect(dt.headerEventHandlers).to.deep.equal({});
            expect(dt.sortable).to.be.false;
            expect(dt.searchQuery).to.equal("");
            expect(dt.sortAscending).to.be.null;
            expect(dt.sortIndex).to.be.null;
            expect(dt.unsortable).to.be.true;
        });

        it("Should set properties to values in options parameter", function() {
            // Declare table event handlers
            let bodyEventHandler = function(row, column, args) {};
            let headerEventHandler = function(column, args) {};

            // Create table
            let dt = new DataTable("#mytable", {
                body: [["a1", "b1"], ["a2", "b2"]],
                bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]],
                bodyEventHandlers: { click: bodyEventHandler },
                downIcon: "down-icon HTML",
                headers: ["header 1", "header 2"],
                headerClasses: ["class-1", "class-2"],
                headerEventHandlers: { click: headerEventHandler },
                sortable: true,
                searchQuery: "my query",
                sortAscending: false,
                sortIndex: 1,
                unsortable: false,
                upIcon: "up-icon HTML",
                updownIcon: "up-down-icon HTML"
            });

            // Assert properties are correct
            expect(dt.body).to.deep.equal([["a1", "b1"], ["a2", "b2"]]);
            expect(dt.bodyClasses).to.deep.equal([["class-1", "class-2"], ["class-2", "class-1"]]);
            expect(dt.bodyEventHandlers).to.deep.equal({ click: bodyEventHandler });
            expect(dt.downIcon).to.equal("down-icon HTML");
            expect(dt.headers).to.deep.equal(["header 1", "header 2"]);
            expect(dt.headerClasses).to.deep.equal(["class-1", "class-2"]);
            expect(dt.headerEventHandlers).to.deep.equal({ click: headerEventHandler });
            expect(dt.sortable).to.be.true;
            expect(dt.searchQuery).to.equal("my query");
            expect(dt.sortAscending).to.be.false;
            expect(dt.sortIndex).to.equal(1);
            expect(dt.unsortable).to.be.false;
            expect(dt.upIcon).to.equal("up-icon HTML");
            expect(dt.updownIcon).to.equal("up-down-icon HTML");
        });
    });

    describe("body property", function() {
        it("Should be empty by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert body is correct
            expect(dt.body).to.deep.equal([]);
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change body
            dt.body = [["a1", "b1"], ["a2", "b2"]];

            // Assert body not set
            expect(dt.body).to.deep.equal([]);
        });
    });

    describe("bodyClasses property", function() {
        it("Should be null by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert bodyClasses is correct
            expect(dt.bodyClasses).to.be.null;
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change bodyClasses
            dt.bodyClasses = [["class-1", "class-2"], ["class-2", "class-1"]];

            // Assert bodyClasses not set
            expect(dt.bodyClasses).to.be.null;
        });
    });

    describe("bodyEventHandlers property", function() {
        it("Should be empty by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert bodyEventHandlers is correct
            expect(dt.bodyEventHandlers).to.deep.equal({});
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change bodyEventHandlers
            dt.bodyEventHandlers = { click: (row, column, args) => {} };

            // Assert bodyEventHandlers not set
            expect(dt.bodyEventHandlers).to.deep.equal({});
        });
    });

    describe("downIcon property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set downIcon
                dt.downIcon = "<svg></svg>";

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert downIcon is correct
                expect(dt.downIcon).to.equal("<svg></svg>");
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("headers property", function() {
        it("Should be empty by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert headers is correct
            expect(dt.headers).to.deep.equal([]);
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change headers
            dt.headers = ["header 1", "header 2"];

            // Assert headers not set
            expect(dt.headers).to.deep.equal([]);
        });
    });

    describe("headerClasses property", function() {
        it("Should be null by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert headerClasses is correct
            expect(dt.headerClasses).to.be.null;
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change headerClasses
            dt.headerClasses = ["class-1", "class-2"];

            // Assert headerClasses not set
            expect(dt.headerClasses).to.be.null;
        });
    });

    describe("headerEventHandlers property", function() {
        it("Should be empty by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert headerEventHandlers is correct
            expect(dt.headerEventHandlers).to.deep.equal({});
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change headerEventHandlers
            dt.headerEventHandlers = { click: (column, args) => {} };

            // Assert headerEventHandlers not set
            expect(dt.headerEventHandlers).to.deep.equal({});
        });
    });

    describe("sortable property", function() {
        it("Should be false by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert sortable is correct
            expect(dt.sortable).to.be.false;
        });

        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set sortable
                dt.sortable = true;

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert sortable is correct
                expect(dt.sortable).to.be.true;
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("searchQuery property", function() {
        it("Should be empty by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert searchQuery is correct
            expect(dt.searchQuery).to.equal("");
        });

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
        it("Should be null by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert sortAscending is correct
            expect(dt.sortAscending).to.be.null;
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change sortAscending
            dt.sortAscending = false;

            // Assert sortAscending not set
            expect(dt.sortAscending).to.be.null;
        });
    });

    describe("sortIndex property", function() {
        it("Should be null by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert sortIndex is correct
            expect(dt.sortIndex).to.be.null;
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change sortIndex
            dt.sortIndex = 2;

            // Assert sortIndex not set
            expect(dt.sortIndex).to.be.null;
        });
    });

    describe("upIcon property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set upIcon
                dt.upIcon = "<svg></svg>";

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert upIcon is correct
                expect(dt.upIcon).to.equal("<svg></svg>");
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("updownIcon property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set updownIcon
                dt.updownIcon = "<svg></svg>";

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert updownIcon is correct
                expect(dt.updownIcon).to.equal("<svg></svg>");
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("unsortable property", function() {
        it("Should be true by default", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert unsortable is correct
            expect(dt.unsortable).to.be.true;
        });

        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set unsortable
                dt.unsortable = false;

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert unsortable is correct
                expect(dt.unsortable).to.be.false;
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("version static property", function() {
        it("Should be equal to the version in package.json", function() {
            expect(DataTable.version).to.equal(require("../package.json").version);
        });

        it("Should not be changeable", function() {
            // Attempt to change version
            DataTable.version = 2;

            // Assert version not set
            expect(DataTable.version).to.equal(require("../package.json").version);
        });
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
                        <th class="">h1</th>
                        <th class="">h2</th>
                        <th class="">h3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="">a1</td>
                        <td class="">b1</td>
                        <td class="">c1</td>
                    </tr>
                    <tr>
                        <td class="">a2</td>
                        <td class="">b2</td>
                        <td class="">c2</td>
                    </tr>
                    <tr>
                        <td class="">a3</td>
                        <td class="">b3</td>
                        <td class="">c3</td>
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
                        <td class="">a1</td>
                        <td class="">b1</td>
                        <td class="">c1</td>
                    </tr>
                    <tr>
                        <td class="">a2</td>
                        <td class="">b2</td>
                        <td class="">c2</td>
                    </tr>
                    <tr>
                        <td class="">a3</td>
                        <td class="">b3</td>
                        <td class="">c3</td>
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
                        <th class="">h1</th>
                        <th class="">h2</th>
                        <th class="">h3</th>
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

        it("Should add sorting controls if sortable is true", function() {
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
                        <th class="">
                            One
                            <button>
                                ${dt.updownIcon}
                            </button>
                        </th>
                        <th class="">
                            Two
                            <button>
                                ${dt.updownIcon}
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
                        <th class="">
                            One
                            <button>
                                ${dt.upIcon}
                            </button>
                        </th>
                        <th class="">
                            Two
                            <button>
                                ${dt.updownIcon}
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
                        <th class="">
                            One
                            <button>
                                ${dt.downIcon}
                            </button>
                        </th>
                        <th class="">
                            Two
                            <button>
                                ${dt.updownIcon}
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should add body classes if bodyClasses is not null", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                body: [["a1", "b1"], ["a2", "b2"]],
                bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]]
            });

            // Assert table is correct
            let expected = `
            <table>
                <tbody>
                    <tr>
                        <td class="class-1">a1</td>
                        <td class="class-2">b1</td>
                    </tr>
                    <tr>
                        <td class="class-2">a2</td>
                        <td class="class-1">b2</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should add header classes if headerClasses is not null", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                headers: ["header 1", "header 2"],
                headerClasses: ["class-1", "class-2"]
            });

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th class="class-1">header 1</th>
                        <th class="class-2">header 2</th>
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
                        <th class="">English</th>
                        <th class="">Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr hidden="">
                        <td class="">Red</td>
                        <td class="">Rojo</td>
                    </tr>
                    <tr>
                        <td class="">Orange</td>
                        <td class="">Anaranjado</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Yellow</td>
                        <td class="">Amarillo</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Green</td>
                        <td class="">Verde</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Blue</td>
                        <td class="">Azúl</td>
                    </tr>
                    <tr>
                        <td class="">Purple</td>
                        <td class="">Morado</td>
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
                        <th class="">English</th>
                        <th class="">Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="">Red</td>
                        <td class="">Rojo</td>
                    </tr>
                    <tr>
                        <td class="">Orange</td>
                        <td class="">Anaranjado</td>
                    </tr>
                    <tr>
                        <td class="">Yellow</td>
                        <td class="">Amarillo</td>
                    </tr>
                    <tr>
                        <td class="">Green</td>
                        <td class="">Verde</td>
                    </tr>
                    <tr>
                        <td class="">Blue</td>
                        <td class="">Azúl</td>
                    </tr>
                    <tr>
                        <td class="">Purple</td>
                        <td class="">Morado</td>
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

    describe("setData method", function() {
        it("Should update data properties if a new value is provided", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Call setData method for body data only
            dt.setData({
                body: [["a1", "b1"], ["a2", "b2"]],
                bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]]
            });

            // Assert only body data properties were updated
            expect(dt.body).to.deep.equal([["a1", "b1"], ["a2", "b2"]]);
            expect(dt.bodyClasses).to.deep.equal([["class-1", "class-2"], ["class-2", "class-1"]]);
            expect(dt.headers).to.deep.equal([]);
            expect(dt.headerClasses).to.be.null;

            // Call setData method for header data only
            dt.setData({
                headers: ["header 1", "header 2"],
                headerClasses: ["class-1", "class-2"]
            });

            // Assert only header data properties were updated
            expect(dt.body).to.deep.equal([["a1", "b1"], ["a2", "b2"]]);
            expect(dt.bodyClasses).to.deep.equal([["class-1", "class-2"], ["class-2", "class-1"]]);
            expect(dt.headers).to.deep.equal(["header 1", "header 2"]);
            expect(dt.headerClasses).to.deep.equal(["class-1", "class-2"]);
        });

        it("Should not set data properties if value parameter is undefined or empty", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Call setData method without value parameter
            dt.setData();

            // Assert properties were not modified
            expect(dt.body).to.deep.equal([]);
            expect(dt.bodyClasses).to.be.null;
            expect(dt.headers).to.deep.equal([]);
            expect(dt.headerClasses).to.be.null;

            // Call setData method on empty object
            dt.setData({});

            // Assert properties were not modified
            expect(dt.body).to.deep.equal([]);
            expect(dt.bodyClasses).to.be.null;
            expect(dt.headers).to.deep.equal([]);
            expect(dt.headerClasses).to.be.null;
        });

        it("Should call render method", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Call setData method
                dt.setData();

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;
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

            // Call setData method
            dt.setData({
                headers: ["English", "Español"],
                body: [
                    ["Red",     "Roja"],
                    ["Orange",  "Anaranjada"],
                    ["Yellow",  "Amarilla"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morada"]
                ]
            });

            // Assert search query and sort properties are correct
            expect(dt.searchQuery).to.equal("or");
            expect(dt.sortIndex).to.equal(1);
            expect(dt.sortAscending).to.be.false;

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th class="">English</th>
                        <th class="">Español</th>
                    </tr>
                </thead>
                <tbody>
                    <tr hidden="">
                        <td class="">Green</td>
                        <td class="">Verde</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Red</td>
                        <td class="">Roja</td>
                    </tr>
                    <tr>
                        <td class="">Purple</td>
                        <td class="">Morada</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Blue</td>
                        <td class="">Azúl</td>
                    </tr>
                    <tr>
                        <td class="">Orange</td>
                        <td class="">Anaranjada</td>
                    </tr>
                    <tr hidden="">
                        <td class="">Yellow</td>
                        <td class="">Amarilla</td>
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
                        <th class="">English</th>
                        <th class="">Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="">Green</td>
                        <td class="">Verde</td>
                    </tr>
                    <tr>
                        <td class="">Red</td>
                        <td class="">Rojo</td>
                    </tr>
                    <tr>
                        <td class="">Purple</td>
                        <td class="">Morado</td>
                    </tr>
                    <tr>
                        <td class="">Blue</td>
                        <td class="">Azúl</td>
                    </tr>
                    <tr>
                        <td class="">Orange</td>
                        <td class="">Anaranjado</td>
                    </tr>
                    <tr>
                        <td class="">Yellow</td>
                        <td class="">Amarillo</td>
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
                        <th class="">English</th>
                        <th class="">Spanish</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="">Red</td>
                        <td class="">Rojo</td>
                    </tr>
                    <tr>
                        <td class="">Orange</td>
                        <td class="">Anaranjado</td>
                    </tr>
                    <tr>
                        <td class="">Yellow</td>
                        <td class="">Amarillo</td>
                    </tr>
                    <tr>
                        <td class="">Green</td>
                        <td class="">Verde</td>
                    </tr>
                    <tr>
                        <td class="">Blue</td>
                        <td class="">Azúl</td>
                    </tr>
                    <tr>
                        <td class="">Purple</td>
                        <td class="">Morado</td>
                    </tr>
                </tbody>
            </table>`.replace(/\n\s*/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);

            // Assert sort properties are correct
            expect(dt.sortIndex).to.be.null;
            expect(dt.sortAscending).to.be.null;
        });
    });

    describe("sort buttons", function() {
        it("Should correctly sort table when it isn't sorted", function() {
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
                ],
                sortable: true
            });

            // Mock DataTable.sort method
            let sort = sinon.stub(dt, "sort");

            try {
                // Click 1st header
                document.querySelectorAll("div.data-table th button")[0].click();

                // Assert table sorted correctly
                expect(sort.calledOnceWithExactly(0, true)).to.be.true;
            }
            finally {
                // Restore DataTable.sort method
                sort.restore();
            }
        });

        it("Should correctly sort table when it's sorted by a different column", function() {
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
                ],
                sortable: true
            });

            // Sort table by 2nd column
            dt.sort(1, true);

            // Mock DataTable.sort method
            let sort = sinon.stub(dt, "sort");

            try {
                // Click 1st header
                document.querySelectorAll("div.data-table th button")[0].click();

                // Assert table sorted correctly
                expect(sort.calledOnceWithExactly(0, true)).to.be.true;
            }
            finally {
                // Restore DataTable.sort method
                sort.restore();
            }
        });

        it("Should correctly sort table when it's sorted ascending by the same column", function() {
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
                ],
                sortable: true
            });

            // Sort table ascending by 1st column
            dt.sort(0, true);

            // Mock DataTable.sort method
            let sort = sinon.stub(dt, "sort");

            try {
                // Click 1st header
                document.querySelectorAll("div.data-table th button")[0].click();

                // Assert table sorted correctly
                expect(sort.calledOnceWithExactly(0, false)).to.be.true;
            }
            finally {
                // Restore DataTable.sort method
                sort.restore();
            }
        });

        it("Should correctly sort table when it's sorted descending by the same column and unsortable is true", function() {
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
                ],
                sortable: true
            });

            // Sort table descending by 1st column
            dt.sort(0, false);

            // Mock DataTable.sort method
            let sort = sinon.stub(dt, "sort");

            try {
                // Click 1st header
                document.querySelectorAll("div.data-table th button")[0].click();

                // Assert table sorted correctly
                expect(sort.calledOnceWithExactly(0, null)).to.be.true;
            }
            finally {
                // Restore DataTable.sort method
                sort.restore();
            }
        });

        it("Should correctly sort table when it's sorted descending by the same column and unsortable is false", function() {
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
                ],
                sortable: true,
                unsortable: false,
            });

            // Sort table descending by 1st column
            dt.sort(0, false);

            // Mock DataTable.sort method
            let sort = sinon.stub(dt, "sort");

            try {
                // Click 1st header
                document.querySelectorAll("div.data-table th button")[0].click();

                // Assert table sorted correctly
                expect(sort.calledOnceWithExactly(0, true)).to.be.true;
            }
            finally {
                // Restore DataTable.sort method
                sort.restore();
            }
        });
    });

    describe("custom body event handlers", function() {
        it("Should be called correctly", function() {
            // Create body event handler
            let calls = [];
            let bodyEventHandler = function (row, column, args) {
                calls.push({row:row, column:column});
            };

            // Create table
            new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                body: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ],
                bodyEventHandlers: { click: bodyEventHandler },
            });

            // Click cell
            document.querySelectorAll("div.data-table tbody td")[3].click();

            // Assert event handler called correctly
            expect(calls).to.deep.equal([{row: 1, column: 1}]);
        });
    });

    describe("custom header event handlers", function() {
        it("Should be called correctly", function() {
            // Create header event handler
            let calls = [];
            let headerEventHandler = function (column, args) {
                calls.push({column:column});
            };

            // Create table
            new DataTable("#mytable", {
                headers: ["English", "Spanish"],
                header: [
                    ["Red",     "Rojo"],
                    ["Orange",  "Anaranjado"],
                    ["Yellow",  "Amarillo"],
                    ["Green",   "Verde"],
                    ["Blue",    "Azúl"],
                    ["Purple",  "Morado"]
                ],
                headerEventHandlers: { click: headerEventHandler },
            });

            // Click cell
            document.querySelectorAll("div.data-table thead th")[1].click();

            // Assert event handler called correctly
            expect(calls).to.deep.equal([{column: 1}]);
        });
    });
});
