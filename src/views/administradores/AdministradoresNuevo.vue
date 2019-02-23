<template>
    <div>
        <Form :component="'FormAdministradores'"/>
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
