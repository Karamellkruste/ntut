function getRadarOption() {
    return option = {
        title: {
            text: '空氣品質AQI雷達圖'
        },
        tooltip: {},
        legend: {
            data: ['無人機1', '無人機2']
        },
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '細懸浮微粒PM2.5(μg/m3)', max: 100 },
                { name: '懸浮微粒PM10(μg/m3)', max: 100 },
                { name: '臭氧O3(ppb)', max: 100 },
                { name: '一氧化碳CO(ppm)', max: 50 },
                { name: '二氧化硫SO2(ppb)', max: 50 },
                { name: '二氧化氮NO2(ppb)', max: 50 }
            ]
        }
    };
}

function getRadar3dData() {
    return option = {
        series: [{
            name: '',
            type: 'radar',
            data: [
                {
                    value: [20, 23, 52, 20.8, 80, 90],
                    name: '無人機1'
                },
                {
                    value: [50, 62, 80, 40.5, 30.5, 36.8],
                    name: '無人機2'
                }
            ]
        }]
    };
}

var radarChart = echarts.init(document.getElementById('chart1'));

//設定格式
radarChart.setOption(getRadarOption());

//設定數據
radarChart.setOption(getRadar3dData());