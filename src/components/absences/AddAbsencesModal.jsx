import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { createAbsence } from "../../firebase/absences";
import { getEmployees } from "../../firebase/employees";

export default function AddAbsencesModal({
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
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start > end) {
      toaster.error("La fecha de inicio debe ser menor a la fecha de fin");
      return;
    }

    const sendData = {
      employee,
      date,
      start,
      end,
      name: selectedEmployee.name,
      cargo: selectedEmployee.cargo,
      id,
      type,
      comment,
    };
    createAbsence(sendData)
      .then(() => {
        toaster.success(
          `Ausencia ${edit ? "actualizada" : "creada"} exitosamente`
        );
        setReload(!reload);
        setEdit && setEdit(false);
        setIsOpen(false);
        clearForm();
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const clearForm = () => {
    setEmployee("");
    setSelectedEmployee({});
    setType("");
    setComment("");
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
  }, []);

  useEffect(() => {
    if (edit) {
      setEmployee(data.employee);
      setSelectedEmployee(data);
      setDate(data.date);
      setStart(data.start);
      setEnd(data.end);
      setType(data.type);
      setComment(data.comment);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [edit, data]);

  useEffect(() => {
    if (dateSelected) {
      setDate(dateSelected);
    }
  }, [dateSelected]);

  return (
    <>
      {!edit && (
        <button
          className="btn btn-outline-light"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Registrar ausencia
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setEdit && setEdit(false);
        }}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">
                {edit ? "Editar" : "Registrar"} ausencia
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                  <label htmlFor="employee" className="mt-3">
                    Empleado
                  </label>

                  <select
                    className="form-control"
                    id="employee"
                    value={employee}
                    {...(edit && { disabled: true })}
                    onChange={(e) => {
                      setEmployee(e.target.value);
                      const selected = employees.find(
                        (employee) => employee.id === e.target.value
                      );
                      setSelectedEmployee(selected);
                    }}
                    required
                  >
                    <option value="">Seleccione un empleado</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="start" className="mt-3">
                    Inicio
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="start"
                    {...(edit && { disabled: true })}
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                  />

                  <label htmlFor="end" className="mt-3">
                    Fin
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="end"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  />

                  <label htmlFor="type" className="mt-3">
                    Tipo
                  </label>
                  <select
                    className="form-control"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="Justificada">Justificada</option>
                    <option value="Injustificada">Injustificada</option>
                  </select>

                  <label htmlFor="comment" className="mt-3">
                    Comentario
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="row justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-outline-light m-1 col-12 col-md-5"
                    >
                      {edit ? "Editar" : "Registrar"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-light m-1 col-12 col-md-5"
                      onClick={() => {
                        setIsOpen(false);
                        setEdit && setEdit(false);
                        clearForm();
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
