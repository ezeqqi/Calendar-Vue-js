import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: 'https://brasilapi.com.br/api/feriados/v1/' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})

export { api };
