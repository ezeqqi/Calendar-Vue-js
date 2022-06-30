<template>
  <q-page padding>
    <div id="container" class="q-pa-md">
      <div class="q-pb-sm">
        <q-date
          v-model="date"
          :locale="myLocale"
          color="orange-5"
          :events="events"
          :event-color="isEvent"
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { date } from "quasar";
import { api } from "boot/axios";
import {
  days,
  daysShort,
  months,
  monthsShort,
} from "src/components/date-locale.js";

let todaysDate = () => {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, "YYYY/MM/D");
};
export default defineComponent({
  name: "CalendarApp",

  setup() {
    const getHolidays = async () => {
      try {
        const { data } = await api.get("2022");
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
    const ObjectsEvents = ref([
      //sample events
      {
        date: "2022/06/11",
        name: "Aniver da Claraaa",
        description: "Almoço no govinda!",
        isHolyday: false,
      },
      {
        date: "2022/06/05",
        name: "Danilo day",
        description: "Mansão faça acontecer.",
        isHolyday: false,
      },
    ]);
    const EventDays = ref(["2022/06/11", "2022/06/05"]);

    const isEvent = (stringDate) => {
      const pegaEvento = ObjectsEvents.value.filter((el) =>
        el.date == stringDate ? true : false
      );
      return checkHolyday(pegaEvento[0]);
    };

    const checkHolyday = (event) => {
      return event.isHolyday ? "secondary" : "accent";
    };

    onMounted(() => {
      getHolidays();
    });

    return {
      isEvent,
      checkHolyday,
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
