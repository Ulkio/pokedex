import { QueryClient } from '@tanstack/react-query'
import { getPokemonById } from 'api'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import PokemonCard from 'components/PokemonCard'

const queryClient = new QueryClient()

const PokemonDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleBackToHomepage = () => {
        navigate('/')
    }

    const fetchPokemon = async () => {
        if (!id) return
        const { data } = await getPokemonById(id)
        return data
    }
    const { data, error, status } = useQuery({
        queryKey: ['pokemon'],
        queryFn: fetchPokemon
    })
    console.log(data)
    return (
        <QueryClientProvider client={queryClient}>
            <div className='px-8 md:px-64 py-16  bg-black flex flex-col gap-16 min-h-screen'>
                <p
                    onClick={handleBackToHomepage}
                    className='bg-slate-800 text-white rounded-xl w-fit px-4 py-2 font-bold uppercase absolute top-4 left-4 hover:cursor-pointer select-none'
                >
                    Home
                </p>
                {data && <PokemonCard poke={data} isDetails={true} />}
            </div>
        </QueryClientProvider>
    )
}

export default PokemonDetails
