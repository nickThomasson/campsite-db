<template>
  <div>
    <v-btn
      color="primary"
      @click.stop="dialog = true"
      :disabled="languageSelect"
    >
      {{ i18n.APP_SETTINGS_LANGUAGE_BUTTON_IMPORT }}
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
          <v-card-title class="headline">{{
            i18n.APP_SETTINGS_LANGUAGE_IMPORT_DIALOG_TITLE
          }}</v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="uploadedFile"
                  :show-size="1000"
                  :label="i18n.APP_SETTINGS_LANGUAGE_IMPORT_FILE_LABEL"
                  :placeholder="
                    i18n.APP_SETTINGS_LANGUAGE_IMPORT_FILE_PLACEHOLDER
                  "
                  prepend-icon="mdi-paperclip"
                  outlined
                  color="primary"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="primary accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="accent" @click="dialog = false">
              {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_DIALOG_CLOSE }}
            </v-btn>

            <v-btn
              color="primary"
              @click="importLanguageFile"
              :disabled="uploadedFile === undefined"
              >{{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_DIALOG_SAVE }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {
    languageSelect: Boolean,
    selectedLanguage: undefined
  },
  data() {
    return {
      selected: [],
      uploadedFile: undefined,
      importedData: undefined,
      dialog: false,
      status: undefined
    };
  },
  computed: {
    ...mapState(["authentication"]),
    ...mapGetters(["i18n"]),
    iso() {
      if (this.selectedLanguage.length > 0) {
        return this.selectedLanguage[0].iso;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["updateLanguage"]),
    importLanguageFile() {
      const file = this.uploadedFile;
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = event => {
          const contents = JSON.parse(event.target.result);
          this.updateLanguage({
            token: this.authentication.token,
            id: contents.id,
            item: contents,
            iso: this.iso
          })
            .then(() => {
              this.dialog = false;
              this.selected = [];
              this.uploadedFile = undefined;
              this.importedData = undefined;
            })
            .catch(() => {
              this.dialog = false;
              this.selected = [];
              this.uploadedFile = undefined;
              this.importedData = undefined;
            });
        };
        fileReader.readAsText(file);
      }
    }
  }
};
</script>
