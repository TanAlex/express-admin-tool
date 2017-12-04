<template>
    <div id="product-category" class="container">
        <div class="row">
            <aside id="column-left" class="col-sm-3 hidden-xs">
                <category-ul></category-ul>
            </aside>

            <div id="content" class="col-sm-9">
                <div class="row">
                    <div class="col-md-4 col-xs-6">
                        <category-select></category-select>
                    </div>
                    <div class="col-md-4 col-xs-6">
                        <orderby-select></orderby-select>
                    </div>
                    <div class="col-md-2 col-sm-6 hidden-xs">
                        <list-grid-button></list-grid-button>
                    </div>
                </div>

                <page-div></page-div>
                <hr>
                <product-div></product-div>
            </div>
        </div>
    </div>
</template>

<script>
    import list_grid_button from '../../assets/components/gears/list_grid_button.vue';
    import category_ul from '../../assets/components/gears/category_ul.vue';
    import category_select from '../../assets/components/gears/category_select.vue';
    import product_div from '../../assets/components/gears/product_div.vue';
    import page_div from '../../assets/components/gears/page_div.vue';
    import orderby_select from '../../assets/components/gears/orderby_select.vue';

    export default {
        components: {
            "list-grid-button": list_grid_button,
            "category-ul": category_ul,
            "category-select": category_select,
            "product-div": product_div,
            "page-div": page_div,
            "orderby-select": orderby_select,
        },
        methods:{

        },
        computed: {

        }
    };
</script>