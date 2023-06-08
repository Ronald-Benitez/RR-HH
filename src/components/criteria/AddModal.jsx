import { useEffect, useState } from "react";
import Modal from "react-modal";

import ModalStyle from "../../utils/ModalStyle";
import { createEvaluationTemplate } from "../../firebase/evaluationTemplate";
import Icon from "../utils/Icon";

export default function AddModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [objetive, setobjetive] = useState("");
  const [criteriaList, setCriteriaList] = useState([]);
  const [weightList, setWeightList] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [criteria, setCriteria] = useState("");
  const [weight, setWeight] = useState(0);

  const handleSubmmit = (e) => {
    e.preventDefault();
    if (criteriaList.length === 0)
      return toaster.error("Debe agregar al menos un criterio");
    if (weightList.length === 0)
      return toaster.error("Debe agregar al menos un peso");
    if (weightList.reduce((a, b) => Number(a) + Number(b), 0) !== 100)
      return toaster.error("La suma de los pesos debe ser 100");

    const sendData = {
      name,
      objetive,
      criteriaList,
      weightList,
      id,
    };

    createEvaluationTemplate(sendData)
      .then(() => {
        toaster.success("Plantilla de evaluación creada exitosamente");
        setReload(!reload);
        clearForm();
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handleAddCriteria = (e) => {
    e.preventDefault();
    if (!verifyTotalWeight()) return;

    if (criteria.length > 0 && weight > 0) {
      setCriteriaList([...criteriaList, criteria]);
      setWeightList([...weightList, weight]);
      setCriteria("");
      setWeight(0);
    } else {
      toaster.error("Debe llenar todos los campos");
    }
  };

  const verifyTotalWeight = () => {
    let total = 0;
    weightList.forEach((weight) => {
      total += parseFloat(weight);
    });

    if (total > 100) {
      toaster.error("El peso total no puede ser mayor a 100%");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (edit) {
      setName(data.name);
      setobjetive(data.objetive);
      setCriteriaList(data.criteriaList);
      setWeightList(data.weightList);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [data, edit]);

  const clearForm = () => {
    setobjetive("");
    setCriteriaList([]);
    setWeightList([]);
    setCriteria("");
    setWeight(0);
    setName("");
  };

  return (
    <>
      {!edit ? (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Agregar plantilla de evaluación
        </button>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          clearForm();
          setEdit && setEdit(false);
        }}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto mt-2">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-center">
              {edit
                ? "Editar plantilla de evaluación"
                : "Agregar plantilla de evaluación"}
            </h3>
          </div>
          <div className="modal-body mt-2">
            <form onSubmit={handleSubmmit}>
              <div className="row justify-content-center align-items-center">
                <div className="col-12 my-2">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="objetive" className="form-label">
                    Objetivo
                  </label>
                  <textarea
                    type="text"
                    className="form-control bg-dark text-light"
                    id="objetive"
                    value={objetive}
                    onChange={(e) => setobjetive(e.target.value)}
                    required
                  />
                </div>
                <div className="border mx-5 my-2">
                  <div className="col-12 mt-3 my-2">
                    <label htmlFor="criteria" className="form-label">
                      Criterio
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light"
                      id="criteria"
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mt-3 my-4">
                    <label htmlFor="weight" className="form-label">
                      Peso %
                    </label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={(e) => {
                      handleAddCriteria(e);
                    }}
                  >
                    Agregar criterio
                  </button>
                </div>
                <div className="col-12 mt-3 p-3">
                  <table className="table table-dark table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Criterio</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weightList.map((weight, index) => (
                        <tr key={index}>
                          <td>{criteriaList[index]}</td>
                          <td>{weight}%</td>
                          <td>
                            <button
                              className="btn btn-outline-light"
                              onClick={() => {
                                setCriteriaList((prevCriteriaList) =>
                                  prevCriteriaList.filter((_, i) => i !== index)
                                );
                                setWeightList((prevWeightList) =>
                                  prevWeightList.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <Icon icon="trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>
                          {weightList.reduce(
                            (total, weight) => total + parseFloat(weight),
                            0
                          )}
                          %
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-outline-light"
                    disabled={criteriaList.length === 0}
                  >
                    {edit ? "Editar" : "Agregar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row px-5">
            <button
              className="btn btn-outline-light mt-3"
              onClick={() => {
                setIsOpen(false);
                clearForm();
                setEdit && setEdit(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
