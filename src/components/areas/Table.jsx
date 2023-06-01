import React from "react";
import DataTable from "react-data-table-component";
import { getAreas, deleteArea, updateArea } from "../../firebase/areas";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import ModalEdit from "./ModalEdit";

export default function Table({ toaster, reload, setReload }) {
  const [areas, setAreas] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [areaId, setAreaId] = React.useState("");
  const [areaData, setAreaData] = React.useState({});
  const [edit, setEdit] = React.useState(false);

  const handleDelete = (id) => {
    if (confirm) {
      deleteArea(id)
        .then(() => {
          toaster.success("Área eliminada exitosamente");
          setReload(!reload);
          setConfirm(false);
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    } else {
      toaster.error("Debes confirmar la acción");
    }
  };

  confirm && handleDelete(areaId);

  React.useEffect(() => {
    getAreas()
      .then((areas) => {
        const data = areas.docs.map((area) => ({
          id: area.id,
          ...area.data(),
        }));
        setAreas(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [reload]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex justify-content-around w-100">
          <button
            className="btn btn-outline-warning"
            onClick={() => {
                setAreaData(row);
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
            className="btn btn-outline-danger"
            onClick={() => {
              setAreaId(row.id);
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
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div className="container bg-black p-2 mt-4">
      <DataTable
        title="Áreas registradas"
        columns={columns}
        data={areas}
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
        title="Eliminar área"
        message="¿Está seguro que desea eliminar el área?"
        onConfirm={() => {
          setConfirm(true);
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
      <ModalEdit
        data={areaData}
        setReload={setReload.bind(this)}
        reload={reload}
        toaster={toaster}
        setEdit={setEdit.bind(this)}
        edit={edit}
      />
    </div>
  );
}
