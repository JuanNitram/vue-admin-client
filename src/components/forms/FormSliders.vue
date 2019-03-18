<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-right">
                    <v-btn v-if='this.$route.name == "new-slider"' @click="save">
                        <v-icon>
                            add
                        </v-icon>
                        <v-spacer/>Guardar
                    </v-btn>
                    <v-btn v-else @click="update">
                        <v-icon>
                            update
                        </v-icon>
                        <v-spacer/>Actualizar
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs8 sm8 md6 pa-4>
                <form>
                    <v-text-field label="Name" data-vv-name="name" v-model="slider.name" outline required />
                    <v-text-field label="Title" data-vv-name="title" v-model="slider.title" outline required />
                    <v-text-field label="Subtitle" data-vv-name="subtitle" v-model="slider.subtitle" outline required />
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="slider.active" outline required />
                </form>
            </v-flex>
            <v-flex xs4 sm4 md6 pa-4 hidden-xs-only>
                <MediasManager/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'
import MediasManager from '../reusable/MediasManager'

export default{
    components: {
        MediasManager,
    },
    props: {
        component: String,
    },
    data(){
        return {
            slider: {
                name: '',
                title: '',
                subtitle: '',
                active: 1,
                medias: [],
            },
        }
    },
    created(){
        eventBus.$once('medias-change', (medias) => {
            this.slider.medias = medias;
        });
        eventBus.$once('elem-fetched', (data) => {
            this.slider = data.slider;
            this.$store.commit('setIsLoading', false);
        });
        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id);
        }
        if(this.$route.name == 'new-slider'){
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.slider;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.medias){
                params.medias.forEach((m) => {
                    formData.append('medias[]', m);
                });
            }

            eventBus.$emit('save', formData);
        },
        update(){
            let params = this.slider;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.medias){
                params.medias.forEach((m) => {
                    formData.append('medias[]', m);
                });
            }
            
            eventBus.$emit('update', formData);
        }
    },
}
</script>
