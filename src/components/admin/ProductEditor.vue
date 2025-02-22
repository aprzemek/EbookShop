<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edytuj produkt" : "Dodaj produkt" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Wypełnij wszystkie pola!
        </h4>

        <div class="form-group">
            <label for="">Nazwa</label>
            <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="form-group">
            <label for="">Opis</label>
            <textarea
                class="form-control"
                v-model="product.description"
            ></textarea>
        </div>

        <div class="form-group">
            <label for="">Cena</label>
            <input type="text" class="form-control" v-model="product.price" />
        </div>

        <div class="form-group">
            <label for="">Zdjęcie</label>
            <input type="file" class="form-control" @change="onFileSelected" />

            <p v-if="editMode" class="mt-3">
                Aktualne zdjęcie:
                <img :src="productImages + product.image" width="100" />
            </p>
        </div>

        <div class="form-group">
            <label for="">Kategoria</label>
            <select class="form-control" @change="onChange">
                <option :value="null">Wybierz kategorię</option>
                <option
                    v-for="(c, i) in categories"
                    :key="i"
                    :value="c.id"
                    :selected="c.id == product.categoryId"
                >
                    {{ c.name }}
                </option>
            </select>
        </div>

        <div class="text-center">
            <router-link to="/admin/products" class="btn btn-secondary m-1"
                >Anuluj</router-link
            >
            <button class="btn btn-primary m-1" @click="handleProduct">
                {{ editMode ? "Zapisz" : "Dodaj" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            product: {
                name: null,
                description: null,
                price: null,
                image: null,
                category: null,
            },
        };
    },
    validations: {
        product: {
            name: { required },
            description: { required },
            price: { required },
            category: { required },
        },
    },
    computed: {
        ...mapState(["categories", "productImages"]),
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    methods: {
        ...mapMutations(["setCurrentPage"]),
        ...mapActions(["addProduct", "editProduct"]),
        onFileSelected(e) {
            this.product.image = e.target.files[0];
        },
        onChange(e) {
            this.product.category = e.target.value;
        },
        async handleProduct() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const product = new FormData();

                product.append("Name", this.product.name);
                product.append("Description", this.product.description);
                product.append("Price", this.product.price);
                product.append("ImageUpload", this.product.image);
                product.append(
                    "CategoryId",
                    this.product.category.id || this.product.category
                );

                if (this.editMode) {
                    product.append("Id", this.product.id);
                    product.append("Image", this.product.image.name);

                    await this.editProduct(product);
                } else {
                    await this.addProduct(product);
                }

                this.setCurrentPage(1);
                this.$router.push("/admin/products");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.product,
                this.$store.getters.productById(this.$route.params["id"])
            );
        }
    },
};
</script>
