window.Vue = require('vue');
window.Event = new Vue();

var _ = require('lodash');

Vue.component('keele-navigation', require('./components/KeeleNavigation.vue'));
Vue.component('keele-primary-link', require('./components/KeelePrimaryLink.vue'));
Vue.component('keele-secondary-link', require('./components/KeeleSecondaryLink.vue'));
Vue.component('keele-search', require('./components/KeeleSearch.vue'));
Vue.component('keele-search-key', require('./components/KeeleSearchKey.vue'));
Vue.component('keele-mobile-menu', require('./components/KeeleMobileMenu.vue'));
Vue.component('keele-mobile-menu-key', require('./components/KeeleMobileMenuKey.vue'));

const app = new Vue({
    el: '#root'
});
