<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-orange-5">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Calendar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Pages </q-item-label>
        <Essential-link
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linkList = [
  {
    title: "Calendar",
    icon: "calendar_month",
    route: { name: "CalendarApp" },
  },
  {
    title: "New Event",
    icon: "event",
    route: { name: "eventPost" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: { EssentialLink },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linkList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
