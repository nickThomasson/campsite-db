<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapState(["i18n", "authentication"])
  },
  methods: {
    ...mapActions(["initializeWishlist", "refreshToken"])
  },
  created() {
    this.initializeWishlist();
    setInterval(() => {
      this.refreshToken(this.authentication.token);
    }, 1140000);
  },
  beforeDestroy() {
    clearInterval();
  }
});
</script>
