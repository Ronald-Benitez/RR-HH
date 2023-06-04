import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import Icon from "../utils/Icon";
import AddCandidateModal from "./AddCandidateModal";
import SeeCandidate from "./SeeCandidate";
import Tracking from "./Tracking";
import CreateModal from "../employees/CreateModal";
import { deleteCandidate } from "../../firebase/candidates";
import { deletePDF } from "../../firebase/pdf";
import { set } from "react-hook-form";

export default function Table({ candidates, toaster, reload, setReload }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [see, setSee] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = candidates?.filter((candidate) => {
      return (
        candidate.names.toLowerCase().includes(value) ||
        candidate.lastNames.toLowerCase().includes(value)
      );
    });
    setFilteredData(results);
  };

  useEffect(() => {
    setData(filteredData?.length > 0 ? filteredData : candidates);
  }, [candidates, filteredData]);

  const handleDelete = async () => {
    if (!selectedCandidate.saved) {
      await deletePDF(selectedCandidate.pdfId, toaster);
    }
    deleteCandidate(selectedCandidate.id)
      .then(() => {
        toaster.success("Candidato eliminado exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.names,
      sortable: true,
    },
    {
      name: "Apellidos",
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
      name: "Currículum",
      cell: (row) => (
        <div className="d-flex justify-content-center w-100">
          {row.pdfUrl ? (
            <a
              className="btn btn-light"
              href={row.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="pdf" />
            </a>
          ) : (
            <span className="text-muted">No adjuntado</span>
          )}
        </div>
      ),
    },
    {
      name: "Fecha de registro",
      cell: (row) => moment(row.date).format("LL"),
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <div className="d-flex justify-content-center w-100">
          {row.state === "Rechazado" ? (
            <span className="text-danger">{row.state}</span>
          ) : row.state === "Aceptado" ? (
            <span className="text-success">{row.state}</span>
          ) : (
            <span className="text-warning">{row.state}</span>
          )}
        </div>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn-outline-light btn-sm m-1"
            onClick={() => {
              setSelectedCandidate(row);
              setTracking(true);
            }}
          >
            <Icon icon="tracking" />
          </button>
          <button
            className="btn btn-outline-light btn-sm m-1"
            onClick={() => {
              setSelectedCandidate(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>

          <button
            className="btn btn-outline-warning btn-sm m-1"
            onClick={() => {
              setSelectedCandidate(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm m-1"
            onClick={() => {
              setSelectedCandidate(row);
              setIsOpen(true);
            }}
          >
            <Icon icon="trash" />
          </button>
          {row.saved ? null : (
            <button
              className="btn btn-outline-success btn-sm m-1"
              onClick={() => {
                setSelectedCandidate(row);
                setAddEmployee(true);
              }}
            >
              <Icon icon="person" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container">
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
          title="Candidatos"
          columns={columns}
          data={filteredData?.length > 0 ? filteredData : data}
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
          title="Eliminar candidato"
          message="¿Está seguro que desea eliminar este candidato?"
          onConfirm={() => {
            handleDelete();
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
        {edit && (
          <AddCandidateModal
            setReload={setReload.bind(this)}
            reload={reload}
            edit={edit}
            setEdit={setEdit.bind(this)}
            data={selectedCandidate}
            toaster={toaster}
          />
        )}
        <SeeCandidate
          see={see}
          setSee={setSee.bind(this)}
          data={selectedCandidate}
        />
        <Tracking
          data={selectedCandidate}
          show={tracking}
          setShow={setTracking.bind(this)}
          setReload={setReload.bind(this)}
          toaster={toaster}
          reload={reload}
        />
      </div>
      <CreateModal
        setReload={setReload.bind(this)}
        reload={reload}
        toaster={toaster}
        candidate={selectedCandidate}
        addEmployee={addEmployee}
        setAddEmployee={setAddEmployee.bind(this)}
      />
    </>
  );
}
