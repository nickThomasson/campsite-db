<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ i18n.CAMPSITE_404_TITLE }}</h1>
        <h5>{{ i18n.CAMPSITE_404_BODY }}</h5>
      </v-col>
      <v-col>
        <v-btn color="primary" dense @click="goBack">{{
          i18n.CAMPSITE_APP_BACK
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NotFound",
  computed: {
    ...mapGetters(["i18n"])
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "CampsiteSearch"
      });
    }
  }
};
</script>
