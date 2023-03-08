
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <p>{{ arbeitsplatz.name }}</p>
      <button type="submit">Buchen</button>
      <span v-if="success" style="color: green">Gebucht!</span>
      <span v-if="error" style="color: red">{{ error.response.status }} {{ error.response.data }}</span>
    </div>
  </form>
</template>

<script>
import { useAxios } from '@baloise/vue-axios'

export default {
  props: {
    arbeitsplatz: Object,
    datum: Object,
    von: Object,
    bis: Object,
  },
  data: function() {
    return {
      success: undefined,
      error: undefined
    }
  },
  methods: {
    async handleSubmit() {
      const { isSuccessful, post, error } = useAxios();

       await post(
        "https://api.production.kessler.grossweber.com/bookWorkplace/",
        {
          id: this.arbeitsplatz.id,
          date: this.datum,
          startTime: new Date(1, 1, 1, this.von.hours, this.von.minutes, this.von.seconds),
          endTime: new Date(1, 1, 1, this.bis.hours, this.bis.minutes, this.bis.seconds),
        },
        {
          timeout: 10000,
          headers:{
            'Authorization': `Bearer ${this.$keycloak.token}`
          }
        });

      this.success = isSuccessful;
      this.error = error;
    },
  },
}
</script>

<style>

</style>
