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
  created() {
    this.initializeWishlist();
  }
});
</script>
<style lang="scss"></style>
