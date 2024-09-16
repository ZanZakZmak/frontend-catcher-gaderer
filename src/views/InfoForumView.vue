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
              Add Post
            </v-btn>
          </template>
          <!---->
          <v-card dark>
            <v-card-title>
              <span class="text-h5">Add a New Post</span>
            </v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="titleForm"
                        label="Title*"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div>add image</div>
                      <croppa v-model="myCroppa"></croppa>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        v-model="infoTypeForm"
                        :items="['question', 'info']"
                        label="question or advice*"
                        :rules="[rules.required, rules.requiredArr]"
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        v-model="categoryForm"
                        :items="['fish', 'herb', 'fungi']"
                        label="categories*"
                        multiple
                        :rules="[rules.required, rules.requiredArr]"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Description"
                        v-model="textForm"
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
                @click="addPost()"
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
              max-width="400"
              dark
              v-for="post in posts"
              :key="post.id"
            >
              <v-img :src="post.imgUrl" height="200px"></v-img>

              <v-card-title> {{ post.title }} </v-card-title>
              <!--class="d-flex justify-end"-->
              <v-card-subtitle class="d-flex">
                <v-icon
                  color="teal lighten-3"
                  large
                  v-if="post.infoType == 'info'"
                >
                  mdi mdi-information-outline
                </v-icon>
                <v-icon
                  color="teal lighten-3"
                  large
                  v-if="post.infoType == 'question'"
                >
                  mdi mdi-chat-question-outline
                </v-icon>
                <v-spacer></v-spacer>
                open
                <v-btn
                  color="teal lighten-3"
                  icon
                  @click="gotoOnePost(post.id)"
                >
                  <v-icon>mdi mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-subtitle>

              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item>
                    <v-textarea solo disabled v-model="post.text"></v-textarea>
                  </v-list-item>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-chip
                v-for="item in post.category"
                :key="item"
                class="ma-1"
                color="teal darken-1"
              >
                {{ item }}
              </v-chip>
              <v-divider></v-divider>

              <v-card-actions class="justify-end">
                {{
                  formatTimestamp(post.createdTime) + " By " + post.createdBy
                }}
                <v-spacer></v-spacer>
                coments: {{ post.comments.length }}
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

            <v-card-subtitle>Type of forum post</v-card-subtitle>
            <v-select
              v-model="filterInfoType"
              :items="['question', 'info']"
              chips
              label="Select type"
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
import { Posts, Auth } from "@/services";
import { ref, uploadBytes, getDownloadURL, storage } from "../../firebase.js";
import store from "@/store.js";
import moment from "moment";

export default {
  name: "InfoForum",

  components: {},
  data() {
    return {
      store,
      auth: Auth.state,
      posts: null,

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
      titleForm: null,
      textForm: null,
      imgUrlForm:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/1920px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg",

      infoTypeForm: null,
      categoryForm: null,

      //filteri
      filterCategory: null,
      filterInfoType: null,
    };
  },

  watch: {
    "store.searchTerm": function () {
      this.trigerFunction();
    },
    //"store.searchTerm": function(val) {this.fetchPosts(val)}
  },
  methods: {
    async getPosts() {
      let search = store.searchTerm;
      //ako koristim string
      function changeToString(arr) {
        if (arr === null) {
          return null;
        } else {
          return arr.toString();
        }
      }
      console.log("filter categori ", this.filterCategory);

      let filters = {
        infoTypeFilter: this.filterInfoType,
        categoryFilter: changeToString(this.filterCategory),
      };
      let data = await Posts.Info.getAll(search, filters);

      //use {...} for objects or deep clone for all layers <let cloneObject = JSON.parse(JSON.stringify(oldObject));>
      //this.posts = [...data];
      //map
      this.posts = data;
      console.log(data);
    },
    async addPost() {
      let doc = {
        type: "info",
        title: this.titleForm,
        text: this.textForm,
        imgUrl: await this.uploadCroppedImage(),
        createdBy: Auth.getUser().username,
        createdById: Auth.getUser().id,
        createdTime: Date.now(),
        infoType: this.infoTypeForm,
        category: [...this.categoryForm],
        comments: [],
      };
      let data = await Posts.Info.add(doc);
      console.log(data);
      if (data) {
        this.closeDialog();
        this.refresh();
      }
    },
    gotoOnePost(postId) {
      this.$router.push(`/post/${postId}`);
    },
    //croppa
    getImageBlob() {
      return new Promise((resolve, error) => {
        this.myCroppa.generateBlob((blob) => {
          resolve(blob);
        });
      });
    },
    async uploadCroppedImage() {
      try {
        let blobData = await this.getImageBlob();
        let imageName =
          "postImage/" + this.auth.user.username + Date.now() + ".png";
        //const storage = getStorage();
        const imagesRef = ref(storage, imageName);
        await uploadBytes(imagesRef, blobData).then((result) => {
          //console.log("Uploaded a blob or file!", result);
        });
        let imageUrl = await getDownloadURL(ref(storage, imageName));

        return imageUrl;
      } catch (error) {
        console.log("add social post eror->", error);
        return null;
      }
    },
    //filter
    filterPosts() {
      //pozvati get
      this.getPosts();
    },
    clearFilter() {
      this.filterCategory = null;
      this.filterInfoType = null;
      //pozvati get
      this.getPosts();
    },
    //dialog
    closeDialog() {
      //postavi vrijedosti na null
      this.titleForm = null;
      this.textForm = null;
      this.infoTypeForm = null;
      this.categoryForm = null;
      this.myCroppa.remove();
      //zatvoriti dialog
      this.dialog = false;
    },

    formatTimestamp(timestamp) {
      //.fromNow()
      return moment(timestamp).fromNow();
    },

    //za watcher
    trigerFunction() {
      console.log("ovo se traži :", store.searchTerm);
      this.getPosts();
      return store.searchTerm;
    },
    refresh() {
      this.getPosts();
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
