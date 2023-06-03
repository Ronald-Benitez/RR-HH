import deductions from "../config/deductions";
import { FixedMultiplier } from "../utils/DataConversion";
import moment from "moment/moment";
import "moment/locale/es";

const CalculatePayroll = (data, date) => {
  moment.locale("es");

  const month = moment(date).format("MMMM YYYY");

  let isss = {
    employer: 0,
    employee: 0,
  };

  let afp = {
    employer: 0,
    employee: 0,
  };

  let renta = 0;

  let extras = {
    overtime: data?.overtime ? data.overtime.toFixed(2) : 0,
    bonuses: data?.bonuses ? data.bonuses.toFixed(2) : 0,
    vacation: data?.vacation ? data.vacation.toFixed(2) : 0,
  };

  let salary =
    parseFloat(data.salary) +
    parseFloat(extras.overtime) +
    parseFloat(extras.bonuses) +
    parseFloat(extras.vacation);
  salary = parseFloat(salary.toFixed(2));

  let insaforp = 0;

  isss.employer = FixedMultiplier(salary, deductions.isss.patronal);
  isss.employee = FixedMultiplier(salary, deductions.isss.laboral);

  afp.employer = FixedMultiplier(salary, deductions.afp.patronal);
  afp.employee = FixedMultiplier(salary, deductions.afp.laboral);

  salary -= isss.employee + afp.employee;

  const ranges = Object.values(deductions.renta);

  ranges.forEach((range) => {
    if (salary >= range.min && salary <= range.max) {
      renta =
        FixedMultiplier(salary - range.exceso, range.porcentaje) + range.cuota;
    }
  });
  salary -= renta;
  insaforp = FixedMultiplier(isss.employer, deductions.insaforp);

  let aguinaldo = 0;

  if (moment(date).format("M") === "12") {
    const ranges = Object.values(deductions.aguinaldo);
    const timeLabored = moment(date).diff(moment(data.fechaIngreso), "years");
    const dailySalary = data.salary / 30;

    ranges.forEach((range) => {
      if (timeLabored >= range.min && timeLabored < range.max) {
        aguinaldo = FixedMultiplier(dailySalary, range.dias);
      }
    });
  }

  salary += aguinaldo;
  salary = salary.toFixed(2);

  const totalPatronal =
    (parseFloat(data.salary) || 0) +
    (parseFloat(insaforp) || 0) +
    (parseFloat(afp.employer) || 0) +
    (parseFloat(isss.employer) || 0) +
    (parseFloat(extras.overtime) || 0) +
    (parseFloat(extras.bonuses) || 0) +
    (parseFloat(extras.vacation) || 0) +
    (parseFloat(aguinaldo) || 0);

  const bruteSalary =
    (parseFloat(data.salary) || 0) +
    (parseFloat(extras.overtime) || 0) +
    (parseFloat(extras.bonuses) || 0) +
    (parseFloat(extras.vacation) || 0);

  const totalDeductionsEmployee =
    (parseFloat(isss.employee) || 0) +
    (parseFloat(afp.employee) || 0) +
    (parseFloat(renta) || 0);

  const totalDeductionsEmployer =
    (parseFloat(isss.employer) || 0) +
    (parseFloat(afp.employer) || 0) +
    (parseFloat(insaforp) || 0);

  const result = {
    isss,
    afp,
    renta: parseFloat(renta) || 0,
    extras: {
      overtime: parseFloat(extras.overtime) || 0,
      bonuses: parseFloat(extras.bonuses) || 0,
      vacation: parseFloat(extras.vacation) || 0,
    },
    base: parseFloat(data.salary) || 0,
    neto: parseFloat(salary) || 0,
    name: data.name,
    id: data.id,
    cargo: data.cargo,
    insaforp,
    aguinaldo: parseFloat(aguinaldo) || 0,
    totalPatronal,
    bruteSalary,
    totalDeductionsEmployee,
    totalDeductionsEmployer,
    month,
  };

  return result;
};

export default CalculatePayroll;
