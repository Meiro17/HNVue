<template>
  <div class="submission">
    <h2>
      {{ submission.title }}
      <template v-if="submission.username_creator!='uwu'">
        <template v-if="voted">
            <font-awesome-icon icon="fa-solid fa-heart" color="#ff6600" @click="unvote" />
        </template>
        <template v-else>
          <font-awesome-icon icon="fa-regular fa-heart" color="#ff6600" @click="vote" />
        </template>
      </template>
    </h2>
    <h3>
      <template v-if="submission.url">
        <span><a :href="submission.url" class="url">({{ submission.url }})</a></span>
      </template>
      <span class="meta">
        {{submission.points}} points
        by <router-link class="info" :to="{ path: '/users/' + submission.user_id }">{{ submission.username_creator }}</router-link>
        | {{ submission.created_at.slice(0,10) }}
        |
        <router-link class="info" :to="{ path: '/submissions/' + submission.id }">{{submission.numComments }} comments</router-link>
      </span>
    </h3>

    <div>
      <form @submit="submitComment">
        <textarea type="textarea" cols="97" rows="5" v-model="content"></textarea>
        <br />
        <button>Add comment</button>
      </form>
    </div>
    <br />
    <br />
    <div>
      <submissionComment v-for="(comment) in comments" :key="comment.id" :comment="comment"></submissionComment>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SubmissionComment from '@/components/SubmissionComment.vue'

export default {
  name: 'Submission',
  components: {
    'SubmissionComment': SubmissionComment
  },
  data: function () {
    return {
      submission: {},
      comments: [],
      allSubmissionsVoted: [],
      content: '',
      voted: false
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.$route.params.id, {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then((response) => {
        this.submission = response.data.data
        axios.get('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.$route.params.id + '/comments', {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
          .then((response) => {
            this.comments = response.data.data
          }).catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/5/upvotedSubmissions', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allSubmissionsVoted = response.data.data
        for (var i = 0; i < this.allSubmissionsVoted.length; i++) {
          if (this.allSubmissionsVoted[i].id === this.submission.id) {
            this.voted = true
            return true
          }
        }
      })
      .catch(error => {
        this.error = error
      })
  },
  methods: {
    submitComment (e) {
      let config = {
        headers: {
          'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'
        }
      }
      let data = {
        content: this.content,
        submission_id: this.submission.id
      }
      axios
        .post('https://glacial-basin-96462.herokuapp.com/api/comments', data, config)
        .then(response => {
          location.reload()
        })
        .catch(error => {
          this.error = error
        })
    },
    vote () {
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.$route.params.id + '/upvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.submission.points = response.data.data.points
          this.voted = true
        })
        .catch(error => {
          this.error = error
          console.log(error)
        })
    },
    unvote () {
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.$route.params.id + '/unvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.submission.points = response.data.data.points
          this.voted = false
        })
        .catch(error => {
          this.error = error
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.submission {
  background-color: #fffcf0;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
  font-size: 0.85em;
  font-weight: 530;
  color: #34495e;
}
.title {
  font-size: 20px;
}
label {
  display: inline-block;
  width: 150px;
  text-align: right;
}
button {
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 12px;
  color: black;
  font-weight: bold;
}
.submission .meta {
  font-size: 0.85em;
  color: #828282;
}
.submission .meta .info {
  font-size: 0.9em;
  font-weight: 600;
  color: #828282;
}
.submission .url {
  font-size: 0.9em;
  color: #828282;
}
</style>
