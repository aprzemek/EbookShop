<template>
    <div class="col-3">
        <h3>Kategorie</h3>

        <ul class="nav flex-column mt-3">
            <li class="nav-item">
                <router-link class="nav-link" to="/categories/all">
                    Wszystko
                </router-link>
            </li>
            <li class="nav-item" v-for="(category, i) in categories" :key="i">
                <router-link class="nav-link" :to="'/categories/' + category.slug">
                    {{ category.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(["categories"]),
    },
};
</script>

<style scoped>

a.router-link-active {
    background: #007bff;
    color: white;
}
</style>