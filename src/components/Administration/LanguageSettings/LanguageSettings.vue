<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card>
        <v-card-title data-lang-key="APP_SETTINGS_LANGUAGE_TITLE">
          <v-row>
            <v-col cols="auto">
              {{ i18n.APP_SETTINGS_LANGUAGE_TITLE }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-icon @click="fetchTranslations(authentication.userData.token)">
                refresh
              </v-icon>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-col v-if="translations.importStatus === status.Ready">
            <v-alert
              type="success"
              dismissible
              data-lang-key="APP_SETTINGS_LANGUAGE_IMPORT_SUCCESS"
            >
              {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_SUCCESS }}
            </v-alert>
          </v-col>
          <v-col v-if="translations.importStatus === status.Error">
            <v-alert
              type="error"
              dismissible
              data-lang-key="APP_SETTINGS_LANGUAGE_IMPORT_ERROR_COMMON "
            >
              {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_ERROR_COMMON }}
            </v-alert>
          </v-col>
          <v-col v-if="translations.importStatus === status.NonMatchingIds">
            <v-alert
              type="error"
              dismissible
              data-lang-key="APP_SETTINGS_LANGUAGE_IMPORT_ERROR_ID"
            >
              {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_ERROR_ID }}
            </v-alert>
          </v-col>

          <v-col cols="12">
            <h3 data-lang-key="APP_SETTINGS_LANGUAGE_SUB_IMPORT">
              {{ i18n.APP_SETTINGS_LANGUAGE_SUB_IMPORT }}
            </h3>
          </v-col>
          <v-col cols="12">
            <v-data-table
              v-model="selected"
              item-key="name"
              :headers="tableHeaders"
              :items="tableItems"
              hide-default-footer
              single-select
              class="elevation-1"
              show-select
            >
            </v-data-table>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="auto">
                <v-btn
                  data-lang-key="APP_SETTINGS_LANGUAGE_BUTTON_EXPORT"
                  link
                  color="primary"
                  :href="exportLink.url"
                  :download="exportLink.fileName"
                  :disabled="!languageSelect"
                  >{{ i18n.APP_SETTINGS_LANGUAGE_BUTTON_EXPORT }}</v-btn
                >
              </v-col>
              <v-col cols="auto">
                <LanguageImport
                  :languageSelect="!languageSelect"
                  :selectedLanguage="selected"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { isEmpty, find } from "lodash";
import LanguageImport from "@/components/Administration/LanguageSettings/LanguageImport.vue";
import { Status } from "@/helper/status";
import { sortObject } from "@/helper/sortObject";

export default {
  name: "LanguageSettings",
  components: {
    LanguageImport
  },
  methods: {
    ...mapActions(["fetchTranslations"])
  },
  computed: {
    ...mapState(["translations", "authentication"]),
    ...mapGetters(["i18n"]),
    tableItems() {
      const tableItems = [];
      for (const item of this.translations.languages) {
        tableItems.push({
          name: item.language_name,
          iso: item.language
        });
      }
      return tableItems;
    },
    tableHeaders() {
      const header = [
        {
          text: this.i18n.APP_SETTINGS_LANGUAGE_TABLE_HEADER_LANG,
          align: "start",
          value: "name"
        },
        {
          text: this.i18n.APP_SETTINGS_LANGUAGE_TABLE_HEADER_ISO,
          value: "iso"
        }
      ];
      return header;
    },
    languageSelect() {
      return !isEmpty(this.selected);
    },
    exportLink() {
      if (this.languageSelect) {
        const language = find(this.translations.languages, {
          language: this.selected[0].iso
        });
        const exportContent = JSON.stringify({
          ...language,
          dictionary: sortObject(language.dictionary)
        });
        const url =
          "data:application/json;charset=utf-8," +
          encodeURIComponent(exportContent);
        const fileName = `languageExport-${this.selected[0].iso}.json`;
        return { url, fileName };
      }
      return {};
    },
    status() {
      return Status;
    }
  },
  data() {
    return {
      selected: [],
      uploadedFile: undefined,
      importedData: undefined
    };
  }
};
</script>
