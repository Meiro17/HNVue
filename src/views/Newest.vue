<template>
	<div>
		<item v-for="(newest, index) in allNewest" :key="newest.id" :submission="newest, index"></item>
	</div>
</template>

<script>
import axios from 'axios'
import Item from '@/components/Item.vue'

export default {
  name: 'Newest',
  components: {
    'item': Item
  },
  data: function () {
    return {
      error: '',
      allNewest: []
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/submissions/newest', {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allNewest = response.data.data
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>

<style scoped>

</style>
