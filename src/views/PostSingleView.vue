<template>
  <div>
    <!--content start-->
    <v-container fill-height fluid>
      <v-row>
        <v-col cols="12" sm="9" md="9" xs="12" align="center" justify="center">
          <v-container fill-height fluid class="align-start">
            <v-col cols="12">
              <h1>
                <!--mdi mdi-dice-5-outline-->
                <v-icon color="black" large> mdi mdi-message-text</v-icon>
                {{ postInfo.title }}
              </h1>
              <v-divider class="mb-2"></v-divider>

              <v-row>
                <v-col cols="12" sm="4">
                  <v-card height="250px" width="350px">
                    <v-img :src="postInfo.imgUrl" height="250px"></v-img
                  ></v-card>
                </v-col>
                <v-col cols="12" sm="8">
                  <h2 v-if="postInfo.type == 'social'">
                    Area:
                    <v-chip color="teal darken-3" class="white--text">
                      <h2>{{ postInfo.area }}</h2>
                    </v-chip>
                  </h2>
                  <h2 v-if="postInfo.type == 'info'">
                    Type of Forum post:

                    <v-icon
                      color="teal darken-4"
                      x-large
                      v-if="postInfo.infoType == 'info'"
                    >
                      mdi mdi-information-outline
                    </v-icon>
                    <v-icon
                      color="teal darken-4"
                      x-large
                      v-if="postInfo.infoType == 'question'"
                    >
                      mdi mdi-chat-question-outline
                    </v-icon>
                    <v-chip color="teal darken-3" class="white--text">
                      <h2>{{ postInfo.infoType }}</h2>
                    </v-chip>
                  </h2>
                  <v-spacer></v-spacer>

                  <h2>
                    Created By:
                    <v-chip color="teal darken-3" class="white--text">
                      <h2>{{ postInfo.createdby }}</h2>
                    </v-chip>
                  </h2>

                  <v-spacer></v-spacer>
                  <h2>
                    Date:
                    <v-chip color="teal darken-3" class="white--text">
                      <h2>{{ formatStandardTime(postInfo.createdTime) }}</h2>
                    </v-chip>
                  </h2>
                </v-col>
              </v-row>
              <v-divider class="mb-7"></v-divider>

              <h2>Description:</h2>
              <v-card color="teal" class="white--text">
                <h3 style="max-height: 150px; overflow-y: auto">
                  {{ postInfo.text }}
                </h3>
              </v-card>
              <v-divider class="mb-7"></v-divider>

              <v-row>
                <v-chip
                  class="pa-5 mx-auto mb-4"
                  color="teal darken-4"
                  dark
                  v-for="category in postInfo.category"
                  :key="category"
                >
                  <v-icon
                    color="teal lighten-4"
                    large
                    v-if="category == 'fish'"
                  >
                    mdi mdi-fish
                  </v-icon>
                  <v-icon
                    color="teal lighten-4"
                    large
                    v-if="category == 'fungi'"
                    >mdi mdi-mushroom</v-icon
                  >
                  <v-icon
                    color="teal lighten-4"
                    large
                    v-if="category == 'herb'"
                  >
                    mdi mdi-sprout
                  </v-icon>
                  <h1>{{ category }}</h1></v-chip
                >
              </v-row>
            </v-col>
          </v-container>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          md="3"
          xs="12"
          align="center"
          justify="center"
          class="overflow-auto"
          max-height="500px"
        >
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
                    Add Comment
                  </v-btn>
                </template>
                <!---->
                <v-card dark>
                  <v-card-title>
                    <span class="text-h5">Comment on post</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="formValid">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-textarea
                              v-model="commentText"
                              label="Description"
                              hint="Hint text"
                              :rules="[rules.required]"
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
                      @click="addComment()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
          <!--end-->

          <v-card
            v-for="comment in postInfo.comments"
            :key="comment.id"
            dark
            elevation="5"
            class="my-2"
            max-height="200px"
          >
            <v-card-title
              class="justify-end pr-1 pt-2"
              v-if="comment.createdById == auth.user.id"
            >
              <v-btn
                class="mx-2"
                fab
                dark
                color="red darken-2"
                x-small
                @click="deleteComent(postInfo.id, comment.id)"
              >
                <v-icon dark> mdi mdi-close-thick</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text style="max-height: 100px; overflow-y: auto">{{
              comment.text
            }}</v-card-text>
            <v-card-actions color="red--text">
              <h5 color="red--text">
                {{
                  formatTimestamp(comment.createdTime) +
                  " by " +
                  comment.createdBy
                }}
              </h5>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--end-->
  </div>
</template>
<script>
import moment from "moment";
import { Posts, Auth } from "@/services";
export default {
  name: "PostSingle",
  data() {
    return {
      //store,
      auth: Auth.state,
      RouteID: this.$route.params.id,
      postInfo: {},
      //dialog comment
      //za toggle dialoga
      dialog: false,
      //form validity
      formValid: false,
      rules: {
        required: (value) => !!value || "Required.",
        requiredArr: (value) => value?.length >= 1 || "Required.",
        //isCroppa: (value)=>{},
      },

      commentText: null,
    };
  },
  methods: {
    //get one post
    async getPostSingle(postId) {
      let data = await Posts.Social.getOne(postId);
      this.postInfo = {
        type: data.type,
        area: data.area,
        infoType: data.infoType,
        category: [...data.category],
        comments: [...data.comments], //nez dali treba deepcopy napraviti
        createdBy: data.createdBy,
        createdById: data.createdById,
        createdTime: data.createdTime,
        imgUrl: data.imgUrl,
        text: data.text,
        title: data.title,
        id: data._id,
      };
    },
    //dell post

    //add comment
    async addComment() {
      let commentData = {
        text: this.commentText,
        createdBy: Auth.getUser().username,
        createdById: Auth.getUser().id,
        createdTime: Date.now(),
        postId: this.RouteID,
      };
      await Posts.Comments.add(this.RouteID, commentData);
      this.closeDialog();
      this.refresh();
    },
    //delete coment?
    async deleteComent(postId, commentId) {
      //let postId = this.postInfo.id;
      //stavit provjeru negdje
      await Posts.Comments.delete(postId, commentId);
      this.refresh();
    },
    closeDialog() {
      this.commentText = null;
      this.dialog = false;
    },
    formatTimestamp(timestamp) {
      //.fromNow()
      return moment(timestamp).fromNow();
    },
    formatStandardTime(time) {
      return moment(time).format("MMMM Do YYYY, h:mm:ss a");
    },
    refresh() {
      this.getPostSingle(this.RouteID);
    },
  },
  async mounted() {
    this.getPostSingle(this.RouteID);
    console.log("this is the id", this.RouteID);
  },
};
/* 

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
                      <!--<croppa v-model="myCroppa"></croppa>-->
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        v-model="areaForm"
                        :items="[
                          'Buje',
                          'Buzet',
                          'Labin',
                          'Novigrad',
                          'Pazin',
                          'Poreč',
                          'Pula',
                          'Rovinj',
                          'Umag',
                          'Vodnjan',
                        ]"
                        label="area*"
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

*/
</script>
