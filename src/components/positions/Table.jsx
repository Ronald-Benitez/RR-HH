import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { getPositions, deletePosition } from "../../firebase/positions";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import SeePosition from "./SeePosition";
import AddPositionModal from "./AddPositionModal";
import Icon from "../utils/Icon";

export default function Table({ toaster, reload, setReload }) {
  const [positions, setPositions] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [positionId, setPositionId] = useState("");
  const [edit, setEdit] = useState(false);
  const [see, setSee] = useState(false);
  const [positionData, setPositionData] = useState({});

  const handleDelete = () => {
    deletePosition(positionId)
      .then(() => {
        toaster.success("Puesto eliminado exitosamente");
        setReload(!reload);
      })
      .catch(() => {
        toaster.error("No se pudo eliminar el puesto");
      });
  };

  useEffect(() => {
    getPositions().then((positions) => {
      const data = positions.docs.map((position) => ({
        id: position.id,
        ...position.data(),
      }));
      setPositions(data);
    });
  }, [reload]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Área",
      selector: (row) => row.area,
      sortable: true,
    },
    {
      name: "Salario",
      selector: (row) => row.salary,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn-outline-light btn-sm mx-1"
            onClick={() => {
              setPositionData(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-outline-warning btn-sm mx-1"
            onClick={() => {
              setPositionData(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-1"
            onClick={() => {
              setPositionId(row.id);
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
    <>
      <div className="container">
        <DataTable
          title="Puestos"
          columns={columns}
          data={positions}
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
          title="Eliminar puesto"
          message="¿Está seguro que desea eliminar este puesto?"
          onConfirm={() => {
            handleDelete();
            setIsOpen(false);
            setReload(!reload);
          }}
          onCancel={() => setIsOpen(false)}
        />
        {edit && (
          <AddPositionModal
            setReload={setReload.bind(this)}
            reload={reload}
            edit={edit}
            setEdit={setEdit.bind(this)}
            data={positionData}
            toaster={toaster}
          />
        )}
        <SeePosition data={positionData} setSee={setSee.bind(this)} see={see} />
      </div>
    </>
  );
}
