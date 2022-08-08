import useApiEvents from 'src/composables/useApiEvents.js'

export default function eventsService() {
  const { getEvents, postEvents, putEvents, removeEvents, getById } = useApiEvents('/events')

  return {
    getEvents,
    postEvents,
    putEvents,
    removeEvents,
    getById
  }
}
