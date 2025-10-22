
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'd9ebd6e3de366196a8e96eefe87eb7ed';

export async function getWeatherByCityName(cityName) {
    let response = await fetch(`${baseUrl}weather?q=${cityName}&appid=${apiKey}&units=metric`);
    let data = await response.json();
    return data;
}

export async function getCities() {
    let response = await fetch(`./cities.json`);
    let data = await response.json();
    return data;
}
