<template>
  <v-app>
    <Navbar />
    <v-main class="background teal lighten-1">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: { Navbar },

  data: () => ({
    //
  }),
};
</script>
