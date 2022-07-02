import { apiEvents } from "src/boot/axios.js";

export default function useApiEvents(url) {
  const getEvents = async () => {
    try {
      const { data } = await apiEvents.get(url)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const postEvents = async (form) => {
    try {
      const { data } = await apiEvents.post(url, form)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const putEvents = async (form) => {
    try {
      const { data } = await apiEvents.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  const removeEvents = async (id) => {
    try {
      const { data } = await apiEvents.delete(`${url}/${id}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getEvents,
    postEvents,
    putEvents,
    removeEvents
  }
}
