<template>
    <div id="app">
        <v-app>
            <div v-if="!$route.meta.isLogin">
                <Navbar/>
                <Sidebar/>
            </div>
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-progress-circular v-bind:class="{ d_none: !this.$store.getters.isLoading }" class="progress-fix" size="40" indeterminate/>
                        <transition name="fade" mode="out-in">
                            <router-view/>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-footer class="pa-3" height="8vh">
                <v-spacer></v-spacer>
                <v-flex py-3 text-xs-center xs12>
                    <div>&copy; {{ new Date().getFullYear() }} - <strong>Sideral</strong></div>
                </v-flex>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
    components: {
        Navbar,
        Sidebar
    },
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    },
    created: function () {
        this.$store.commit('setIsLoading', true);
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch(logout)
                }
                throw err;
            });
        });
    }
}
</script>

<style lang="css" scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

/* This is for de VUE - Transitions, haceme caso Juan, realmente es eso */
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.d_none {
    display: none!important;
}

.progress-fix {
    position: fixed;
    z-index: 999;
    height: 60px;
    width: 60px;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>
