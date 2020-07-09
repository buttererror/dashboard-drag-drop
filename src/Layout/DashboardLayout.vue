<template>
     <div>
          <dashboard-header></dashboard-header>
          <dashboard-content></dashboard-content>
          <sidebar></sidebar>
     </div>
</template>

<script>
   import DashboardHeader from "./DashboardHeader";
   import DashboardContent from "./DashboardContent";
   import Sidebar from "./Sidebar";
   export default {
      name: "DashboardLayout",
      components: {Sidebar, DashboardContent, DashboardHeader},
   }
</script>

<style scoped>

</style>