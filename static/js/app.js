// pull data from data.js
var ufo_data = data;

// refer to HTML table body
var table_body = d3.select ("tbody");

// create fxn to populate data on webpage
function push_table (table_data) {

    // clear existing data
    // get a reference to the tbody element
    var tb = document.querySelector('tbody');

    // while tb has children, remove the first one
    while (tb.childNodes.length) {
        tb.removeChild(tb.childNodes[0]);
    }

    // loop through tabledata w/ "forEach"
    table_data.forEach ((entry) => {

        // append row to table
        var row = table_body.append ("tr");
        
        // loop through each key/value in each object
        Object.entries (entry).forEach (([key, value]) => {
            
            // append cells to row, fill in text
            var cell = row.append ("td");
            cell.text (value);
        });
    });
}

// call push_table fxn to populate full table data
push_table (ufo_data);

// refer to filter input & button
var filter_form = d3.select ("form");
var filter_button = d3.select ("#filter-btn");

// create event handler for 1) hitting 'enter' after input, or 2) after clicking the button
filter_form.on ("submit", filter_func);
filter_button.on ("click", filter_func);

// define filter fxn
function filter_func () {

    // prevent page from refreshing
    d3.event.preventDefault();

    // pull input date & filter data accordingly
    var filter_input = d3.select (".form-control");
    var input_value = filter_input.property("value");
    var filtered_data = ufo_data.filter ((entry) => (entry.datetime == input_value));

    // call push_table fxn to repopulate table
    push_table (filtered_data);
};