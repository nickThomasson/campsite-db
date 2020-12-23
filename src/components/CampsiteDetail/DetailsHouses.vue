<template>
  <v-card v-if="houses.length > 0">
    <v-list two-line subheader>
      <v-subheader
        :data-lang-key="
          houses.length > 1
            ? 'CAMPSITE_DETAIL_INFO_HOUSES_TITLE'
            : 'CAMPSITE_DETAIL_INFO_HOUSE_TITLE'
        "
      >
        {{
          houses.length > 1
            ? i18n.CAMPSITE_DETAIL_INFO_HOUSES_TITLE
            : i18n.CAMPSITE_DETAIL_INFO_HOUSE_TITLE
        }}
      </v-subheader>
      <v-list-item
        v-for="(house, index) in houses"
        :key="index"
        link
        @click="goToHouse(house.id)"
      >
        <v-list-item-avatar>
          <img
            v-if="house.previewImage.data"
            :src="house.previewImage.data.thumbnails[2].url"
            alt="John"
          />

          <v-icon v-else class="grey lighten-1 white--text">home</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="house.name"></v-list-item-title>
          <v-list-item-subtitle>
            <v-tooltip bottom v-if="house.rooms">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >meeting_room</v-icon
                >
              </template>
              <span>{{ i18n.HOUSE_DETAIL_PAGE_ROOMS }} {{ house.rooms }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.beds">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >weekend</v-icon
                >
              </template>
              <span>{{ i18n.HOUSE_DETAIL_PAGE_BEDS }} {{ house.beds }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.kitchen">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >kitchen</v-icon
                >
              </template>
              <span>{{ i18n.CAMPSITE_DETAIL_PAGE_KITCHEN }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.sanitary">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >wc</v-icon
                >
              </template>
              <span>{{ i18n.CAMPSITE_DETAIL_PAGE_SANITARY }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.wifi">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >wifi</v-icon
                >
              </template>
              <span>{{ i18n.HOUSE_DETAIL_PAGE_WIFI }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.av">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >music_video</v-icon
                >
              </template>
              <span>{{ i18n.HOUSE_FILTER_LABEL_AV }}</span>
            </v-tooltip>

            <v-tooltip bottom v-if="house.recreationalRoom">
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="mr-4 mr-lg-2" small v-on="on" v-bind="attrs"
                  >videogame_asset</v-icon
                >
              </template>
              <span>{{ i18n.HOUSE_FILTER_LABEL_RECREATIONAL }}</span>
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
export default {
  name: "DetailsHouses",
  props: {
    houses: Array
  },
  computed: {
    ...mapGetters(["i18n"])
  },
  methods: {
    goToHouse(id) {
      this.$router.push({
        name: "HouseDetailPage",
        params: { id }
      });
    }
  }
};
</script>
