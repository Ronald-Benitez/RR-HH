import moment from "moment/moment";
import deductions from "../config/deductions.json";

export const calculateOvertime = (data, overtime) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  //Clear overtime
  updatedData.forEach((employee) => {
    employee.overtime = 0;
  });

  Object.values(overtime).map((row) => {
    const employee = updatedData.find(
      (employee) => employee.id === row.employee
    );

    if (employee) {
      employee.overtime += parseFloat(row.value);
    }
  });
};

export const calculateBonuses = (data, bonuses, date) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  //Clear overtime
  updatedData.forEach((employee) => {
    employee.bonuses = 0;
  });

  Object.values(bonuses).map((row) => {
    const employee = updatedData.find(
      (employee) => employee.id === row.employee
    );

    if (employee) {
      employee.bonuses += parseFloat(row.value);
    }
  });
};

export const calculateVacations = (data, vacations, date) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  //Clear overtime
  updatedData.forEach((employee) => {
    employee.vacations = 0;
  });

  Object.values(vacations).map((row) => {
    const employee = updatedData.find(
      (employee) => employee.id === row.employee
    );

    if (employee) {
      if (
        moment(row.start).month() === date.month() ||
        moment(row.end).month() === date.month()
      ) {
        if (verifyMonth(row.start, row.end)) {
          employee.vacations = row.value.toFixed(2);
        } else {
          employee.vacations = calculateValueVacation(
            moment(row.start),
            moment(row.end),
            row.value,
            date
          ).toFixed(2);
        }
      }
    }
  });
};

const verifyMonth = (start, end) => {
  const startDate = moment(start);
  const endDate = moment(end);

  if (startDate.month() === endDate.month()) {
    return true;
  }

  return false;
};

const calculateValueVacation = (start, end, value, date) => {
  const daysCount = deductions.vacaciones.dias;
  if (start.month() == date.month()) {
    const lastDay = moment(start).endOf("month");
    const days = lastDay.diff(start, "days") + 1;
    return (value / daysCount) * days;
  } else {
    const firstDay = moment(end).startOf("month");
    const days = end.diff(firstDay, "days") + 1;
    return (value / daysCount) * days;
  }
};
