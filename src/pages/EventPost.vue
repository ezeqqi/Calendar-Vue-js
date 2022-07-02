<template>
  <q-page padding>
    <div>
      <q-form class="q-gutter-md" @submit="submitEvent">
        <div class="text-subtitle1">Novo evento:</div>
        <q-input
          rounded
          outlined
          v-model="form.date"
          label="Data"
          :placeholder="date"
          mask="####/##/##"
          hint="AAAA/MM/DD"
          clearable
        >
          <template v-slot:append>
            <q-icon size="24px" name="calendar_month" />
          </template>
        </q-input>

        <q-input rounded outlined label="Nome" v-model="form.name">
          <template v-slot:append>
            <q-icon size="24px" name="event_note" />
          </template>
        </q-input>
        <q-input
          rounded
          outlined
          autogrow
          label="Descrição"
          v-model="form.description"
        >
          <template v-slot:append>
            <q-icon size="24px" name="subject" />
          </template>
        </q-input>
        <div class="full-width row q-pa-md">
          <q-btn class="col-grow" color="orange-5" type="submit">Submit</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { date } from "quasar";
import eventsService from "src/services/eventsService";

let todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "YYYY/MM/DD");
};

export default defineComponent({
  name: "createEvent",

  setup() {
    const { postEvents } = eventsService();

    const submitEvent = async () => {
      try {
        const data = await postEvents(form.value);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    const form = ref({
      date: ref(todaysDate()),
      name: "",
      description: "",
      isHoliday: false,
    });
    return {
      form,
      submitEvent,
    };
  },
});
</script>
