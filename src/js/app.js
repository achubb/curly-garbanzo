window.Vue = require('vue');
window.Event = new Vue();

var _ = require('lodash');

Vue.component('keele-navigation', require('./components/KeeleNavigation.vue'));
Vue.component('keele-primary-link', require('./components/KeelePrimaryLink.vue'));
Vue.component('keele-secondary-link', require('./components/KeeleSecondaryLink.vue'));

const app = new Vue({
    el: '#root'
});
