<template>
  <v-row v-if="gallery.length > 0">
    <v-col cols="12" class="d-flex d-md-none">
      <v-card>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in gallery"
            :key="i"
            :src="imgGen(item)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card class="d-none d-md-block">
        <v-card-title>{{ i18n.CAMPSITE_DETAIL_GALLERY_TITLE }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              xl="3"
              v-for="(item, i) in gallery"
              :key="i"
            >
              <v-card>
                <v-hover v-slot:default="{ hover }">
                  <v-img
                    :src="imgGen(item)"
                    lazy-src
                    size="(max-width: 600px) 600w, (min-width: 601px) 601w"
                    :srcset="`${imgGen(item)} 600w, ${imgGen(item)} 601w`"
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import imageGenerator from "@/helper/imageGenerator";

export default {
  name: "DetailsGallery",
  computed: {
    ...mapState(["detailPage"]),
    ...mapGetters(["i18n"]),
    gallery() {
      return this.detailPage.page.gallery;
    }
  },
  methods: {
    imgGen(id) {
      return imageGenerator(id, "img-medium");
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
