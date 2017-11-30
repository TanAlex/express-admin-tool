<template>
    <div  v-if="currentView=='shop'" id="search" class="input-group">
        <input v-model="searchFor" type="text" name="search" placeholder="Search" class="form-control input-lg" />
        <div class="input-group-btn">
            <button v-on:click="start_search" type="button" class="btn btn-default btn-lg"><i class="fa fa-search"></i></button>
        </div>
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                searchFor: ""
            }
        },
        computed: {
            currentView: function () {
                return this.$store.state.currentView;
            },
        },
        methods: {
            start_search: function () {
                if (this.searchFor && this.searchFor.toString() && this.searchFor.toString().trim()) {
                    this.$store.commit("page_set", 1);
                    this.$store.commit("set_category_id", "Search");
                    this.$store.commit("set_search_for", this.searchFor);
                    var searchCategory = _.findWhere(this.$store.state.categories, {id: "Search"});
                    if (!searchCategory || _.isEmpty(searchCategory)) {
                        this.$store.commit("add_search_to_categories");
                    }
                    this.$store.dispatch("getProducts");
                }
            }
        }
    };
</script>