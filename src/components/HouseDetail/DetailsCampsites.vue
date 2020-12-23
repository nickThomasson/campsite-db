<template>
  <v-card v-if="campsites.length > 0">
    <v-list two-line subheader>
      <v-subheader
        :data-lang-key="
          campsites.length > 1
            ? 'HOUSE_DETAIL_CAMPSITES_TITLE'
            : 'HOUSE_DETAIL_CAMPSITE_TITLE'
        "
      >
        {{
          campsites.length > 1
            ? i18n.HOUSE_DETAIL_CAMPSITES_TITLE
            : i18n.HOUSE_DETAIL_CAMPSITE_TITLE
        }}
      </v-subheader>
      <v-list-item
        v-for="(campsite, index) in campsites"
        :key="index"
        link
        @click="goToHouse(campsite.id)"
      >
        <v-list-item-avatar>
          <img
            v-if="previewImage(campsite.previewImage.id)"
            :src="previewImage(campsite.previewImage.id)"
          />

          <v-icon v-else class="grey lighten-1 white--text">home</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="campsite.name"></v-list-item-title>
          <v-list-item-subtitle>
            <v-tooltip bottom v-if="campsite.persons">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >people</v-icon
                >
              </template>
              <span
                >{{ i18n.CAMPSITE_SEARCH_CARD_PERSON }}
                {{ campsite.persons }}</span
              >
            </v-tooltip>

            <v-tooltip bottom v-if="campsite.kitchen">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >kitchen</v-icon
                >
              </template>
              <span>{{ i18n.CAMPSITE_DETAIL_PAGE_KITCHEN }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="campsite.sanitary">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >wc</v-icon
                >
              </template>
              <span>{{ i18n.CAMPSITE_DETAIL_PAGE_SANITARY }}</span>
            </v-tooltip>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon>arrow_forward_ios</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import imageGenerator from "@/helper/imageGenerator";
export default {
  name: "DetailsCampsites",
  props: {
    campsites: Array
  },
  computed: {
    ...mapGetters(["i18n"])
  },
  methods: {
    goToHouse(id) {
      this.$router.push({
        name: "CampsiteDetailPage",
        params: { id }
      });
    },
    previewImage(id) {
      if (!id) return undefined;
      return imageGenerator(id, "img-small");
    }
  }
};
</script>
