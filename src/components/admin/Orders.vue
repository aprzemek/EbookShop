<template>
    <div>
        <h2>Zamówienia</h2>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>E-mail</th>
                    <th>Adres</th>
                    <th>Zamówione Produkty</th>
                    <th>Do zapłaty</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, i) in orders" :key="i">
                    <td class="align-middle">{{ o.id }}</td>
                    <td class="align-middle">{{ o.name }}</td>
                    <td class="align-middle">{{ o.email }}</td>
                    <td class="align-middle">{{ o.address }}</td>
                    <td class="align-middle">
                        <ul class="list-group">
                            <li
                                class="list-group-item"
                                v-for="(item, index) in JSON.parse(o.cart)"
                                :key="index"
                            >
                                {{ item.product.name }}
                                {{ item.product.price | currency }}
                                {{ "x " + item.quantity }}
                            </li>
                        </ul>
                    </td>
                    <td class="align-middle">
                        {{ o.total | currency }}
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
        ...mapState({ orders: (state) => state.orders.orders }),
    },
    methods: {
        ...mapActions({ setOrdersAction: "orders/setOrdersAction" }),
    },
    created() {
        this.setOrdersAction();
    },
};
</script>
