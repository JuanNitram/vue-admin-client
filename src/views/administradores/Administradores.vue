<template>
    <div v-bind:class="{ d_none: this.$store.getters.isLoading }">
        <Actionbar :component="'Administradores'"/>
        <v-layout row pa-2>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td >{{ props.item.types_id }}</td>
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
                { text: 'Name', align:'middle', value: 'name' },
                { text: 'Email', align:'middle', value: 'email' },
                { text: 'Type', align:'middle', value: 'type' },
            ],
            items: []
        }
    },
    created(){
        eventBus.$once('form-new', (component) => {
            console.log(component);
            if(component && component == 'Administradores')
                this.$router.push('/admins/new')
        });
    },
    mounted() {
        this.$http(this.$store.state.baseUrl + '/admin/admins').then((response) => {
            let res = response.data;
            if(res.success){
                this.items = res.data.admins;
            }
            this.$store.commit('setIsLoading', false);
        });
    }
}
</script>
