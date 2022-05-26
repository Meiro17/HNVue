<template>
	<div class="comment-wrap">
		<div class="comment-block">
			<p>{{ comment.content }}</p>
			<div class="bottom-comment">
				<span>{{ comment.username_creator}}</span>
				|
				<span>{{ comment.created_at.slice(0, 10)}}</span>
				|
				<span>{{ comment.points}} points </span>
				<template v-if="comment.username_creator!='uwu'">
					|
					<template v-if="voted">
						<font-awesome-icon icon="fa-solid fa-heart" color="#ff6600" @click="unvote" />
					</template>
					<template v-else>
						<font-awesome-icon icon="fa-regular fa-heart" color="#ff6600" @click="vote" />
					</template>
				</template>
				<br>
				<div>
					<label></label>
					<form @submit="addReply">
						<textarea type="textarea" v-model="content"></textarea>
						<br />
						<button>Add reply</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SubmissionComment',
  props: [
    'comment'
  ],
  data: function () {
    return {
      error: '',
      allCommentsVoted: [],
      content: '',
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
    addReply (e) {
      let config = {
        headers: {
          'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'
        }
      }
      let data = {
        content: this.content,
        submission_id: this.comment.submission_id,
        parent_id: this.comment.id
      }
      axios
        .post('https://glacial-basin-96462.herokuapp.com/api/comments', data, config)
        .then(response => {
          location.reload()
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
  font-size: 0.85em;
  font-weight: 530;
  color: #34495e;
}
.comment-wrap {
  margin-bottom: 1.25rem;
  display: table;
  width: 40%;
  min-height: 5.3125rem;
}
.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.comment-block textarea {
  width: 100%;
  resize: none;
}
.comment-text {
  margin-bottom: 1.25rem;
}
.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}
.comment-date {
  float: left;
}
.comment-actions {
  float: right;
}
.comment-actions li {
  display: inline;
  margin: -2px;
  cursor: pointer;
}
.comment-actions li.complain {
  padding-right: 0.75rem;
  border-right: 1px solid #e1e5eb;
}
.comment-actions li.reply {
  padding-left: 0.75rem;
  padding-right: 0.125rem;
}
.comment-actions li:hover {
  color: #0095ff;
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
</style>
