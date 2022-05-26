<template>
  <div class="comment">
    <span class="index">{{ index+1 }}</span>
    <span class="meta">
      <router-link class="info" :to="{ path: '/users/' + comment.user_id }">{{ comment.username_creator }}</router-link>
      | {{ comment.created_at.slice(0,10) }}
      | <font-awesome-icon icon="fa-solid fa-newspaper" @click="submissionComment"/>
      | {{ comment.points }} points

      <template v-if="comment.username_creator!='uwu'">
        <template v-if="voted">
          <font-awesome-icon icon="fa-solid fa-heart" color="#ff6600" @click="unvote" />
        </template>
        <template v-else>
          <font-awesome-icon icon="fa-regular fa-heart" color="#ff6600" @click="vote" />
        </template>
      </template>
    </span>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Com',
  props: [
    'comment',
    'index'
  ],
  data: function () {
    return {
      error: '',
      allCommentsVoted: [],
      voted: false
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/5/upvotedComments', {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allCommentsVoted = response.data.data
        for (var i = 0; i < this.allCommentsVoted.length; i++) {
          if (this.allCommentsVoted[i].id === this.comment.id) {
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
        .put('https://glacial-basin-96462.herokuapp.com/api/comments/' + this.comment.id + '/upvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.comment.points = response.data.data.points
          this.voted = true
        })
        .catch(error => {
          this.error = error
        })
    },
    unvote () {
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/comments/' + this.comment.id + '/unvote', [], {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
        .then(response => {
          this.comment.points = response.data.data.points
          this.voted = false
        })
        .catch(error => {
          this.error = error
        })
    },
    submissionComment () {
      router.push('/submissions/' + this.comment.submission_id)
    }
  }
}
</script>

<style scoped>
.comment {
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
.comment a {
  color: #34495e;
  font-weight: 600;
  text-decoration: none;
}
.comment a span {
  font-size: 0.85em;
  margin-left: 10px;
  color: #828282;
}
.comment .meta {
  font-size: 0.85em;
  color: #828282;
}
.comment .meta .info {
  font-size: 0.85em;
  font-weight: 600;
  color: #828282;
}
.comment .url {
  font-size: 0.85em;
  color: #828282;
  font-style: italic;
}
</style>
