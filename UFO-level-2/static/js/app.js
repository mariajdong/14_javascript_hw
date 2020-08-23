// pull data from data.js
var ufo_data = data;

// **1: MAIN TABLE SETUP
// refer to HTML table body
var table_body = d3.select ("tbody");

// create fxn to populate data on webpage
function push_table (table_data) {

    // clear existing table (https://stackoverflow.com/questions/48468672/delete-all-rows-in-an-html-table-except-for-header-with-js)
    var tb = document.querySelector('tbody');
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

// **2: FILTER EVENTS
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
    var filtered_data = ufo_data.filter ((entry) => ((entry.datetime == input_value) ||
                                                     (entry.city.toLowerCase() == input_value) ||
                                                     (entry.state.toLowerCase() == input_value) ||
                                                     (entry.country.toLowerCase() == input_value) ||
                                                     (entry.shape.toLowerCase() == input_value)));

    // call push_table fxn to repopulate table
    push_table (filtered_data);
};

// **3: FILTER RESET
// refer to "reset filter" button, create event handler
var reset_button = d3.select ("#reset-btn");
reset_button.on ("click", reset_table);

// define reset_table fxn
function reset_table () {
    d3.event.preventDefault();
    push_table (ufo_data);
};

// **4: CHANGING FILTER CATEGORY & DESCRIPTION
var category_date = d3.select (".dropdown-date");
var category_city = d3.select (".dropdown-city");
var category_state = d3.select (".dropdown-state");
var category_country = d3.select (".dropdown-country");
var category_shape = d3.select (".dropdown-shape");

category_date.on ("click", date_func);
category_city.on ("click", city_func);
category_state.on ("click", state_func);
category_country.on ("click", country_func);
category_shape.on ("click", shape_func);

function date_func () {
    d3.event.preventDefault();
    d3.select ("label").text ("Filter by date:");
    document.getElementById ('datetime').value = '';
    d3.select ("input").attr ("placeholder", "Enter a date between 1/1/2010 and 1/13/2010.");
}

function city_func () {
    d3.event.preventDefault();
    d3.select ("label").text ("Filter by city:");
    document.getElementById ('datetime').value = '';
    d3.select ("input").attr ("placeholder", "Enter a city in the US or Canada.");
}

function state_func () {
    d3.event.preventDefault();
    d3.select ("label").text ("Filter by state:");
    document.getElementById ('datetime').value = '';
    d3.select ("input").attr ("placeholder", "Enter a state (abbreviated) in the US or Canada.");
}

function country_func () {
    d3.event.preventDefault();
    d3.select ("label").text ("Filter by country:");
    document.getElementById ('datetime').value = '';
    d3.select ("input").attr ("placeholder", "Enter 'US' or 'CA' (for Canada) to filter by country.");
}

function shape_func () {
    d3.event.preventDefault();
    d3.select ("label").text ("Filter by shape:");
    document.getElementById ('datetime').value = '';
    d3.select ("input").attr ("placeholder", "Enter the shape of the sighting.");
}