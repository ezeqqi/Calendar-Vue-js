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
        </q-tab-panel>
      </q-tab-panels>

      <q-page-sticky position="bottom-right" :offset="[24, 24]">
        <q-btn
          :to="{ name: 'eventPost' }"
          round
          icon="add"
          color="cyan-5"
        ></q-btn>
      </q-page-sticky>

      <q-page-sticky
        v-if="events.includes(date)"
        position="bottom-left"
        :offset="[24, 24]"
      >
        <q-btn
          round
          icon="delete"
          color="accent"
          @click="handleDeleteEvent"
        ></q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { date } from "quasar";
import { apiHoliday } from "src/boot/axios";
import eventsService from "src/services/eventsService.js";
import { useQuasar } from "quasar";
import {
  days,
  daysShort,
  months,
  monthsShort,
} from "src/components/date-locale.js";

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

    const getHolidays = async () => {
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
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
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

    const pegaId = (stringDate) => {
      const filter = ObjectsEvents.value.filter((el) => {
        el.date == stringDate ? true : false;
      });
      const myEvent = filter[0];

      return myEvent[id] + "";
    };

    const colorEvent = (stringDate) => {
      const pegaEvento = ObjectsEvents.value.filter((el) =>
        el.date == stringDate ? true : false
      );
      return checkHolyday(pegaEvento[0]);
    };

    const checkHolyday = (event) => {
      return event.isHolyday ? "secondary" : "accent";
    };

    const handleDeleteEvent = async (id) => {
      try {
        await removeEvents(id);
        $q.notify("Evento deletado");
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(async () => {
      await getHolidays(), await listEvents();
    });

    return {
      colorEvent,
      checkHolyday,
      handleDeleteEvent,
      pegaId,
      ObjectsEvents,
      splitterModel: ref(50),
      date: ref(todaysDate()),
      events: EventDays,
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
