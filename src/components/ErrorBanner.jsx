export default function ErrorBanner({ message }) {
if (!message) return null
return (
<div className="rounded-2xl bg-red-500/20 border border-red-400/40 text-red-50 px-4 py-3 text-sm">
{String(message)}
</div>
)
}