<template>
    <div>
        <h2>Produkty</h2>

        <router-link to="/admin/products/add" class="btn btn-primary mb-4"
            >Dodaj kolejny produkt</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Zdjęcie</th>
                    <th>Cena</th>
                    <th>Kategoria</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in products" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">
                        <img :src="productImages + p.image" width="100" />
                    </td>
                    <td class="align-middle">{{ p.price | currency }}</td>
                    <td class="align-middle">{{ p.category.name }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edycja
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deleteProduct(p)"
                        >
                            Usuń
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ProductPagination />
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import ProductPagination from "../ProductPagination";

export default {
    components: {
        ProductPagination,
    },
    computed: {
        ...mapState(["products", "productImages"]),
    },
    methods: {
        ...mapMutations(["setCurrentCategory"]),
        ...mapActions(["setProductsByCategoryAction", "deleteProduct"]),
        handleEdit(product) {
            this.$router.push(`/admin/products/edit/${product.id}`);
        },
    },
    created() {
        this.setCurrentCategory("all");
        this.setProductsByCategoryAction("all");
    },
};
</script>
