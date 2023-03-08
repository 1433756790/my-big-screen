<template>
  <div class="left5">
    <!-- 雷达图 -->
  </div>
</template>

<script>
import "../assets/walden"; //自定义主题
export default {
  mounted() {
    this.getLeft5();
  },
  methods: {
    getLeft5() {
      let mychart = this.$echarts.init(
        document.querySelector(".left5"),
        "walden"
      );
      mychart.setOption({
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
          textStyle: {
            color: "white",
          },
        },
        radar: {
          //定义各个维度的最大值
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            // label: {
            //   show: true,
            // },
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      });
      window.onresize = function () {
        mychart.resize();
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.left5 {
  width: 100%;
  height: 100%;
}
</style>