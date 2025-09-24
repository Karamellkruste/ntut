function getLineChartOption() {
    return option = {
        title: {
            text: '溫濕度折線圖'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            max: 100,
            min: 0,
            splitLine: {
                show: false
            }
        },
        legend: {
            data: ['溫度', '濕度']
        },

    };
}

function getlineChartData(temp_data, humidity_data) {
    return option = {
        series: [{
            name: '溫度',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: temp_data
        },
        {
            name: '濕度',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: humidity_data
        }]
    };
}

var lineChart = echarts.init(document.getElementById('chart2'));

//設定格式
lineChart.setOption(getLineChartOption());

//設定數據
lineChart.setOption(getlineChartData([], []));