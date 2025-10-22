import * as weatherApi from './weatherApi.js'

let cities = [];

$(document).ready(async function () {
    let cities = await weatherApi.getCities();
    console.log(cities);
    renderCitiesList(cities)
})

$('.form-control').on('input', async function () {
    let str = event.target.value;
    if (str.trim()) {
        let cities = await weatherApi.getCities();
        cities = cities.filter(city => city.name.toLowerCase().startsWith(str.toLowerCase()))
            .sort((n1, n2) => n1.name.localeCompare(n2.name));
        renderCitiesList(cities);
    }
})

$(".mb-3").on('submit', async function () {
    event.preventDefault();

    let cityName = $(".form-control").val();

    if (cityName.trim()) {
        let data = await weatherApi.getWeatherByCityName(cityName);
        if (data.cod == "200") {
            if (cities.includes(data.name)) {
                alert('Город уже есть в списке');
            } else {
                let h5 = $('<h5>',
                    { class: "card-title" }).text(`${data.name} ${Math.round(data.main.temp)} ℃`);
                let p = $('<p>',
                    { class: "card-text" }).text(`${data.weather[0].main} : (${data.weather[0].description})`);
                let body = $('<div>',
                    { class: "card-body" });
                body.append(h5);
                body.append(p);

                let div = $('<div>',
                    { class: "card" });
                div.append($('<img>',
                    { class: "card-img-top icon-img", src: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, alt: "..." }));
                div.append(body);
                $('.info').append(div);

                $(".mb-3").trigger('reset');

                cities.push(data.name);
            }

        } else if (data.cod == "404") {
            alert(data.message);
        } else {
            alert('Error');
        }
    }
})

function renderCitiesList(cities) {
    let citiesList = $('#cities');
    citiesList.html(``);

    for (const city of cities) {
        citiesList.append($('<option>').text(city.name));
    }
}