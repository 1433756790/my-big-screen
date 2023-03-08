<template>
  <div class="com-container">
    <div class="com-chart" id="trendChart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
      allData: null,
    };
  },
  created() {
    this.$scoket.registerCallBack("trendData", this.getData);
  },
  mounted() {
    this.initChart();
    this.$scoket.send({
      action: "getData",
      scoketType: "trendData",
      chartName: "trend",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    this.$scoket.unRegisterCallBack("trendData");
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(
        document.querySelector("#trendChart"),
        "chalk"
      );
      this.myChart.setOption({
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
      });
    },
    // ret 就是服务端发送给客户端的图标数据
    async getData(res) {
      // const { data: res } = await this.$http.get("trend");
      this.allData = res;
      this.updateOption();
    },
    updateOption() {
      const colorArr1 = [
        "rgba(11,168,44,0.5)",
        "rgba(44,110,255,0.5)",
        "rgba(22,242,217,0.5)",
        "rgba(254,33,30,0.5)",
        "rgba(250,105,0,0.5)",
      ];
      const colorArr2 = [
        "rgba(11,168,44,0)",
        "rgba(44,110,255,0)",
        "rgba(22,242,217,0)",
        "rgba(254,33,30,0)",
        "rgba(250,105,0,0)",
      ];
      const timeArr = this.allData.common.month;
      const valueArr = this.allData.map.data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          emphasis: {
            focus: "series",
          },
          data: item.data,
          lineStyle: {
            width: 0,
          },
          stack: "map",
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              },
              {
                offset: 1,
                color: colorArr2[index],
              },
            ]),
          },
        };
      });
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const dataOption = {
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        xAxis: {
          data: timeArr,
          boundaryGap: false,
        },
        legend: {
          data: legendArr,
          left: 20,
          top: "15%",
          icon: "circle",
        },
        series: seriesArr,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
      };
      this.myChart.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>