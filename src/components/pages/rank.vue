<template>
  <div class="com-container">
    <div class="com-chart" id="rank"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      allData: null,
      startVal: 0,
      endVal: 9,
      timeId: null,
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
    clearInterval(this.timeId);
  },
  methods: {
    async initChart() {
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E728F", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
      ];
      this.myChart = this.$echarts.init(
        document.querySelector("#rank"),
        "dark"
      );
      this.myChart.setOption({
        title: {
          text: "▮ 地区销售排行",
          left: 20,
          top: 20,
        },
        dataZoom: {
          show: false,
          startValue: this.startVal,
          endValue: this.endVal,
        },
        grid: {
          top: "40%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: (arg) => {
                let targetArr;
                if (arg.value > 300) {
                  targetArr = colorArr[0];
                } else if (arg.value > 200) {
                  targetArr = colorArr[1];
                } else {
                  targetArr = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetArr[0],
                  },
                  {
                    offset: 1,
                    color: targetArr[1],
                  },
                ]);
              },
            },
          },
        ],
      });
      this.myChart.on("mouserover", () => {
        clearInterval(this.timeId);
      });
      this.myChart.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      const { data: res } = await this.$http.get("rank");
      this.allData = res;
      this.allData.sort((a, b) => {
        return b.value - a.value;
      });
      this.startInterval();
      this.updateChart();
    },
    updateChart() {
      const nameArrs = this.allData.map((item) => {
        return item.name;
      });
      const valArrs = this.allData.map((item) => {
        return item.value;
      });
      const updateOption = {
        dataZoom: {
          show: false,
          startValue: this.startVal,
          endValue: this.endVal,
        },
        xAxis: {
          data: nameArrs,
        },

        series: [
          {
            data: valArrs,
          },
        ],
      };
      this.myChart.setOption(updateOption);
    },
    screenAdapter() {
      const ttileFontSize =
        (document.querySelector("#rank").offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: ttileFontSize,
          },
        },
        series: [
          {
            barWidth: ttileFontSize,
            itemStyle: {
              borderRadius: [ttileFontSize / 2, ttileFontSize / 2, 0, 0],
            },
          },
        ],
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
    startInterval() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.startVal++;
        this.endVal++;
        if (this.endVal > this.allData.length - 1) {
          this.startVal = 0;
          this.endVal = 9;
        }
        this.updateChart();
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>