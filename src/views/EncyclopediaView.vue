<template>
  <div>
    <!--dialog start-->
    <template>
      <v-row justify="center" class="my-2">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <!--toglle button-->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-3"
              color="teal darken-3"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Add Item
            </v-btn>
          </template>
          <!---->
          <v-card dark>
            <v-card-title>
              <span class="text-h5">Add a New Encyclopedia Item</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="nameForm"
                        label="Name*"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div>add image</div>
                      <!--<croppa v-model="myCroppa"></croppa>-->
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="nameLatForm"
                        label="Latin Name*"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="namesAltForm"
                        label="Alternative Names*"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        v-model="poisonForm"
                        :items="['poisonous', 'edible']"
                        label="Poisonous*"
                        :rules="[rules.required, rules.requiredArr]"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        v-model="categoryForm"
                        :items="['fish', 'herb', 'fungi']"
                        label="categories*"
                        :rules="[rules.required, rules.requiredArr]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Description"
                        v-model="descriptionForm"
                        hint="Hint text"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog()">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!formValid"
                @click="addEncyclopediaItem()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!--end-->
    <v-divider class="my-2"></v-divider>
    <!--content start-->
    <v-container fill-height fluid>
      <v-row>
        <v-col cols="12" sm="9" md="9" xs="12" align="center" justify="center">
          <v-row>
            <v-card
              class="mx-auto mb-4"
              max-width="270"
              dark
              v-for="eitem in encyclopediaItems"
              :key="eitem.id"
            >
              <v-img :src="eitem.imgUrl" height="200px"></v-img>

              <v-card-title> {{ eitem.name }} </v-card-title>

              <v-card-subtitle> Lat. {{ eitem.nameLat }} </v-card-subtitle>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Alternative names: </v-list-item-title>
                  <v-list-item-title>
                    {{ eitem.namesAlt }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-chip class="ma-1">
                {{ eitem.category }}
              </v-chip>
              <v-divider></v-divider>

              <v-card-actions>
                <v-icon
                  v-if="eitem.poison == 'poisonous'"
                  color="teal lighten-3"
                  >mdi mdi-skull-crossbones-outline</v-icon
                >
                <v-icon v-if="eitem.poison == 'edible'" color="teal lighten-3"
                  >mdi mdi-silverware-fork-knife</v-icon
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="teal lighten-3"
                  icon
                  @click="gotoOneEncyclopediaItem(eitem.id)"
                >
                  <v-icon>mdi mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" md="3" xs="12" align="center" justify="center">
          <v-card dark height="auto" width="250" class="pa-3">
            <!--korak jedan primitivni interface za filtere-->
            <v-card-title>Filers</v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle>Category of ingridients</v-card-subtitle>

            <v-select
              v-model="filterCategory"
              :items="['fish', 'herb', 'fungi']"
              chips
              label="Select categories"
              multiple
              solo
            ></v-select>
            <v-divider></v-divider>

            <v-card-subtitle>Edible</v-card-subtitle>
            <v-select
              v-model="filterPoisonous"
              :items="['poisonous', 'edible']"
              chips
              label="Poisonous"
              solo
            ></v-select>
            <v-card-actions>
              <v-btn color="red darken-1" @click="clearFilter()"> clear </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="teal darken-1" @click="filterPosts()">
                filter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--end-->
  </div>
</template>

<script>
import { Posts, Auth, Encyclopedia } from "@/services";
import store from "@/store.js";
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Encyclopedia",

  components: {
    HelloWorld,
  },
  data() {
    return {
      store,
      posts: null,
      filterdPosts: null,

      encyclopediaItems: null,

      //delete later
      //croppa stvari
      myCroppa: {},
      urlCroppa: null,
      //za toggle dialoga
      dialog: false,
      //form validity
      formValid: false,
      rules: {
        required: (value) => !!value || "Required.",
        requiredArr: (value) => value?.length >= 1 || "Required.",
        //isCroppa: (value)=>{},
      },

      //varijable forme za dodvananje novog posta

      nameForm: null,
      nameLatForm: null,
      namesAltForm: null,
      imgUrlForm:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1920px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",
      poisonForm: null,
      categoryForm: null,
      descriptionForm: null,

      //filteri

      filterPlayersNum: null,

      filterCategory: null,
      filterPoisonous: null,

      filterArea: null,
      //upitni
      fiterTimeframe: null,
      filterSort: null,
    };
  },
  watch: {
    "store.searchTerm": function () {
      this.trigerFunction();
    },
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  methods: {
    //change to encyclopedia
    async getEncyclopediaItem() {
      let search = store.searchTerm;

      console.log("filter categori ", this.filterCategory);

      let filters = {
        poisonousFilter: this.filterPoisonous,
        categoryFilter: this.filterCategory,
      };
      let data = await Encyclopedia.getAll(search, filters);

      //use {...} for objects or deep clone for all layers <let cloneObject = JSON.parse(JSON.stringify(oldObject));>
      //this.posts = [...data];
      //map
      this.encyclopediaItems = data;
      console.log(data);
    },
    async addEncyclopediaItem() {
      let doc = {
        name: this.nameForm,
        nameLat: this.nameLatForm,
        namesAlt: this.namesAltForm,
        imgUrl: this.imgUrlForm,
        poison: this.poisonForm,
        category: this.categoryForm,
        description: this.descriptionForm,
      };
      let data = await Encyclopedia.add(doc);
      console.log(data);
      if (data) {
        this.closeDialog();
      }
    },
    gotoOneEncyclopediaItem(itemId) {
      this.$router.push(`/encyclopedia/${itemId}`);
    },
    //filter
    filterPosts() {
      //pozvati get
      this.getEncyclopediaItem();
    },
    clearFilter() {
      this.filterCategory = null;
      this.filterPoisonous = null;
      //pozvati get
      this.getEncyclopediaItem();
    },
    //dialog
    closeDialog() {
      //postavi vrijedosti na null
      this.nameForm = null;
      this.nameLatForm = null;
      this.namesAltForm = null;
      //this.imgUrlForm=null;
      this.poisonForm = null;
      this.categoryForm = null;
      this.descriptionForm = null;
      // imgUrlForm="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1920px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",

      //zatvoriti dialog
      this.dialog = false;
      this.refresh();
    },
    refresh() {
      this.getEncyclopediaItem();
    },

    trigerFunction() {
      console.log("ovo se traži :", store.searchTerm);
      this.getEncyclopediaItem();
      return store.searchTerm;
    },
  },
  mounted() {
    this.getEncyclopediaItem();
  },
};
</script>
