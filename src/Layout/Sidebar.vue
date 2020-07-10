<template>
     <aside class="l-sidebar grid-stack">
<!--                    <div class="grid-stack-item" data-gs-x="0" data-gs-y="1" data-gs-width="12" data-gs-height="3">-->
<!--                         <div class="grid-stack-item-content card" ref="chart">-->
<!--                         </div>-->
<!--                    </div>-->

     </aside>
</template>

<script>
   import * as am4core from "@amcharts/amcharts4/core";
   import * as am4charts from "@amcharts/amcharts4/charts";
   import am4themes_animated from "@amcharts/amcharts4/themes/animated";

   am4core.useTheme(am4themes_animated);
   export default {
      name: "Sidebar",
      mounted() {
         let grids = this.initGrids();

         // send grids to be usable in other components
         window.bus.$emit("send-grids", grids);

         // disable resize in sidebar by default
         grids.forEach((grid) => {
            // listen on drop event
            this.resizeAndCreateChartAfterDrop(grid);

            if (localStorage.getItem("grids")) {
               this.loadGridsItemsFromLocalStorageAndCreateWidget(grid);
            } else if (!localStorage.getItem("grids")) {
               this.createGridItemInSidebar(grid);
            }
            // disable grids by default
            grid.disable();
            if (grid.el.classList[0] === 'l-sidebar') {
               // grid.enableResize(false, true);
               window.$('.l-sidebar .grid-stack-item').css({left: '0', width: '100%', height: '210px'});
            }
         })
         this.createChart();
      },
      beforeDestroy() {
         if (this.chart) {
            this.chart.dispose();
         }
      },
      methods: {
         initGrids() {
            return window.GridStack.initAll({
               alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
               ),
               resizable: {
                  handles: 'e, se, s, sw, w'
               },
               acceptWidgets: true
            });
         },
         createGridItemInSidebar(grid) {
            if(grid.el.classList[0] === "l-sidebar") {
               let sidebarOptions = [{"x":0,"y":4,"width":12,"height":3}];
               grid.addWidget('<div><div class="grid-stack-item-content card" ref="chart"></div></div>', sidebarOptions);
            }
         },
         loadGridItems(grid) {
            let serializedGrids = JSON.parse(localStorage.getItem("grids"))
            let gridsItems = {};
            for (let prop in serializedGrids) {
               gridsItems[prop] = window.GridStack.Utils.sort(serializedGrids[prop])
            }
            return gridsItems[grid.el.classList[0]]
         },
         loadGridsItemsFromLocalStorageAndCreateWidget(grid) {
            let items = this.loadGridItems(grid)
            grid.batchUpdate();
            items.forEach(function (node) {
               grid.addWidget('<div><div class="grid-stack-item-content card" ref="chart"></div></div>', node);
            });
            grid.commit();
         },
         resizeAndCreateChartAfterDrop(grid) {
            grid.on('dropped', () => {
               if (grid.el.classList[0] === "l-sidebar") {
                  // when dropping into sidebar. resize and don't make it resizable
                  // grid.enableResize(false);
                  grid.minHeight(window.$('.grid-stack-item'), 2);
                  window.$('.grid-stack-item').css({left: '0', width: '100%', height: '210px'});
               } else {
                  // when dropping into main content. resize and make it resizable
                  grid.enableResize(true);
                  grid.resize(window.$('.grid-stack-item'), 3, 3);
               }
               this.createChart();
            })
         },
         createChart() {
            if (this.chart) {
               this.chart.dispose();
            }
            var chart = am4core.create(document.querySelector(".card"), am4charts.PieChart);

            // Add data
            chart.data = [{
               "country": "Lithuania",
               "litres": 501.9
            }, {
               "country": "Czech Republic",
               "litres": 301.9
            }, {
               "country": "Ireland",
               "litres": 201.1
            }, {
               "country": "Germany",
               "litres": 165.8
            }, {
               "country": "Australia",
               "litres": 139.9
            }, {
               "country": "Austria",
               "litres": 128.3
            }, /*{
               "country": "UK",
               "litres": 99
            }, {
               "country": "Belgium",
               "litres": 60
            }, {
               "country": "The Netherlands",
               "litres": 50
            }
*/            ];

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "litres";
            pieSeries.dataFields.category = "country";
            pieSeries.innerRadius = am4core.percent(50);
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            var rgm = new am4core.LinearGradientModifier();
            rgm.brightnesses.push(0, -0.4);
            pieSeries.slices.template.fillModifier = rgm;

            var rgm2 = new am4core.LinearGradientModifier();
            rgm2.brightnesses.push(0, -0.4);

            pieSeries.slices.template.strokeModifier = rgm2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.strokeWidth = 1;


            chart.legend = new am4charts.Legend();
            chart.legend.position = "right";

            pieSeries.slices.template.events.on("validated", function (event) {
               var gradient = event.target.fillModifier.gradient
               gradient.rotation = event.target.middleAngle + 90;

               var gradient2 = event.target.strokeModifier.gradient
               gradient2.rotation = event.target.middleAngle + 90;
            })
            // let chart = am4core.create(document.querySelector(".card"), am4charts.XYChart);
            //
            // chart.paddingRight = 20;
            //
            // let data = [];
            // let visits = 10;
            // for (let i = 1; i < 366; i++) {
            //    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            //    data.push({date: new Date(2018, 0, i), name: "name" + i, value: visits});
            // }
            //
            // chart.data = data;
            //
            // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            // dateAxis.renderer.grid.template.location = 0;
            //
            // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            // valueAxis.tooltip.disabled = true;
            // valueAxis.renderer.minWidth = 36;
            //
            // let series = chart.series.push(new am4charts.LineSeries());
            // series.dataFields.dateX = "date";
            // series.dataFields.valueY = "value";
            //
            // series.tooltipText = "{valueY.value}";
            // // chart.cursor = new am4charts.XYCursor();
            //
            // // let scrollbarX = new am4charts.XYChartScrollbar();
            // // scrollbarX.series.push(series);
            // // chart.scrollbarX = scrollbarX;
            this.chart = chart;
         }
      }

   }
</script>

<style scoped>

</style>