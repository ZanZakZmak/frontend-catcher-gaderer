<template>
  <div>
    <v-divider class="my-2"></v-divider>

    <!--content start-->
    <v-container fill-height fluid>
      <v-row>
        <v-col cols="12" xs="12" md="3" sm="3">
          <!--width="auto" full width za uredit kartice na kraju-->
          <!--ELEM session card-->
          <v-row>
            <v-card class="mx-auto mb-4" width="250" dark>
              <v-card-title> User Info </v-card-title>

              <v-card-subtitle align="start" justify="center">
                Email:
                <v-chip>
                  {{ auth.user.email }}
                </v-chip>
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-card-subtitle align="start" justify="center">
                Username:
                <v-chip>
                  {{ auth.user.username }}
                </v-chip>
              </v-card-subtitle>
              <v-divider></v-divider>
            </v-card>
          </v-row>
        </v-col>

        <v-col cols="12" xs="12" md="9" sm="9" align="center" justify="center">
          <!--ELEM Filter card za sessions-->
          <v-card dark height="auto" min-width="300" class="pa-3">
            <v-card-title>Edit profile</v-card-title>
            <v-divider></v-divider>

            <v-card-subtitle>Change Username</v-card-subtitle>
            <v-row class="my-3">
              <v-col cols="9">
                <v-form v-model="formValidName">
                  <v-text-field
                    v-model="newUsername"
                    label="write new username"
                    type="text"
                    dense
                    clearable
                    outlined
                    class="mx-3"
                    :rules="[rules.required]"
                  />
                </v-form>
              </v-col>

              <v-col cols="1">
                <v-btn
                  class="mx-3"
                  color="teal lighten-1"
                  @click="changeUsername()"
                  :disabled="!formValidName"
                  >apply</v-btn
                >
              </v-col>
            </v-row>

            <v-divider></v-divider>
            <v-card-subtitle>Change Email</v-card-subtitle>
            <v-row class="my-3">
              <v-form v-model="formValidEmail">
                <v-text-field
                  v-model="newEmail"
                  label="write new email"
                  type="text"
                  dense
                  clearable
                  outlined
                  class="mx-3"
                  :rules="[rules.required, rules.email]"
                />
              </v-form>
              <v-btn
                class="mx-3"
                color="teal lighten-1"
                :disabled="!formValidEmail"
                @click="changeEmail()"
                >apply</v-btn
              >
            </v-row>

            <v-divider></v-divider>

            <v-card-subtitle>Change Password</v-card-subtitle>
            <v-row class="my-3">
              <v-form v-model="formValidPassword">
                <v-text-field
                  v-model="newPassword"
                  label="write new password"
                  type="text"
                  dense
                  clearable
                  outlined
                  class="mx-3"
                  :rules="[rules.required, rules.min]"
                />

                <v-text-field
                  v-model="newPasswordRepeat"
                  label="repeat new password"
                  type="text"
                  dense
                  clearable
                  outlined
                  class="mx-3"
                  :rules="[rules.required, rules.min]"
                />
              </v-form>
              <v-btn
                class="mx-3"
                color="teal lighten-1"
                @click="changePassword()"
                :disabled="!formValidPassword || !isPasswordSame"
                >apply</v-btn
              >
            </v-row>

            <v-divider></v-divider>

            <v-card-subtitle
              >Old Password write the password to change previous
              atributes</v-card-subtitle
            >
            <v-row class="my-3">
              <v-form v-model="formValidOldPassword">
                <v-text-field
                  v-model="oldPassword"
                  label="write old password"
                  type="text"
                  dense
                  clearable
                  outlined
                  class="mx-3"
                  :rules="[rules.required, rules.min]"
                />
              </v-form>
            </v-row>

            <v-card-actions> </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--end-->
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
  </div>
</template>

<script>
import store from "@/store";
import { Auth } from "@/services";

export default {
  name: "EditProfile",

  components: {},
  data() {
    return {
      store,
      auth: Auth.state,
      // snackbar data
      snackbar: false,
      text: "",
      // form data
      newUsername: null,
      newEmail: null,
      newPassword: null,
      newPasswordRepeat: null,
      oldPassword: null,
      //form validity
      formValidName: false,
      formValidEmail: false,
      formValidPassword: false,
      formValidOldPassword: false,

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
  computed: {
    isPasswordSame: function () {
      return this.newPassword == this.newPasswordRepeat;
    },
  },
  methods: {
    async changeUsername() {
      if (this.formValidOldPassword && this.formValidName) {
        let result = await Auth.changeUsername(
          this.newUsername,
          this.oldPassword
        );
        this.snackbar = true;
        this.text = result;
      } else {
        this.snackbar = true;
        this.text = "molim vas upišite lozinku  i info u određena polja";
      }
    },

    async changePassword() {
      if (this.formValidOldPassword && this.formValidPassword) {
        let result = await Auth.changePassword(
          this.newPassword,
          this.oldPassword
        );
        this.snackbar = true;
        this.text = result;
      } else {
        this.snackbar = true;
        this.text = "molim vas upišite lozinku  i info u određena polja";
      }
    },

    async changeEmail() {
      if (this.formValidOldPassword && this.formValidEmail) {
        let result = await Auth.changeEmail(this.newEmail, this.oldPassword);
        this.snackbar = true;
        this.text = result;
      } else {
        this.snackbar = true;
        this.text = "molim vas upišite lozinku  i info u određena polja";
      }
    },
  },
  beforeCreate() {},
};
</script>
