<template>
  <div class="left1">
    <div id="left1Content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.left1Echarts();
  },
  methods: {
    left1Echarts() {
      let myEcarts = this.$echarts.init(
        document.querySelector(".left1 #left1Content")
      );
      myEcarts.setOption({
        color: [
          "#37a2da",
          "#32c5e9",
          "#9fe6b8",
          "#ffdb5c",
          "#ff9f7f",
          "#fb7293",
          "#e7bcf3",
          "#8378ea",
        ],
        legend: {
          //图例
          left: "center",
          top: "bottom",
          bottom: 0,
          icon: "circle",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "通过率统计",
            type: "pie",
            emphasis: {
              //高亮显示
              label: {
                show: true,
              },
            },
            itemStyle: {
              borderRadius: 10,
              borderWidth: 2,
            },
            data: [
              { value: 10, name: "数据1" },
              { value: 5, name: "数据2" },
              { value: 15, name: "数据3" },
              { value: 25, name: "数据4" },
              { value: 20, name: "数据5" },
              { value: 35, name: "数据6" },
            ],
            radius: [15, 60],//第一个元素是内圆的半径，第二个是外圆的半径
            center: ["50%", "40%"],
            roseType: "area",
            selectedMode:'multiple'//选中后偏离圆心点一段距离single,multiple
          },
        ],
        tooltip: {//提示
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left1 {
  height: 100%;
  #left1Content {
    color: #d3d6dd;
    width: 100%;
    height: 100%;
  }
}
</style>