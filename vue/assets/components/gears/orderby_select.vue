<template>
    <div id="orderBy_select" class="form-group input-group input-group-sm">
        <label class="input-group-addon">Sort By:</label>
        <select v-model="selected" class="form-control" v-on:change="onSortingChange">
            <option v-for="option in options" v-bind:value="option.value">{{option.name}}</option>
        </select>
    </div>
</template>

<script>
    export default{
        data: function () {
            return {
                selected: "id-asc",
                options: [
                    {name: "Default", value: "id-asc"},
                    {name: "Name (A - Z)", value: "description-asc"},
                    {name: "Name (Z - A)", value: "description-desc"},
                    {name: "Price (Low - High)", value: "base_price-asc"},
                    {name: "Price (High - Low)", value: "base_price-desc"}
                ]
            }
        },
        methods: {
            onSortingChange: function(){
                var selectOrderBy = this.selected.split('-');
                var orderBy = "id";
                var orderType = "asc";
                if(selectOrderBy.length > 0){
                    orderBy = selectOrderBy[0];
                }
                if(selectOrderBy.length > 1){
                    orderType = selectOrderBy[1];
                }
                this.$store.commit("page_set",1);
                this.$store.commit("set_order_by", orderBy);
                this.$store.commit("set_order_type", orderType);
                this.$store.dispatch("getProducts");
            }
        }
    };
</script>