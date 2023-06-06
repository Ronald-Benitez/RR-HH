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
          const time = calculateDays(moment(row.start), moment(row.end), date);
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

const calculateDays = (start, end, date) => {
  const startFormatted = moment(start).format("YYYY-MM-DD");
  const endFormatted = moment(end).format("YYYY-MM-DD");
  const dateFormatted = moment(date).format("YYYY-MM-DD");

  if (startFormatted === dateFormatted) {
    const lastDay = start.endOf("month");
    const days = lastDay.diff(start, "days") + 1;
    return { days, less: daysD };
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

export const calculateAbsences = (data, absences, date) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  updatedData.forEach((employee) => {
    employee.absences = 0;
    employee.daysAbsence = 0;
  });

  Object.values(absences).map((row) => {
    if(row.type == "Justificada") return;

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
          employee.absences += calculateValueAbsence(employee.salary, time);
          employee.daysAbsence += time;
        } else {
          if (moment(row.start).month() === date.month()) {
            const lastDay = moment(row.start).endOf("month");
            const days = lastDay.diff(row.start, "days") + 1;
            employee.absences += calculateValueAbsence(employee.salary, days);
            employee.daysAbsence += days;
          } else {
            const firstDay = moment(row.end).startOf("month");
            const days = moment(row.end).diff(firstDay, "days") + 1;
            employee.absences += calculateValueAbsence(employee.salary, days);
            employee.daysAbsence += days;
          }
        }
      }
    }
  });
};

const calculateValueAbsence = (salary, days) => {
  const salaryD = (salary / 30).toFixed(2);
  return salaryD * (days > 0 ? days : 0);
};
