<template>
	<div>
		<item v-for="(submission, index) in allSubmissions" :key="submission.id" :submission="submission" :index="index"></item>
	</div>
</template>

<script>
import axios from 'axios'
import Item from '@/components/Item.vue'

export default {
  name: 'Submissions',
  components: {
    'item': Item
  },
  data: function () {
    return {
      error: '',
      allSubmissions: []
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/' + this.$route.params.id + '/submissions', {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allSubmissions = response.data.data
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>

<style scoped>

</style>
