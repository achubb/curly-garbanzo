<template lang="html">
    <a href="#"
        v-on:click.prevent="searchCall()"
    >
        {{ keyText }}
    </a>
</template>

<script>
export default {
    data() {
        return {
            searchOpened: false
        }
    },

    props: {
        searchOpenText: { default: 'Search' },
        searchCloseText: { default: 'Close' }
    },

    methods: {
        searchCall() {
            Event.$emit('search-called');
            this.searchOpened =! this.searchOpened
        }
    },

    computed: {
        keyText() {
            if (this.searchOpened) {
                return this.searchCloseText
            } else {
                return this.searchOpenText
            }
        }
    }
}
</script>
