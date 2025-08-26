export default function Switch({ checked, onChange, label }) {
return (
<label className="flex items-center gap-3 cursor-pointer select-none">
<span className="text-sm opacity-80">{label}</span>
<span
onClick={() => onChange(!checked)}
className={`relative inline-block h-6 w-11 rounded-full transition ${checked ? 'bg-emerald-400' : 'bg-white/30'}`}
>
<span
className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`}
/>
</span>
</label>
)
}