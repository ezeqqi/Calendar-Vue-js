import useApiEvents from 'src/composables/useApiEvents.js'

export default function eventsService() {
  const { getEvents, postEvents, putEvents, removeEvents } = useApiEvents('DbEvents')

  return {
    getEvents,
    postEvents,
    putEvents,
    removeEvents,
  }
}
