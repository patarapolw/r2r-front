<template lang="pug">
v-container
  v-treeview(:items="items" hoverable open-all v-model="tree")
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { fetchJSON } from "../util";

@Component
export default class Quiz extends Vue {
  public items: any[] = [
    {name: "HSK"},
    {children: [
      {name: "HSK1", stat: {new: 518, due: 0, leech: 0}},
      {name: "HSK2", stat: {new: 507, due: 0, leech: 0}},
      {name: "HSK3", stat: {new: 1053, due: 4, leech: 8}},
      {name: "HSK4", stat: {new: 1832, due: 239, leech: 279}},
      {name: "HSK5", stat: {new: 4646, due: 0, leech: 0}},
      {name: "HSK6", stat: {new: 9009, due: 0, leech: 0}}
    ]}
  ];
  public tree: any[] = [];
  public q: string = "";

  private isLoading = false;

  public mounted() {
    // this.getTreeviewData();
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