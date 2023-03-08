<template>
  <div class="left4">
    <!-- 地图 -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.getleft4();
  },
  methods: {
    async getleft4() {
      let mychart = this.$echarts.init(document.querySelector(".left4"));
      const { data: res } = await this.$http.get("../../map/china.json");
      this.$echarts.registerMap("chinaMap", res);
      mychart.setOption({
        geo: {
          type: "map",
          map: "chinaMap",
          roam: true, //可拖拽，放大缩小
          //   label: {
          //     show: true,//展示标签
          //   },
          zoom: 2, //初始化缩放比例
          center: [87.617, 43], //初始中心点
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left4 {
  width: 100%;
  height: 100%;
}
</style>