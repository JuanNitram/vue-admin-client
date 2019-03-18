<template>
    <v-toolbar>
        <img src="logo-min.png" class="sidebar-img" width="40" height="40" @click="showSideBar">
        <v-toolbar-title>{{ this.$route.meta.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
            <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
                <v-list-tile @click="configuration">
                    <v-list-tile-title>Configuracion<v-icon>build</v-icon></v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="logout">
                    <v-list-tile-title>Logout <v-icon>exit_to_app</v-icon></v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import eventBus from '../EventBus.js'

export default{
    methods: {
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        },
        configuration(){

        },
        showSideBar: () => {
            eventBus.$emit('show-side-bar');
        }
    },
}
</script>
<style>
.sidebar-img:hover {
    transform: scale(1.15, 1.15);
}
.sidebar-img{
    transition: all .5s;
}
</style>
