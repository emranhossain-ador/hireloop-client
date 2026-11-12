export const FormatSalary = (salary: string) => {
    const amount = Number(salary);

    if (amount >= 1000) {
        return `${amount / 1000}k`;
    }

    return amount.toString();
};