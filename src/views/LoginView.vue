<template>
  <v-container fill-height fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="card-border" width="600px" outlined dark>
          <v-card-title align="left">LOGIN</v-card-title>
          <v-card-subtitle align="left"> Deer user, plz login </v-card-subtitle>
          <v-card-text class="card-text-border">
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                dense
                label="Email"
                clearble
                type="text"
                :rules="[rules.required, rules.email]"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                dense
                label="Password"
                clearble
                :rules="[rules.required, rules.min]"
                outlined
              ></v-text-field>
            </v-form>

            <v-card-subtitle
              >Alredy have an account go to
              <v-chip @click="goToRegister()" color="blue">log in</v-chip>
            </v-card-subtitle>
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn @click="logIn" :disabled="!valid" outlined> OK </v-btn>
          </v-card-actions>
        </v-card>
        <!--snacbar warning-->
        <template>
          <div class="text-center ma-2">
            <v-snackbar v-model="snackbar" timeout="3000" color="red">
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="black"
                  text
                  v-bind="attrs"
                  @click="
                    snackbar = false;
                    text = '';
                  "
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { Auth } from "@/services";

export default {
  name: "Login",

  components: {
    HelloWorld,
  },
  data() {
    return {
      //form
      valid: true,
      email: null,
      password: null,
      // snackbar data
      snackbar: false,
      text: "",

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v?.length >= 6 || "Min 6 characters",
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      },
    };
  },
  methods: {
    async logIn() {
      try {
        let result = await Auth.login(this.email, this.password);
        console.log("dali sam ulogiran ", result);
        if (result === true) {
          this.$router.push({ name: "posts" });
        }
      } catch (error) {
        console.log("error:", error);
        //snackbar aktivirati kod errora
        this.text = "Wrong email or Password";
        this.snackbar = true;
      }
    },
    goToRegister() {
      this.$router.push(`/register`);
    },
  },
  mounted() {},
};
</script>
