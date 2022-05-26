<template>
  <div class="submission">
    <span class="index">{{ index+1 }}</span>
    <router-link :to="{ path: '/submissions/' + submission.id }">{{ submission.title }}</router-link>
    <span class="url"><a :href="submission.url">{{ submission.url | host }}</a></span>
    <br />
    <span class="meta">
      {{submission.points}} points
      by <router-link class="info" :to="{ path: '/users/' + submission.user_id }">{{ submission.username_creator }}</router-link>
      | {{ submission.created_at.slice(0,10) }}
      |
      <router-link class="info" :to="{ path: '/submissions/' + submission.id }">{{submission.numComments }} comments</router-link>
      <template v-if="submission.username_creator!='uwu'">
        |
        <template v-if="voted">
          <font-awesome-icon icon="fa-solid fa-heart" color="#ff6600" @click="unvote" />
        </template>
        <template v-else>
          <font-awesome-icon icon="fa-regular fa-heart" color="#ff6600" @click="vote" />
        </template>
      </template>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Item',
  props: [
    'submission',
    'index'
  ],
  data: function () {
    return {
      error: '',
      allSubmissionsVoted: [],
      voted: false
    }
  },
  created: function () {
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
    vote () {
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.submission.id + '/upvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.submission.points = response.data.data.points
          this.voted = true
        })
        .catch(error => {
          this.error = error
        })
    },
    unvote () {
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/submissions/' + this.submission.id + '/unvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.submission.points = response.data.data.points
          this.voted = false
        })
        .catch(error => {
          this.error = error
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
}
.index {
  color: #ff6600;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}
.submission a {
  color: #34495e;
  font-weight: 600;
  text-decoration: none;
}
.submission a span {
  font-size: 0.85em;
  margin-left: 10px;
  color: #828282;
}
.submission .meta {
  font-size: 0.85em;
  color: #828282;
}
.submission .meta .info {
  font-size: 0.85em;
  font-weight: 600;
  color: #828282;
}
.submission .url {
  font-size: 0.85em;
  color: #828282;
  font-style: italic;
}
</style>
