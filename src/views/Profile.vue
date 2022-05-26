<template>
	<div class="profile">
    <template v-if="allProfile.id==5">
      <h2>My Profile <font-awesome-icon icon="fa-solid fa-user" color="#ff6600"/></h2>
    </template>
    <template v-else>
      <h2>{{allProfile.username}}'s Profile <font-awesome-icon icon="fa-solid fa-user" color="#ff6600"/></h2>
    </template>
		<form @submit="updateUser">
      <br>
      <div>
        <label class="info">User: </label>
        <label> {{ allProfile.username }} </label>
      </div>
      <div>
        <label class="info">Email: </label>
        <label> {{ allProfile.email }} </label>
      </div>
      <template v-if="allProfile.id==5">
        <div>
          <label class="info">API-KEY: </label>
          <label> {{ allProfile.api_key }} </label>
        </div>
      </template>
      <div>
        <label class="info">Created: </label>
        <label> {{ allProfile.created_at }} </label>
      </div>
      <template v-if="allProfile.id==5">
        <div>
          <label class="info">Karma: </label>
          <label> {{ allProfile.karma }} </label>
        </div>
      </template>
      <div>
        <label class="info">About: </label>
        <template v-if="allProfile.id==5">
          <textarea type="textarea" cols="45" rows="4" v-model="about"></textarea>
        </template>
        <template v-else>
          <label> {{ allProfile.about }} </label>
        </template>
      </div>
      <template v-if="allProfile.id==5">
        <div>
          <label class="info">Showdead: </label>
          <template v-if="true">
            <select name="showdead" v-model="showdead">
              <option value="true" selected>yes</option>
              <option value="false">no</option>
            </select>
          </template>
          <template v-else>
            <select name="showdead" v-model="showdead">
              <option value="true">yes</option>
              <option value="false" selected>no</option>
            </select>
          </template>
        </div>
        <div>
          <label class="info">Noprocrast: </label>
          <template v-if="true">
            <select name="noprocrast" v-model="noprocrast">
              <option value="true" selected>yes</option>
              <option value="false">no</option>
            </select>
          </template>
          <template v-else>
            <select name="noprocrast" v-model="noprocrast">
              <option value="true">yes</option>
              <option value="false" selected>no</option>
            </select>
          </template>
        </div>
        <div>
          <label class="info">Maxvisit: </label>
          <input type="number" min="0" step="1" v-model="maxvisit">
        </div>
        <div>
          <label class="info">Minaway: </label>
          <input type="number" min="0" step="1" v-model="minaway">
        </div>
        <div>
          <label class="info">Delay: </label>
          <input type="number" min="0" step="1" v-model="delay">
        </div>
      </template>
      <br>
      <router-link :to="{path: '/users/' + allProfile.id + '/submissions'}" class="pure-menu-link">Submissions</router-link>
      <router-link :to="{path: '/users/' + allProfile.id + '/comments'}" class="pure-menu-link">Comments</router-link>
      <template v-if="allProfile.id==5">
        <router-link :to="{path: '/users/' + allProfile.id + '/upvotedSubmissions'}" class="pure-menu-link">Upvoted submissions</router-link>
        <router-link :to="{path: '/users/' + allProfile.id + '/upvotedComments'}" class="pure-menu-link">Upvoted comments</router-link>
      </template>
      <br>
      <template v-if="allProfile.id==5">
        <div>
          <label></label>
          <button>Update User</button>
        </div>
      </template>
    </form>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data: function () {
    return {
      error: '',
      allProfile: [],
      about: '',
      showdead: false,
      noprocrast: false,
      maxvisit: 0,
      minaway: 0,
      delay: 0
    }
  },
  created: function () {
    axios
      .get('https://glacial-basin-96462.herokuapp.com/api/users/' + this.$route.params.id, {headers: {'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'}})
      .then(response => {
        this.allProfile = response.data.data
        this.allProfile.created_at = this.allProfile.created_at.slice(0, 10)
        this.about = this.allProfile.about
        this.showdead = this.allProfile.showdead
        this.noprocrast = this.allProfile.noprocrast
        this.maxvisit = this.allProfile.maxvisit
        this.minaway = this.allProfile.minaway
        this.delay = this.allProfile.delay
      })
      .catch(error => {
        this.error = error
      })
  },
  methods: {
    updateUser (e) {
      e.preventDefault()
      let config = {
        headers: {
          'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'
        }
      }
      let data = {
        about: this.about,
        showdead: this.showdead,
        noprocrast: this.noprocrast,
        maxvisit: this.maxvisit,
        minaway: this.minaway,
        delay: this.delay
      }
      axios
        .put('https://glacial-basin-96462.herokuapp.com/api/users/' + this.$route.params.id, data, config)
        .then(response => {
          console.warn(response)
        })
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>

<style scoped>
.profile {
  background-color: #fffcf0;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
  font-size: 0.85em;
  font-weight: 530;
  color: #34495e;
}
div {
  margin-bottom: 10px;
}
.info {
  display: inline-block;
  width: 150px;
  text-align: right;
  font-weight: 600;
}
button {
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 12px;
  color: black;
  font-weight: bold;
}
</style>
