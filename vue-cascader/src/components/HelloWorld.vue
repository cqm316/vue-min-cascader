<template>
    <div id="hello">
        {{info}}{{msg}}
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        data(){
            return { info:'敏爷' }
        },
        props:{
            msg: String
        }
    }
</script>

<style scoped>

</style>
