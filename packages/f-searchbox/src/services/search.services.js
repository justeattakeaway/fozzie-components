/* eslint-disable */

/**
 * Submits a manual form submission with a given callback `getLastLocation`
 *
 * @param onSubmit
 * @param formUrl
 * @param form
 * @param callback
 * @param event
 * @returns {boolean}
 */
const search = ({
    onSubmit,
    formUrl,
    form,
    callback,
    event
}) => {
    if (onSubmit) {
        return false;
    } else if (formUrl) {
        event.preventDefault();
        form.submit(callback());
    }
};

export {
    search
};
