import { useEffect, useState } from "react";
import Modal from "react-modal";

import ModalStyle from "../../utils/ModalStyle";
import Icon from "../utils/Icon";
import { createQuestionsTemplate } from "../../firebase/questions";
import { set } from "react-hook-form";

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
  const [questionsList, setQuestionsList] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [question, setQuestion] = useState("");

  const handleSubmmit = (e) => {
    e.preventDefault();
    if (questionsList.length === 0)
      return toaster.error("Debe agregar al menos una pregunta");

    const sendData = {
      name,
      objetive,
      questionsList,
      id,
    };

    createQuestionsTemplate(sendData)
      .then(() => {
        toaster.success("Plantilla de preguntas creada exitosamente");
        setReload(!reload);
        clearForm();
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();

    if (question.length > 0) {
      setQuestionsList([...questionsList, question]);
      setQuestion("");
    }
  };

  const handleDeleteQuestion = (e, index) => {
    e.preventDefault();
    const newQuestionsList = questionsList.filter((item, i) => i !== index);
    setQuestionsList(newQuestionsList);
  };

  useEffect(() => {
    if (edit) {
      setName(data.name);
      setobjetive(data.objetive);
      setQuestionsList(data.questionsList);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [edit, data]);

  const clearForm = () => {
    setName("");
    setobjetive("");
    setQuestionsList([]);
    setId("");
    setEdit && setEdit(false);
  };

  return (
    <>
      {!edit && (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Agregar plantilla de evaluación
        </button>
      )}
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
                    <label htmlFor="question" className="form-label">
                      Pregunta
                    </label>
                    <div className="d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        className="form-control bg-dark text-light"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className="btn btn-outline-light"
                    onClick={handleAddQuestion}
                  >
                    Agregar pregunta
                  </button>
                </div>
                <div className="col-12 mt-3">
                  <ul className="list-group">
                    {questionsList.map((item, index) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center my-1 bg-black text-light"
                        key={index}
                      >
                        {item}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={(e) => handleDeleteQuestion(e, index)}
                        >
                          <Icon icon="trash" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="row mt-3 px-5">
                <button
                  className="btn btn-outline-light"
                  type="submit"
                  disabled={questionsList.length === 0}
                >
                  {edit ? "Editar" : "Agregar"}
                </button>
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
