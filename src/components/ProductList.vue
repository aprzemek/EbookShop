<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            <div class="row">
                <div class="col-3 mt-3" v-for="(p, i) in products" :key="i">
                    <p>
                        <img :src="productImages + p.image" class="img-thumbnail"/>
                    </p>
                    <h6>
                        {{ p.name }}
                    </h6>
                    <p>
                        {{ p.description }}
                    </p>
                    <p>
                        {{ p.price | currency }}
                    </p>
                    <p>
                        <button
                            
                            class="btn btn-primary"
                            @click="handleAddProduct(p)"
                        >
                            Dodaj do koszyka
                            
                        </button>
                    </p>
                </div>
            </div>

            <ProductPagination />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
    components: {
        CategoryList,
        ProductPagination,
    },
    computed: {
        ...mapState(["products", "productImages"]),
    },
    methods: {
        ...mapMutations(["setCurrentCategory", "setCurrentPage"]),
        ...mapMutations({ addProduct: "cart/addProduct" }),
        ...mapActions(["setProductsByCategoryAction"]),
        handleAddProduct(product) {
            this.addProduct(product);
        },
    },
    created() {
        this.setCurrentPage(1);
        let category = this.$route.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
    },
    beforeRouteUpdate(to, from, next) {
        this.setCurrentPage(1);
        let category = to.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
        next();
    },
};
</script>
