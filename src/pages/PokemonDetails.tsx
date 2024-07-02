import { getPokemonById } from 'api'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import PokemonCard from 'components/PokemonCard'

const PokemonDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const handleBackToHomepage = () => {
        navigate('/')
    }

    const fetchPokemon = async () => {
        if (!id) throw new Error('No ID provided')
        const { data } = await getPokemonById(id)
        return data
    }
    const { data, error, isLoading } = useQuery({
        queryKey: ['pokemon', id],
        queryFn: fetchPokemon
    })

    if (isLoading) return <span>Loading...</span>
    if (error)
        return (
            <span>
                Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
            </span>
        )
    return (
        <>
            <p
                onClick={handleBackToHomepage}
                className='bg-slate-800 text-white rounded-xl w-fit px-4 py-2 font-bold uppercase absolute top-4 left-4 hover:cursor-pointer select-none'
            >
                Home
            </p>
            {data && <PokemonCard poke={data} isDetails={true} />}
        </>
    )
}

export default PokemonDetails
