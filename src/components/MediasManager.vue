<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <div class="text-sm-left">
                    <v-btn @click="triggerInputFiles">
                        <v-icon>
                            backup
                        </v-icon>
                    </v-btn>
                    <input type="file" ref="file" multiple="multiple" id="medias" @change="uploadFieldChange" style="display:none;"/>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <div v-for="(media, index) in   medias">
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-sm-left">
                                <img :src="media.url" class="img-thumbnail" :alt="media.name + ' (' + Number((media.size / 1024 / 1024).toFixed(1)) + 'MB)'"/>
                                <strong>
                                    <span class="label label-primary">{{ media.name | trunc(25, '...') }}</span>
                                </strong>
                                <span style="cursor: pointer;" @click="removeAttachment(media)">
                                    <v-btn flat icon color="black">
                                        <v-icon>remove</v-icon>
                                    </v-btn>
                                </span>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import eventBus from '../EventBus.js'

export default{
    data(){
        return {
            medias: [],
        }
    },
    methods: {
        uploadFieldChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            for (var i = files.length - 1; i >= 0; i--) {
                files[i].url = URL.createObjectURL(files[i]);
                this.medias.push(files[i]);
            }
            document.getElementById("medias").value = [];
            eventBus.$emit('medias-change', this.medias);
        },
        removeAttachment(media) {
            this.medias.splice(this.medias.indexOf(media), 1);
            eventBus.$emit('medias-change', this.medias);
        },
        triggerInputFiles(){
            this.$refs.file.click()
        },
    },
}
</script>

<style>
.img-thumbnail {
    width: 80px;
    height: 80px;
    display: inline;
    vertical-align: middle;
    margin: 10px;
    border-radius: 4px;
}
</style>
