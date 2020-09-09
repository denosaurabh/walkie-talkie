<template>
  <div>
    <span>
      Logged in as
      <i>{{ user.uid }}</i>
    </span>
    <br />
    <button @click="auth.signOut()" class="sign-out">Sign Out</button>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      auth,
    };
  },
  props: ["user"],
};
</script>
