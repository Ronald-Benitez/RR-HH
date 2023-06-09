import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import "pdfmake/build/vfs_fonts";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import Icon from "../utils/Icon";
import { deleteAbsence } from "../../firebase/absences";
import AddAbsencesModal from "./AddAbsencesModal";
import SeeModal from "./SeeModal";
import Absences from "../../pdf/Absences";

export default function Table({ absences, toaster, reload, setReload, year,date }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [seeModalIsOpen, setSeeModalIsOpen] = useState(false);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = absences.filter((absence) => {
      return absence.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  const handlePdf = () => {
    const docDefinition = Absences(
      filteredData.length > 0 ? filteredData : data,
      year
    );
    pdfMake.createPdf(docDefinition).open();
  };

  useEffect(() => {
    setData(filteredData.length > 0 ? filteredData : absences);
  }, [absences, filteredData]);

  useEffect(() => {
    setFilteredData([]);
  }, [year]);

  const handleDelete = () => {
    deleteAbsence(selectedAbsence)
      .then(() => {
        toaster.success("Ausencia eliminada exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const columns = [
    {
      name: "Empleado",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.cargo,
      sortable: true,
    },
    {
      name: "Fecha de inicio",
      selector: (row) => moment(row.start).format("LL"),
      sortable: true,
    },
    {
      name: "Fecha de fin",
      selector: (row) => moment(row.end).format("LL"),
      sortable: true,
    },
    {
      name: "Días",
      selector: (row) =>
        moment(row.end).add(1, "days").diff(moment(row.start), "days"),
      sortable: true,
    },
    {
      name: "Tipo",
      cell: (row) => {
        return row.type == "Justificada" ? (
          <span className="badge bg-success">{row.type}</span>
        ) : (
          <span className="badge bg-danger">{row.type}</span>
        );
      },
      sortable: true,
    },
    {
      name: "Comentarios",
      selector: (row) => row.comment,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="actions">
          <button
            className="btn btn-outline-light btn-sm m-1"
            onClick={() => {
              setSelectedAbsence(row);
              setSeeModalIsOpen(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-outline-warning btn-sm m-1"
            onClick={() => {
              setSelectedAbsence(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn  btn-outline-danger btn-sm m-1"
            onClick={() => {
              setSelectedAbsence(row);
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
        <div className="col-12 col-md-2">
          <div className="row mb-3">
            <button
              className="col-8 col-md-8 btn btn-light"
              onClick={() => handlePdf()}
            >
              <Icon icon="pdf" /> Exportar
            </button>
          </div>
        </div>
      </div>
      <DataTable
        title="Faltas"
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
        title="Eliminar falta"
        message="¿Está seguro que desea eliminar esta falta?"
        onConfirm={() => {
          handleDelete();
          setIsOpen(false);
        }}
        onCancel={() => setIsOpen(false)}
      />
      {edit && (
        <AddAbsencesModal
          setReload={setReload.bind(this)}
          reload={reload}
          edit={edit}
          setEdit={setEdit.bind(this)}
          data={selectedAbsence}
          toaster={toaster}
          dateSelected={moment(date).format("YYYY-MM-DD")}
        />
      )}
      <SeeModal
        show={seeModalIsOpen}
        setShow={setSeeModalIsOpen}
        data={selectedAbsence}
      />
    </>
  );
}
