<template lang="html">
    <nav>
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            message: 'Hello nav',
            primaryLinks: []
        }
    },

    created() {
        this.primaryLinks = this.$children;
        Event.$on('primary-link-clicked', title => {
            this.updateActive(title);
        });
    },

    mounted() {
        window.addEventListener('resize', this.resizeWindow);
    },

    methods: {
        updateActive(title) {
            this.primaryLinks.forEach((primaryLink) => {
                if (primaryLink.title == title &! primaryLink.active) {
                    primaryLink.active = true;
                } else {
                    primaryLink.active = false;
                }
            });
        },

        resizeWindow: _.debounce(function() {
            this.primaryLinks.forEach((primaryLink) => {
                if (primaryLink.active) {
                    let title = primaryLink.title;
                    // Switch open nav off
                    this.updateActive(title);
                    Event.$emit('resize', title);
                }
            });
        }, 50),
    }
}
</script>
