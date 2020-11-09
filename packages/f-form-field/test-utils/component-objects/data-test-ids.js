
// Schema
// "section" used for breaking down larger components.
//  {grouping}-{unique_id} <-- string pattern 
// {
//     "section" = { // ? optional
//         "grouping": { // mandatory
//             "id": "" // mandatory
//         }
//     }
// }

export const TEST_IDS = {
    component: {
        id: "component-form-field"
    },
    // default: {
    //     id: ""
    // }, //Is this needed for production?
    labels: {
        top: "label-top", 
        bottom: "label-bottom"
    },
    inputs: {
        firstName: "input-first-name"
    }
}

// export const test_ids = {
//     "inputs": {
//         "input_first_name": "input-first-name",
//     }, 
//     "errors": {
//         "error_first_name": "error-first-name"
//     },
//     "controls": {
//         "submit-button": "controls-submit-button"
//     }
// }
/* <button data-test-id="{ test_ids.top_bar.button.button_2 }"></button>
// Unit
findComponents(button);
findAll("[data-test-id^='top-bar-submit']")
find("[data-test-id='error-first-name']");
find("[data-test-id^='error-']");
fozFind('error-', '^=');
fozFindAll('error-', '^=');
// Component Selectors
$('[data-test-id="error-first-name"]');
$('[data-test-id^="error-"]');
foz$('error-', '^=');
data-test-id*=""
data-test-id^=""
data-test-id=""
// shorthand
function $(id, operator = "=") {
    return "[data-test-id" . operator . id . "]";
} */