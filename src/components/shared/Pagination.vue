<template>
  <v-col cols="12" class="text-center" order="3" v-if="showPagination">
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="8"
      @input="changePageNumber"
    ></v-pagination>
  </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Pagination",
  data() {
    return {
      page: 1
    };
  },
  props: {
    dispatchName: String,
    pageCount: Number,
    totalCount: Number
  },
  computed: {
    ...mapState(["data", "authentication"]),
    currentPage: {
      get() {
        return ~~(this.data.offset / this.data.limit) + 1;
      },
      set() {
        this.page = ~~(this.data.offset / this.data.limit) + 1;
      }
    },
    showPagination() {
      return this.data.limit < this.totalCount && this.data.limit !== -1;
    }
  },
  methods: {
    ...mapActions(["changePage"]),
    changePageNumber(pageNumber) {
      const factor = pageNumber - 1;
      this.changePage({
        token: this.authentication.token,
        pageOffset: ~~(factor * this.data.limit),
        dispatchName: this.dispatchName
      });
    }
  }
};
</script>
