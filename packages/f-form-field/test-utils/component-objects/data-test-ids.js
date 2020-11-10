export const TEST_IDS = {
    component: {
        id: "component-form-field"
    },
    labels: {
        top: "label-top", 
        inline: "label-inline"
    },
    inputs: {
        firstName: "input-first-name"
    }
}

//people could copy and paste so we can get symmetry throughout our tests 
           //unit tests- f-form-field
            //     //this whole concept is about not showing data-test-ids in production, but they always do anyway
            //     //because component tests need them. If we want them removed, we'd need the tests to only run on a test environment 
            //     // and remove the ids when run in production. 
            // });
            
            // });  -- this is about checking whether the data-test-id shows when the variable is blank. 
            //If we are sharing data then it's likely the data-test-id will never actually be blank. If we do not want
            //the data test ids to be visibile in production, we may need to find another way.