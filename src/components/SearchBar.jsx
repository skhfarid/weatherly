import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { Search } from 'lucide-react'


export default function SearchBar({ onSearch, placeholder = 'Search city (e.g., Dhaka, London)...' }) {
const [q, setQ] = useState('')


function submit(e) {
e.preventDefault()
const city = q.trim()
if (city) onSearch(city)
}


return (
<form onSubmit={submit} className="flex w-full gap-3">
<Input
className='w-full p-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
value={q}
onChange={(e) => setQ(e.target.value)}
placeholder={placeholder}
aria-label="city"
/>
<Button type="submit" aria-label="Search">
<Search className="h-5 w-5 mr-1" />
Search
</Button>
</form>
)
}