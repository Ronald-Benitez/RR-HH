import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getEmployees, deleteEmployee } from "../../firebase/employees";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import ModalEdit from "./ModalEdit";
import SeeModal from "./SeeModal";
import CreateModal from "./CreateModal";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-warning btn-sm mx-1"
            onClick={() => {
              setEmployeeData(row);
              setEdit(true);

            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-1"
            onClick={() => {
              setEmployeeId(row.id);
              setIsOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
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
      <ModalEdit
        data={employeeData}
        setReload={setReload.bind(this)}
        reload={reload}
        toaster={toaster}
        setEdit={setEdit.bind(this)}
        edit={edit}
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
