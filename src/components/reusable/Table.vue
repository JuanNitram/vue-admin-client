<template>

    <v-card>

        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details/>
        </v-card-title>

        <v-data-table :headers="headers" :items="items" :search="search" ref="sortableTable">
            <template slot="items" slot-scope="props">

                <tr class="sortableRow" :active="!!selected && selected.name == props.item.name" :key="props.item.id" :id="'row-' + props.item.id" @click="rowSelected(props.item)">

                    <td v-for="header in headers" :class="header.value == 'id' || header.value == 'drag'? 'text-xs-left' : ''">
                        <div v-if="header.value == 'drag'">
                            <v-btn style="cursor: move" icon class="sortHandle"><v-icon>drag_handle</v-icon></v-btn>
                        </div>
                        <div v-else-if="header.value == 'media'">
                            <div v-if="props.item.media.length">
                                <img :src="props.item.media[0].full_url" height="24" width="24" />
                            </div>
                        </div>
                        <div v-else-if="header.value == 'active'">
                            <v-icon v-if="props.item.active">check_circle_outline</v-icon>
                            <v-icon v-else>highlight_off</v-icon>
                        </div>
                        <div v-else >
                            {{ props.item[header.value]}}
                        </div>
                    </td>

                </tr>
            </template>

            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>

    </v-card>

</template>

<script>
    import Sortable from 'sortablejs'
    import eventBus from '../../EventBus.js'

    export default {
        props: {
            headers: Array,
        },
        data(){
            return {
                section: this.$route.meta.section,
                selected: {},
                search: '',
                items: [],
                itemKeys: new WeakMap(),
                currentItemKey: 0,
                url: this.$store.state.baseUrl + '/' + this.$route.meta.section,
            }
        },
        created(){
            this.$http.get(this.url).then((response) => {
                let res = response.data;
                if(res.success){
                    this.items = res.data[this.section];
                }
                this.$store.commit('setIsLoading', false);
            });

            eventBus.$off('form-new').$once('form-new', (component) => {
                if(component && component == this.section)
                    this.$router.push(this.section + '/new')
            });

            eventBus.$off('form-edit').$once('form-edit', (component) => {
                if(component && component == this.section)
                    this.$router.push(this.section + '/edit/' + this.selected.id)
            });


            eventBus.$off('save-orer').$once('save-order', (component) => {
                if(component && component == this.section){
                    this.$http.post(this.url + '/save-order', { items: this.items }).then((response) => {
                        let res = response.data;
                        this.$store.commit('setIsLoading', false);
                    });
                }
            });

            eventBus.$off('remove').$on('remove', (component) => {
                if(component && component == this.section){
                    this.$http.post(this.url + '/remove/' + this.selected.id).then((response) => {
                        let res = response.data;
                        document.getElementById('row-' + this.selected.id).parentNode.removeChild(document.getElementById('row-' + this.selected.id));
                        this.$store.commit('setIsLoading', false);
                    });
                }
            });

        },
        mounted(){
            new Sortable(
                this.$refs.sortableTable.$el.getElementsByTagName('tbody')[0],
                {
                    draggable: '.sortableRow',
                    handle: '.sortHandle',
                    onEnd: this.dragReorder
                }
            );
        },
        methods: {
            rowSelected(item){
                this.selected = item;
                eventBus.$emit('row-selected'); // Captured on component/Actionbar
            },
            dragReorder ({oldIndex, newIndex}) {
                eventBus.$emit('order-changed'); // Captured on components/ActionBar
                const movedItem = this.items.splice(oldIndex, 1)[0];
                this.items.splice(newIndex, 0, movedItem);
                this.items[newIndex].changed = true;
            },
            itemKey (item) {
                if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
                    return this.itemKeys.get(item)
            }
        }
    }

</script>
