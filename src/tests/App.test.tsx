// App.test.tsx
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import { getPokemons } from 'api'

// Mock the API calls
vi.mock('api', () => ({
    getPokemonById: vi.fn(),
    getPokemons: vi.fn()
}))

const queryClient = new QueryClient()

interface PokemonTest {
    id: number
    name: string
    sprites: {
        front_default: string
    }
    types: Array<{ type: { name: string } }> // Adjusted to match typical Pokemon API response
}

describe('App Component', () => {
    it('renders loading state', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        )
        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it('renders fetched data', async () => {
        const mockData: PokemonTest[] = [
            {
                id: 1,
                name: 'Bulbasaur',
                sprites: { front_default: 'bulbasaur.png' },
                types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
            }
        ]

        vi.mocked(getPokemons).mockResolvedValueOnce(mockData)

        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
            expect(screen.getByAltText('Bulbasaur')).toHaveAttribute('src', 'bulbasaur.png')
            expect(screen.getByText('grass')).toBeInTheDocument()
            expect(screen.getByText('poison')).toBeInTheDocument()
        })
    })
})
