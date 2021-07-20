<template>
    <div class="row">
        <div class="col-12">
            <div class="m-2">
                <div class="form-group m-2">
                    <label for="">Imię i nazwisko</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.order.name.$model"
                    />
                    <validation-error :validation="$v.order.name" />
                </div>
                <div class="form-group m-2">
                    <label for="">E-mail</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.order.email.$model"
                    />
                    <validation-error :validation="$v.order.email" />
                </div>
                <div class="form-group m-2">
                    <label for="">Adres</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="$v.order.address.$model"
                    />
                    <validation-error :validation="$v.order.address" />
                </div>
            </div>
        </div>

        <div class="col-12 text-center">
            <router-link to="/cart" class="btn btn-secondary m-1"
                >Powrót</router-link
            >
            <button class="btn btn-primary m-1" @click="submitOrder">Zamów!</button>
        </div>
    </div>
</template>

<script>
import ValidationError from "./ValidationError";
import { required, email } from "vuelidate/lib/validators";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    components: {
        ValidationError,
    },
    data() {
        return {
            order: {
                name: "",
                email: "",
                address: "",
            },
        };
    },
    computed: {
        ...mapState({
            cart: state => state.cart.cart
        }),
        ...mapGetters({
            total: "cart/totalPrice"
        })
    },
    validations: {
        order: {
            name: { required },
            email: { required, email },
            address: { required },
        },
    },
    methods: {
        ...mapActions({
            storeOrder: "orders/storeOrderAction",
            clearCartData: "cart/clearCartData"
        }),
        async submitOrder() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const order = new FormData();

                order.append("Name", this.order.name);
                order.append("Email", this.order.email);
                order.append("Address", this.order.address);
                order.append("Cart", JSON.stringify(this.cart));
                order.append("Total", this.total);

                await this.storeOrder(order);
                this.clearCartData();
                this.$router.push("/thanks");
            }
        }
    },
};
</script>