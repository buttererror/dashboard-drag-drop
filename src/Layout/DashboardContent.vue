<template>
     <main class="l-main">
          <div class="l-main-header">
               <div class="title">Analytics</div>
               <button @click="editLayout" class="btn" v-if="layoutMode === 'view'">
                    <i class="fas fa-pencil-alt btn__icon"></i>
                    Customize
               </button>
               <button @click="saveLayout" class="btn" v-if="layoutMode === 'edit'">
                    <i class="fas fa-check btn__icon"></i>
                    Save
               </button>

          </div>
          <div class="l-main-content grid-stack">
          </div>
     </main>
</template>

<script>
   export default {
      name: "DashboardContent",
      data() {
         return {
            layoutMode: "view",
            grids: null
         }
      },
      mounted() {
          window.bus.$on("send-grids", (grids) => {
             this.grids = grids
          });
      },
      methods: {
         toggleLayout(mode) {
            this.grids.forEach((grid) => {
               if(mode === 'edit') {
                  grid.enable()
               }else {
                  grid.disable();
               }
            })

         },
         editLayout() {
            this.layoutMode = 'edit';
            this.toggleLayout('edit')
         },
         saveLayout() {
            this.layoutMode = 'view';
            this.toggleLayout('view')
         }
      }
   }
</script>

<style>
     .fade-enter-active, .fade-leave-active {
          transition: opacity .1s;
     }

     .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
     {
          opacity: 0;
     }

</style>