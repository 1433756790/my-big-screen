<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      allData: null,
      currentPage: 1,
      totalPage: 0,
      timerId: null,
    };
  },
  mounted() {
    this.getData();
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
  },
  destroyed() {
    clearInterval(this.timerId);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.seller_ref, "dark");
      this.myChart.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.myChart.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      const { data: res } = await this.$http.get("seller");
      this.allData = res;
      this.allData.sort((a, b) => {
        return b.value - a.value;
      });
      this.totalPage =
        this.allData.length % 5 === 0
          ? this.allData.length / 5
          : this.allData.length / 5 + 1;
      this.updateOption();
      this.startInterval();
    },
    updateOption() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const option = {
        title: {
          text: "▮ 商家销售统计",
          textStyle: {
            fontSize: 40,
          },
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, //包含坐标轴上的文字
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: sellerNames,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0,
            lineStyle: {
              width: 66,
              type: "solid",
              color: "rgba(45, 52, 67,.6)",
            },
          },
        },
        series: [
          {
            type: "bar",
            data: sellerValues,
            barWidth: 66,
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
              borderRadius: [0, 33, 33, 0],
              // 指明颜色渐变的方向
              // 指明不同百分比下颜色的值
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#5052EE",
                },
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateOption();
      }, 3000);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.seller_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>