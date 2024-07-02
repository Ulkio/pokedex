import { useNavigate } from 'react-router-dom'
import { Pokemon } from 'types'
import { colorTypesVariants } from 'utils'

interface PokemonCardProps {
    poke: Pokemon
    isDetails?: boolean
}
export const PokemonCard = ({ poke, isDetails }: PokemonCardProps) => {
    const navigate = useNavigate()
    const handleClickCard = (id: number) => {
        navigate('/' + id)
    }

    return (
        <div
            onClick={() => handleClickCard(poke.id)}
            className={`${
                isDetails &&
                'w-full xl:w-1/2 h-full self-center flex justify-center items-center gap-8'
            }  group transition duration-150  text-white relative hover:cursor-pointer flex flex-col gap-2 justify-center bg-gray-800 rounded-xl p-4 h-full`}
        >
            <p className='text-xs italic  absolute top-1 left-1'>#{poke.id}</p>
            <div className='flex justify-center items-center gap-4'>
                <p className='text-lg font-bold uppercase'>{poke.name}</p>
            </div>
            <>
                {poke.sprites.front_default && (
                    <img
                        data-testid={poke.name}
                        src={poke.sprites.front_default}
                        alt={poke.name}
                        className={`${
                            isDetails ? 'size-80' : ' size-48 '
                        } group-hover:hidden transition-opacity duration-200 ease-in-out`}
                    />
                )}
                {poke.sprites.front_shiny && (
                    <img
                        src={poke.sprites.front_shiny!}
                        alt={poke.name}
                        className={`${
                            isDetails ? 'size-80' : ' size-48 '
                        } hidden group-hover:flex size-48`}
                    />
                )}
            </>

            <div className='flex flex-col md:flex-row  gap-2 '>
                {poke.types.map(({ type }) => {
                    return (
                        <p
                            key={type.name}
                            className={`p-2  ${colorTypesVariants[type.name]} ${
                                isDetails && 'text-2xl px-4'
                            }  uppercase font-bold  rounded-full w-full text-center`}
                        >
                            {type.name}
                        </p>
                    )
                })}
            </div>
            {isDetails && (
                <>
                    <audio defaultValue={10} controls src={poke.cries.latest}></audio>
                    <div className='bg-slate-700 rounded-xl p-2 w-full lg:w-1/2 gap-2 flex flex-col'>
                        {poke.stats.map((stat) => {
                            return (
                                <div key={stat.stat.name} className='flex justify-between'>
                                    <p className='uppercase w-1/3 border-b-[1px]'>
                                        {stat.stat.name}
                                    </p>
                                    <p className='uppercase font-bold'>{stat.base_stat}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default PokemonCard
