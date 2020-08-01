<template>
  <v-container>
    <v-row>
      <v-col v-if="translations.importStatus === status.Ready">
        <v-alert type="success" dismissible>
          {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_SUCCESS }}
        </v-alert>
      </v-col>
      <v-col v-if="translations.importStatus === status.Error">
        <v-alert type="error" dismissible>
          {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_ERROR_COMMON }}
        </v-alert>
      </v-col>
      <v-col v-if="translations.importStatus === status.NonMatchingIds">
        <v-alert type="error" dismissible>
          {{ i18n.APP_SETTINGS_LANGUAGE_IMPORT_ERROR_ID }}
        </v-alert>
      </v-col>
      <v-col cols="12">
        <h1>{{ i18n.APP_SETTINGS_LANGUAGE_TITLE }}</h1>
      </v-col>
      <v-col cols="12">
        <h2>{{ i18n.APP_SETTINGS_LANGUAGE_SUB_IMPORT }}</h2>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          item-key="name"
          :headers="headers"
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { isEmpty, find } from "lodash";
import LanguageImport from "@/components/Administration/LanguageImport.vue";
import { Status } from "@/helper/status";

export default {
  name: "LanguageSettings",
  components: {
    LanguageImport
  },
  computed: {
    ...mapState(["translations"]),
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
    languageSelect() {
      return !isEmpty(this.selected);
    },
    exportLink() {
      if (this.languageSelect) {
        const language = find(this.translations.languages, {
          language: this.selected[0].iso
        });
        const exportContent = JSON.stringify(language);
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
      importedData: undefined,
      headers: [
        {
          text: "Name der Sprache",
          align: "start",
          value: "name"
        },
        {
          text: "ISO Code",
          value: "iso"
        }
      ]
    };
  }
};
</script>
