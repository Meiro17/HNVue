<template>
	<div>
		<itemCom v-for="(thread, index) in allThreads" :key="thread.id" :comment="thread" :index="index"></itemCom>
  </div>
</template>

<script>
import axios from 'axios'
import Com from '../components/Com.vue'

export default {
  name: 'Threads',
  components: {
    'itemCom': Com
  },
  data: function () {
    return {
      error: '',
      allThreads: []
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/5/comments', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allThreads = response.data.data
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>

<style scoped>

</style>
