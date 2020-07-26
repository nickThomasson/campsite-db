<template>
  <div>
    <v-btn @click.stop="dialog = true" icon>
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">{{
          i18n.CAMPSITE_SEARCH_SHARING_TITLE
        }}</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              {{ i18n.CAMPSITE_SEARCH_SHARING_BODY }}
            </v-col>
            <v-col cols="12">
              <v-text-field
                :label="i18n.CAMPSITE_SEARCH_SHARING_LABEL"
                outlined
                readonly
                :value="url"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">
            <v-icon>close</v-icon>
            {{ i18n.CAMPSITE_APP_CLOSE }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShareLink",
  props: {
    campsiteId: Number
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState(["i18n"]),
    url() {
      return `${window.location.origin}/#/${this.campsiteId}`;
    }
  }
};
</script>
