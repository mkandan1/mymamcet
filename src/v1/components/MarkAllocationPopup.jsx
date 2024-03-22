import React from 'react'
import { Model } from './Model'
import { MarkTable } from './MarkTable'
import { ButtonLayout } from './ButtonLayout';
import { Button } from './Button';
import { UniversityMarkTable } from './UniversityMarkTable';

export const MarkAllocationPopup = ({ rows, cols, onUpdate, subjects, semester, setStudents, batch, show, newMarks, setNewMarks, data, students, loading, onSave, onViewRow, onClose }) => {
  const handleCalculate = () => {
    students.map(student => {
      const studentMarks = newMarks.filter(mark => mark.student === student._id)
      let totalGradePoints = 0;
      let totalCreditsEarned = 0;
      console.log(studentMarks);
      const studentPreviousSemesterStats = student.semesterStats;
      const semesterArrears = studentPreviousSemesterStats?.semesterArrears || [];

      for (const mark of studentMarks) {
        const subject = subjects.find(subject => subject._id === mark.subject);
        if (subject) {
          totalGradePoints += mark.score * subject.subjectCredit;
          totalCreditsEarned += subject.subjectCredit;
          if (mark.score == '0') {
            semesterArrears.push(mark.subject)
          }
          else if (semesterArrears.includes(mark.subject)) {
            const index = semesterArrears.indexOf(mark.subject);
            semesterArrears.splice(index, 1);
          }
        }
      }

      const gpa = totalGradePoints / totalCreditsEarned;
      const semesterId = semester._id
      let newStats = {
        semester: semesterId,
        gpa,
        cgpa: gpa,
        semesterArrears,
      }
      if (Array.isArray(student.semesterStats)) {
        student.semesterStats = [...student.semesterStats, newStats];
      } else {
        student.semesterStats = [newStats];
      }
    })

    console.log(students);

  };

  const calculateCGPAForStudent = (studentId) => {
    const studentMarks = newMarks.filter(mark => mark.student === studentId);
    return calculateCGPA([studentMarks]);
  };

  return (
    <Model title={'Allocate Marks to Students'} batch={batch} rows={rows} cols={cols} show={show} onClose={onClose}>
      {/* {batch.exam == 'Internal Exam' ? (
        <>
          {show && subjects && students && (
            <>
              <MarkTable
                subjects={subjects}
                batch={batch}
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
            batch={batch}
            students={students}
            newMarks={newMarks}
            setStudents={setStudents}
            onViewRow={onViewRow}
            setNewMarks={setNewMarks}
            batch={batch}
          />
          <ButtonLayout>
            <Button bgColor={'green-500'} textColor={'white'} text={'Save Scores'} icon={'bx:save'} onClick={onSave} />
            <Button bgColor={'green-500'} textColor={'white'} text={'Update Scores'} icon={'bx:save'} onClick={onUpdate} />
            {batch.exam === 'University Exam' && (<Button bgColor={'green-500'} textColor={'white'} text={'Calculate GPA & CGPA'} icon={'bx:save'} onClick={() => handleCalculate()} />)}
            <Button bgColor={'white'} textColor={'gray-400'} text={'Close'} icon={'ic:outline-cancel'} onClick={onClose} />
          </ButtonLayout>
        </>
      )

      } */}
    </Model>
  )
}
