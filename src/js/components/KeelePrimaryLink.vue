<template lang="html">
    <li>
        <a href="#"
            v-on:click.prevent="switchNav(title)"
            v-bind:class="{ 'link--active' : active }"
        >
            {{ title }}
        </a>
        <ul v-if="active">
            <slot></slot>
            <li class="link--more" v-if="revealMore">
                <a href="#"
                    v-on:click.prevent="toggleRevealMore"
                >
                    <span v-if="revealedMore">More V</span>
                    <span v-else>Close ^</span>
                </a>
            </li>
        </ul>
    </li>
</template>

<script>
export default {
    data() {
        return {
            secondaryLinks: [],
            active: false,
            revealMore: false,
            revealedMore: false,
            fullHeight: 0,
            singleHeight: 0,
        }
    },

    props: {
        title: { required: true },
        link: { default: '#' },
        isActive: { default: false }
    },

    created() {
        this.secondaryLinks = this.$children;
    },

    mounted() {
        window.addEventListener('resize', this.resizeWindow);
    },

    methods: {
        switchNav(title) {
            // this.active = !this.active
            Event.$emit('primary-link-clicked', title);
            this.getMenuWidth(title);
        },

        calculateMenuWidth(container) {
            let innerMenuItems = container.querySelectorAll('ul li'),
                menuWidth = 0;

            innerMenuItems.forEach(function(innerMenuItem){
                menuWidth += innerMenuItem.offsetWidth;
            })

            return menuWidth;
        },

        calculateBarWidth(container) {
            let bar = container.querySelector('ul'),
                barWidth = bar.offsetWidth;

            return barWidth;
        },

        calculateSubnavHeight(container) {
            let fullHeight = container.querySelector('ul').offsetHeight;

            return fullHeight;
        },

        hideOverflow(container) {
            let singleHeight = container.querySelector('ul li').offsetHeight;

            return singleHeight
        },

        isRevealMoreNeeded(barWidth, menuWidth) {
            return menuWidth >= barWidth
        },

        manageSubnavHeight() {
            let vm = this
            this.$nextTick( function() {
                let subnav = vm.$el.querySelector('ul');
                if (this.revealedMore) {
                    subnav.style.height = this.singleHeight + 'px';
                } else {
                    subnav.style.height = this.fullHeight + 'px';
                }
            }.bind(vm));
        },

        resizeWindow() {
            this.getMenuWidth();
        },

        getMenuWidth() {
            let vm = this
            this.$nextTick( function() {

                let el = vm.$el;

                if (this.active) {
                    let barWidth = this.calculateBarWidth(el),
                        menuWidth = this.calculateMenuWidth(el);

                    vm.revealMore = vm.isRevealMoreNeeded(barWidth, menuWidth);
                }

                if (vm.active && vm.revealMore) {
                    vm.fullHeight = vm.calculateSubnavHeight(el)
                    vm.singleHeight = vm.hideOverflow(el);
                }

            }.bind(vm));
        },

        toggleRevealMore() {
            this.revealedMore = !this.revealedMore;
            this.manageSubnavHeight();
        }
    },
}
</script>

<style lang="css">
</style>
