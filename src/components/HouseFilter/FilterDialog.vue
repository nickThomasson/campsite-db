<template>
  <v-row justify="center">
    <v-dialog
      v-model="app.filterMenu"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="switchFilterMenu">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title data-lang-key="APP_FILTER_MENU_TITLE">{{
            i18n.APP_FILTER_MENU_TITLE
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="switchFilterMenu"
              v-if="hasActiveFilter"
              data-lang-key="APP_SAVE"
            >
              <v-icon class="mb-1 mr-2">save_alt</v-icon>
              {{ i18n.APP_SAVE }}</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12">
              <HouseFilter :key="app.filterKey" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import HouseFilter from "@/components/HouseFilter/HouseFilter.vue";
export default {
  name: "FilterDialog",
  components: {
    HouseFilter
  },
  computed: {
    ...mapState(["app"]),
    ...mapGetters(["hasActiveFilter", "i18n"])
  },
  methods: {
    ...mapActions(["switchFilterMenu"])
  },
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  }
};
</script>
