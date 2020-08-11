<template>
  <div>
    <v-btn @click.stop="dialog = true" icon>
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title
          class="headline"
          data-lang-key="CAMPSITE_SEARCH_SHARING_TITLE"
          >{{ i18n.APP_SEARCH_SHARING_TITLE }}</v-card-title
        >

        <v-card-text>
          <v-row>
            <v-col cols="12" data-lang-key="APP_SEARCH_SHARING_BODY">
              {{ i18n.APP_SEARCH_SHARING_BODY }}
            </v-col>
            <v-col cols="12">
              <v-text-field
                data-lang-key="APP_SEARCH_SHARING_LABEL"
                :label="i18n.APP_SEARCH_SHARING_LABEL"
                outlined
                readonly
                :value="url"
                hide-details
                @click="copyLink"
                :id="`share-url-${id}`"
                class="mb-2"
                :append-icon="copyPaste ? 'mdi-check-circle' : ''"
              ></v-text-field>
              <div
                class="shareHint text-center"
                :class="{ visible: copyPaste }"
                data-lang-key="APP_SHARE_COPY_NOTIFICATION"
              >
                {{ i18n.APP_SHARE_COPY_NOTIFICATION }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
            data-lang-key="APP_CLOSE"
          >
            <v-icon>close</v-icon>
            {{ i18n.APP_CLOSE }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShareLink",
  props: {
    id: Number,
    subFolder: String
  },
  data() {
    return {
      dialog: false,
      copyPaste: false
    };
  },
  computed: {
    ...mapGetters(["i18n"]),
    url() {
      return `${window.location.origin}/#/${this.subFolder}/${this.id}`;
    }
  },
  methods: {
    copyLink() {
      const copyText = document.getElementById(`share-url-${this.id}`);

      copyText.focus();
      copyText.select();
      copyText.setSelectionRange(0, 99999);

      document.execCommand("copy");

      this.copyPaste = true;
    }
  },
  updated() {
    if (!this.dialog) {
      this.copyPaste = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.shareHint {
  opacity: 0;
  transition: 0.1s;
}
.visible {
  opacity: 1;
  transition: 0.1s;
}
</style>
