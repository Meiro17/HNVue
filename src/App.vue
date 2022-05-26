<template>
  <div id="app">
    <nav></nav>
    <router-view />
  </div>
</template>

<script>
import navigationBarVue from './components/navigationBar.vue';

export default {
  name: 'App',
  components: {
    'nav': navigationBarVue
  }
}
</script>

<style>

</style>
