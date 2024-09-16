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
            <v-icon
              v-if="encyclopediaItemInfo.poison == 'poisonous'"
              color="red accent-4"
              x-large
            >
              mdi mdi-skull-crossbones-outline
            </v-icon>
            <v-icon
              v-if="encyclopediaItemInfo.poison == 'edible'"
              color="light-green accent-4"
              x-large
            >
              mdi mdi-silverware-fork-knife
            </v-icon>
            <v-spacer></v-spacer>

            <h2>.</h2>
            <v-spacer></v-spacer>

            <h2>Lat: {{ encyclopediaItemInfo.nameLat }}</h2>
            <v-spacer></v-spacer>

            <h2>
              Alternative Names:

              {{ encyclopediaItemInfo.namesAlt }}
            </h2>
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
            
          <v-chip class="pa-5 mx-auto mb-4" color="teal darken-4" dark
            ><v-icon>mdi mdi-dice-multiple-outline</v-icon>
            <h1>{{ encyclopediaItemInfo.category }}</h1></v-chip
          >
          -->
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { Encyclopedia } from "@/services";
import store from "@/store.js";

export default {
  name: "EncyclopediaItem",
  components: {},
  data() {
    return {
      store,
      RouteID: this.$route.params.id,
      encyclopediaItemInfo: {},
    };
  },
  methods: {
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
    this.getEncyclopediaItem(this.RouteID);
  },
};
</script>
