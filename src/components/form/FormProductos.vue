<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-right">
                    <v-btn v-if='this.$route.name == "new-product"' @click="save">
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
            <v-flex xs6 pa-4>
                <form>
                    <v-text-field label="Name" data-vv-name="name" v-model="product.name" required />
                    <v-text-field label="Description" data-vv-name="description" v-model="product.description" required />
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="product.active" required />
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
            product: {
                name: '',
                description: '',
                active: 1,
                medias: [],
            },
        }
    },
    created(){
        eventBus.$once('medias-change', (medias) => {
            this.product.medias = medias;
        });
        eventBus.$once('elem-fetched', (data) => {
            this.product = data.product;
            this.$store.commit('setIsLoading', false);
        });
        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id); // Captured on components/form/Form
        }
        if(this.$route.name == 'new-product'){
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.product;
            eventBus.$emit('save', params);
        },
        update(){
            let params = this.product;
            eventBus.$emit('update', params);
        }
    },
}
</script>
