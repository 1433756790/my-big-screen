<template>
  <!-- 折线图 -->
  <div class="left2"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getLeft2();
  },
  methods: {
    getLeft2() {
      let mChart = this.$echarts.init(document.querySelector(".left2"));
      let xDataArr = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
      ];
      let yDataArr = [100, 200, 50, 40, 20, 100, 200, 50, 40, 20];
      let yDataArr2 = [200, 100, 200, 30, 30, 120, 221, 60, 50, 60];

      let option = {
        dataZoom: [
          {
            type: "slider", //slider滑块缩放，inside滚轮
            xAxisIndex: 0, //指明作用的轴
          },
          {
            type: "slider",
            yAxisIndex: 0,
            start: 0, //筛选的初始值
            end: 50,
          },
        ],
        grid: {
          show: true,
        },
        xAxis: {
          type: "category",
          data: xDataArr,
          boundaryGap: false, //第一个元素紧挨坐标轴
        },
        yAxis: {
          type: "value",
          scale: true, //支持缩放，y轴不一定从0开始
        },
        tooltip: {
          //提示
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        series: [
          {
            name: "康师傅",
            data: yDataArr,
            type: "line",
            smooth: true, //平滑
            stack: "toal",
            markPoint: {
              //标注一个点
              data: [
                {
                  type: "max", //最大值
                },
                {
                  type: "min", //最小值
                },
              ],
            },
            markLine: {
              //标注一条线
              data: [
                {
                  type: "average", //平均值
                },
              ],
            },
            // markArea: {
            //   //标注阴影区间
            //   data: [
            //     [
            //       {
            //         xAxis: "1月", //起始值
            //       },
            //       {
            //         xAxis: "3月", //结束值
            //       },
            //     ],
            //     [
            //       {
            //         xAxis: "7月", //起始值
            //       },
            //       {
            //         xAxis: "8月", //结束值
            //       },
            //     ],
            //   ],
            // },
            areaStyle: {}, //填充风格
            lineStyle: {
              //线条样式
              color: "#bfa",
              type: "solid", //solid dotted dashed
            },
          },
          {
            name: "百事可乐",
            data: yDataArr2,
            type: "line",
            stack: "toal",
            areaStyle: {},
          },
        ],
      };
      mChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.left2 {
  height: 100%;
  width: 100%;
}
</style>