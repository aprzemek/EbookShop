<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edytuj stronę" : "Dodaj stronę" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Wypełnij wszystkie pola!
        </h4>

        <div class="form-group">
            <label for="">Nazwa</label>
            <input type="text" class="form-control" v-model="page.name" />
        </div>

        <div class="form-group">
            <label for="">URL</label>
            <input type="text" class="form-control" v-model="page.slug" />
        </div>

        <div class="form-group">
            <label for="">Treść</label>
            <vue-editor v-model="page.content"></vue-editor>
        </div>

        <div class="text-center">
            <router-link to="/admin/pages" class="btn btn-secondary m-1"
                >Anuluj</router-link
            >
            <button class="btn btn-primary m-1" @click="handlePage">
                {{ editMode ? "Zapisz zmiany" : "Dodaj" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            page: {
                name: null,
                slug: null,
                content: null,
            },
        };
    },
    validations: {
        page: {
            name: { required },
            slug: { required },
            content: { required },
        },
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    methods: {
        ...mapActions(["addPage", "editPage"]),
        async handlePage() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editPage(this.page);
                } else {
                    await this.addPage(this.page);
                }

                this.$router.push("/admin/pages");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.page,
                this.$store.getters.pageById(this.$route.params["id"])
            );
        }
    },
};
</script>
