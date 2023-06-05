import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { createVacation, updateVacation } from "../../firebase/vacations";
import { getEmployees } from "../../firebase/employees";
import deductions from "../../config/deductions";
import { FixedMultiplier } from "../../utils/DataConversion";

export default function AddVacationModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
  dateSelected,
}) {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [value, setValue] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      employee,
      date,
      start,
      end,
      value: value.toString(),
      year: moment(date).format("YYYY"),
      name: selectedEmployee.name,
      cargo: selectedEmployee.cargo,
      id,
      salary: selectedEmployee.salary,
    };

    if (edit) {
      updateVacation(sendData)
        .then(() => {
          toaster.success("Vacación actualizada exitosamente");
          setReload(!reload);
          setEdit(false);
          setIsOpen(false);
          clearForm();
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    } else {
      createVacation(sendData)
        .then(() => {
          toaster.success("Vacación registrada exitosamente");
          setReload(!reload);
          setIsOpen(false);
          clearForm();
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    }
  };

  const clearForm = () => {
    setEmployee("");
    setValue("");
    setSelectedEmployee({});
    setId("");
  };

  useEffect(() => {
    setDate(dateSelected);
    setStart(dateSelected);
    setEnd(
      moment(dateSelected)
        .add(deductions.vacaciones.dias - 1, "days")
        .format("YYYY-MM-DD")
    );
  }, [dateSelected]);

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
  }, []);

  useEffect(() => {
    if (data) {
      setEmployee(data.employee);
      setDate(data.date);
      setStart(data.start);
      setEnd(data.end);
      setSelectedEmployee(data);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [data, edit]);

  useEffect(() => {
    calculeValue();
  }, [selectedEmployee]);

  const calculeValue = () => {
    if (selectedEmployee === undefined) {
      setValue("Debe seleccionar un empleado");
      return;
    }
    const salary = parseFloat(selectedEmployee.salary) / 30;
    const days = FixedMultiplier(salary, deductions.vacaciones.dias);
    const percent = FixedMultiplier(days, deductions.vacaciones.porcentaje);
    setValue(percent);
  };

  return (
    <>
      {!edit ? (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Registrar vacación
        </button>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setEdit && setEdit(false);
          clearForm();
        }}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <h3 className="text-center">
            {edit ? "Editar vacación" : "Registrar vacación"}
          </h3>
          <div className="modal-body mt-2">
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center align-items-center">
                <div className="mb-3 col-12 col-md-5">
                  <label htmlFor="employee" className="form-label">
                    Empleado
                  </label>
                  <select
                    className="form-select"
                    required
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
                  >
                    <option value="">Seleccione un empleado</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name} - {employee.cargo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-12 col-md-5 mt-3">
                  <label htmlFor="date" className="form-label">
                    Monto
                  </label>
                  <p className="form-control">{value}</p>
                </div>
                <div className="mb-3 col-12 col-md-5">
                  <label htmlFor="date" className="form-label">
                    Inicio
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    required
                    value={start}
                    onChange={(e) => {
                      setStart(e.target.value);
                      setEnd(
                        moment(e.target.value)
                          .add(deductions.vacaciones.dias - 1, "days")
                          .format("YYYY-MM-DD")
                      );
                    }}
                  />
                </div>
                <div className="mb-3 col-12 col-md-5 mt-3">
                  <label htmlFor="date" className="form-label">
                    Fin
                  </label>
                  <p className="form-control">
                    {moment(end).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
              <div className="row px-5">
                <button type="submit" className="btn btn-outline-light">
                  {edit ? "Editar" : "Registrar"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light mt-2"
                  onClick={() => {
                    setIsOpen(false);
                    setEdit && setEdit(false);
                    clearForm();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
