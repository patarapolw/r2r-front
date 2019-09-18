<template lang="pug">
v-app
  v-navigation-drawer(v-model="isDrawer" app :expand-on-hover="!isMobile")
    v-list(dense)
      v-list-item(to="/quiz")
        v-list-item-avatar
          v-icon mdi-comment-question
        v-list-item-content
          v-list-item-title Quiz
      v-list-item(to="/editor")
        v-list-item-avatar
          v-icon mdi-pencil
        v-list-item-content
          v-list-item-title Editor
      v-list-item(to="/import")
        v-list-item-avatar
          v-icon mdi-import
        v-list-item-content
          v-list-item-title Import
      v-list-item(to="/settings")
        v-list-item-avatar
          v-icon mdi-settings-outline
        v-list-item-content
          v-list-item-title Settings
      v-list-item(@click="isHelpActivated = true")
        v-list-item-avatar
          v-icon mdi-help-circle-outline
        v-list-item-content
          v-list-item-title Help
      v-list-item(href="https://github.com/patarapolw/rep2recall" target="_blank")
        v-list-item-avatar
          v-icon mdi-github-circle
        v-list-item-content
          v-list-item-title About
    template(v-slot:append)
      v-list(dense)
        v-list-item(href="#")
          v-list-item-avatar
            v-icon mdi-account-outline
          v-list-item-content
            v-list-item-title Logged in
  v-app-bar(app dark color="orange" v-if="isMobile")
    v-app-bar-nav-icon(@click.stop="isDrawer = !isDrawer")
    v-toolbar-title Rep2Recall
  v-content(fluid fill-height)
    router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private isDrawer: boolean = !this.$vuetify.breakpoint.mdAndDown;
  private isHelpActivated = false;

  get isMobile() {
    return this.$vuetify.breakpoint.mdAndDown;
  }

  public mounted() {
    window.addEventListener("keydown", this.hotkeysHandler);
  }

  public beforeDestroyed() {
    window.removeEventListener("keydown", this.hotkeysHandler);
  }

  private hotkeysHandler(evt: KeyboardEvent) {
    const { target, code } = evt;
    if (target && (target as any).tagName.toLocaleUpperCase() === "INPUT") {
      return;
    }
    switch (code) {
      case "KeyH":
        this.isHelpActivated = true;
        break;
      case "Escape":
        this.isHelpActivated = false;
        break;
    }
  }
};
</script>
