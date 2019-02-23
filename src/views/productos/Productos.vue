<template>
    <div v-bind:class="{ d_none: this.$store.getters.isLoading }">
        <Actionbar :component="'Productos'"/>
        <v-layout row pa-2>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details ></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="items" :search="search">
                        <template slot="items" slot-scope="props">
                            <tr :active="!!selected && selected.name == props.item.name" @click="rowSelected(props.item)">
                                <td class="text-xs-left">{{ props.item.id }}</td>
                                <td>
                                    <div v-if="props.item.media.length">
                                        <img :src="props.item.media[0].full_url" height="24" width="24" />
                                    </div>
                                </td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.description }}</td>
                                <td>
                                    <v-icon v-if="props.item.active">check_circle_outline</v-icon>
                                    <v-icon v-else>highlight_off</v-icon>
                                </td>
                            </tr>
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Actionbar from '../../components/Actionbar'
import eventBus from '../../EventBus.js'

export default {
    components: {
        Actionbar
    },
    data () {
        return {
            search: '',
            headers: [
                { text: 'Id', align: 'left', value: 'id'},
                { text: '', align: 'middle', value: ''},
                { text: 'Name', align:'middle', value: 'name' },
                { text: 'Description', align:'middle', value: 'description' },
                { text: 'Activo', align:'middle', value: 'active' },
            ],
            items: [],
            selected: {},
        }
    },
    created(){
        eventBus.$once('form-new', (component) => {
            if(component && component == 'Productos')
                this.$router.push('/products/new')
        });
        eventBus.$once('form-edit', (component) => {
            if(component && component == 'Productos')
                this.$router.push('/products/edit/' + this.selected.id)
        });
        eventBus.$once('form-edit', (component) => {
            if(component && component == 'Productos')
                this.$router.push('/products')
        });
    },
    mounted() {
        this.$http(this.$store.state.baseUrl + '/admin/products').then((response) => {
            let res = response.data;
            if(res.success){
                this.items = res.data.products;
            }
            this.$store.commit('setIsLoading', false);
        });
    },
    methods:{
        rowSelected(item){
            this.selected = item;
            eventBus.$emit('row-selected'); // Captured on component/Actionbar
        }
    }
}
</script>
