<template>
  <q-page padding>
    <div>
      <form class="q-gutter-md">
        <div class="text-subtitle1">Novo evento:</div>
        <q-input
          rounded
          outlined
          v-model="date"
          label="Data"
          :placeholder="date"
          mask="####/##/##"
          hint="Exemplo: 2021/09/20"
          clearable
        >
          <template v-slot:append>
            <q-icon size="24px" name="calendar_month" />
          </template>
        </q-input>

        <q-input rounded outlined label="Nome" v-model="name">
          <template v-slot:append>
            <q-icon size="24px" name="event_note" />
          </template>
        </q-input>
        <q-input
          rounded
          outlined
          autogrow
          label="Descrição"
          v-model="description"
        >
          <template v-slot:append>
            <q-icon size="24px" name="subject" />
          </template>
        </q-input>
        <div class="full-width row q-pa-md">
          <q-btn class="col-grow" color="orange-5">Submit</q-btn>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { date } from "quasar";

let todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "YYYY/MM/D");
};
export default defineComponent({
  name: "createEvent",

  setup() {
    return {
      date: ref(todaysDate()),
      name: ref(""),
      description: ref(""),
    };
  },
});
</script>
