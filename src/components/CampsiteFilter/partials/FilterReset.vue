<template>
  <v-col cols="12" v-if="hasActiveFilter">
    <v-btn color="primary" @click="reset">
      <v-icon class="mr-2">replay</v-icon>
      {{ i18n.CAMPSITE_APP_RESET }}
    </v-btn>
  </v-col>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "FilterReset",
  computed: {
    ...mapState(["authentication", "data"]),
    ...mapGetters(["hasActiveFilter", "i18n"])
  },
  methods: {
    ...mapActions(["applyReset"]),
    reset() {
      this.applyReset(this.authentication.token);
    }
  }
};
</script>
