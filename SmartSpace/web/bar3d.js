function getBar3DOption(data) {
    return option = {
        title: {
            text: '開放思考'
        },
        tooltip: {},
        visualMap: {
            max: 20,
            show: false,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        xAxis3D: {
            name: 'x',
            type: 'category',
            data: labels
        },
        yAxis3D: {
            name: 'y',
            type: 'category',
        },
        zAxis3D: {
            name: 'z',
            type: 'value'
        },
        grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            viewControl: {
                // projection: 'orthographic'
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [{
            type: 'bar3D',
            data: data.map(function (item) {
                return {
                    value: [item[1], item[0], item[2]],
                }
            }),
            shading: 'lambert',
            label: {
                textStyle: {
                    fontSize: 16,
                    borderWidth: 1
                }
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#900'
                    }
                },
                itemStyle: {
                    color: '#900'
                }
            }
        }]
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
};

function createRandomBar3DData() {
    rbdatas = [];
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 10; j++) {
            rbdatas.push([i, j, getRandom(0, 30)])
        }
    }
    return rbdatas
}

var labels = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9', 'data10'];

var bar3dChart = echarts.init(document.getElementById('chart3'));
var bar3DData = createRandomBar3DData();

bar3dChart.setOption(getBar3DOption(bar3DData));
