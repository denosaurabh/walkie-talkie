<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id" class="">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{ chat.id }}</router-link>
      </li>
      <button @click="createChatRoom()" class="chat-room">Create New Chat Room</button>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebase";

export default {
  data() {
    return {
      chats: [],
    };
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },
  methods: {
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });

      console.log(newChat);
    },
  },
  props: ["uid"],
};
</script>
