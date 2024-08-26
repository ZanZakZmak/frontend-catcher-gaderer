<template>
  <div>
    <v-container v-for="post in posts" :key="post.title">{{
      post
    }}</v-container>
    <v-container>{{ store }}</v-container>
  </div>
</template>

<script>
import { Posts } from "@/services";
import store from "@/store.js";
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Posts",

  components: {
    HelloWorld,
  },
  data() {
    return {
      store,
      posts: null,
      filterdPosts: null,
    };
  },
  /*computed: {
    trigerFunction() {
      console.log("ovo se traži :", store.searchTerm);
      return store.searchTerm;
    },
  },*/
  watch: {
    "store.searchTerm": function () {
      this.trigerFunction();
    },
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  methods: {
    async getPosts() {
      let title = "narnia";
      let filters = {
        key1: true,
        key2: "lisausringu1,lisausringu2",
        key3: undefined,
      };
      let data = await Posts.getAll1(title, filters);

      //this.posts = [...data];
      this.posts = data;
      console.log(data);
    },
    trigerFunction() {
      console.log("ovo se traži :", store.searchTerm);
      return store.searchTerm;
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
