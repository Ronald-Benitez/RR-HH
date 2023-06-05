import moment from "moment/moment";
import deductions from "../config/deductions.json";

const daysD = deductions.incapacidad.dias;

export const calculateDisabilities = (data, disabilities, date) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  //CLear disabilities
  updatedData.forEach((employee) => {
    employee.disabilities = 0;
    employee.daysDisability = 0;
  });

  Object.values(disabilities).map((row) => {
    const employee = updatedData.find(
      (employee) => employee.id === row.employee
    );

    if (employee) {
      if (
        moment(row.start).month() === date.month() ||
        moment(row.end).month() === date.month()
      ) {
        if (verifyMonth(row.start, row.end)) {
          const time = moment(row.end).diff(moment(row.start), "days") + 1;
          employee.disabilities += calculateValueDisability(
            employee.salary,
            time - daysD
          );
          employee.daysDisability += time;
        } else {
          const time = calculateDaysDisability(
            moment(row.start),
            moment(row.end),
            date
          );
          employee.disabilities += calculateValueDisability(
            employee.salary,
            time.days - time.less
          );
          employee.daysDisability += time.days;
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

const calculateDaysDisability = (start, end, date) => {
  if (start.month() === date.month()) {
    const lastDay = start.endOf("month");
    const days = lastDay.diff(start, "days") + 1;
    return { days, less };
  } else {
    const firstDay = moment(end).startOf("month");
    const days = end.diff(firstDay, "days") + 1;
    return { days, less: 0 };
  }
};

const calculateValueDisability = (salary, days) => {
  const salaryD = (salary / 30).toFixed(2);
  return salaryD * (days > 0 ? days : 0);
};
