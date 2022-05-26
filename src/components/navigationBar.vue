<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container">
			<a><img :src="require('@/assets/logo.png')" width="18" height="18" style="border:1px white solid;"></a>
      <router-link :to="{path: '/'}" class="pure-menu-heading pure-menu-link">Hacker News</router-link>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link :to="{path: '/newest'}" class="pure-menu-link">new</router-link>
        </li>
				|
        <li class="pure-menu-item">
          <router-link :to="{path: '/users/5/comments'}" class="pure-menu-link">threads</router-link>
        </li>
				|
				<li class="pure-menu-item">
          <router-link :to="{path: '/comments'}" class="pure-menu-link">comments</router-link>
        </li>
				|
				<li class="pure-menu-item">
          <router-link :to="{path: '/ask'}" class="pure-menu-link">ask</router-link>
        </li>
				|
				<li class="pure-menu-item">
          <router-link :to="{path: '/submit'}" class="pure-menu-link">submit</router-link>
        </li>
        |
        <li class="pure-menu-item">
          <router-link :to="{path: '/users/5'}" class="pure-menu-link"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.pure-menu {
  background-color: #ff6600;
}
.pure-menu-heading {
  color: black;
  font-weight: bold;
}
.pure-menu-item a {
  color: black;
}
.pure-menu-link:hover {
  background-color: #ff6600;
}
.pure-menu-link:focus {
  background-color: #ff6600;
  color: white;
}
</style>
