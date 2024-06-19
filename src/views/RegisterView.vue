<template>
  <div>
    <v-text-field v-model="email" label="email" outlined> </v-text-field>
    <v-text-field v-model="password" label="passsword" outlined> </v-text-field>
    <v-btn>register</v-btn>
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Posts",

  components: {
    HelloWorld,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {},
  mounted() {},
};
</script>
