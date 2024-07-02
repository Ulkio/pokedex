import React from 'react'
import { Pokemon } from 'types'

interface PaginationControlsProps {
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
    data: Pokemon[]
    isPlaceholderData: boolean
    isFetched: boolean
}

const PaginationControls = ({
    offset,
    setOffset,
    data,
    isPlaceholderData,
    isFetched
}: PaginationControlsProps) => {
    return (
        <div>
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

export default PaginationControls
