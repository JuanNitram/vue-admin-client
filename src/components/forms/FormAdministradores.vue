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
                    <v-text-field label="Name" data-vv-name="name" v-model="admin.name" required outline />
                    <v-text-field label="Email" data-vv-name="email" v-model="admin.email" required outline />
                    <v-text-field label="Password" data-vv-name="password" v-model="admin.password" type="password" required outline />
                    <v-text-field label="Confirm Password" data-vv-name="c_password" v-model="admin.c_password" type="password" required outline/>
                    
                    <SelectSimple v-if="this.renderSelects" :label="'Admin Type'" :url="this.adminsTypes_url" 
                        :section="'adminsTypes'" :selectedItem="this.admin.types_id"/>

                    <SelectMultiple v-if="this.renderSelects" :label="'Sections'" :url="this.sections_url" 
                        :section="'sections'" :itemsSelected="this.admin.sections"/>
                    
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="admin.active" required outline/>
                </form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'
import SelectMultiple from '../reusable/selects/Multiple'
import SelectSimple from '../reusable/selects/Simple'

export default{
    components: {
        SelectMultiple,
        SelectSimple
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
                types_id: null,
                sections: [],
                parent: this.$store.state.user.email,
            },
            adminsTypes_url: this.$store.state.baseUrl + '/adminsTypes?parent=' + this.$store.state.user.email,
            sections_url: this.$store.state.baseUrl + '/sections?parent=' + this.$store.state.user.email,
            renderSelects: false,
        }
    },
    created(){
        eventBus.$once('elem-fetched', (data) => {
            let sections = [];
            data.admin.sections.forEach((s) => {
                sections.push(s.id);
            });
            data.admin.sections = sections;
            this.admin = data.admin;
            this.renderSelects = true;
            this.$store.commit('setIsLoading', false);
        });

        eventBus.$on('adminsTypes-select-changed', (types_id) => {
            this.admin.types_id = types_id;
        });

        eventBus.$on('sections-select-changed', (sections) => {            
            this.admin.sections = sections;
        });

        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id);
        }

        if(this.$route.name == 'new-admin'){
            this.renderSelects = true;
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.admin;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.sections){
                params.sections.forEach((m) => {
                    formData.append('sections[]', m);
                });
            }

            eventBus.$emit('save', formData);
        },
        update(){
            let params = this.admin;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.sections){
                params.sections.forEach((m) => {
                    formData.append('sections[]', m);
                });
            }

            eventBus.$emit('update', formData);
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
