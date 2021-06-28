<template>
  <div data-app>
    <list-posts :posts="posts" @update="getPost" />
  </div>
</template>

<script>
import ListPosts from "@/components/List-posts.vue";
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      posts: [],
    };
  },
  components: {
    ListPosts,
  },
  methods: {
    getPost() {
      axios
        .get(process.env.VUE_APP_API_ROOT + "/post")
        .then((res) => {
          const { data } = res;
          this.posts = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getPost();
  },
};
</script>
