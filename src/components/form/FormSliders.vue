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
                    <v-text-field label="Name" data-vv-name="name" v-model="slider.name" required />
                    <v-text-field label="Title" data-vv-name="title" v-model="slider.title" required />
                    <v-text-field label="Subtitle" data-vv-name="subtitle" v-model="slider.subtitle" required />
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="slider.active" required /></v-checkbox>
                </form>
            </v-flex>
            <v-flex xs6 pa-4>
                <MediasManager/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../../EventBus.js'
import MediasManager from '../MediasManager'

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
            console.log("OK");
            this.slider = data.slider;
            this.$store.commit('setIsLoading', false);
        });
        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id);
        }
        if(this.$route.params.section == 'new-slider'){
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.slider;
            eventBus.$emit('save', params);
        }
    },
}
</script>
