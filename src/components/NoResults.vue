<template>
  <v-row>
    <v-col cols="12"
      ><h3 data-lang-key="APP_NO_RESULTS_TITLE">
        {{ i18n.APP_NO_RESULTS_TITLE }}
      </h3></v-col
    >
    <v-col cols="12"
      ><p data-lang-key="APP_NO_RESULTS_BODY">
        {{ i18n.APP_NO_RESULTS_BODY }}
      </p>
      <v-btn
        color="primary"
        data-lang-key="APP_NO_RESULTS_RESET"
        @click="reset"
        >{{ i18n.APP_NO_RESULTS_RESET }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "NoResults",
  computed: {
    ...mapGetters(["i18n"]),
    ...mapState(["authentication"])
  },
  methods: {
    ...mapActions(["applyReset"]),
    reset() {
      this.applyReset({ token: this.authentication.token });
    }
  }
};
</script>
