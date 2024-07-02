import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import PokemonCard from '../components/PokemonCard'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

describe('PokemonCard Component', () => {
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

    it('renders basic pokemon card', () => {
        render(
            <MemoryRouter>
                <PokemonCard poke={mockPokemon} />
            </MemoryRouter>
        )

        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('#1')).toBeInTheDocument()
        expect(screen.getByAltText('Bulbasaur')).toHaveAttribute('src', 'bulbasaur.png')
        expect(screen.getByText('grass')).toBeInTheDocument()
        expect(screen.getByText('poison')).toBeInTheDocument()
    })

    it('renders detailed pokemon card', () => {
        render(
            <MemoryRouter>
                <PokemonCard poke={mockPokemon} isDetails={true} />
            </MemoryRouter>
        )

        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('#1')).toBeInTheDocument()
        expect(screen.getByAltText('Bulbasaur')).toHaveAttribute('src', 'bulbasaur.png')
        expect(screen.getByText('grass')).toBeInTheDocument()
        expect(screen.getByText('poison')).toBeInTheDocument()
        expect(screen.getByRole('audio')).toBeInTheDocument()
        expect(screen.getByText('hp')).toBeInTheDocument()
        expect(screen.getByText('45')).toBeInTheDocument()
        expect(screen.getByText('attack')).toBeInTheDocument()
        expect(screen.getByText('49')).toBeInTheDocument()
    })

    it('navigates to pokemon details on click', () => {
        render(
            <MemoryRouter>
                <PokemonCard poke={mockPokemon} />
            </MemoryRouter>
        )

        fireEvent.click(screen.getByText('Bulbasaur'))
        expect(mockNavigate).toHaveBeenCalledWith('/1')
    })
})
