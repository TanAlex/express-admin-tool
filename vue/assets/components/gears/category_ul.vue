<template>
    <ul id="category_ul" class="list-group list-unstyled">
        <li v-for="category in categories">
            <a href="javascript:void(0)" v-on:click="onCatClick(category.id)" class="list-group-item active">{{ category.name }}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        data: function () {
            return {
                categories: this.$store.state.categories
            }
        },
        methods: {
            onCatClick: function (category_id) {
                this.$store.commit("page_set", 1);
                this.$store.commit("set_category_id", category_id);
                this.$store.commit("set_search_for", "");
                this.$store.dispatch("getProducts");
            }
        }
    };
</script>