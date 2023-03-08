<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" id="map"></div>
  </div>
</template>

<script>
import { getProvinceMapInfo } from "@/utils/map_utils";
import axios from "axios";
export default {
  data() {
    return {
      myChart: null,
      allData: null,
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
      this.myChart = this.$echarts.init(document.querySelector("#map"), "dark");
      const { data: res } = await axios.get(
        "http://localhost:8082/map/china.json"
      );
      this.$echarts.registerMap("china", res);
      const initOption = {
        title: {
          text: "▮ 商家分布",
          left: 20,
          top: 20,
        },
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            color: "#2E72BF",
            borderColor: "#333",
          },
          legend: {
            left: "5%",
            bottom: "5%",
            orient: "vertical",
          },
        },
      };
      this.myChart.setOption(initOption);
      this.myChart.on("click", async (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name);
        const { data: ret } = await this.$http.get(`${provinceInfo.path}`);
        this.$echarts.registerMap(provinceInfo.key, ret);
        this.myChart.setOption({
          geo: {
            map: provinceInfo.key,
          },
        });
      });
    },
    async getData() {
      const { data: res } = await this.$http.get("map");
      this.allData = res;
      console.log(res);
      this.updateChart();
    },
    updateChart() {
     
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      const seriesArr = this.allData.map((item) => {
        return {
          type: "effectScatter",
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
        };
      });
      const updateOption = {
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
          data: legendArr,
        },
        series: seriesArr,
      };
      this.myChart.setOption(updateOption);
    },
    screenAdapter() {
      const titleFontSize =
        (document.querySelector("#map").offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();
    },
    revertMap() {
      this.myChart.setOption({
        geo: {
          map: "china",
        },
      });
    },
  },
};
</script>

<style>
</style>