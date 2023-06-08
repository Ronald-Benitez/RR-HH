import { useEffect, useState } from "react";
import { getEvaluations, deleteEvaluation } from "../../firebase/evaluations";
import DataTable from "react-data-table-component";
import moment from "moment/moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import Icon from "../utils/Icon";
import SeeEvaluation from "./SeeEvaluation";
import Questionnaire from "../../pdf/Questionnaire";
import Criteria from "../../pdf/Criteria";

export default function Table({ toaster }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [evaluationId, setEvaluationId] = useState("");
  const [see, setSee] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [year, setYear] = useState(moment().format("YYYY"));
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [reload, setReload] = useState(false);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = data?.filter((evaluation) => {
      return evaluation.employeeName.toLowerCase().includes(value);
    });

    setFilteredData(results);
  };

  const handleDelete = (id) => {
    const year = moment(selectedDate).format("YYYY");
    deleteEvaluation(year, id)
      .then(() => {
        toaster.success("Evaluación eliminada exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handlePdf = (row) => {
    let docDefinition = [];
    if (row.type == "Criterios") {
      docDefinition = Criteria(row);
    } else {
      docDefinition = Questionnaire(row);
    }
    pdfMake.createPdf(docDefinition).open();
  };

  const renderYearSelector = () => {
    const years = [];

    for (let i = 2010; i <= moment().format("YYYY"); i++) {
      years.push(i);
    }

    return (
      <select
        className="form-select"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {
    getEvaluations(year)
      .then((evaluations) => {
        const data = evaluations.docs.map((evaluation) => ({
          id: evaluation.id,
          ...evaluation.data(),
        }));
        setData(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [reload, year]);

  const columns = [
    {
      name: "Empleado",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.employeePosition,
      sortable: true,
    },
    {
      name: "Fecha de evaluación",
      selector: (row) => moment(row.evaluationDate).format("LL"),
      sortable: true,
    },
    {
      name: "Tipo de evaluación",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Plantiila de evaluación",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn-sm btn-outline-light m-1"
            onClick={() => {
              setSelectedEvaluation(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-sm btn-outline-danger m-1"
            onClick={() => {
              setEvaluationId(row.id);
              setSelectedDate(row.date);
              setIsOpen(true);
            }}
          >
            <Icon icon="trash" />
          </button>
          <button
            className="btn btn-sm btn-outline-success m-1"
            onClick={() => {
              handlePdf(row);
            }}
          >
            <Icon icon="pdf" />
          </button>
        </div>
      ),
      button: true,
    },
  ];

  return (
    <>
      <div className="container bg-black p-2 mt-4">
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
          <div className="col-12 col-md-4">
            <div className="input-group mb-3">
              <span className="input-group-text">Año</span>
              {renderYearSelector()}
            </div>
          </div>
        </div>
        <DataTable
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
          title="Eliminar evaluación"
          message="¿Está seguro que desea eliminar esta evaluación?"
          onConfirm={() => {
            handleDelete(evaluationId);
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
        <SeeEvaluation see={see} setSee={setSee} data={selectedEvaluation} />
      </div>
    </>
  );
}
