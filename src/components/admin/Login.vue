<template>
    <div class="mt-5">
        <h4
            v-if="showFailureMessage"
            class="bg-danger text-white text-center p-2"
        >
            Błędne dane, spróbuj ponownie!
        </h4>

        <div class="form-group">
            <label for="">Nazwa użytkownika</label>
            <input type="text" class="form-control" v-model="username" />
        </div>

        <div class="form-group">
            <label for="">Hasło</label>
            <input type="password" class="form-control" v-model="password" />
        </div>

        <div class="text-center">
            <button class="btn btn-primary m-1" @click="handleAuth">
                Zaloguj
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            username: null,
            password: null,
            showFailureMessage: false,
        };
    },
    computed: {
        ...mapState({ authenticated: (state) => state.auth.authenticated }),
    },
    methods: {
        ...mapActions({ authenticate: "auth/authenticate" }),
        async handleAuth() {
            await this.authenticate({
                username: this.username,
                password: this.password,
            });

            if (this.authenticated) {
                this.$router.push("/admin");
            } else {
                this.showFailureMessage = true;
            }
        },
    },
};
</script>
