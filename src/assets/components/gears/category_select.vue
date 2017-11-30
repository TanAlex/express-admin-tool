<template>
    <div id="category_select" class="form-group input-group input-group-sm">
        <label class="input-group-addon">Category:</label>
        <select v-model="selected" class="form-control">
            <option v-for = "category in categories"  v-bind:value="category.id">{{category.name}}</option>
        </select>
    </div>
</template>

<script>
    export default{
        data: function () {
            return {
                categories: this.$store.state.categories
            }
        },
        computed:{
            selected: {
                get: function () {
                    return this.$store.getters.get_category_id;
                },
                set: function (category_id) {
                    this.$store.commit("set_category_id", category_id);
                    this.$store.commit("page_set", 1);
                    this.$store.commit("set_search_for", "");
                    this.$store.dispatch("getProducts");
                }
            }
        }
    };
</script>