<template>
  <v-col cols="12" v-if="hasActiveFilter">
    <v-btn color="primary" @click="reset" data-lang-key="APP_RESET">
      <v-icon class="mr-2">replay</v-icon>
      {{ i18n.APP_RESET }}
    </v-btn>
  </v-col>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "FilterReset",
  props: {
    dispatchName: String
  },
  computed: {
    ...mapState(["authentication", "data"]),
    ...mapGetters(["hasActiveFilter", "i18n"])
  },
  methods: {
    ...mapActions(["applyReset"]),
    reset() {
      this.applyReset({
        token: this.authentication.token
      });
    }
  }
};
</script>
