<template>
  <aside class="section">
    <h2>Sign in Anonymously</h2>
    <button class="sign-in" @click="auth.signInAnonymously()">Sign In</button>

    <div v-if="newUser">
      <h2>Sign Up for a New Account</h2>
      <a href="#" class="action" @click="newUser = false">Returning User?</a>
      <br />
    </div>

    <div v-else>
      <h2>Sign In with Email</h2>
      <a href="#" class="action" @click="newUser = true">New user?</a>
      <br />
    </div>

    <br />
    <input v-model="email" placeholder="email" type="email" class="input" />

    <br />
    <input v-model="password" placeholder="password" type="password" class="input" />
    <br />

    <button
      class="log-in is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >{{ newUser ? "Sign Up" : "Login" }}</button>

    <p class="danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
      newUser: false,
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    async signInOrCreateUser() {
      this.loading = true;
      this.errorMessage = "";
      try {
        if (this.newUser) {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
        } else {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        }
      } catch (error) {
        this.errorMessage = error.message;
      }

      this.loading = false;
    },
  },
};
</script>
