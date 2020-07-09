<template>
     <div>
          <v-tour name="tour_1" :steps="step_1" :options="{ highlight: true }"></v-tour>
          <v-tour name="tour_2" :steps="step_2" :options="{ highlight: true }"></v-tour>
          <dashboard-layout></dashboard-layout>
     </div>
</template>

<script>

   import DashboardLayout from "./Layout/DashboardLayout";

   export default {
      name: 'App',
      components: {DashboardLayout},
      data() {
         return {
            step_1: [
               {
                  target: '[data-v-step="1"]',
                  content: 'Press here to drag and drop',
                  params: {
                     placement: 'left',
                     enableScrolling: false
                  }
               }
            ],
            step_2: [
               {
                  target: '[data-v-step="2"]',
                  content: 'Press here to save the layout',
                  params: {
                     placement: 'left',
                     enableScrolling: false
                  }
               }
            ]
         }
      },
      mounted() {
         console.log(this.$tours['tour_1'])
         if (!localStorage.getItem("tour_1-done")) {
            setTimeout(() => {
               this.$tours['tour_1'].start();
               localStorage.setItem("tour_1-done", "true");
            }, 700);
         }
      }
   }
</script>

<style>
</style>
