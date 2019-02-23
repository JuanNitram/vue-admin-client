<template>
    <v-navigation-drawer v-model="drawer" absolute temporary persistent>
        <v-list class="pa-1">
            <v-list-tile avatar>
                <img src="logo-min.png" width="40" height="40">
                <div class="v-toolbar__title ">
                    <v-list-tile-content>
                        <v-list-tile-title class="title">{{ this.$route.meta.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </div>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile avatar class="v-list-item" v-for="item in items" :key="item.title" :to="item.link" @click="isLoading">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="subheading">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import eventBus from '../EventBus.js'

export default {
    data () {
        return {
            drawer: null,
            items: [
                { title: 'Dashboard', icon: 'dashboard' , link: '/dashboard' },
                { title: 'Administradores', icon: 'supervised_user_circle' , link:'/admins'},
                { title: 'Sliders', icon: 'collections' , link:'/sliders'},
                { title: 'Productos', icon: 'question_answer' , link:'/products'}
            ]
        }
    },
    created() {
        eventBus.$on('show-side-bar', () => {
            this.drawer = !this.drawer;
        });
    },
    methods: {
        isLoading(){
            this.$store.commit('setIsLoading', true);
        }
    }
}
</script>

<style>
.v-list__tile {
    border-radius: 4px;
}

.v-list-item{
    padding-left: 5px;
    padding-right: 5px;
}
.logo-sidebar {
    margin-left: 20px;
}
</style>
