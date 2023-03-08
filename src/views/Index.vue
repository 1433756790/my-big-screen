<template>
  <div class="index">
    <!-- <div class="top">
      <dv-border-box-12 id="left1wrap">
        <left-1></left-1>
      </dv-border-box-12>
      <dv-border-box-12 id="left1wrap">
        <left-2></left-2>
      </dv-border-box-12>
      <dv-border-box-12 id="left1wrap">
        <left-3></left-3>
      </dv-border-box-12>
      <dv-border-box-12 id="left1wrap">
        <left-4></left-4>
      </dv-border-box-12>
    </div> -->
    <div class="top">
      <dv-border-box-8 id="left1wrap">
        <left-5></left-5>
      </dv-border-box-8>
      <dv-border-box-8 id="left1wrap">
        <left-6></left-6>
      </dv-border-box-8>
    </div>
  </div>
</template>

<script>
import left1 from "../components/left1.vue";
import Left2 from "../components/left2.vue";
import Left3 from "../components/left3.vue";
import Left4 from "../components/left4.vue";
import Left5 from "../components/left5.vue";
import Left6 from '../components/left6.vue';
export default {
  components: { left1, Left2, Left3, Left4, Left5, Left6 },
};
</script>

<style lang="scss" scoped>
.index {
  color: #d3d6dd;
  width: 85%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .top {
    display: flex;
    height: 250px;
    #left1wrap {
      width: 25%;
      padding: 1rem 1rem;
    }
  }
}
</style>>
