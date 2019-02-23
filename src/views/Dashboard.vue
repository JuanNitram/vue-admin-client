<template>
  <div v-bind:class="{ d_none: this.$store.getters.isLoading }">
    <h1>Dashboard</h1>
  </div>
</template>

<script>
    export default{
        created(){
            this.$store.commit('setIsLoading', false);
        }
    }
</script>
