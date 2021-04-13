# data-table
A JavaScript library that creates HTML tables



## Demos
Demos of data-table are avilable [here](https://ashermorgan.github.io/data-table/demos)



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
`selector` is the table selector string and `options` is an object that contains the table settings (see below). If no value is provided for an option, the default value will be used.

#### body
A two dimensional array that contains the table body data. The default value is an empty array.
```JS
let myDataTable = new DataTable("#selector", {
    body: [
        ["a1", "b1"],
        ["a2", "b2"]
    ]
});
```

#### headers
An array that contains the table headers. The default value is an empty array.
```JS
let myDataTable = new DataTable("#selector", {
    headers: ["header 1", "header 2"]
});
```


### Properties
#### body
A two dimensional array that contains the table body data.
The table will update automatically when this property is modified.
```JS
let myDataTable = new DataTable("#selector", { body: [["a1", "b1"], ["a2", "b2"]] });
console.log(myDataTable.body);  // [["a1", "b1"], ["a2", "b2"]]
myDataTable.body = [["c3", "d3"], ["c4", "d4"]];
```

#### headers
An array that contains the table headers.
The table will update automatically when this property is modified.
```JS
let myDataTable = new DataTable("#selector", { headers: ["header 1", "header 2"] });
console.log(myDataTable.headers);  // ["header 1", "header 2"]
myDataTable.headers = ["header 3", "header 4"];
```

#### selector
A string that contains the table selector. This property cannot be modified.
```JS
let myDataTable = new DataTable("#selector");
console.log(myDataTable.selector);  // "#selector"
```

#### version
The current library version. This is a static property and cannot be modified.
```JS
console.log(DataTable.version);  // "0.1.0"
```


### Methods
#### render
Renders the table. This method doesn't take any arguments.
If there is already content inside the table it will be overwritten.
NOTE: The table will be rendered automatically on initialization and whenever the `body` and `headers` properties are modified.
```JS
let myDataTable = new DataTable("#selector");
myDataTable.render()
```
