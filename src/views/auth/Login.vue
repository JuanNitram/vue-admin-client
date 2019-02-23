<template>
    <div class="v-align">
        <v-layout row wrap align-center justify-center>
            <v-flex xs10 lg6 md8 order-lg2>
                <div>
                    <img src="logo.png" width="200px"/>
                </div>
                <v-form ref="form" lazy-validation>
                    <div class="text-field-padding">
                        <v-text-field outline v-model="email" label="E-mail" required/>
                        <v-text-field outline v-model="password" label="Password" type="password" required/>
                    </div>
                    <div class="text-xs-right">
                        <v-btn depressed large @click="login">
                            Login
                                <v-progress-circular v-bind:class="{ d_none: !isLoading }" class="progress-fix" size="20" indeterminate/>
                        </v-btn>
                    </div>
                </v-form>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
export default {
    data(){
        return {
            email : "",
            password : "",
            isLoading :false
        }
    },
    created(){
        this.$store.commit('setIsLoading', false);
    },
    methods: {
        login: function () {
            this.isLoading = true;
            let email = this.email
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then(() => {
                this.isLoading = false;
                this.$router.push('/dashboard')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
.text-field-padding {
    padding: 7px;
}
.logo{
    width: 250px;
}
.v-progress-circular{
    margin: 4px
}
.d_none{
    display: none!important;
}
.progress-fix {
    padding-right: 15%;
}
</style>
