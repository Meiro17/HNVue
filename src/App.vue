<template>
  <div id="app">
    <navigationBar></navigationBar>
    <router-view/>
  </div>
</template>

<script>
import navigationBar from './components/navigationBar.vue'

export default {
  name: 'App',
  components: {
    navigationBar
  }
}
</script>

<style>

</style>
