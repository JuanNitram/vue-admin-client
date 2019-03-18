<template>
    <v-layout row>
        <v-flex xs12>
            <component :is="component"/>
        </v-flex>
    </v-layout>
</template>

<script>
import eventBus from '../../EventBus.js'
import FormProductos from './FormProductos'
import FormAdministradores from './FormAdministradores'
import FormSliders from './FormSliders'

export default{
    components: {
        FormProductos,
        FormAdministradores,
        FormSliders,
    },
    props: {
        component: String,
    },
    created(){
        eventBus.$off('save').$once('save', (params) => {
            this.save(params);
        });

        eventBus.$off('update').$once('update', (params) => {
            this.update(params);
        });

        eventBus.$off('get').$once('get', (id) => {
            this.get(id);
        });
    },
    methods: {
        save(formData){
            let section = this.$router.currentRoute.meta.section;

            let url = this.$store.state.baseUrl + '/' + section + '/save';

            this.send(formData, url, 'save', section);
        },
        update(formData){
            let section = this.$router.currentRoute.meta.section;

            let url = this.$store.state.baseUrl + '/' + section + '/update/' + formData.id;

            this.send(formData, url, 'update', section);
        },
        get(id){
            let section = this.$router.currentRoute.meta.section;
            let url = this.$store.state.baseUrl + '/' + section + '/get/' + id;

            this.send(null, url, 'get', section);
        },
        send(formData, url, op, section){
            switch(op){
                case 'get':
                    this.$http.get(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        eventBus.$emit('elem-fetched', response.data.data); // Captured on components/form/FormProductos
                    });
                    break;
                case 'save':
                    this.$http.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((response) => {
                        this.$router.push('/' + section)
                    });
                    break;
                default:
                    break;
            }
        },
    }
}
</script>
