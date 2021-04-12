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

    describe("Data property", function() {
        it("Should be equal to the table data", function() {
            // Create table
            let data = [
                ["a1", "b1", "c1"],
                ["a2", "b2", "c2"],
                ["a3", "b3", "c3"],
            ];
            let dt = new DataTable("#mytable", data);

            // Assert data property is correct
            expect(dt.data).to.equal(data);
        });

        it("Should call render method when updated", function() {
            // Create table
            let dt = new DataTable("#mytable", []);
            
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

    describe("Selector property", function() {
        it("Should be equal to the table selector", function() {
            // Create table
            let dt = new DataTable("#mytable", []);

            // Assert selector property is correct
            expect(dt.selector).to.equal("#mytable");
        });

        it("Should not be changeable", function() {
            // Create table
            let dt = new DataTable("#mytable", []);

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
            new DataTable("#mytable", [
                ["a1", "b1", "c1"],
                ["a2", "b2", "c2"],
                ["a3", "b3", "c3"],
            ]);

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>a1</th>
                        <th>b1</th>
                        <th>c1</th>
                    </tr>
                </thead>
                <tbody>
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

        it("Should create single row table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", [
                ["a1", "b1", "c1"],
            ]);

            // Assert table is correct
            let expected = `
            <table>
                <thead>
                    <tr>
                        <th>a1</th>
                        <th>b1</th>
                        <th>c1</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });

        it("Should create empty table correctly", function() {
            // Create table (calls render method)
            new DataTable("#mytable", []);

            // Assert table is correct
            let expected = `
            <table>
                <tbody>
                </tbody>
            </table>`.replace(/\s/g, "");
            expect(global.document.querySelector("div.data-table").innerHTML).to.equal(expected);
        });
    });
});
