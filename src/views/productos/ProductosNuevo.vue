<template>
    <div>
        <Form :component="'FormProductos'"/>
    </div>
</template>

<script>
    import Form from '../../components/form/Form'
    export default {
        components: {
            Form,
        }
    }
</script>
