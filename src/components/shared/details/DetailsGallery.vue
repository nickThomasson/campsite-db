<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" xl="3" v-for="(item, i) in gallery" :key="i">
      <v-card>
        <v-hover v-slot:default="{ hover }">
          <v-img
            :src="item.thumbnails[4].url"
            lazy-src
            :srcset="
              `${item.thumbnails[2].url} 320w, ${item.thumbnails[4].url} 600w`
            "
            :alt="detailPage.page.name"
          >
            <v-expand-transition v-if="item.description">
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                style="height: 100%;"
              >
                <v-row
                  align="end"
                  class="lightbox white--text pa-2 fill-height"
                  no-gutters
                >
                  <v-col>
                    <div
                      class="caption caption-text"
                      v-html="item.description"
                    ></div>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
          </v-img>
        </v-hover>
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
<style lang="scss">
.caption-text * {
  margin-bottom: 0 !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
