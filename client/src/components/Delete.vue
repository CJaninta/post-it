<template>
  <span>
    <v-dialog v-model="dialog" width="500" class="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon class="action" v-bind="attrs" v-on="on">
          <v-icon style="color: #F06292;">mdi-close-box</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <h3 class="del">Delete post !</h3>
        </v-card-title>
        <v-divider class="divide"></v-divider>
        <v-card-text>
          <h2 class="topic">
            <i class="far fa-comment-dots"></i> Topic : {{ post.topic }}
          </h2>
          <h4 class="text">{{ post.text }}</h4>
        </v-card-text>

        <v-divider class="divide"></v-divider>

        <v-card-actions>
          <v-spacer class="user">
            <v-icon class="user-icon">mdi-account-circle-outline</v-icon>
            {{ post.username }} :
            <h6 style="display:inline;">{{ formatDate(post.updatedAt) }}</h6>
          </v-spacer>
          <v-btn class="btn" text @click="deletePost(post._id)">
            <h3 class="btn-text">Delete</h3>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "delete",
  props: {
    post: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async deletePost(id) {
      let text = "Failed to delete post !";
      let status_delete = false;
      await axios
        .delete(process.env.VUE_APP_API + "/deletePost/" + id)
        .then((res) => {
          text = "Delete post !";
          status_delete = true;
          console.log(res.data.message);
        })
        .catch((err) => {
          status_delete = false;
          console.log(err);
        });
      console.log(text);
      this.dialog = false;
      this.$emit("delete", text, status_delete);
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY - HH:mm:ss");
    },
  },
};
</script>

<style scoped>
.divide {
  background-color: #e57373;
}
.user-icon {
  margin-right: 5px;
  font-weight: bold;
  font-size: 20px;
  color: #7785cb;
}
.user {
  text-align: start;
  font-weight: bold;
  color: #7785cb;
}
.text {
  text-align: center;
  margin: 20px 0px;
}
.topic {
  width: 100%;
  text-align: start;
  margin: 20px 0px;
}
.del {
  width: 100%;
  font-weight: bold;
  color: #e57373;
  text-align: center;
}
.btn {
  background-color: #e57373;
}
.btn:hover {
  background-color: #eeeeee;
}
.btn-text {
  font-weight: bold;
  color: #eeeeee;
}
.btn-text:hover {
  color: #e57373;
}
.action {
  margin-left: 10px;
  font-size: 20px;
  float: right;
  top: -5px;
}
</style>
