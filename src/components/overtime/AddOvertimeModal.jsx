import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { createOvertime, updateOvertime } from "../../firebase/overtime";
import { getEmployees } from "../../firebase/employees";
import deductions from "../../config/deductions";
import { FixedMultiplier } from "../../utils/DataConversion";

export default function AddOvertimeModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
}) {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [id, setId] = useState("");

  const calculateValue = (id) => {
    const data = employees.find((employee) => employee.id === id);

    const hourSalary = (data?.salary / 30 / 8).toFixed(2);
    setSalary(hourSalary);

    if (type === "Diurna") {
      setValue(
        FixedMultiplier(hours, deductions.horasExtra.diurnas * hourSalary)
      );
    } else if (type === "Nocturna") {
      setValue(
        FixedMultiplier(hours, deductions.horasExtra.nocturnas * hourSalary)
      );
    } else if (type === "Festiva") {
      if (hours <= 8) {
        setValue(
          FixedMultiplier(hours, deductions.horasExtra.festivas * hourSalary)
        );
      } else {
        setValue(
          FixedMultiplier(8, deductions.horasExtra.festivas * hourSalary) +
            FixedMultiplier(
              hours - 8,
              deductions.horasExtra.festivas * hourSalary * 2
            )
        );
      }
    } else if (type === "Descanso") {
      if (hours <= 8) {
        setValue(
          FixedMultiplier(hours, deductions.horasExtra.descanso * hourSalary)
        );
      } else {
        setValue(
          FixedMultiplier(8, deductions.horasExtra.descanso * hourSalary) +
            FixedMultiplier(
              hours - 8,
              deductions.horasExtra.descanso * hourSalary * 2
            )
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const overtimeData = {
      employee,
      date,
      hours,
      value: parseFloat(value).toFixed(2),
      type,
      month: moment(date).format("MMMM-YYYY"),
      salary: selectedEmployee.salary,
      name: selectedEmployee.name,
      cargo: selectedEmployee.cargo,
      id,
    };

    if (edit) {
      updateOvertime(overtimeData)
        .then(() => {
          toaster.success("Horas extra actualizadas");
          setReload(!reload);
          setIsOpen(false);
          setEdit(false);
          clearFields();
        })
        .catch((error) => {
          toaster.error("Error al actualizar las horas extra");
        });
    } else {
      createOvertime(overtimeData)
        .then(() => {
          toaster.success("Horas extra registradas");
          setReload(!reload);
          setIsOpen(false);
          clearFields();
        })
        .catch((error) => {
          toaster.error("Error al registrar las horas extra");
        });
    }
  };

  useEffect(() => {
    getEmployees()
      .then((employeeData) => {
        const employeeList = employeeData.docs.map((employee) => ({
          id: employee.id,
          salary: employee.data().salary,
          name: employee.data().names + " " + employee.data().lastNames,
          cargo: employee.data().position,
        }));
        setEmployees(employeeList);
      })
      .catch((error) => {
        toaster.error("Error al cargar los empleados");
      });

    if (data) {
      setEmployee(data.employee);
      setDate(data.date);
      setHours(data.hours);
      setValue(data.value);
      setType(data.type);
      setSalary(data.salary);
      setSelectedEmployee(data);
      setIsOpen(edit);
      setId(data.id);
    }
  }, [edit]);

  useEffect(() => {
    if (employee) {
      calculateValue(employee);
    }
  }, [employee, hours, type]);

  const clearFields = () => {
    setEmployee("");
    setDate("");
    setHours("");
    setValue("");
    setType("");
    setSalary("");
  };

  return (
    <>
      {!edit && (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Registrar horas extra
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setEdit(false);
          clearFields();
        }}
        style={ModalStyle}
        contentLabel={edit ? "Actualizar horas extra" : "Registrar horas extra"}
      >
        <div className="container overflow-auto">
          <h3 className="text-center">
            {edit ? "Editar" : "Editar"} horas extra
          </h3>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="employee" className="form-label">
                    Empleado
                  </label>
                  <select
                    className="form-select"
                    id="employee"
                    value={employee}
                    onChange={(e) => {
                      setEmployee(e.target.value);
                      setSelectedEmployee(
                        employees.find(
                          (employee) => employee.id === e.target.value
                        )
                      );
                    }}
                    required
                  >
                    <option value="">Seleccione un empleado</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.cargo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="salary" className="form-label">
                    Salario
                  </label>
                  <p className="form-control">
                    {salary ? `$${salary} / hora` : "Seleccione un empleado"}
                  </p>
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="date" className="form-label">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="hours" className="form-label">
                    Horas
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="type" className="form-label">
                    Tipo
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="Diurna">Diurna</option>
                    <option value="Nocturna">Nocturna</option>
                    <option value="Festiva">Festiva</option>
                    <option value="Descanso">Descanso</option>
                  </select>
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="value" className="form-label">
                    Valor
                  </label>
                  <p className="form-control">
                    {value ? `$${value}` : "Seleccione un empleado"}
                  </p>
                </div>
                <div className="row px-5">
                  <button type="submit" className="btn btn-outline-light">
                    Registrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light mt-2"
                    onClick={() => {
                      setIsOpen(false);
                      setEdit(false);
                      clearFields();
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
