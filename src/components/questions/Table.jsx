import { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {
  deleteQuestionsTemplate,
  getQuestionsTemplates,
} from "../../firebase/questions";
import DataTable from "react-data-table-component";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import ModalConfirm from "../utils/ModalConfirm";
import AddModal from "./AddModal";
import Icon from "../utils/Icon";
import SeeTemplate from "./SeeTemplate";
import Questionnaire from "../../pdf/Questionnaire";

export default function Table({ toaster, reload, setReload }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [questionsTemplateId, setQuestionsTemplateId] = useState("");
  const [edit, setEdit] = useState(false);
  const [see, setSee] = useState(false);
  const [selectedQuestionsTemplate, setSelectedQuestionsTemplate] = useState(
    {}
  );
  const [filteredData, setFilteredData] = useState([]);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = data?.filter((questionsTemplate) => {
      return questionsTemplate.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  useEffect(() => {
    getQuestionsTemplates()
      .then((questionsTemplates) => {
        const data = questionsTemplates.docs.map((questionsTemplate) => ({
          id: questionsTemplate.id,
          ...questionsTemplate.data(),
        }));
        setData(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [reload]);

  const handlePdf = (row) => {
    const pdf = Questionnaire(row);
    console.log(pdf);
    pdfMake.createPdf(Questionnaire(row)).open();
  };

  const handleDelete = (id) => {
    deleteQuestionsTemplate(id)
      .then(() => {
        toaster.success("Plantilla de preguntas eliminada exitosamente");
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
      name: "Cantidad de preguntas",
      selector: (row) => row.questionsList.length,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex justify-center">
          <button
            className="btn btn-sm btn-outline-light m-2"
            onClick={() => {
              setSelectedQuestionsTemplate(row);
              setSee(true);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn-sm btn-outline-warning m-2"
            onClick={() => {
              setSelectedQuestionsTemplate(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-sm btn-outline-danger m-2"
            onClick={() => {
              setQuestionsTemplateId(row.id);
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
            handleDelete(questionsTemplateId);
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
        {edit && (
          <AddModal
            setReload={setReload.bind(this)}
            reload={reload}
            toaster={toaster}
            data={selectedQuestionsTemplate}
            edit={edit}
            setEdit={setEdit.bind(this)}
          />
        )}

        <SeeTemplate
          see={see}
          setSee={setSee.bind(this)}
          data={selectedQuestionsTemplate}
        />
      </div>
    </>
  );
}
