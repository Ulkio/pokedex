export interface PokemonBase {
    name: string
    url: string
}
export interface Pokemon {
    abilities: Ability[]
    base_experience: number
    cries: Cries
    forms: Form[]
    game_indices: GameIndex[]
    height: number
    held_items: HeldItem[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Move[]
    name: string
    order: number
    past_abilities: PastAbility[]
    past_types: PastType[]
    species: NamedAPIResource
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
}

interface Ability {
    ability: NamedAPIResource
    is_hidden: boolean
    slot: number
}

interface Cries {
    latest: string
    legacy: string
}

interface Form {
    name: string
    url: string
}

interface GameIndex {
    game_index: number
    version: NamedAPIResource
}

interface HeldItem {
    item: NamedAPIResource
    version_details: VersionDetail[]
}

interface VersionDetail {
    rarity: number
    version: NamedAPIResource
}

interface Move {
    move: NamedAPIResource
    version_group_details: VersionGroupDetail[]
}

interface VersionGroupDetail {
    level_learned_at: number
    version_group: NamedAPIResource
    move_learn_method: NamedAPIResource
}

interface PastAbility {
    ability: NamedAPIResource
    generation: NamedAPIResource
    is_hidden: boolean
}

interface PastType {
    generation: NamedAPIResource
    types: Type[]
}

interface NamedAPIResource {
    name: string
    url: string
}

interface Sprites {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}

interface Stat {
    base_stat: number
    effort: number
    stat: NamedAPIResource
}

interface Type {
    slot: number
    type: NamedAPIResource
}
