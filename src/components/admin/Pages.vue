<template>
    <div>
        <h2>Strony</h2>

        <router-link to="/admin/pages/add" class="btn btn-primary mb-4"
            >Dodaj stronę</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>URL</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in pages" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.slug }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edycja
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deletePage(p)"
                        >
                            Usuń
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState(["pages"]),
    },
    methods: {
        ...mapActions(["deletePage"]),
        handleEdit(page) {
            this.$router.push(`/admin/pages/edit/${page.id}`);
        },
    }
};
</script>

