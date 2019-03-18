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
            <v-flex xs8 sm8 md6 pa-4>
                <form>
                    <v-text-field label="Name" data-vv-name="name" v-model="product.name" outline required />
                    <v-text-field label="Description" data-vv-name="description" v-model="product.description" outline required />
                    
                    <SelectSimple v-if="this.renderSelects" :label="'Category'" :url="this.categoriesUrl"
                        :section="'categories'" :selectedItem="this.product.categories_id"/>
                    
                    <SelectMultiple v-if="this.renderSelects" :parentSelected="this.product.categories_id" 
                        :listen="'categories'" :listenUrl="this.subcategoriesUrl" :label="'Subcategory'" 
                        :url="this.subcategoriesUrl" :section="'subcategories'" :itemsSelected="this.product.subcategories"/>
                    
                    <v-checkbox label="Active" data-vv-name="active" type="checkbox" v-model="product.active" required />
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
import SelectSimple from '../reusable/selects/Simple'
import SelectMultiple from '../reusable/selects/Multiple'

export default{
    components: {
        MediasManager,
        SelectSimple,
        SelectMultiple,
    },
    props: {
        component: String,
    },
    data(){
        return {
            product: {
                name: '',
                description: '',
                categories_id: null,
                subcategories: [],
                active: 1,
                medias: [],
            },
            categoriesUrl: this.$store.state.baseUrl + '/categories',
            subcategoriesUrl: this.$store.state.baseUrl + '/subcategories',
            renderSelects: false,
        }
    },
    created(){
        eventBus.$once('medias-change', (medias) => {
            this.product.medias = medias;
        });

        eventBus.$once('elem-fetched', (data) => {
            let subcategories = [];
            data.product.subcategories.forEach((s) => {
                subcategories.push(s.id);
            });
            data.product.subcategories = subcategories;

            this.product = data.product;
            this.renderSelects = true;
            this.$store.commit('setIsLoading', false);
        });

        eventBus.$on('categories-select-changed', (categories_id) => {
            this.product.categories_id = categories_id;
        });

        eventBus.$on('subcategories-select-changed', (subcategories) => {
            this.product.subcategories = subcategories;
        });

        if(this.$route.params.id){
            eventBus.$emit('get', this.$route.params.id); // Captured on components/form/Form
        }

        if(this.$route.name == 'new-product'){
            this.renderSelects = true;
            this.$store.commit('setIsLoading', false);
        }
    },
    methods: {
        save(){
            let params = this.product;
            let formData = new FormData();

            for (var key in params) {
                formData.append(key, params[key]);
            }

            if(params.subcategories){
                params.subcategories.forEach((m) => {
                    formData.append('subcategories[]', m);
                });
            }

            if(params.medias){
                params.medias.forEach((m) => {
                    formData.append('medias[]', m);
                });
            }

            eventBus.$emit('save', formData);
        },
        update(){
            let params = this.product;
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
