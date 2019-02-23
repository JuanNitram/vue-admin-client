<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-right">
                    <v-btn @click="save">
                        <v-icon>
                            add
                        </v-icon>
                        <v-spacer/>Guardar
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6 pa-4>
                <form>
                    <v-text-field label="Name" data-vv-name="name" v-model="admin.name" required />
                    <v-text-field label="Email" data-vv-name="email" v-model="admin.email" required /></v-text-field>
                    <v-text-field label="Password" data-vv-name="password" v-model="admin.password" type="password" required />
                    <v-text-field label="Confirm Password" data-vv-name="c_password" v-model="admin.c_password" type="password" required />
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="admin.active" required />
                </form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'

export default{
    components: {

    },
    props: {
        component: String,
    },
    data(){
        return {
            admin: {
                name: '',
                email: '',
                password: '',
                c_password: '',
                active: 1,
            },
        }
    },
    created(){
        if(this.$route.params.section == 'new-admin'){
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.admin;
            eventBus.$emit('save', params);
        }
    },
}
</script>

<style>
.img-thumbnail {
    width: 80px;
    height: 80px;
}
</style>
