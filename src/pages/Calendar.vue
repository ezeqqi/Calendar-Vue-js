<template>
  <q-page padding>
    <div id="container" class="q-pa-md">
      <div class="q-pb-sm">
        <q-date
          v-model="date"
          :locale="myLocale"
          color="orange-5"
          :events="events"
          :event-color="colorEvent"
          today-btn
        />
      </div>
      <div
        :key="date"
        class="text-h4 text-grey-6 q-pa-md"
        v-if="!events.includes(date)"
      >
        Não há eventos
      </div>
      <q-tab-panels v-model="date">
        <q-tab-panel
          v-for="event of ObjectsEvents"
          :key="event.date"
          :name="event.date"
        >
          <div class="text-h4 q-mb-md">
            {{ event.name }}
          </div>
          <p>{{ event.description }}</p>

          <q-page-sticky position="bottom-left" :offset="[24, 24]">
            <q-btn
              round
              icon="delete"
              color="accent"
              @click="handleDeleteEvent(event.id)"
              v-if="ObjectsEvents.some((el) => el.date === date)"
            ></q-btn>
          </q-page-sticky>
          <q-page-sticky position="bottom" :offset="[24, 24]">
            <q-btn
              round
              icon="edit"
              color="teal-5"
              @click="handleEditEvent(event.id)"
              v-if="ObjectsEvents.some((el) => el.date === date)"
            ></q-btn>
          </q-page-sticky>
        </q-tab-panel>
      </q-tab-panels>

      <q-page-sticky position="bottom-right" :offset="[24, 24]">
        <q-btn
          :to="{ name: 'eventPost' }"
          round
          icon="add"
          color="orange-5"
        ></q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { date } from "quasar";
//import { apiHoliday } from "src/boot/axios";
import eventsService from "src/services/eventsService.js";
import { useQuasar } from "quasar";
import {
  days,
  daysShort,
  months,
  monthsShort,
} from "src/components/date-locale.js";
import { useRouter } from "vue-router";

let todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "YYYY/MM/DD");
};
export default defineComponent({
  name: "CalendarApp",

  setup() {
    const $q = useQuasar();
    const EventDays = ref([]);
    const ObjectsEvents = ref([]);
    const { getEvents, removeEvents } = eventsService();
    const router = useRouter();
    /* const getHolidays = async () => {
      try {
        const { data } = await apiHoliday.get("2022");
        for (const obj of data) {
          // incremento para corrigir o método formatDate que decresce 1 dia
          const fixedDate = date.addToDate(obj["date"], { days: 1 });
          const formattedString = date.formatDate(fixedDate, "YYYY/MM/D");
          EventDays.value.push(formattedString);

          ObjectsEvents.value.push({
            date: formattedString,
            name: obj["name"],
            description: obj["name"],
            isHolyday: true,
            id: Math.random(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }; */
    const listEvents = async () => {
      try {
        const data = await getEvents();
        for (const event of data) {
          ObjectsEvents.value.push(event);
        }
        for (const event of ObjectsEvents.value) {
          EventDays.value.push(event.date);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const colorEvent = (stringDate) => {
      const pegaEvento = ObjectsEvents.value.filter((el) =>
        el.date == stringDate ? true : false
      );
      return pegaEvento[0].isHolyday ? "secondary" : "accent";
    };

    const handleDeleteEvent = async (id) => {
      try {
        $q.dialog({
          title: "Confirmação",
          message: "Quer mesmo deletar?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await removeEvents(id);
          const indexBrabo = ObjectsEvents.value.findIndex(
            (el) => el.id === id
          );
          const indexMenor = EventDays.value.indexOf(todaysDate());

          EventDays.value.splice(indexMenor, 1);
          ObjectsEvents.value.splice(indexBrabo, 1);

          $q.notify("Evento deletado");
        });
      } catch (error) {
        console.error(error);
      }
    };
    const handleEditEvent = (id) => {
      router.push({ name: "eventPost", params: { id } });
    };

    onMounted(async () => {
      //await getHolidays(),
      await listEvents();
    });

    return {
      colorEvent,
      handleDeleteEvent,
      handleEditEvent,
      ObjectsEvents,
      splitterModel: ref(50),
      date: ref(todaysDate()),
      events: ref(EventDays),
      myLocale: {
        days: days,
        daysShort: daysShort,
        months: months,
        monthsShort: monthsShort,
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: "dias",
      },
    };
  },
});
</script>
