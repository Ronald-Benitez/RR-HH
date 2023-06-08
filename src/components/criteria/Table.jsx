import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {
  getEvaluationTemplates,
  deleteEvaluationTemplate,
} from "../../firebase/evaluationTemplate";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import AddModal from "./AddModal";
import Icon from "../utils/Icon";
import SeeTemplate from "./SeeTemplate";
import Criteria from "../../pdf/Criteria";

export default function Table({ toaster, reload, setReload }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [evaluationTemplateId, setEvaluationTemplateId] = useState("");
  const [edit, setEdit] = useState(false);
  const [see, setSee] = useState(false);
  const [selectedEvaluationTemplate, setSelectedEvaluationTemplate] = useState(
    {}
  );
  const [filteredData, setFilteredData] = useState([]);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = data?.filter((evaluationTemplate) => {
      return evaluationTemplate.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  const handlePdf = (evaluationTemplate) => {
    const docDefinition = Criteria(evaluationTemplate);
    pdfMake.createPdf(docDefinition).open();
  };

  useEffect(() => {
    getEvaluationTemplates()
      .then((evaluationTemplates) => {
        const data = evaluationTemplates.docs.map((evaluationTemplate) => ({
          id: evaluationTemplate.id,
          ...evaluationTemplate.data(),
        }));
        setData(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [reload]);

  const handleDelete = (id) => {
    deleteEvaluationTemplate(id)
      .then(() => {
        toaster.success("Plantilla de evaluación eliminada exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Objetivo",
      selector: (row) => row.objetive,
      sortable: true,
    },
    {
      name: "Cantidad de criterios",
      selector: (row) => row.criteriaList.length,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex justify-center">
          <button
            className="btn btn-sm btn-outline-light m-2"
            onClick={() => {
              setSelectedEvaluationTemplate(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-sm btn-outline-warning m-2"
            onClick={() => {
              setSelectedEvaluationTemplate(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-sm btn-outline-danger m-2"
            onClick={() => {
              setEvaluationTemplateId(row.id);
              setIsOpen(true);
            }}
          >
            <Icon icon="trash" />
          </button>
          <button
            className="btn btn-sm btn-outline-success m-2"
            onClick={() => {
              handlePdf(row);
            }}
          >
            <Icon icon="pdf" />
          </button>
        </div>
      ),
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
        </div>
        <DataTable
          title="Plantillas de evaluación"
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
          title="Eliminar plantilla de evaluación"
          message="¿Está seguro que desea eliminar esta plantilla de evaluación?"
          onConfirm={() => {
            handleDelete(evaluationTemplateId);
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
        {edit && (
          <AddModal
            setReload={setReload.bind(this)}
            reload={reload}
            toaster={toaster}
            data={selectedEvaluationTemplate}
            edit={edit}
            setEdit={setEdit.bind(this)}
          />
        )}

        <SeeTemplate
          see={see}
          setSee={setSee.bind(this)}
          data={selectedEvaluationTemplate}
        />
      </div>
    </>
  );
}
