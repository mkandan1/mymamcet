export const geneteratePassingYear = (batch) => {
    const [startYear, endYear] = batch.batchName.split(' - ').map(Number);
    let passingYears = [];

    for (let year = startYear; year <= endYear; year++) {
        passingYears.push(`April / May - ${year}`);
        passingYears.push(`Nov / Dec - ${year}`);
    }

    return passingYears;
}
