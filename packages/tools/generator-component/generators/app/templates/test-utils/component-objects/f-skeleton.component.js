const <%= name.class %>Component = () => $('[data-test-id="<%= name.class %>"]');

exports.waitFor<%= name.filename%>Component = () => <%= name.class%>Component().waitForExist();

exports.is<%= name.filename %>ComponentDisplayed = () => <%= name.class %>Component().isDisplayed();
