<template lang="pug">
v-container
  v-treeview(:items="items" hoverable open-all v-model="tree")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { fetchJSON } from "../util";

@Component
export default class Quiz extends Vue {
  public items: any[] = [];
  public tree: any[] = [];
  public q: string = "";

  private isLoading = false;

  public mounted() {
    this.getTreeviewData();
  }

  private async getTreeviewData() {
    this.isLoading = true;
    await new Promise(async resolve => {
      while (true) {
        try {
          const r = await fetchJSON("/api/");
          if (!r.error) {
            return resolve();
          }
        } catch (e) {}

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });

    this.items = await fetchJSON("/api/quiz/treeview", { q: this.q });
    this.isLoading = false;
  }
}
</script>