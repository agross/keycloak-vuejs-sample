<template>
  <form @submit.prevent="handleSubmit">
    Datum:
    <VueDatePicker v-model="datum" :enable-time-picker="false"></VueDatePicker>

    Von:
    <VueDatePicker v-model="von" time-picker minutes-increment="15"></VueDatePicker>

    Bis:
    <VueDatePicker v-model="bis" time-picker minutes-increment="15"></VueDatePicker>

    <button type="submit">Verfügbare Arbeitsplätze</button>

    <ul v-for="arbeitsplatz in arbeitsplätze" :key="arbeitsplatz">
      <Arbeitsplatz :arbeitsplatz="arbeitsplatz" :datum="datum" :von="von" :bis="bis" />
    </ul>
  </form>
</template>

<script>
import Arbeitsplatz from './components/Arbeitsplatz';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useAxios } from '@baloise/vue-axios'

export default {
  name: 'App',
  components: {
    VueDatePicker,
    Arbeitsplatz
  },
  data: function() {
    return {
      datum: new Date(),
      von: {
        hours: 9,
        minutes: 0,
        seconds: 0
      },
      bis: {
        hours: 9,
        minutes: 15,
        seconds: 0
      },
      arbeitsplätze: []
    }
  },
  methods: {
    async handleSubmit() {
      const { data, get } = useAxios();

       await get(
        "https://api.production.kessler.grossweber.com/workplaces/",
        {
          timeout: 10000,
          params: {
            date: this.datum,
            startTime: new Date(1, 1, 1, this.von.hours, this.von.minutes, this.von.seconds),
            endTime: new Date(1, 1, 1, this.bis.hours, this.bis.minutes, this.bis.seconds),
          },
          headers:{
            'Authorization': `Bearer ${this.$keycloak.token}`
          }
        });

      this.arbeitsplätze = data.value;
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  max-width: 20vw;
  margin: auto
}
</style>
