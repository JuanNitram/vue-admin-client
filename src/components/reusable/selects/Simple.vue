<template>
    <v-flex xs12>
        <v-select @change="selectChanged" v-model="selected" :items="items" item-text="name" item-value="id" :label="this.label" box outline/>
    </v-flex>
</template>

<script>
import eventBus from '../../../EventBus'
export default {
    props: {
        url: String,
        section: String,
        label: String,
        selectedItem: Number,
    },
    data(){
        return {
            selected: [],
            items: [],
        }
    },
    created(){
        this.$http.get(this.url).then((response) => {
            let res = response.data;
            if(res.success){
                this.items = res.data[this.section];
                if(this.selected)
                    this.selected = this.selectedItem;
            }
        });
    },
    methods:{
        selectChanged(){
            eventBus.$emit(this.section + '-select-changed', this.selected);
        }
    }
}
</script>
