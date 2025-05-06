var map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function updateMap() {
    fetch("./data.json")
    .then(response => response.json())
    .then(rsp => {
        console.log(rsp.data);

        rsp?.data?.forEach(element => {
            let latitude = element.latitude;
            let longitude = element.longitude;
            
            let cases = element.infected;

            if(cases > 255) {
                color = "rgb(255,0,0)";
            }else {
                color = `rgb(${cases}, 0, 0)`;
            }

            var marker = L.circle([latitude, longitude], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: 20000,
            }).addTo(map);

            marker.bindPopup(`Total Cases: ${cases}`);

        });

    })
}

let interval = 2000;
setInterval(updateMap, interval);
