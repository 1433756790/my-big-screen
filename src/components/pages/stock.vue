<template>
  <div class="com-container">
    <div class="com-chart" id="stock"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      allData: null,
      titleFontSize: null,
      currentIndex: 0,
      timerId: null,
    };
  },
  mounted() {
    this.getData();
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
  },
  methods: {
    async initChart() {
      this.myChart = this.$echarts.init(
        document.querySelector("#stock"),
        "dark"
      );
      this.myChart.setOption({
        title: {
          text: "▮ 库存和销量分析",
          left: 20,
          top: 20,
        },
      });
    },
    async getData() {
      const { data: res } = await this.$http("stock");
      this.allData = res;
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      const colorArr = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
      ];
      const start = this.currentIndex * 5;
      const end = (this.currentIndex + 1) * 5;
      const showData = this.allData.slice(start, end);
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          radius: [this.titleFontSize * 2, this.titleFontSize * 2.3],
          hoverAnimation: false,
          center: centerArr[index],
          label: {
            fontSize: this.titleFontSize / 2,
            position: "center",
            color: colorArr[index][0],
            formatter: item.name + "\n" + "\n" + item.sales,
          },
          labelLine: {
            show: false,
          },

          data: [
            {
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              },
            },
            {
              value: item.stock,
              itemStyle: {
                color: "#333843",
              },
            },
          ],
        };
      });
      const dataOption = { series: seriesArr };
      this.myChart.setOption(dataOption);
    },
    screenAdapter() {
      this.titleFontSize =
        (document.querySelector("#stock").offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize,
          },
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > 1) {
          this.currentIndex = 0;
        }
        this.updateChart();
      }, 5000);
    },
  },
};
</script>

<style>
</style>