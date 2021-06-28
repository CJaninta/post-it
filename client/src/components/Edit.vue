<template>
  <span>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="action" v-bind="attrs" v-on="on">
          <v-icon style="color: #ffd92e;">mdi-pencil-box-multiple</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <h3 class="update">Update post !</h3>
        </v-card-title>
        <v-divider class="divide"></v-divider>
        <v-card-text>
          <h2 class="label-text" style="margin-top:20px">Username</h2>
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
        </v-card-text>

        <v-divider class="divide"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn" color="primary" text @click="updatePost(post._id)">
            <h3 class="btn-text">Update</h3>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import axios from "axios";
export default {
  name: "edit",
  data() {
    return {
      username: "",
      topic: "",
      text: "",
      dialog: false,
    };
  },
  methods: {
    async updatePost(id) {
      let text = "Failed to update post !";
      let status_delete = false;
      await axios
        .put(process.env.VUE_APP_API_ROOT + "/post/" + id, {
          username: this.username,
          topic: this.topic,
          text: this.text,
        })
        .then((res) => {
          text = "Updated post !";
          status_delete = true;
          console.log(res.data.message);
        })
        .catch((err) => {
          status_delete = false;
          console.log(err);
        });
      this.dialog = false;
      this.$emit("update", text, status_delete);
    },
  },
  mounted() {
    this.username = this.post.username;
    this.topic = this.post.topic;
    this.text = this.post.text;
  },
  props: {
    post: Object,
  },
};
</script>

<style>
.divide {
  background-color: #f7cb07;
}
.label-text {
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  text-align: left;
  margin-bottom: 20px;
}
.btn {
  background-color: #f7cb07;
}
.btn:hover {
  background-color: #eeeeee;
}
.btn-text {
  font-weight: bold;
  color: #eeeeee;
}
.btn-text:hover {
  color: #f7cb07;
}
.update {
  color: #f7cb07;
  width: 100%;
  font-weight: bold;
  text-align: center;
}
.action {
  margin-left: 10px;
  font-size: 20px;
  float: right;
  top: -5px;
}
</style>
