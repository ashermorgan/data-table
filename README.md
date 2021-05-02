# data-table
A JavaScript library that creates HTML tables



## Demos
Demos of data-table are available [here](https://ashermorgan.github.io/data-table/demos)



## Getting Started
1. Download `data-table.min.css` and `data-table.min.js` from the [releases page](https://github.com/ashermorgan/data-table/releases) or the [dist directory](https://github.com/ashermorgan/data-table/tree/master/dist)

2. Add `data-table.min.css` and `data-table.min.js` to your project
    ```HTML
    <link rel="stylesheet" href="data-table.min.css">
    <script src="data-table.min.js"></script>
    ```

3. Add an empty div to contain the table
    ```HTML
    <div id="mytable">
    ```

4. Create the table using the `DataTable` constructor
    ```JS
    new DataTable("#mytable", {
        body: [
            ["a1", "a2", "a3"],
            ["b1", "b2", "b3"],
            ["c1", "c2", "c3"]
        ]
    });
    ```



## Documentation
### Constructor
Creates a new table. This method takes two arguments, `selector` and `options`.
`selector` is the table selector string and `options` is an object that contains the table options (see below). If no value is provided for an option, the default value will be used.

Available options:
- `body`
- `bodyClasses`
- `bodyEventHandlers`
- `downIcon`
- `headers`
- `headerClasses`
- `headerEventHandlers`
- `sortable`
- `searchQuery`
- `sortAscending`
- `sortIndex`
- `unsortable`
- `upIcon`
- `updownIcon`

```JS
let myTable = new DataTable("#my-selector", {
    body: [["a1", "b1"], ["a2", "b2"]],
    bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]],
    bodyEventHandlers: { click: (row, column, args) => {} },
    headers: ["header 1", "header 2"],
    headerClasses: ["class-1", "class-2"],
    headerEventHandlers: { click: (column, args) => {} },
    sortable: true,
    searchQuery: "my query",
    sortAscending: false,
    sortIndex: 1,
    unsortable: false
});
console.log(myTable.selector);             // "#my-selector"
console.log(myTable.body);                 // [["a1", "b1"], ["a2", "b2"]]
console.log(myTable.bodyClasses);          // [["class-1", "class-2"], ["class-2", "class-1"]]
console.log(myTable.bodyEventHandlers);    // { click: click(row, column, args) }
console.log(myTable.headers);              // ["header 1", "header 2"]
console.log(myTable.headerClasses);        // ["class-1", "class-2"]
console.log(myTable.headerEventHandlers);  // { click: click(column, args) }
console.log(myTable.sortable);             // true
console.log(myTable.searchQuery);          // "my query"
console.log(myTable.sortAscending);        // false
console.log(myTable.sortIndex);            // 1
console.log(myTable.unsortable);           // false
```


### Properties
#### body
A two dimensional array that contains the table body data. This property cannot be modified directly, use the `setData` method instead. The default value is an empty array (`[]`).
```JS
let myTable = new DataTable("#my-selector", {
    body: [["a1", "b1"], ["a2", "b2"]]
});
console.log(myTable.body);  // [["a1", "b1"], ["a2", "b2"]]
myTable.setData({
    body: [["a3", "b3"], ["a4", "b4"]]
});
console.log(myTable.body);  // [["a3", "b3"], ["a4", "b4"]]
```

#### bodyClasses
A two dimensional array that contains classes for the table body data. Classes allow you to apply different CSS styles to different body cells. `bodyClasses` should have the same dimensions as `body`. If `bodyClasses` is `null`, no classes will be added. This property cannot be modified directly, use the `setData` method instead. The default value is `null`.
```JS
let myTable = new DataTable("#my-selector", {
    body: [["a1", "b1"], ["a2", "b2"]],
    bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]]
});
console.log(myTable.bodyClasses);  // [["class-1", "class-2"], ["class-2", "class-1"]]
myTable.setData({
    bodyClasses: [["class-3", "class-4"], ["class-4", "class-3"]]
});
console.log(myTable.bodyClasses);  // [["class-3", "class-4"], ["class-4", "class-3"]]
```

#### bodyEventHandlers
An object that contains event handlers for table body events. This property cannot be modified. The default value is an empty dictionary (`{}`).
```JS
let myTable = new DataTable("#my-selector", {
    bodyEventHandlers: { click: (row, column, args) => {} }
});
console.log(myTable.bodyEventHandlers);  // { click: click(row, column, args) }
```

#### downIcon
A string containing the HTML code for the down icon, which is used to help the user sort the table.
```JS
let myTable = new DataTable("#my-selector", {
    downIcon: `<img src="my-image-1.png">`
});
console.log(myTable.downIcon);  // "<img src=\"my-image-1.png\">"
myTable.downIcon = `<img src="my-image-2.png">`;
console.log(myTable.downIcon);  // "<img src=\"my-image-2.png\">"
```

#### headers
An array that contains the table headers. This property cannot be modified directly, use the `setData` method instead. The default value is an empty array (`[]`).
```JS
let myTable = new DataTable("#my-selector", {
    headers: ["header 1", "header 2"]
});
console.log(myTable.headers);  // ["header 1", "header 2"]
myTable.setData({
    headers: ["header 3", "header 4"]
});
console.log(myTable.headers);  // ["header 3", "header 4"]
```

#### headerClasses
An array that contains classes for the table headers. Classes allow you to apply different CSS styles to different headers. `headerClasses` should be the same length as `headers`. If `headerClasses` is `null`, no classes will be added. This property cannot be modified directly, use the `setData` method instead. The default value is `null`.
```JS
let myTable = new DataTable("#my-selector", {
    headers: ["header 1", "header 2"],
    headerClasses: ["class-1", "class-2"]
});
console.log(myTable.headerClasses);  // ["class-1", "class-2"]
myTable.setData({
    headerClasses: ["class-3", "class-4"]
});
console.log(myTable.headerClasses);  // ["class-3", "class-4"]
```

#### headerEventHandlers
An object that contains event handlers for table header events. This property cannot be modified. The default value is an empty dictionary (`{}`).
```JS
let myTable = new DataTable("#my-selector", {
    headerEventHandlers: { click: (column, args) => {} }
});
console.log(myTable.headerEventHandlers);  // { click: click(column, args) }
```

#### sortable
A boolean that indicates whether the table can currently be sorted by the user. The default value is `false`.
```JS
let myTable = new DataTable("#my-selector", {
    sortable: true,
});
console.log(myTable.sortable);  // true
myTable.sortable = false;
console.log(myTable.sortable);  // false
```

#### searchQuery
A string that contains the current search query. This property is set by the `search` method and cannot be modified directly. The default value is an empty string (`""`).
```JS
let myTable = new DataTable("#my-selector", {
    searchQuery: "my query #1"
});
console.log(myTable.searchQuery);  // "my query #1"
myTable.search("my query #2");
console.log(myTable.searchQuery);  // "my query #2"
```

#### selector
A string that contains the table selector. This property cannot be modified.
```JS
let myTable = new DataTable("#my-selector");
console.log(myTable.selector);  // "#my-selector"
```

#### sortAscending
A boolean that indicates whether the table is currently sorted in ascending order. If the table isn't sorted, it will be `null`. This property is set by the `sort` method and cannot be modified directly. The default value is `null`.
```JS
let myTable = new DataTable("#my-selector", {
    sortAscending: true
    sortIndex: 1,
});
console.log(myTable.sortAscending);  // true
myTable.sort(2, false);
console.log(myTable.sortAscending);  // false
```

#### sortIndex
The (zero-based) index of the column that the table is currently sorted by. If the table isn't sorted, it will be `null`. This property is set by the `sort` method and cannot be modified directly. The default value is `null`.
```JS
let myTable = new DataTable("#my-selector", {
    sortAscending: true,
    sortIndex: 1
});
console.log(myTable.sortIndex);  // 1
myTable.sort(2, false);
console.log(myTable.sortIndex);  // 2
```

#### unsortable
A boolean that indicates whether the table order can currently be reset by the user. This property has no effect when `sortable` is `false`. The default value is `true`.
```JS
let myTable = new DataTable("#my-selector", {
    unsortable: false
});
console.log(myTable.unsortable);  // false
myTable.unsortable = true;
console.log(myTable.unsortable);  // true
```

#### upIcon
A string containing the HTML code for the up icon, which is used to help the user sort the table.
```JS
let myTable = new DataTable("#my-selector", {
    upIcon: `<img src="my-image-1.png">`
});
console.log(myTable.upIcon);  // "<img src=\"my-image-1.png\">"
myTable.upIcon = `<img src="my-image-2.png">`;
console.log(myTable.upIcon);  // "<img src=\"my-image-2.png\">"
```

#### updownIcon
A string containing the HTML code for the updown icon, which is used to help the user sort the table.
```JS
let myTable = new DataTable("#my-selector", {
    updownIcon: `<img src="my-image-1.png">`
});
console.log(myTable.updownIcon);  // "<img src=\"my-image-1.png\">"
myTable.updownIcon = `<img src="my-image-2.png">`;
console.log(myTable.updownIcon);  // "<img src=\"my-image-2.png\">"
```

#### version
The current library version. This is a static property and cannot be modified.
```JS
console.log(DataTable.version);  // "0.2.0"
```


### Methods
#### render
Renders the table. This method doesn't take any arguments.
If there is already content inside the table it will be overwritten.
NOTE: The table will be rendered automatically on initialization and whenever its properties are modified.
```JS
let myTable = new DataTable("#my-selector");
myTable.render();
```

#### search
Searches for a query in the table and hides rows that do not contain a match. This method takes one argument: `query`. If the query is an empty string, all rows will be shown. This method sets the `searchQuery` property.
```JS
let myTable = new DataTable("#my-selector");
myTable.search("my query");
console.log(myTable.searchQuery);  // "my query"
```

#### setData
Sets the table data properties (`body`, `bodyClasses`, `headers`, and `headerClasses`). This method takes one argument: `value`. `value` is an object that can contain values for any of the data properties. If no value is provided for a property, it will not be modified.
```JS
let myTable = new DataTable("#my-selector");
myTable.setData({
    body: [["a1", "b1"], ["a2", "b2"]],
    bodyClasses: [["class-1", "class-2"], ["class-2", "class-1"]],
    headers: ["header 1", "header 2"],
    headerClasses: ["class-1", "class-2"]
});
console.log(myTable.body);           // [["a1", "b1"], ["a2", "b2"]]
console.log(myTable.bodyClasses);    // [["class-1", "class-2"], ["class-2", "class-1"]]
console.log(myTable.headers);        // ["header 1", "header 2"]
console.log(myTable.headerClasses);  // ["class-1", "class-2"]
```

#### sort
Sorts the table by the values in a column. This method takes two arguments: `index` and `ascending`. `index` is the (zero-based) index of the column to sort by and `ascending` is whether to sort in ascending order. If `ascending` is `null`, the original table ordering will be restored. This method sets the `sortIndex` and `sortAscending` properties.
```JS
let myTable = new DataTable("#my-selector");
myTable.sort(2, false);
console.log(myTable.sortIndex);      // 2
console.log(myTable.sortAscending);  // false
```
