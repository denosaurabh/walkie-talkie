<template>
  <main class="section">
    <h1 class="secondary">
      Welcome to ChatRoom.vue
      <u>{{ chatId }}</u>
    </h1>

    <User #user="{ user }">
      <div v-if="user">
        <ul class="message-ul">
          <ChatMessage
            v-for="message of messages"
            :key="message.id"
            :message="message"
            :owner="user.uid === message.sender"
          />
        </ul>

        <div class="send-box">
          <input v-model="newMessageText" class="message-input" />
          <button
            :disabled="!newMessageText || loading"
            class="send-button is-success"
            type="text"
            @click="addMessage(user.uid)"
          >Send</button>
          &nbsp;
          &nbsp;
          &nbsp;

          <button v-if="!recorder" @click="record()" class="orange-button">Record Voice</button>
          <button v-else @click="stop()" class="red-button">Stop</button>

          <audio v-if="newAudio" :src="newAudioURL" controls></audio>
        </div>
      </div>

      <Login v-else />
    </User>
  </main>
</template>

<script>
import User from "./User.vue";
import ChatMessage from "./ChatMessage.vue";
import Login from "./Login.vue";
import { db, storage } from "../firebase";

export default {
  components: {
    User,
    Login,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection("messages");
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    },
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy("createdAt").limitToLast(50),
    };
  },
  methods: {
    async addMessage(uid) {
      this.loading = true;

      let audioURL = null;

      const { id: messageId } = this.messagesCollection.doc();

      if (this.newAudio) {
        const storageRef = storage
          .ref("chats")
          .child(this.chatId)
          .child(`${messageId}.wav`);

        await storageRef.put(this.newAudio);

        audioURL = await storageRef.getDownloadURL();
      }

      await this.messagesCollection.doc(messageId).set({
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      });

      this.loading = false;
      this.newMessageText = "";
      this.newAudio = null;
    },
    async record() {
      this.newAudio = null;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });

      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    },
  },
};
</script>