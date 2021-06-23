<template>
  <div class="list">
    <span class="column" v-for="post in posts" :key="post._id">
      <v-card class="card">
        <v-card-title class="topic">
          <h3><i class="far fa-comment-dots"></i>{{ post.topic }}</h3>
          <span>
            <delete :post="post" @delete="update" />
            <edit :post="post" @update="update"/>
          </span>
        </v-card-title>

        <v-card-text>
          <h3 class="text">
            {{ post.text }}
          </h3>
        </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-content>
              <v-list-item-title class="user">
                <h6 class="time">{{ formatDate(post.updatedAt) }}</h6>
                <v-icon class="user-icon">mdi-account-circle-outline</v-icon>
                {{ post.username }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </span>
    <v-snackbar
      v-model="snackbar"
      :timeout="alert_timeout"
      color="light-green accent-4"
    >
      <h3
        :style="[status ? { color: '#B2FF59' } : { color: '#FFCDD2' }]"
      >
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
import moment from "moment";
import Edit from "./Edit.vue";
import Delete from "./Delete.vue";
export default {
  name: "List-posts",
  data() {
    return {
      snackbar: false,
      alert_text: "",
      alert_timeout: 1500,
      status: false,
    };
  },
  props: {
    posts: Array,
  },
  components: {
    Edit,
    Delete,
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY - HH:mm:ss");
    },
    update(text, status) {
      this.snackbar = true;
      this.alert_text = text;
      this.status = status;
      this.$emit("update");
    },
  },
};
</script>

<style scoped>
.list {
  min-height: 10vh;
  text-align: left;
}
.topic {
  font-weight: bold;
  color: rgb(190, 74, 190);
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 10px;
  float: left;
}
.user-icon {
  margin-right: 8px;
  font-weight: bold;
  font-size: 20px;
  color: #5c6dce;
}
.fa-comment-dots {
  margin-right: 20px;
  font-size: 30px;
}
.text {
  font-weight: normal;
  color: #eeeeee;
  font-weight: bold;
  text-align: center;
}
.user {
  font-weight: bold;
  font-size: 15px;
  color: #5c6dce;
  text-align: right;
}
.card {
  width: 25vw;
  min-height: 30vh;
  margin: 40px;
  box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: #7785cb;
  background-image: linear-gradient(
    43deg,
    #7785cb 0%,
    #dea4d8 46%,
    #e6cb9b 100%
  );
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.column {
  float: left;
  min-width: 33%;
  min-height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 850px) {
  .column {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    justify-content: center;
  }
  .card {
    width: 90vw;
    margin: 20px;
  }
}
</style>
