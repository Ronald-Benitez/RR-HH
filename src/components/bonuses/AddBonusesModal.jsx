import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { createBonus, updateBonus } from "../../firebase/bonuses";
import { getEmployees } from "../../firebase/employees";
import { FixedMultiplier } from "../../utils/DataConversion";
import { set } from "react-hook-form";

export default function AddBonusesModal({
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
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = {
      employee,
      date,
      value,
      description,
      month: moment(date).format("MMMM-YYYY"),
      name: selectedEmployee.name,
      cargo: selectedEmployee.cargo,
      id,
    };
    if (edit) {
      updateBonus(sendData)
        .then(() => {
          toaster.success("Bono actualizado exitosamente");
          setReload(!reload);
          setEdit(false);
          setIsOpen(false);
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    } else {
      createBonus(sendData)
        .then(() => {
          toaster.success("Bono creado exitosamente");
          setReload(!reload);
          setIsOpen(false);
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    }
  };

  useEffect(() => {
    setDate(dateSelected);
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
      setValue(data.value);
      setDescription(data.description);
      setId(data.id);
      setSelectedEmployee(data);
      setIsOpen(edit);
    }
  }, [edit, id, dateSelected]);

  const clear = () => {
    setEmployee("");
    setDate("");
    setValue("");
    setDescription("");
    setSelectedEmployee({});
    setId("");
  };

  return (
    <>
      {!edit ? (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Agregar Bono
        </button>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setEdit && setEdit(false);
          clear();
        }}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <h3 className="text-center">
            {edit ? "Editar Bono" : "Agregar Bono"}
          </h3>
          <div className="modal-body mt-2">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-12 col-md-6">
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
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="date" className="form-label">
                    Fecha
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="value" className="form-label">
                  Valor
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="value"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
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
                    clearFields();
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
