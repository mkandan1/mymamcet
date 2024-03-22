import { Icon } from '@iconify/react'
import React from 'react'
import { useSelector } from 'react-redux'

export const FullScreenLoading = () => {
    const loading = useSelector((state)=> (state.loadingFullScreen))
    if(!loading.show){
        return
    }
    return (
        <div className='absolute mt-[78vh] text-t4 ml-[45%] z-10'>
            <Icon icon={'tabler:circle-dotted'} className='animate-spin text-6xl duration-1000' />
        </div>
    )
}
