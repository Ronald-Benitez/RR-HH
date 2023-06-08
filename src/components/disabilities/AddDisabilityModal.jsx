import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { createDisability } from "../../firebase/disabilities";
import { getEmployees } from "../../firebase/employees";

export default function AddDisabilityModal({
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
      year: moment(date).format("YYYY"),
      name: selectedEmployee.name,
      cargo: selectedEmployee.cargo,
      id,
      month: moment(date).format("MMMM"),
    };
    createDisability(sendData)
      .then(() => {
        toaster.success(
          `Incapacidad ${edit ? "actualizada" : "creada"} exitosamente`
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
    setId("");
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
    if (dateSelected) {
      setDate(dateSelected);
      setStart(dateSelected);
      setEnd(dateSelected);
    }
  }, [dateSelected]);

  useEffect(() => {
    if (edit) {
      setEmployee(data.employee);
      setDate(data.date);
      setStart(data.start);
      setEnd(data.end);
      setSelectedEmployee(data);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [edit, data]);

  return (
    <>
      {!edit && (
        <button
          className="btn btn-outline-light"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Registrar incapacidad
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
                {edit ? "Editar" : "Registrar"} incapacidad
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group p-4">
                  <label htmlFor="employee">Empleado</label>
                  <select
                    className="form-control"
                    id="employee"
                    value={employee}
                    onChange={(e) => {
                      setEmployee(e.target.value);
                      const selected = employees.find(
                        (item) => item.id === e.target.value
                      );
                      setSelectedEmployee(selected);
                    }}
                  >
                    <option value="">Seleccione un empleado</option>
                    {employees?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.cargo}
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
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
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
                  />
                </div>
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-outline-light col-12 col-md-5 m-1"
                  >
                    {edit ? "Editar" : "Registrar"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-light btn-block col-12 col-md-5 m-1"
                    onClick={() => {
                      setIsOpen(false);
                      setEdit && setEdit(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
