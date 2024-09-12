<template>
  <div>
    <v-btn @click="postData()">postaj</v-btn>
    <v-btn @click="deleteData()">delete post</v-btn>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { Service, Posts } from "@/services";

//console.log("kakav je test: ", test);
//console.log("kakav je test: ", objekt);

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  methods: {
    /*

    getData() {
      fetch("http://localhost:3000/data")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Podaci s backenda", data);
        });
    },
    async getDataAxsios() {
      let data = await Posts.getAll("nesto");
      console.log("Podaci s backenda hom viev", data);
      //return response.json();
    },
    async postData() {
      let post = {
        createdBy: "this.store.userEmail",
        postedAt: Date.now(),
        source: "url",
        title: "this.title",
      };
      let newpost = await Posts.add(post);
      console.log("Spremljeni post", newpost.data);
    },
    async deleteData() {
      let postID = "660ddd823f6e4b29cb9d2ad8";
      let newpost = await Posts.delete(postID);
      console.log("Spremljeni post", newpost.data);
    },
    */
  },
  mounted() {
    //this.getData();
    //this.getDataAxsios();
  },
};
</script>
