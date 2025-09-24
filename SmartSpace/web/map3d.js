{/* 設定Mapbox地圖的中心點、縮放比、傾斜角度 */ }
var currentCoord = [25.043178, 121.533992];
var currentZoom = 17;
var currentPitch = 60;

{/* 設定mapbox的取用金鑰 */ }
mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhYm9ibyIsImEiOiJjamVvejdlNXQxZnBuMndtdWhiZHRuaTNpIn0.PIS9wtUxm_rz_IzF2WFD1g';

{/* 建立ehart中mapbox3D的設定數據格式 */ }
function getMap3DOption() {
    return option = {
        // title: {
        //     text: '北科大上空PM2.5分佈圖',
        //     textStyle: {
        //         color: 'white'
        //     }
        // },
        mapbox3D: {
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [currentCoord[1], currentCoord[0]],
            zoom: currentZoom,
            pitch: currentPitch,
            altitudeScale: 1
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                { gte: 150.5, label: '>= 150.5 μg/m3', color: '#660499', colorAlpha: 1 },
                { gt: 55.5, lt: 150.4, label: '55.5-150.4 μg/m3', color: '#CC0233', colorAlpha: 1 },
                { gt: 35.5, lt: 55.4, label: '35.5-55.4 μg/m3', color: '#FFA500', colorAlpha: 1 },
                { gt: 12.1, lte: 35.4, label: '12.1-35.4 μg/m3', color: '#FFDE34', colorAlpha: 1 },
                { lte: 12, label: '<= 12.0 μg/m3', color: '#009966', colorAlpha: 1 }
            ],
            dimension: 3,
            seriesIndex: 0,
            itemWidth: 30,
            itemHeight: 24,
            itemGap: 16,
            hoverLink: false,
            left: 30,
            bottom: 70,
            fontSize: 20,
            textStyle: { 'color': 'white', 'fontSize': 16 }
        }
    };
}

{/* 模擬飛行數據用
        建立高度為50公尺的飛行路徑點，再透過程式進行每10公尺的切割以獲得各線段的插值 */}
var flight_plan_height = 50;
var flight_plan_path = [[25.042541, 121.533075], [25.044286, 121.533102], [25.044291, 121.533622], [25.042439, 121.533617], [25.042424, 121.534159], [25.044276, 121.534175],
[25.044276, 121.534690], [25.042337, 121.534700], [25.042337, 121.535435], [25.044621, 121.535457]];
var flight_path_point_data = createFlightPointsData(getPointsFromLineByStaticDistance(flight_plan_path));

// 透過線段數據進行插值點計算
function getPointsFromLineByStaticDistance(lines) {
    new_lins = [];
    for (var i = 0; i < lines.length; i++) {
        new_lins.push([lines[i][1], lines[i][0]])
    }
    var lineString = turf.lineString(new_lins);
    //lineChunk: （lineString, 分割距離(預設單位:公里), 可選參數）
    var chunk = turf.lineChunk(lineString, 0.01, {});
    var new_data = [];
    for (var i = 0; i < chunk.features.length; i++) {
        new_data.push(chunk.features[i].geometry.coordinates[0]);
    }
    return new_data;
}

// 建立模擬數據之噪聲點
// 透過SimplexNoise可建立具有熱區之隨機噪聲點
function createNoiseData() {
    var noise = new SimplexNoise(Math.random);
    var noise_data = [];
    for (var i = 0; i <= 30; i++) {
        for (var j = 0; j <= 50; j++) {
            var value = noise.noise2D(i / 20, j / 20) * 40 + 40;
            noise_data.push(value);
        }
    }
    return noise_data;
}

// 將模擬座標點與模擬數據噪聲點合併
function createFlightPointsData(gpsList) {
    var coord_data = [];
    var noiseData = createNoiseData();
    for (var k = 0; k < gpsList.length; k++) {
        var gps = gpsList[k];
        coord_data.push([gps[0], gps[1], flight_plan_height, noiseData[k]]);
    }
    return coord_data;
}

// 建立echart的三維散點數據格式
function formateEchart3DScatterData(data) {
    return option = {
        series: [
            {
                name: 'Flight Path Point',
                type: 'scatter3D',
                coordinateSystem: 'mapbox3D',
                symbol: 'circle',
                symbolSize: 6,
                animation: false,
                data: data,
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        borderWidth: 0.2,
                        borderColor: 'white'
                    }
                }
            }]
    };
}

{/* 建立echart實體在id為main的區塊中 */ }
var mapChart = echarts.init(document.getElementById('chart4'));

{/* 將建立好的mapbox3D設定數據格式設定至echart */ }
mapChart.setOption(getMap3DOption());

{/* 將建立好的mapbox3D模擬數據設定至echart */ }
var data3d = formateEchart3DScatterData(flight_path_point_data);
mapChart.setOption(data3d);

{/* console.log(data3d); */ }