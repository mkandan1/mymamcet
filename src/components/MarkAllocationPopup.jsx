import React from 'react'
import { Model } from './Model'
import { MarkTable } from './MarkTable'

export const MarkAllocationPopup = ({ rows, cols, subjects, subtitles, show, data, students, loading, onViewRow, onClose }) => {
  return (
    <Model title={'Allocate Marks to Students'} subtitles={subtitles} rows={rows} cols={cols} show={show} onClose={onClose}>
        {subjects && (<MarkTable subjects={subjects} data={data} students={students} onViewRow={onViewRow}/>)}
    </Model>
  )
}
