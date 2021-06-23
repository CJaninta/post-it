<template>
  <div>
    <h2 class="label-text">Username</h2>
    <v-text-field
      ref="username"
      v-model="username"
      solo
      label="Username...."
      clearable
      class="v-text"
    ></v-text-field>
    <h2 class="label-text">Topic</h2>
    <v-text-field
      v-model="topic"
      solo
      label="Topic...."
      clearable
      class="v-text"
    ></v-text-field>
    <h2 class="label-text">Text area</h2>
    <v-textarea
      v-model="text"
      class="v-text"
      solo
      name="input-7-4"
      label="Text...."
    ></v-textarea>

    <v-card-actions class="area-btn">
      <v-btn
        rounded
        x-large
        class="btn"
        color="rgba(255, 204, 255, 0.5)"
        :loading="loading"
        :disabled="loading"
        @click="post"
      >
        <h1>Post</h1>
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout="alert_timeout">
      <h3 :style="[status_post ? { color: '#B2FF59' } : { color: '#FFCDD2' }]">
        {{ alert_text }}
      </h3>

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Post",
  data() {
    return {
      username: "",
      topic: "",
      text: "",
      loading: false,
      snackbar: false,
      alert_text: "",
      alert_timeout: 1500,
      status_post: false,
    };
  },
  methods: {
    async post() {
      this.loading = !this.loading;
      this.snackbar = true;
      this.status_post = false;
      if (this.username === "" || this.topic === "" || this.text === "") {
        this.alert_text = "Please fill all required fields.";
        return;
      }
      this.alert_text = "Completely fill information!";
      await axios
        .post(process.env.VUE_APP_API + "/createPost", {
          username: this.username,
          topic: this.topic,
          text: this.text,
        })
        .then((res) => {
          this.status_post = true;
          console.log(res.data.message);
        })
        .catch((err) => {
          this.alert_text = "Failed to fill information!";
          console.log(err);
        });
      this.username = "";
      this.topic = "";
      this.text = "";
    },
  },
  watch: {
    loading() {
      setTimeout(() => (this.loading = false), 1000);
    },
  },
};
</script>

<style scoped>
.label-text {
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  text-align: left;
  margin-bottom: 20px;
  color: #eeeeee;
}

.v-text {
  width: 25vw;
  font-family: "Quicksand", sans-serif;
}

.btn {
  width: 20vw;
  font-family: "Quicksand", sans-serif;
}

.btn h1 {
  color: #eeeeee;
  font-weight: bold;
}

.area-btn {
  justify-content: center;
}
</style>
