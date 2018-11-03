module.exports = {
  bar: {
    chart: {
      type: "bar"
    },
    credits: {
      enabled: false
    },
    title: {
      text: "今日看点每周热度报表" //指定图表标题
    },
    colors: ["#058DC7", "#50B432", "#ED561B", "#DDDF00", "#2F3440", "#24CBE5", "orange"],

    xAxis: {
      categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] //指定x轴分组
    },
    yAxis: {
      title: {
        text: "日浏览量(w)" //指定y轴的标题
      }
    },

    series: [
      {
        name: 'Dailyview',
        colorByPoint:true,
        data: [660, 235, 809, 337, 777, 670, 799]
      }
    ]
  }
};
