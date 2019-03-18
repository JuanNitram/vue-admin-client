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
                { text: 'Name', align:'middle', value: 'name' },
                { text: 'Email', align:'middle', value: 'email' },
                { text: 'Type', align:'middle', value: 'types_id' },
                { text: 'Active', align:'middle', value: 'active' },
            ],
            section: this.$route.meta.section,
        }
    },
    created(){

    }
}
</script>
