import { getPokemons } from 'api'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pokemon } from 'types'
import { PokemonCard } from 'components/PokemonCard'
import PaginationControls from 'components/PaginationControls'

const fetchPokemons = async (offset: number = 0) => {
    const data = await getPokemons(offset)
    return data
}

const App = () => {
    const [offset, setOffset] = useState(0)

    const { data, isLoading, isError, isFetched, status, error, isPlaceholderData } = useQuery({
        queryKey: ['pokemons', offset],
        queryFn: () => fetchPokemons(offset),
        placeholderData: keepPreviousData
    })

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error: {(error as Error).message}</span>
    if (!data) return <span>No data available</span>

    return (
        <>
            <h1 className='text-white text-6xl text-center'>Pokédex</h1>
            <PaginationControls
                data={data}
                isFetched={isFetched}
                isPlaceholderData={isPlaceholderData}
                offset={offset}
                setOffset={setOffset}
            />
            <div className='flex flex-wrap gap-16 justify-center'>
                {data?.map((poke: Pokemon) => {
                    return <PokemonCard poke={poke} key={poke.id} />
                })}
            </div>
        </>
    )
}

export default App
