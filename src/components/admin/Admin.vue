<template>
    <div class="row p-3">
        <div class="col-3 bg-rgb(196, 223, 196) p-2">
            <router-link to="/admin/products" class="btn btn-block btn-warning"
                >Produkty</router-link
            >
            <router-link to="/admin/pages" class="btn btn-block btn-warning"
                >Strony</router-link
            >
            <router-link to="/admin/orders" class="btn btn-block btn-warning"
                >Zamówienia</router-link
            >
        </div>

        <div class="col">
            <router-view />
        </div>
    </div>
</template>
