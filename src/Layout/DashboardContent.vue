<template>
     <main class="l-main">
          <div class="l-main-header"></div>
          <div class="l-main-content grid-stack">
               <div class="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="2" data-gs-height="2">
                    <div class="grid-stack-item-content">item1</div>
               </div>
               <div class="grid-stack-item" data-gs-x="2" data-gs-y="0" data-gs-width="2" data-gs-height="1">
                    <div class="grid-stack-item-content">item2</div>
               </div>
          </div>
     </main>
</template>

<script>
   export default {
      name: "DashboardContent",
      mounted() {
         // console.log(window.GridStack)
      }
   }
</script>

<style>

</style>