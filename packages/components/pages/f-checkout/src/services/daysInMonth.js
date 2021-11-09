export default date => {
    const { month, year } = date;
    const monthValue = Number(month) + 1;

    return new Date(year, monthValue, 0).getDate();
};
