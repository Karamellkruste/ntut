import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCezIB0A5KdsSy-q-f5xdy3LTz43JvPUm0",
    authDomain: "smartspace2024-20e1e.firebaseapp.com",
    databaseURL: "https://smartspace2024-20e1e-default-rtdb.firebaseio.com",
    projectId: "smartspace2024-20e1e",
    storageBucket: "smartspace2024-20e1e.appspot.com",
    messagingSenderId: "593634337539",
    appId: "1:593634337539:web:1bb308097a2e569460ff36",
    measurementId: "G-VGCQPDXQYC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var tempDatas = [];
var humidityDatas = [];

function showData(data) {
    console.log(data);
    var pm25 = data["pm25"];
    var temperature = data["temperature"];
    var humidity = data["humidity"];
    var time = data["time"];
    tempDatas.push([time, temperature]);
    humidityDatas.push([time, humidity]);
    lineChart.setOption(getlineChartData(tempDatas, humidityDatas));
}

function listenFirebaseData() {
    const starCountRef = ref(db, '/datas/');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        showData(data);
        // console.log(data);
    });
}

// 寫入測試用
// function writeUserData(userId, name, email, imageUrl) {
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
// }


listenFirebaseData();