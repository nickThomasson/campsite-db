<template>
  <v-col
    cols="12"
    class="text-center"
    order="3"
    v-if="data.limit < data.campsiteCount && data.limit !== -1"
  >
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="8"
      @input="changePageNumber"
    ></v-pagination>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Pagination",
  data() {
    return {
      page: 1
    };
  },
  computed: {
    ...mapState(["data", "authentication"]),
    ...mapGetters(["pageCount"]),
    currentPage: {
      get() {
        return ~~(this.data.offset / this.data.limit) + 1;
      },
      set() {
        this.page = ~~(this.data.offset / this.data.limit) + 1;
      }
    }
  },
  methods: {
    ...mapActions(["changePage"]),
    changePageNumber(pageNumber) {
      const factor = pageNumber - 1;
      this.changePage({
        token: this.authentication.token,
        pageOffset: ~~(factor * this.data.limit)
      });
    }
  }
};
</script>
