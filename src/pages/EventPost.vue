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
        <div class="row q-gutter-sm">
          <q-btn
            label="Cancel"
            class="col"
            color="teal-5"
            :to="{ name: 'CalendarApp' }"
          ></q-btn>
          <q-btn
            label="Submit"
            class="col"
            color="orange-5"
            type="submit"
          ></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { date } from "quasar";
import { useRouter, useRoute } from "vue-router";
import eventsService from "src/services/eventsService";

let todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "YYYY/MM/DD");
};

export default defineComponent({
  name: "createEvent",

  setup() {
    const { postEvents, getById, putEvents } = eventsService();
    const router = useRouter();
    const route = useRoute();

    const submitEvent = async () => {
      try {
        if (form.value._id !== "") {
          await putEvents(form.value);
        } else {
          await postEvents(form.value);
        }

        router.push({ name: "CalendarApp" });
      } catch (error) {
        console.error(error);
      }
    };
    const form = ref({
      date: ref(todaysDate()),
      name: "",
      description: "",
      isHoliday: false,
      _id: "",
    });

    const getEventFields = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(async () => {
      if (route.params.id) {
        getEventFields(route.params.id);
      }
    });
    return {
      form,
      submitEvent,
    };
  },
});
</script>
