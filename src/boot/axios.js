import { boot } from "quasar/wrappers";
import axios from "axios";

//const apiHoliday = axios.create({ baseURL: 'https://brasilapi.com.br/api/feriados/v1/' })
const apiEvents = axios.create({ baseURL: 'https://calendar-vuejs-api.herokuapp.com', debug: true })
// https://calendar-vuejs-api.herokuapp.com/events
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  //app.config.globalProperties.$api = apiHoliday

  app.config.globalProperties.$api = apiEvents
})

export { apiEvents };
