import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import { deleteOvertime } from "../../firebase/overtime";
import AddOvertimeModal from "./AddOvertimeModal";
import Icon from "../utils/Icon";

export default function Table({ overtimes, toaster, reload, setReload, date }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedOvertime, setSelectedOvertime] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = overtimes.filter((overtime) => {
      return overtime.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  useEffect(() => {
    setData(filteredData.length > 0 ? filteredData : overtimes);
  }, [overtimes, filteredData]);

  useEffect(() => {
    setFilteredData([]);
  }, [date]);

  const handleDelete = () => {
    deleteOvertime(selectedOvertime)
      .then(() => {
        toaster.success("Horas extraordinarias eliminadas exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const columns = [
    {
      name: "Fecha",
      selector: (row) => moment(row.date).format("LL"),
      sortable: true,
    },
    {
      name: "Empleado",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Horas",
      selector: (row) => row.hours,
      sortable: true,
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row) => "$" + row.value,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn-outline-warning btn-sm mx-1"
            onClick={() => {
              setSelectedOvertime(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-1"
            onClick={() => {
              setSelectedOvertime(row);
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
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <div className="input-group mb-3">
            <span className="input-group-text">Filtrar</span>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={(e) => handleFinder(e)}
            />
          </div>
        </div>
      </div>

      <DataTable
        title="Horas extraordinarias"
        columns={columns}
        data={filteredData.length > 0 ? filteredData : data}
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
        title="Eliminar horas extraordinarias"
        message="¿Está seguro que desea eliminar estas horas extraordinarias?"
        onConfirm={() => {
          handleDelete();
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
      {edit && (
        <AddOvertimeModal
          setReload={setReload.bind(this)}
          reload={reload}
          edit={edit}
          setEdit={setEdit.bind(this)}
          data={selectedOvertime}
          toaster={toaster}
        />
      )}
    </>
  );
}
