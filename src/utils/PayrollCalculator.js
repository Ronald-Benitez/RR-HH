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
    overtime: 0,
    bonuses: 0,
    vacation: 0,
  };

  let salary = data.salary;

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

  salary += aguinaldo;

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
    renta,
    extras,
    base: parseFloat(data.salary) || 0,
    neto: salary,
    name: data.name,
    id: data.id,
    cargo: data.cargo,
    insaforp,
    aguinaldo,
    totalPatronal,
    bruteSalary,
    totalDeductionsEmployee,
    totalDeductionsEmployer,
    month,
  };

  return result;
};

export default CalculatePayroll;
