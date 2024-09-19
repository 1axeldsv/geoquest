// Données des villes (10 villes pour le test)
const cities = [
    {name: "Paris", lat: 48.8566, lon: 2.3522},
    {name: "Marseille", lat: 43.2965, lon: 5.3698},
    {name: "Lyon", lat: 45.7640, lon: 4.8357},
    {name: "Toulouse", lat: 43.6047, lon: 1.4442},
    {name: "Nice", lat: 43.7102, lon: 7.2620},
    {name: "Nantes", lat: 47.2184, lon: -1.5536},
    {name: "Strasbourg", lat: 48.5734, lon: 7.7521},
    {name: "Montpellier", lat: 43.6108, lon: 3.8767},
    {name: "Bordeaux", lat: 44.8378, lon: -0.5792},
    {name: "Lille", lat: 50.6292, lon: 3.0573}
];

let targetCity;
let map;
let marker;

function initGame() {
    targetCity = cities[Math.floor(Math.random() * cities.length)];
    displayCities();
    initMap();
}

function displayCities() {
    const circle = document.getElementById('circle-container');
    cities.forEach((city, index) => {
        const angle = (index / cities.length) * 2 * Math.PI;
        const x = 150 + 140 * Math.cos(angle);
        const y = 150 + 140 * Math.sin(angle);
        const cityElement = document.createElement('div');
        cityElement.textContent = city.name;
        cityElement.style.position = 'absolute';
        cityElement.style.left = `${x}px`;
        cityElement.style.top = `${y}px`;
        circle.appendChild(cityElement);
    });
}

function initMap() {
    map = L.map('map-container').setView([46.603354, 1.888334], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
    });
}

document.getElementById('submit-btn').addEventListener('click', checkAnswer);

function checkAnswer() {
    if (!marker) {
        alert("Veuillez sélectionner un point sur la carte.");
        return;
    }

    const distance = calculateDistance(marker.getLatLng().lat, marker.getLatLng().lng, targetCity.lat, targetCity.lon);
    const score = Math.max(0, 1000 - Math.floor(distance));

    alert(`Distance : ${Math.round(distance)} km\nScore : ${score} points`);
    initGame();
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

initGame();
