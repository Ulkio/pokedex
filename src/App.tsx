import { getPokemons } from 'api'
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pokemon } from 'types'
import { PokemonCard } from 'components/PokemonCard'

const App = () => {
    const [offset, setOffset] = useState(0)
    const fetchPokemons = async (offset: number = 0) => {
        const data = await getPokemons(offset)
        return data
    }
    const { data, isLoading, isError, isFetched, status, error, isPlaceholderData } = useQuery({
        queryKey: ['pokemons', offset],
        queryFn: () => fetchPokemons(offset),
        placeholderData: keepPreviousData
    })

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error: {(error as Error).message}</span>

    return (
        <div className='px-12 lg:px-64 py-16  bg-black flex flex-col gap-16 min-h-screen'>
            <h1 className='text-white text-6xl text-center'>Pokédex</h1>
            <div className='flex flex-wrap justify-between gap-16 '>
                {data?.map((poke: Pokemon) => {
                    return <PokemonCard poke={poke} key={poke.id} />
                })}
            </div>
            <div className='flex justify-center gap-4'>
                <button
                    className=' bg-white px-4 py-2 rounded-xl'
                    onClick={() => {
                        if (!isPlaceholderData && offset > 0) {
                            setOffset((prev) => prev - 20)
                        }
                    }}
                >
                    {'<'}
                </button>
                <button className=' bg-white px-4 py-2 rounded-xl font-bold'>
                    {`${data![0].id} ... ${data![data!.length - 1].id}`}
                </button>
                <button
                    className=' bg-white px-4 py-2 rounded-xl'
                    onClick={() => {
                        if (isFetched) {
                            if (!isPlaceholderData && data!.length > 1) {
                                setOffset((prev) => prev + 20)
                            }
                        }
                    }}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}

export default App
