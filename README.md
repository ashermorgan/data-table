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
    let data = [
        ["a1", "a2", "a3"],
        ["b1", "b2", "b3"],
        ["c1", "c2", "c3"]
    ];
    new DataTable("#mytable", data);
    ```



## Documentation
### Constructor
Creates a new table. This method takes two arguments, `selector` and `data`.
`selector` is the table selector string and `data` is a two dimensional array that contains the table data.
```JS
let myDataTable = new DataTable("#selector", [["a1", "b1"], ["a2", "b2"]]);
```


### Properties
#### data
A two dimensional array that contains the table data.
The table will update automatically when this property is modified.
```JS
let data = [["a1", "b1"], ["a2", "b2"]];
let myDataTable = new DataTable("#selector", data);
console.log(myDataTable.data);  // [["a1", "b1"], ["a2", "b2"]]
myDataTable.data = [["c3", "d3"], ["c4", "d4"]];
```

#### selector
A string that contains the table selector. This property cannot be modified.
```JS
let myDataTable = new DataTable("#selector", data);
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
NOTE: The table will be rendered automatically on initialization and whenever the `data` property is modified.
```JS
let myDataTable = new DataTable("#selector", data);
myDataTable.render()
```
