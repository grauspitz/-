<template>
  <div id="app">
    <x-chart :id="id" :option="option"></x-chart>
  </div>
</template>

<script>
// 导入chart组件
import XChart from '../components/chart.vue'
// 导入chart组件模拟数据
import options from '../chart-options/options.js'
export default {
  name: 'app',
  data() {
    let option = options.bar
    return {
      id: 'test',
      option: option
    }
  },
  components: {
    XChart
  }
}
</script>

<style>
#test {
  width: 1000px;
  height: 400px;
  margin: 40px auto;
}
</style>
