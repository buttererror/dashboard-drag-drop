<template>
     <aside class="l-sidebar grid-stack">
          <div class="grid-stack-item" data-gs-x="0" data-gs-y="1" data-gs-width="12" data-gs-height="3">
               <div class="grid-stack-item-content chart" ref="chartdiv">
               </div>
          </div>

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
         let grids = window.GridStack.initAll({
            resizable: {
               handles: 'e, se, s, sw, w'
            },
            acceptWidgets: true
         });
         grids.forEach((grid) => {
            grid.on('dropped', () => {
               this.createChart();
            })
         })
         this.createChart();

      },
      beforeDestroy() {
         if (this.chart) {
            this.chart.dispose();
         }
      },
      methods: {
         createChart() {
            if (this.chart) {
               this.chart.dispose();
            }
            let chart = am4core.create(document.querySelector(".chart"), am4charts.XYChart);

            chart.paddingRight = 20;

            let data = [];
            let visits = 10;
            for (let i = 1; i < 366; i++) {
               visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
               data.push({date: new Date(2018, 0, i), name: "name" + i, value: visits});
            }

            chart.data = data;

            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 36;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";

            series.tooltipText = "{valueY.value}";
            // chart.cursor = new am4charts.XYCursor();

            // let scrollbarX = new am4charts.XYChartScrollbar();
            // scrollbarX.series.push(series);
            // chart.scrollbarX = scrollbarX;
            this.chart = chart;
         }
      }

   }
</script>

<style scoped>
     .chart {
          height: auto;
          background: white;
     }

</style>