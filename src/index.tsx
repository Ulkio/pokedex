import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PokemonDetails from 'pages/PokemonDetails'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}  />
                <Route path='/:id' element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
)
