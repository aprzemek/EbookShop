<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            <div v-html="pageContent"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CategoryList from "./CategoryList";

export default {
    components: { CategoryList },
    computed: {
        ...mapState(["pages"]),
        pageContent() {
            let slug = this.$route.params.slug
                ? this.$route.params.slug
                : "home";
            let page = this.pages.find((page) => page.slug == slug);

            if (page) {
                return page.content;
            }

            return "";
        },
    },
};
</script>
<style>
body {
  background-color: rgb(196, 223, 196);
}
</style>
