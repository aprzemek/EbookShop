<template>
    <div class="float-right text-white">
        <span v-if="itemCount > 0">
            {{ itemCount }} e-book(i) {{ totalPrice | currency }}
        </span>
        <span v-else>
            Dodaj coś do koszyka!
           
        </span>
        &nbsp;
        <router-link
            to="/cart"
            class="btn btn-sm btn-warning text-danger"
            v-if="itemCount > 0"
            
        >
            <i class="fa fa-shopping-cart"></i>
            
        </router-link>
        &nbsp;
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            itemCount: "cart/itemCount",
            totalPrice: "cart/totalPrice",
        }),
    },
};
</script>
