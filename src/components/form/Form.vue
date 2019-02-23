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
        eventBus.$once('save', (params) => {
            this.save(params);
        });

        eventBus.$once('update', (params) => {
            this.update(params);
        });

        eventBus.$once('get', (id) => {
            this.get(id);
        });
    },
    beforeDestroy(){
        eventBus.$off('save');
        eventBus.$off('get');
    },
    methods: {
        save(params){
            let section = this.$router.currentRoute.meta.section;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.medias){
                params.medias.forEach((m) => {
                    formData.append('medias[]', m);
                });
            }

            let url = this.$store.state.baseUrl + '/admin/' + section + '/' + 'save';

            this.send(formData, url, 'save', section);
        },
        update(params){
            let section = this.$router.currentRoute.meta.section;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.medias){
                params.medias.forEach((m) => {
                    formData.append('medias[]', m);
                });
            }

            let url = this.$store.state.baseUrl + '/admin/' + section + '/update/' + formData.id;

            this.send(formData, url, 'update', section);
        },
        get(id){
            let section = this.$router.currentRoute.meta.section;
            let url = this.$store.state.baseUrl + '/admin/' + section + '/get/' + id;

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
                        eventBus.$emit('elem-fetched', response.data.data);
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
