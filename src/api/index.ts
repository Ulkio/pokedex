import axios, { AxiosPromise, AxiosResponse } from 'axios'
import { Pokemon, PokemonBase } from 'types'

export const BASE_URL = 'https://pokeapi.co/api/v2'
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000
})

export const getPokemons = async (offset: number = 0) => {
    const { data } = await axiosInstance.get(`/pokemon?offset=${offset}&limit=20`)
    const pokemonDetails = await Promise.all(
        data?.results.map(async (pokemon: PokemonBase) => {
            const { data: pokemonData } = await axiosInstance.get(pokemon.url)
            return pokemonData
        })
    )
    return pokemonDetails
}

export const getPokemonById = async (id: string) => {
    const res = await axiosInstance.get(`/pokemon/${id}`)
    return res
}
