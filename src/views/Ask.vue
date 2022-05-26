<template>
	<div>
		<item v-for="(submission, index) in allAsk" :key="submission.id" :submission="submission, index"></item>
	</div>
</template>

<script>
import axios from 'axios'
import Item from '@/components/Item.vue'

export default {
  name: 'Ask',
  components: {
    'item': Item
  },
  data: function () {
    return {
      error: '',
      allAsk: []
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/submissions/ask', {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allAsk = response.data.data
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>

<style scoped>

</style>
