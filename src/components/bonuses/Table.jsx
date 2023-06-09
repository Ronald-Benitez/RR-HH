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
import { deleteBonus } from "../../firebase/bonuses";
import AddBonusesModal from "./AddBonusesModal";
import Icon from "../utils/Icon";
import Bonuses from "../../pdf/Bonuses";

export default function Table({ bonuses, toaster, reload, setReload, date }) {
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = bonuses.filter((bonus) => {
      return bonus.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  const handlePdf = () => {
    const docDefinition = Bonuses(
      filteredData.length > 0 ? filteredData : data,
      moment(date).format("MMMM YYYY")
    );
    pdfMake.createPdf(docDefinition).open();
  };

  useEffect(() => {
    setData(filteredData.length > 0 ? filteredData : bonuses);
  }, [bonuses, filteredData]);

  useEffect(() => {
    setFilteredData([]);
  }, [date]);

  const handleDelete = () => {
    deleteBonus(selectedBonus)
      .then(() => {
        toaster.success("Bono eliminado exitosamente");
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
      name: "Monto",
      selector: (row) => row.value,
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
            className="btn btn-outline-warning btn-sm mx-1"
            onClick={() => {
              setSelectedBonus(row);
              setEdit(true);
            }}
          >
            <Icon icon="pen" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm mx-1"
            onClick={() => {
              setSelectedBonus(row);
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
        title="Bonos"
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
        title="Eliminar bono"
        message="¿Está seguro que desea eliminar este bono?"
        onConfirm={() => {
          handleDelete();
          setIsOpen(false);
          setReload(!reload);
        }}
        onCancel={() => setIsOpen(false)}
      />
      {edit && (
        <AddBonusesModal
          setReload={setReload.bind(this)}
          reload={reload}
          edit={edit}
          setEdit={setEdit.bind(this)}
          data={selectedBonus}
          toaster={toaster}
          dateSelected={moment(date).format("YYYY-MM-DD")}
        />
      )}
    </>
  );
}
