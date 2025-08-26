import Switch from './ui/Switch'


export default function UnitToggle({ units, onChange }) {
const checked = units === 'imperial'
return (
<Switch
checked={checked}
onChange={(v) => onChange(v ? 'imperial' : 'metric')}
label={checked ? '°F' : '°C'}
/>
)
}