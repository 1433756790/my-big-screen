<template>
  <div class="com-container">
    <div class="com-chart" id="hot"></div>
    <div class="leftBtn btn" @click="pushTo(-1)">←</div>
    <div class="rightBtn btn" @click="pushTo(1)">→</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      allData: null,
      currentIndex: 0,
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
  },
  methods: {
    async initChart() {
      this.myChart = this.$echarts.init(document.querySelector("#hot"), "dark");
      this.myChart.setOption({
        title: {
          text: "▮ 热销商品的占比",
          left: 20,
          top: 20,
        },
        legend: {
          top: "13%",
          icon: "circle",
        },
        tooltip: {
          formatter: (arg) => {
            const thirdCategory = arg.data.children;
            let total = 0;
            thirdCategory.forEach((item) => {
              total += item.value;
            });
            let retStr = "";
            thirdCategory.forEach((item) => {
              retStr += `${item.name}:${parseInt(
                (item.value / total) * 100
              )}%</br>`;
            });
            return retStr;
          },
        },
        series: {
          type: "pie",
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
            },
            labelLine: {
              show: false,
            },
          },
        },
      });
    },
    async getData() {
      const { data: res } = await this.$http.get("hotproduct");
      this.allData = res;
      this.updateChart();
    },
    updateChart() {
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => {
          return item.name;
        }
      );
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children,
          };
        }
      );
      const dataOption = {
        legend: {
          data: legendData,
        },
        series: {
          data: seriesData,
        },
      };
      this.myChart.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize =
        (document.querySelector("#hot").offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 3,
          itemHeight: titleFontSize / 3,
          itemGap: titleFontSize / 3,
          textStyle: {
            fontSize: titleFontSize / 3,
          },
        },
        series: {
          radius: titleFontSize * 4.5,
          center: ["50%", "60%"],
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
    pushTo(index) {
      let currentIndex = this.currentIndex;
      this.currentIndex = this.currentIndex + index;
      if (
        this.currentIndex < 0 ||
        this.currentIndex > this.allData.length - 1
      ) {
        this.currentIndex = currentIndex;
        return;
      }
      this.updateChart();
    },
  },
};
</script>

<style lang="scss" scoped>
.com-container {
  position: relative;
  .btn {
    position: absolute;
    width: 5%;
    height: 6%;
    top: 50%;
    background-color: #bfa;
    cursor: pointer;
    border-radius: 10%;
    text-align: center;
    line-height: 150%;
    font-size: 20px;
  }
  .leftBtn {
    left: 5%;
  }
  .rightBtn {
    right: 5%;
  }
}
</style>