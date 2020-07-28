<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapState(["i18n"])
  },
  mounted() {
    document.title = this.i18n.CAMPSITE_APP_TITLE;
  }
});
</script>
<style lang="scss"></style>
