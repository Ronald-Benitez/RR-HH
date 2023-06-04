import React from "react";
import DataTable from "react-data-table-component";

import { getAreas, deleteArea } from "../../firebase/areas";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import ModalEdit from "./ModalEdit";
import Icon from "../utils/Icon";

export default function Table({ toaster, reload, setReload }) {
  const [areas, setAreas] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [areaId, setAreaId] = React.useState("");
  const [areaData, setAreaData] = React.useState({});
  const [edit, setEdit] = React.useState(false);

  const handleDelete = (id) => {
    deleteArea(id)
      .then(() => {
        toaster.success("Área eliminada exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

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
        <div>
          <button
            className="btn btn-outline-warning mx-1"
            onClick={() => {
              setAreaData(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger mx-1"
            onClick={() => {
              setAreaId(row.id);
              setIsOpen(true);
            }}
          >
            <Icon icon="trash" />
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
        title="Áreas/departamentos registrados"
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
          handleDelete(areaId);
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
