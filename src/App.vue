<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapState(["i18n"])
  },
  methods: {
    ...mapActions(["initializeWishlist"])
  },
  mounted() {
    document.title = this.i18n.CAMPSITE_APP_TITLE;
  },
  created() {
    this.initializeWishlist();
  }
});
</script>
<style lang="scss"></style>
