<template>
  <div class="index">
    <HelloWorld>
    </HelloWorld>
    <router-view></router-view>
  </div>

</template>
<script>
    import HelloWorld from '@/components/HelloWorld'

    export default {
        name: 'index',
        data() {
            return {}
        },
        methods: {},
        components: {
            HelloWorld,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
