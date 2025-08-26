const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5'


async function request(path, params) {
const url = new URL(BASE + path)
Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
url.searchParams.set('appid', API_KEY)


const res = await fetch(url)
if (!res.ok) {
const text = await res.text()
throw new Error(`API ${res.status}: ${text}`)
}
return res.json()
}


export async function getCurrentByCity(city, units = 'metric') {
return request('/weather', { q: city, units })
}


export async function getForecastByCity(city, units = 'metric') {
return request('/forecast', { q: city, units })
}


export async function getCurrentByCoords(lat, lon, units = 'metric') {
return request('/weather', { lat, lon, units })
}


export async function getForecastByCoords(lat, lon, units = 'metric') {
return request('/forecast', { lat, lon, units })
}