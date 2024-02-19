import React from 'react'
import { Model } from './Model'
import { MarkTable } from './MarkTable'
import { ButtonLayout } from './ButtonLayout';
import { Button } from './Button';
import { UniversityMarkTable } from './UniversityMarkTable';

export const MarkAllocationPopup = ({ rows, cols, onUpdate, subjects, batch, show, newMarks, setNewMarks, data, students, loading, onSave, onViewRow, onClose }) => {
  return (
    <Model title={'Allocate Marks to Students'} subtitles={batch} rows={rows} cols={cols} show={show} onClose={onClose}>
      {batch.exam == 'Internal Exam' ? (
        <>
          {show && subjects && students && (
            <>
              <MarkTable
                subjects={subjects}
                data={data}
                students={students}
                onViewRow={onViewRow}
                newMarks={newMarks}
                setNewMarks={setNewMarks}
              />
              <ButtonLayout>
                <Button bgColor={'green-500'} textColor={'white'} text={'Save Scores'} icon={'bx:save'} onClick={onSave} />
                <Button bgColor={'green-500'} textColor={'white'} text={'Update Scores'} icon={'bx:save'} onClick={onUpdate} />
                <Button bgColor={'white'} textColor={'gray-400'} text={'Close'} icon={'ic:outline-cancel'} onClick={onClose} />
              </ButtonLayout>
            </>
          )}
        </>) : (
        <>
          <UniversityMarkTable
            subjects={subjects}
            data={data}
            students={students}
            onViewRow={onViewRow}
            newMarks={newMarks}
            setNewMarks={setNewMarks}
          />
          <ButtonLayout>
            <Button bgColor={'green-500'} textColor={'white'} text={'Save Scores'} icon={'bx:save'} onClick={onSave} />
            <Button bgColor={'green-500'} textColor={'white'} text={'Update Scores'} icon={'bx:save'} onClick={onUpdate} />
            <Button bgColor={'white'} textColor={'gray-400'} text={'Close'} icon={'ic:outline-cancel'} onClick={onClose} />
          </ButtonLayout>
        </>
      )

      }
    </Model>
  )
}
