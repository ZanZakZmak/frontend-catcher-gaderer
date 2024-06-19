<template>
  <nav>
    <v-app-bar dark app>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>Mama</span> <span class="font-weight-light">Mia</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="store.searchTerm"
        solo
        hide-details
        dense
        label="Pretraga (ime,lokacija,naziv BG, title)"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="logOut()">
        <v-icon left>mdi-logout-variant</v-icon> <span>Logout</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app absolute temporary>
      <v-list>
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          router
          :to="route.routePath"
        >
          <v-list-item-action>
            <v-icon> {{ route.icon }} </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ route.name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import store from "@/store.js";
export default {
  data() {
    return {
      store,
      drawer: false,
      routes: [
        { icon: "mdi-view-dashboard", name: "landing Page", routePath: "/" },
        {
          icon: "mdi-view-dashboard",
          name: "posts",
          routePath: "/posts",
        },
        { icon: "mdi-view-dashboard", name: "info forum", routePath: "/info" },
        {
          icon: "mdi-view-dashboard",
          name: "enciclopedia",
          routePath: "/encyclopedia",
        },
        { icon: "mdi-view-dashboard", name: "edit profile", routePath: "/" },
        {
          icon: "mdi-view-dashboard",
          name: "register",
          routePath: "/register",
        },
        { icon: "mdi-view-dashboard", name: "log-in", routePath: "/login" },
      ],
    };
  },
  methods: {
    logOut() {
      console.log("signed out");
    },
  },
};
</script>
