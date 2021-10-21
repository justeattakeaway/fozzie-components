<% if (config.isComponent) { %>
/**
 * @overview Fozzie <%= name.readme %> Component JS Wrapper
 *
 * @module f-<%= name.default%>
 */


// Import vue component
import <%= name.component %> from '@/components/<%= name.filename %>.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('<%= name.component %>', <%= name.component %>);
}

// Create module definition for Vue.use()
const plugin = {
    install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default <%= name.component %>;

<% } else { %>
/**
* @overview Add description of service here
*
* @module f-<%= name.default %>
*/

export default class ServiceConstructor {
    constructor() {
        throw new Error('Not implemented yet!');
    }
}

<% } %>
