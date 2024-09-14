<template>
  <div>
    <v-container fill-height fluid class="align-start">
      <v-col cols="12">
        <!--
        <v-icon color="black" large v-if="encyclopediaItemInfo.category=='fungi'>mdi mdi-mushroom</v-icon>
          <v-icon color="black" large v-if="encyclopediaItemInfo.category=='herb'>mdi mdi-sprout</v-icon>
        -->
        <h1>
          <v-icon
            color="black"
            large
            v-if="encyclopediaItemInfo.category == 'fish'"
            >mdi mdi-fish</v-icon
          >
          <v-icon
            color="black"
            large
            v-if="encyclopediaItemInfo.category == 'fungi'"
            >mdi mdi-mushroom</v-icon
          >
          <v-icon
            color="black"
            large
            v-if="encyclopediaItemInfo.category == 'herb'"
            >mdi mdi-sprout</v-icon
          >

          {{ encyclopediaItemInfo.name }}
        </h1>
        <v-divider class="mb-2"></v-divider>

        <v-row>
          <v-col cols="12" sm="3">
            <v-card height="250px" width="250px">
              <v-img :src="encyclopediaItemInfo.imgUrl" height="250px"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" sm="9">
            <h2>Lat: {{ encyclopediaItemInfo.nameLat }}</h2>
            <v-spacer></v-spacer>

            <h2>
              Alternative Names:

              {{ encyclopediaItemInfo.namesAlt }}
            </h2>

            <v-spacer></v-spacer>
            <h2>Avrage Play Time: {{ encyclopediaItemInfo.name }} Min</h2>
          </v-col>
        </v-row>
        <v-divider class="mb-7"></v-divider>

        <h2>Descrition:</h2>
        <v-card color="teal">
          <h3 style="max-height: 150px; overflow-y: auto">
            {{ encyclopediaItemInfo.description }}
          </h3>
        </v-card>
        <v-divider class="mb-7"></v-divider>

        <v-row>
          <!--
            v-for="category in encyclopediaItemInfo.category"
            :key="category"
            -->
          <v-chip class="pa-5 mx-auto mb-4" color="teal darken-4" dark
            ><v-icon>mdi mdi-dice-multiple-outline</v-icon>
            <h1>{{ encyclopediaItemInfo.category }}</h1></v-chip
          >
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { Posts, Auth, Comments, Encyclopedia } from "@/services";
import store from "@/store.js";

export default {
  name: "EncyclopediaItem",
  components: {},
  data() {
    return {
      store,
      RouteID: this.$route.params.id,
      boardGameInfo: {},
      encyclopediaItemInfo: {},
    };
  },
  methods: {
    async getBoardGame() {
      try {
        const docRef = doc(db, "boardGames", this.RouteID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document bglist data:", docSnap.data());
          return {
            boardGameId: this.RouteID,
            bgImageUrl: docSnap.data().bgImageUrl,
            bgName: docSnap.data().bgName,
            categories: [...docSnap.data().categories],
            edition: docSnap.data().edition,
            numberofPlayersMin: docSnap.data().numberofPlayers[0],
            numberofPlayersMax: docSnap.data().numberofPlayers[1],
            playTime: docSnap.data().playTime,
            desctiption: docSnap.data().desctiption,
          };
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.log(" eror ->", error);
        //return null;
      }
    },
    async getEncyclopediaItem(itemId) {
      let data = await Encyclopedia.getOne(itemId);
      this.encyclopediaItemInfo = {
        id: data._id,
        name: data.name,
        category: data.category,
        nameLat: data.nameLat,
        namesAlt: data.namesAlt,
        poison: data.poison,
        imgUrl: data.imgUrl,
        description: data.description,
      };
    },
  },

  async mounted() {
    //this.boardGameInfo = await this.getBoardGame();
    this.getEncyclopediaItem(this.RouteID);
  },
};
</script>
