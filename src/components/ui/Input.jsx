export default function Input({ className = '', ...props }) {
return (
<input
className={`w-full rounded-2xl border border-white/30 bg-white/15 px-4 py-2 outline-none placeholder-white/60 font-black focus:border-white/60 ${className}`}
{...props}
/>
)
}