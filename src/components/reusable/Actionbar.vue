<template>
    <v-layout row pa-2>
        <v-flex xs12>
            <div class="text-sm-left text-xs-left">
                <v-btn color="primary" fab dark @click="formNew">
                    <v-icon>add</v-icon>
                </v-btn>
                <v-btn v-bind:class="{ d_none: !this.rowSelected }" color="primary" fab dark @click="formEdit">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn v-bind:class="{ d_none: !this.orderChanged }" color="blue-grey" fab dark @click="saveOrder">
                    <v-icon>reorder</v-icon>
                </v-btn>
                <v-btn v-bind:class="{ d_none: !this.rowSelected }" color="error" fab dark @click="remove">
                    <v-icon>delete</v-icon>
                </v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import eventBus from '../../EventBus.js'
export default{
    data(){
        return {
            rowSelected: false,
            orderChanged: false,
        }
    },
    props: {
        component: String,
    },
    created(){
        eventBus.$once('row-selected', () => {
            this.rowSelected = true;
        });
        eventBus.$once('order-changed', () => {
            this.orderChanged = true;
        });
    },
    methods: {
        formNew(){
            this.$store.commit('setIsLoading', true);
            eventBus.$emit('form-new', this.component); // Captured on Products
        },
        formEdit(){
            this.$store.commit('setIsLoading', true);
            eventBus.$emit('form-edit', this.component); // Capture on Products
        },
        remove(){
            this.$store.commit('setIsLoading', true);
            eventBus.$emit('remove', this.component); // Captured on Products
        },
        saveOrder(){
            this.$store.commit('setIsLoading', true);
            eventBus.$emit('save-order', this.component); // Captured on Products
        }
    }
}
</script>

<style lang="css" scoped>
    .d_none{
        display: none!important;
    }
</style>
