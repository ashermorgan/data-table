/**
 * Create a data-table demo
 * @param {String} selector The element to create the demo in
 * @param {String} title The demo title
 * @param {String} html The demo HTML
 * @param {String} js The demo JS
 * @param {String} css The demo CSS
 */
function createDemo(selector, title, html, js, css) {
    let result = "";
    if (title) result += `<h1>${title}</h1>`;
    else result += "<h1>data-table.js demo</h1>"
    result += `<a href="./">View all demos</a>`
    if (html) result += `<h2>HTML</h2><code>${format(html)}</code>`
    if (js) result += `<h2>JS</h2><code>${format(js)}</code>`
    if (css) result += `<h2>CSS</h2><code>${format(css)}</code>`
    result += `<h2>Result</h2><style>${css}</style>${html}`;
    document.querySelector(selector).innerHTML = result;
    eval(js);
}



/**
 * Format a string for use in an HTML element
 * @param {String} string The raw string
 * @returns {String} The formated string
 */
function format(string) {
    // Escape HTML characters
    string = string.replaceAll("&", "&amp;");
    string = string.replaceAll("<", "&lt;");
    string = string.replaceAll(">", "&gt;");

    // Format whitespace
    string = string.replace(/^\n/, "");
    string = string.replaceAll("\n", "<br>");
    string = string.replaceAll("\t", "&emsp;");

    // Simplify JS and CSS urls
    string = string.replaceAll("src=\"..\/dist\/data-table.min.js\"", "src=\"data-table.min.js\"");
    string = string.replaceAll("href=\"..\/dist\/data-table.min.css\"", "href=\"data-table.min.css\"");

    // Return formated string
    return string;
}
