export const generateAcademicYears = (batchYear) => {
    const startYear = batchYear.split(' - ')[0];
    const endYear = batchYear.split(' - ')[1];
    let academicYears = [];
    for (let year = Number(startYear); year < endYear; year++) {
        const academicYearStart = year;
        const academicYearEnd = academicYearStart + 1;
        academicYears.push(`${academicYearStart} - ${academicYearEnd}`);
    }
    return academicYears;
}

export const mapAcademicYearToSemesters = (batchYear, academicYear) => {
    const [startYear, endYear] = academicYear.split(' - ').map(Number);
    const batchStartYear = parseInt(batchYear.split(' - ')[0], 10);
    const semesters = [];

    const yearDifference = startYear - batchStartYear;

    for (let i = 1; i <= 2; i++) {
        const semester = `${i + yearDifference * 2} SEM`;
        semesters.push(semester);
    }

    return semesters;
}