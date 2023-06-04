import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getEmployees, deleteEmployee } from "../../firebase/employees";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import SeeModal from "./SeeModal";
import CreateModal from "./CreateModal";
import Icon from "../utils/Icon";

export default function Table({ toaster, reload, setReload }) {
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [edit, setEdit] = useState(false);
  const [see, setSee] = useState(false);

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        toaster.success("Empleado eliminado exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        const data = employees.docs.map((employee) => ({
          id: employee.id,
          ...employee.data(),
        }));
        setEmployees(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [reload]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.names,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.lastNames,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Área",
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn-outline-light btn-sm mx-1"
            onClick={() => {
              setEmployeeData(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-outline-warning btn-sm mx-1"
            onClick={() => {
              setEmployeeData(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-1"
            onClick={() => {
              setEmployeeId(row.id);
              setIsOpen(true);
            }}
          >
            <Icon icon="trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container bg-black p-2 mt-4">
      <DataTable
        title="Empleados"
        columns={columns}
        data={employees}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todos",
        }}
        noDataComponent="No hay datos para mostrar"
        striped
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
      />
      <ModalConfirm
        show={modalIsOpen}
        setShow={setIsOpen}
        title="Eliminar empleado"
        message="¿Está seguro que desea eliminar el empleado?"
        onConfirm={() => {
          handleDelete(employeeId);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
      <SeeModal data={employeeData} see={see} setSee={setSee.bind(this)} />
      <CreateModal
        setReload={setReload.bind(this)}
        reload={reload}
        toaster={toaster}
        data={employeeData}
        edit={edit}
        setEdit={setEdit.bind(this)}
      />
    </div>
  );
}
