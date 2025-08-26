export const KELVIN = 273.15


export function speedUnit(units) {
return units === 'imperial' ? 'mph' : 'm/s'
}


export function formatDate(ts, opts = {}) {
const d = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts)
return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', ...opts })
}


export function chooseIcon(id) {
// OpenWeather condition id mapping
if (id >= 200 && id < 300) return 'storm'
if (id >= 300 && id < 600) return 'rain'
if (id >= 600 && id < 700) return 'snow'
if (id === 800) return 'clear'
if (id > 800) return 'clouds'
return 'mist'
}


// Pick 1 representative reading per day ~ midday; fallback to average
export function toDailyForecast(list) {
const byDate = list.reduce((acc, item) => {
const date = item.dt_txt.split(' ')[0]
acc[date] = acc[date] || []
acc[date].push(item)
return acc
}, {})


const daily = Object.entries(byDate).map(([date, items]) => {
// prefer 12:00:00 entries
let rep = items.find(x => x.dt_txt.endsWith('12:00:00'))
if (!rep) {
// nearest to noon
rep = items.reduce((best, x) => {
const hour = new Date(x.dt_txt).getHours()
const diff = Math.abs(12 - hour)
return !best || diff < best.diff ? { item: x, diff } : best
}, null).item
}
const temps = items.map(x => x.main.temp)
const min = Math.min(...temps)
const max = Math.max(...temps)
return {
date,
ts: rep.dt,
temp: rep.main.temp,
temp_min: min,
temp_max: max,
weather: rep.weather[0],
}
})


// Return next 5 days (including today if present)
return daily.slice(0, 5)
}