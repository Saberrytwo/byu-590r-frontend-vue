  <script  lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import LoginView from './views/login/LoginView.vue'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'App',
    components: {
      LoginView,
      RouterLink,
      RouterView
    },
    data: function () {
    return {
    profileDialog: false,
    profileIsUploading: false,
    verificationEmailLoading: false,
    showEmailNotVerifiedDialog: false,
    showChangeEmailTextField: false,
    changeEmail: false,
    drawer: false,
    successVerificationMessage: '',
    changeEmailRules: [
    value => !!value || 'Required.',
    value => (value && value.length >= 3) || 'Min 3 characters',
    ],
    profile:
    {
    avatar: null,
    name: '',
    title: '',
    icon: 'mdi-account-circle',
    color: 'info'
    },
    profilePictureImage: '',
    emailOfVerification: ''
    }
    },
    computed: {
      ...mapState({
      user() {
      return this.$store.state.user.user;
      },
      auth() {
      return this.$store.state.auth;
      },
      authUser() {
      return this.auth.user;
      },
      isAuthenticated() {
        return this.auth.status.loggedIn && (this.authUser.token !== undefined);
      },
      title() {
      return 'Welcome ' + this.authUser.name + '!'
      },
      avatarURL() {
      console.log(this.auth.user)
      return this.auth.user.avatar;
      }
      }),
      ...mapGetters("auth", ["getAuthentication"])
  },
    methods: {
      async logout() {
        await this.$store.dispatch("auth/logout")
        this.isAuthenticated = false;
      },
      checkAuth(auth) {
        console.log('Authenticated!', auth)
        this.isAuthenticated = auth;
      },
      getCurrentUser() {
        this.profile.name = this.authUser.name;
        this.profile.title = this.title;
        this.$store.dispatch("user/getUser").then(
        (response) => {
        if (response.avatar != null) {
        // debugger
        this.profileIsUploading = true;
        this.$store.commit("auth/uploadAvatarSuccess", response.avatar);
        this.profile.avatar = true
        this.profilePictureImage = this.authUser.avatar;
        this.profileIsUploading = false;
        } else {
          this.profilePictureImage = '';
          this.profile.avatar = response.avatar;
        }
        if (!response.email_verified_at) {
        this.showEmailNotVerifiedDialog = true;
        }
        }
        )
      },
      removeAvatar() {
        this.profileIsUploading = true;
        this.profilePictureImage = false;
        this.$store.dispatch("user/removeAvatar").then(
        (response) => {
        this.$store.commit("auth/uploadAvatarSuccess", response.avatar);
        // debugger
        this.getCurrentUser();
        },

        ).catch((error) => {
        console.log(error);
        alert('Error. Try again');
        });
        this.profileIsUploading = false;
      },
      onAvatarChange(e) {
        var image = e.target.files || e.dataTransfer.files;

        if (!image.length)
        return;
        this.profileIsUploading = true;
        this.$store.dispatch("user/uploadAvatar", image[0], { root: true }).then(
        (response) => {
        this.$store.commit("auth/uploadAvatarSuccess", response.avatar);
        this.profileIsUploading = false;
        this.profilePictureImage = true;
        this.getCurrentUser()
        },

        ).catch((error) => {
        console.log(error);
        alert('Error. Try again');
        this.profileIsUploading = false;
        });
      },
    },
    created() {
        if (this.authUser) {
          this.getCurrentUser();
        }
      },
  }
  </script>

  <template>
    <div v-if="isAuthenticated">
      <v-app>
        <v-app-bar :elevation="0" rounded color="black">
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
            <v-app-bar-title>Application Bar</v-app-bar-title>
            <template v-slot:append>
              <v-btn><RouterLink to="/">Home</RouterLink></v-btn>
              <v-btn><RouterLink to="/about">About</RouterLink></v-btn>
              <button @click="logout();">Logout</button>
              <v-menu offset-y width="500">
                <template v-slot:activator="{ props }">
                  <v-btn icon v-bind="props" :disabled="profileIsUploading">
                    <v-avatar
                      size="32"
                    >
                      <v-progress-circular
                        v-if="profileIsUploading"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                      <v-img
                        v-else-if="profilePictureImage"
                        alt="Avatar"
                        :src=profilePictureImage
                      ></v-img>
                      <v-icon v-else :color=profile.color :icon=profile.icon></v-icon>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>{{
                      "File Input"
                    }}</v-list-item-title>
                  </v-list-item>
                  <v-file-input
                    @change="onAvatarChange"
                  ></v-file-input>
                  <v-list-item><v-btn color="primary" :disabled="profile.avatar === null" @click="removeAvatar">Remove Avatar</v-btn></v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-app-bar>
        <v-main>
          <RouterView />
        </v-main>
      </v-app>
    </div>

    <LoginView v-else :is-authenticated="isAuthenticated" @authenticate="checkAuth($event)" />
  </template>

