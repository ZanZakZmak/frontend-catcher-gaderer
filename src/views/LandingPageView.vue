<template>
  <div>
    <h1>Welcome to ChacherGaderer</h1>
    <v-divider class="ma-3"></v-divider>

    <v-container fill-height fluid class="background teal lighten-1">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12" md="8" sm="8" xs="12"
          ><v-img
            lazy-src="@/assets/logo.png"
            max-height="400"
            max-width="400"
            src="@/assets/logo.png"
          ></v-img>
        </v-col>
        <!--Optional Chaining (?.): A modern JavaScript feature that avoids errors when trying to access properties on null or undefined objects.-->
        <v-col
          v-show="!auth.authenticated"
          align="center"
          justify="center"
          cols="12"
          md="4"
          sm="4"
          xs="12"
        >
          <v-card color="teal darken-3">
            <v-card-title><h1>Prijavite se</h1></v-card-title>
            <v-card-text><h2>I vi se Pridružite Rekreativcima</h2></v-card-text>
            <v-card-actions>
              <v-container>
                <v-row
                  ><v-col
                    ><v-btn to="/register" color="teal lighten-3"
                      >Register</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row
                  ><v-col
                    ><v-btn to="/login" color="teal lighten-3"
                      >LogIn</v-btn
                    ></v-col
                  >
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col align="start" justify="center" cols="12">
          <v-card color="teal darken-1">
            <v-card-title><h1>Intro o stranici</h1> </v-card-title>
            <v-card-text>
              <h2>
                Ovo je stranica predviđena za ljubitelje skuplanja namjernica iz
                prirode
              </h2>
              <h2>
                Pomoću nje moći ćete se lakse naći informacije o ovim plemenitim
                hobijim te djeliti iskustva sa ljubiteljima.
              </h2>
              <h2>
                Također imate mogućnost postavljanja pitanja u komentarima.
              </h2>
              <h2>
                Te možete ubaciti i vrste razlicitih namjernica poput riba,
                gljiva Te zaćinskog bilja u nasu app.
              </h2>
              <h2>Pridružite se i vi te zbližite se sa prirodom sa nama.</h2>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";

import { Auth } from "@/services";

export default {
  name: "LandingPage",

  components: {},
  data() {
    return {
      store,
      auth: Auth.state,
    };
  },
};
</script>
