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
        it("Should set selector property", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert selector property is correct
            expect(dt.selector).to.equal("#mytable");
        });

        it("Should set properties to default values if options is undefined", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Assert properties are correct
            expect(dt.data).to.deep.equal([]);
            expect(dt.headers).to.deep.equal([]);
        });

        it("Should set properties to default values if options is empty", function() {
            // Create table
            let dt = new DataTable("#mytable", {});

            // Assert properties are correct
            expect(dt.data).to.deep.equal([]);
            expect(dt.headers).to.deep.equal([]);
        });

        it("Should set properties to values in options parameter", function() {
            // Create table
            let dt = new DataTable("#mytable", {
                headers: ["a", "b", "c"],
                data: [
                    ["a1", "b1", "c1"],
                    ["a2", "b2", "c2"],
                    ["a3", "b3", "c3"]
                ]
            });

            // Assert properties are correct
            expect(dt.data).to.deep.equal([
                ["a1", "b1", "c1"],
                ["a2", "b2", "c2"],
                ["a3", "b3", "c3"]
            ]);
            expect(dt.headers).to.deep.equal(["a", "b", "c"]);
        });
    });

    describe("Data property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set data property
                dt.data = [["a1", "b1", "c1"]];

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert data property is correct
                expect(dt.data).to.deep.equal([["a1", "b1", "c1"]]);
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("Headers property", function() {
        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Mock DataTable.render method
            let render = sinon.stub(dt, "render");

            try {
                // Set headers property
                dt.headers = ["a", "b", "c"];

                // Assert DataTable.render called
                expect(render.calledOnce).to.be.true;

                // Assert headers property is correct
                expect(dt.headers).to.deep.equal(["a", "b", "c"]);
            }
            finally {
                // Restore DataTable.render method
                render.restore();
            }
        });
    });

    describe("Selector property", function() {
        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable");

            // Attempt to change selector
            dt.selector = "#mytable2";

            // Assert selector property not set
            expect(dt.selector).to.equal("#mytable");
        });
    });

    describe("Version static property", function() {
        it("Should be equal to the version in package.json", function() {
            expect(DataTable.version).to.equal(require("../package.json").version);
        })
    });

    describe("Render method", function() {
        it("Should create basic table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                headers: ["h1", "h2", "h3"],
                data: [
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
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create table without headers correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", {
                data: [
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
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create table without data correctly", function() {
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
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create empty table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable");

            // Assert table is correct
            let expected = `
            <table>
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });
    });
});
