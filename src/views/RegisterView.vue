<template>
  <v-container fill-height fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="card-border" width="600px" outlined dark>
          <v-card-title align="left">REGISTER</v-card-title>
          <v-card-subtitle align="left">
            Register to enjoy the app
          </v-card-subtitle>
          <v-card-text>
            <!--v-model="valid" cleareble krivo upisan-->
            <v-form v-model="valid">
              <v-text-field
                v-model="userName"
                dense
                label="UserName"
                clearble
                type="text"
                outlined
                :rules="[rules.required]"
              ></v-text-field>
              <!--:rules="[rules.required, rules.email]"-->

              <v-text-field
                required
                v-model="email"
                dense
                label="email"
                clearble
                type="text"
                outlined
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                dense
                label="password"
                clearble
                :rules="[rules.required, rules.min]"
                outlined
              ></v-text-field>
            </v-form>
            <v-card-subtitle
              >Alredy have an account go to
              <v-chip @click="goToLogin()" color="blue">log in</v-chip>
            </v-card-subtitle>
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn
              class="btn-right-margin"
              @click="clearDataFromRegisterForm"
              color="red darken-3"
              outlined
            >
              CLEAR
            </v-btn>

            <v-btn :disabled="!valid" outlined @click="register"> OK </v-btn>
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
import { Auth } from "@/services";
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Posts",

  components: {
    HelloWorld,
  },
  data() {
    return {
      //form
      valid: true,
      email: null,
      password: null,
      userName: null,
      showIcon: true,
      //regEX exspresions for rules
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v?.length >= 6 || "Min 6 characters",
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      },
      // snackbar data
      snackbar: false,
      text: "",
    };
  },
  methods: {
    //popraviti ovu metodu poslje i u ruteru await
    async register() {
      try {
        await Auth.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        //polje napraviti ovaj dio
        let result = await Auth.login(this.email, this.password);

        console.log("dali sam ulogiran ", result);
        if (result === true) {
          this.$router.push({ name: "posts" });
        }
      } catch (error) {
        console.log("error: ", error);
        //snackbar aktivirati kod errora
        this.text = "Wrong email or Password";
        this.snackbar = true;
      }
    },
    clearDataFromRegisterForm() {
      this.email = null;
      this.password = null;
      this.userName = null;
    },
    goToLogin() {
      this.$router.push(`/login`);
    },
  },
  mounted() {},
};
</script>
<style>
.card-border {
  padding: 2%;
}

.card-text-border {
  padding: 2.5%;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-right-margin {
  margin-right: 2%;
}
</style>
