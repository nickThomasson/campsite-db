<template>
  <div v-if="apiKey">
    <iframe
      :src="
        `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address.street}+${address.houseNumber}+${address.zip}+${address.city}`
      "
      width="100%"
      height="300"
      frameborder="0"
      style="border:0;"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
      class="rounded"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Maps",
  computed: {
    ...mapState(["detailPage"]),
    apiKey() {
      return process.env.VUE_APP_GOOGLE_MAPS_KEY;
    },
    address() {
      return this.detailPage.page.mainAddress;
    }
  }
};
</script>
