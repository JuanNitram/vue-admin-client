<template>
    <div v-bind:class="{ d_none: this.$store.getters.isLoading }">
        <Actionbar :component="section"/>
        <v-layout row pa-2>
            <v-flex>

                <Table :headers="headers"/>

            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Actionbar from '../../components/reusable/Actionbar'
import Table from '../../components/reusable/Table'
import eventBus from '../../EventBus.js'

export default {
    components: {
        Actionbar,
        Table
    },
    data () {
        return {
            headers: [
                { text: '', align: 'middle', value: 'drag', sortable: false},
                { text: 'Id', align: 'left', value: 'id'},
                { text: '', align: 'middle', value: 'media', sortable: false},
                { text: 'Name', align:'middle', value: 'name' },
                { text: 'Title', align:'middle', value: 'title' },
                { text: 'Subtitle', align:'middle', value: 'subtitle' },
                { text: 'Activo', align:'middle', value: 'active' },
            ],
            section: this.$route.meta.section,
        }
    },
    created(){
        // TO-DO capture the selected row in the table from $emit Table component
    }
}
</script>
