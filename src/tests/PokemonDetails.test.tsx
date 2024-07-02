import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import PokemonDetails from '../pages/PokemonDetails'
import { getPokemonById } from 'api'
import { AxiosResponse, AxiosError } from 'axios'

vi.mock('api', () => ({
    getPokemonById: vi.fn()
}))

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

describe('PokemonDetails Component', () => {
    const mockPokemon = {
        id: 1,
        name: 'Bulbasaur',
        sprites: {
            front_default: 'bulbasaur.png',
            front_shiny: 'shiny_bulbasaur.png'
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        cries: { latest: 'bulbasaur_cry.mp3' },
        stats: [
            { stat: { name: 'hp' }, base_stat: 45 },
            { stat: { name: 'attack' }, base_stat: 49 }
        ]
    }

    const mockAxiosResponse: AxiosResponse = {
        data: mockPokemon,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
    }

    beforeEach(() => {
        queryClient.clear()
    })

    it('renders loading state', () => {
        vi.mocked(getPokemonById).mockResolvedValueOnce(mockAxiosResponse)

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/1']}>
                    <Routes>
                        <Route path='/:id' element={<PokemonDetails />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders pokemon details after loading', async () => {
        vi.mocked(getPokemonById).mockResolvedValueOnce(mockAxiosResponse)

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/1']}>
                    <Routes>
                        <Route path='/:id' element={<PokemonDetails />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
            expect(screen.getByText('Home')).toBeInTheDocument()
            expect(screen.getByTestId('Bulbasaur')).toHaveAttribute('src', 'bulbasaur.png')
            expect(screen.getByText('grass')).toBeInTheDocument()
            expect(screen.getByText('poison')).toBeInTheDocument()
        })
    })

    it('renders error state', async () => {
        const mockError = new Error('Failed to fetch')
        vi.mocked(getPokemonById).mockRejectedValueOnce(mockError)

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={['/1']}>
                    <Routes>
                        <Route path='/:id' element={<PokemonDetails />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument()
        })
    })
})
