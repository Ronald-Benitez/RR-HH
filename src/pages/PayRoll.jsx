import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getEmployees } from "../firebase/employees";
import { getOvertimes } from "../firebase/overtime";
import { getBonuses } from "../firebase/bonuses";
import { getVacations } from "../firebase/vacations";
import { getDisabilities } from "../firebase/disabilities";
import CalculatePayroll from "../utils/PayrollCalculator";
import {
  calculateOvertime,
  calculateBonuses,
  calculateVacations,
} from "../utils/ExtrasCalculator";
import { calculateDisabilities } from "../utils/TimeDiscounts";

import TableEmployee from "../components/payroll/TableEmployee";
import TableEmployer from "../components/payroll/TableEmployer";
import Totals from "../components/payroll/Totals";

export default function PayRoll() {
  const [employees, setEmployees] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [switchTable, setSwitchTable] = useState(false);
  const [date, setDate] = useState(moment());
  const [seeTotals, setSeeTotals] = useState(false);
  const [totals, setTotals] = useState({});
  const [overtime, setOvertime] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [disabilities, setDisabilities] = useState([]);

  const sumTotals = () => {
    const totals = {
      totalSalaries: 0,
      totalAfpEmployee: 0,
      totalIsssEmployee: 0,
      totalRenta: 0,
      totalAfpEmployer: 0,
      totalIsssEmployer: 0,
      totalExtraHours: 0,
      totalBonuses: 0,
      totalVacations: 0,
      totalAguinaldo: 0,
      totalInsaforp: 0,
    };

    payroll.forEach((employee) => {
      totals.totalSalaries += employee.base;
      totals.totalAfpEmployee += employee.afp.employee;
      totals.totalIsssEmployee += employee.isss.employee;
      totals.totalRenta += employee.renta;
      totals.totalAfpEmployer += employee.afp.employer;
      totals.totalIsssEmployer += employee.isss.employer;
      totals.totalExtraHours += employee.extras.overtime;
      totals.totalBonuses += employee.extras.bonuses;
      totals.totalVacations += employee.extras.vacation;
      totals.totalAguinaldo += employee.aguinaldo;
      totals.totalInsaforp += employee.insaforp;
    });

    Object.keys(totals).forEach((key) => {
      totals[key] = parseFloat(totals[key].toFixed(2));
    });

    setTotals(totals);
  };

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        const data = employees.docs.map((employee) => ({
          id: employee.id,
          salary: employee.data().salary,
          name: employee.data().names + " " + employee.data().lastNames,
          cargo: employee.data().position,
          fechaIngreso: employee.data().entryDate,
          overtime: 0,
          vacations: 0,
          bonuses: 0,
          disabilities: 0,
          daysDisability: 0,
        }));
        setEmployees(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    getOvertimes(moment(date).format("MMMM-YYYY")).then((overtime) => {
      const data = overtime.docs.map((overtime) => ({
        id: overtime.id,
        ...overtime.data(),
      }));
      setOvertime(data || []);
    });

    getBonuses(moment(date).format("MMMM-YYYY")).then((bonuses) => {
      const data = bonuses.docs.map((bonus) => ({
        id: bonus.id,
        ...bonus.data(),
      }));
      setBonuses(data || []);
    });

    getVacations(moment(date).format("YYYY")).then((vacations) => {
      const data = vacations.docs.map((vacation) => ({
        id: vacation.id,
        ...vacation.data(),
      }));
      setVacations(data || []);
    });

    getDisabilities(moment(date).format("YYYY")).then((disabilities) => {
      const data = disabilities.docs.map((disability) => ({
        id: disability.id,
        ...disability.data(),
      }));
      setDisabilities(data || []);
    });
  }, [date]);

  useEffect(() => {
    setExtras();
    const data = employees.map((employee) => CalculatePayroll(employee, date));
    setPayroll(data);
    sumTotals();
  }, [employees, date, overtime]);

  const setExtras = () => {
    calculateOvertime(employees, overtime);
    calculateBonuses(employees, bonuses);
    calculateVacations(employees, vacations, date);
    calculateDisabilities(employees, disabilities, date);
  };

  return (
    <div>
      <Navbar />

      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <p className="text-center fs-2">
          Planilla{" "}
          <small className="fs-5">{moment(date).format("MMMM YYYY")}</small>
        </p>

        <div className="row justify-content-center w-75">
          <div className="col-12 col-md-3">
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date.format("YYYY-MM-DD")}
              onChange={(e) => setDate(moment(e.target.value))}
            />
          </div>
          <div className="col-12 col-md-3">
            <label htmlFor="date">Tipo de planilla</label>
            <select
              className="form-control"
              onChange={(e) => setSwitchTable(e.target.value === "true")}
            >
              <option value={false}>Empleado</option>
              <option value={true}>Empleador</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label htmlFor="date">Totales</label>
            <button
              className="form-control"
              onClick={() => {
                setSeeTotals(true);
                sumTotals();
              }}
            >
              Ver totales
            </button>
          </div>
        </div>
      </div>

      {switchTable ? (
        <TableEmployer data={payroll} />
      ) : (
        <TableEmployee data={payroll} />
      )}
      <Totals data={totals} see={seeTotals} setSee={setSeeTotals.bind(this)} />

      <Toaster />
    </div>
  );
}
