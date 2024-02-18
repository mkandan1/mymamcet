import React from 'react'
import { Model } from './Model'
import { MarkTable } from './MarkTable'

export const MarkAllocationPopup = ({ rows, cols, subjects, subtitles, show, data, loading, handleRefresh, onClose }) => {
  return (
    <Model title={'Allocate Marks to Students'} subtitles={subtitles} rows={rows} cols={cols} show={show} onClose={onClose}>
        {subjects && (<MarkTable subjects={subjects} data={data}/>)}
    </Model>
  )
}
