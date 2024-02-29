<script  lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/login/LoginView.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    LoginView,
    RouterLink,
    RouterView
  },
  data: function () {
    return {
      isAuthenticated: false
    }
  },
  computed: {
    ...mapGetters("auth", ["getAuthentication"])
  },
  created() {
    this.isAuthenticated = !!this.getAuthentication
    if (this.isAuthenticated) {
      this.$router.push("/home");
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout")
      this.isAuthenticated = false;
    },
    checkAuth(auth) {
      console.log('Authenticated!', auth)
      this.isAuthenticated = auth;
    }
  }
}
</script>

<template>
  <div v-if="isAuthenticated">
    <header>
      <div class="header-navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <button @click="logout();">Logout</button>
    </header>

    <RouterView />
  </div>
  <LoginView v-else :is-authenticated="isAuthenticated" @authenticate="checkAuth($event)" />
</template>