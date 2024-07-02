import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PokemonDetails from 'pages/PokemonDetails'
import React from 'react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const queryClient = new QueryClient()

root.render(
    <React.StrictMode>
        <div className='px-8 xl:px-48 py-16  bg-black flex flex-col gap-8 min-h-screen'>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<App />} />
                        <Route path='/:id' element={<PokemonDetails />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    </React.StrictMode>
)
