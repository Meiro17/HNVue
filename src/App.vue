<template>
  <div id="app">
    <nav></nav>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {
  name: 'App',
  components: {
    'nav': NavigationBar
  }
}
</script>

<style>

</style>
