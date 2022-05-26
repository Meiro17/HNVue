<template>
	<div class="submit">
    <h2>Submit <font-awesome-icon icon="fa-solid fa-paper-plane" color="#ff6600"/></h2>
		<form @submit="submitSubmission">
      <br>
      <div>
        <label>Title: </label>
        <input type="text" v-model="title" required>
      </div>
      <div>
        <label>Url: </label>
        <input type="url" v-model="url">
      </div>
      <div>
        <label>Text: </label>
        <textarea type="text" rows="1" cols="22" v-model="text"></textarea>
      </div>
      <br>
      <div>
        <label></label>
        <button>Submit</button>
      </div>
    </form>
	</div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Submit',
  data () {
    return {
      title: '',
      url: '',
      text: ''
    }
  },
  methods: {
    submitSubmission (e) {
      e.preventDefault()
      let config = {
        headers: {
          'Authorization': 'p4lbnDQ_rETPDFWlSVNXAw'
        }
      }
      let data = {
        title: this.title,
        text: this.text,
        url: this.url
      }
      axios
        .post('https://glacial-basin-96462.herokuapp.com/api/submissions', data, config)
        .then(response => {
          console.warn(response)
          if (response.data.message === 'Submission with url already exists') router.push('/submissions/' + response.data.data.id)
          else router.push('/newest')
        })
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>

<style scoped>
.submit {
  background-color: #fffcf0;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
  font-size: 0.85em;
  font-weight: 530;
  color: #34495e;
}
.btn {
  border-radius: 4px;
  background-color: #c7770f;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
div {
  margin-bottom: 10px;
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
