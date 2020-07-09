<template>
     <main class="l-main">
          <div class="l-main-header">
               <div class="title">Analytics</div>
               <button @click="editLayout" class="btn" data-v-step="1"
                       v-if="layoutMode === 'view'">
                    <i class="fas fa-pencil-alt btn__icon"></i>
                    Customize
               </button>
               <button @click="saveLayout" class="btn" data-v-step="2"
                       v-if="layoutMode === 'edit'">
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
            grids: null,
            serializedGrids: {}
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
            // close the customize button tour when pressing on it
            this.closeTour(1);
            this.layoutMode = 'edit';
            this.toggleLayout('edit');
            if(!localStorage.getItem("tour_2-done")) {
               setTimeout(() => {
                  this.$tours['tour_2'].start();
                  localStorage.setItem("tour_2-done", "true");
               }, 500);
            }
         },
         closeTour(tourNumber) {
            // close tour by tour number
            this.$tours[`tour_${tourNumber}`].finish();
         },
         saveLayout() {
            // close the save button tour when pressing on it
            this.closeTour(2);
            this.layoutMode = 'view';
            this.toggleLayout('view');
            this.serializedGrids = {};
            this.grids.forEach((grid) => {
               this.serializedGrids[grid.el.classList[0]] = [];
               grid.engine.nodes.forEach((node) => {
                  this.serializedGrids[grid.el.classList[0]].push({
                     x: node.x,
                     y: node.y,
                     width: node.width,
                     height: node.height
                  });
               });
               localStorage.setItem("grids", JSON.stringify(this.serializedGrids));
            })
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