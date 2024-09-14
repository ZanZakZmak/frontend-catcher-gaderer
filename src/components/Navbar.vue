<template>
  <v-app-bar dark app>
    <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-uppercase grey--text">
      <span>Chacher</span> <span class="font-weight-light">Gaderer</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="store.searchTerm"
      solo
      hide-details
      dense
      label="Pretraga (title,text,createdby)"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn @click="logOut()" v-if="auth.authenticated">
      <v-icon left>mdi-logout-variant</v-icon> <span>Logout</span>
    </v-btn>
    <v-btn v-if="!auth.authenticated">
      <v-icon left>mdi-logout-variant</v-icon> <span>Login</span>
    </v-btn>

    <v-navigation-drawer v-model="drawer" dark app absolute temporary>
      <v-list>
        <!--avatar and text-->
        <v-list-item to="/edit-profile">
          <v-list-item-avatar>
            <!--<v-img src="@/assets/logo.png"></v-img>-->
            <v-icon>mdi mdi-account-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ auth.user.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
  </v-app-bar>
</template>
<script>
import store from "@/store.js";
import { Auth } from "@/services";
export default {
  data() {
    return {
      store: store,
      auth: Auth.state,
      drawer: false,
      routes: [
        {
          icon: "mdi mdi-home-circle-outline",
          name: "landing Page",
          routePath: "/",
        },
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
        {
          icon: "mdi mdi-account-cog",
          name: "edit profile",
          routePath: "/edit-profile",
        },
        /*
        {
          icon: "mdi-view-dashboard",
          name: "register",
          routePath: "/register",
        },
        { icon: "mdi-view-dashboard", name: "log-in", routePath: "/login" },
         */
      ],
    };
  },
  methods: {
    logOut() {
      console.log("signed out");
      console.log("signed out", this.auth.authenticated);
      Auth.logout();
      this.$router.go();
    },
  },
};
</script>
