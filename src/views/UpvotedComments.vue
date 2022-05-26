<template>
	<div>
    <itemCom v-for="(comment, index) in allComments" :key="comment.id" :comment="comment" :index="index"></itemCom>
  </div>
</template>

<script>
import axios from 'axios'
import Com from '../components/Com.vue'

export default {
  name: 'UpvotedComments',
  components: {
    'itemCom': Com
  },
  data: function () {
    return {
      error: '',
      allComments: []
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/5/upvotedComments', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allComments = response.data.data
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>

<style scoped>

</style>
