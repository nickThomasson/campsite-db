<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" xl="3" v-for="(item, i) in gallery" :key="i">
      <v-card>
        <v-img
          :src="item.thumbnails[4].url"
          lazy-src
          :srcset="
            `${item.thumbnails[2].url} 320w, ${item.thumbnails[4].url} 600w`
          "
          :alt="detailPage.page.name"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DetailsGallery",
  computed: {
    ...mapState(["detailPage"]),
    gallery() {
      return this.detailPage.page.gallery;
    }
  }
};
</script>
