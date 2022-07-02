import { boot } from "quasar/wrappers";
import axios from "axios";

const apiHoliday = axios.create({ baseURL: 'https://brasilapi.com.br/api/feriados/v1/' })
const apiEvents = axios.create({ baseURL: 'http://localhost:3000/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = apiHoliday

  app.config.globalProperties.$api = apiEvents
})

export { apiEvents, apiHoliday };
