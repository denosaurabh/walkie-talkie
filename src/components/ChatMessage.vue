<template>
  <div class="message" :class="{ 'from-user': owner }">
    {{ message.text }}
    <br />

    <audio v-if="message.audioURL" :src="message.audioURL" controls></audio>
    <br />

    <span class="sender">from UID {{ message.sender }}</span>
  </div>
</template>

<script>
export default {
  props: ["message", "owner"],
};
</script>

<style>
.message {
  height: fit-content;
  max-width: 50%;
  min-width: fit-content;

  text-align: left;
  color: black;
  border-radius: 5px;

  padding: 1rem;
  margin: 1rem;

  color: var(--green);
  border: 2px solid var(--green);

  margin-left: 0;
  margin-right: auto;
}
.from-user {
  margin-left: auto;
  margin-right: 0;

  color: #fff;
  background-color: var(--green);
}
.sender {
  font-size: 0.8rem;
  color: var(--parrot-green);
}
</style>