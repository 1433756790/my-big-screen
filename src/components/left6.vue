<template>
  <div class="left6">
      <!-- 仪表盘 -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.getLeft6();
  },
  methods: {
    getLeft6() {
      let mychart = this.$echarts.init(document.querySelector(".left6"));
      mychart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: 20,
            max: 120,
            progress: {
              show: true,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}",
              fontSize: "12px",
            },
            data: [
              {
                value: 50,
                name: "SCORE",
                fontSize: "5px",
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left6 {
  width: 100%;
  height: 100%;
}
</style>