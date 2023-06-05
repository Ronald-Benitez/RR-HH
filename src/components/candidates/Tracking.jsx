import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { updateCandidate } from "../../firebase/candidates";
import tracking from "../../config/tracking.json";
import Icon from "../utils/Icon";

export default function Tracking({
  data,
  show,
  setShow,
  setReload,
  reload,
  toaster,
}) {
  const [state, setState] = useState("");
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editComment, setEditComment] = useState("");

  const newCommentRef = useRef(null);

  useEffect(() => {
    setState(data.state);
    setComment(data.comment);
  }, [data]);

  useEffect(() => {
    if (editIndex !== -1) {
      newCommentRef.current.focus();
    }
  }, [editIndex]);

  const handleEditComment = (index, comment) => {
    setEditIndex(index);
    setEditComment(comment);
  };

  const handleUpdateComment = () => {
    if (editComment === "") return;
    let rebase = comment.split("}");
    rebase[editIndex] = editComment;
    rebase = rebase.join("}");
    setComment(rebase);
    setEditIndex(-1);
    setEditComment("");

    const send = {
      ...data,
      state,
      comment: rebase,
    };

    updateCandidate(send)
      .then(() => {
        toaster.success("Comentario actualizado exitosamente");
        setReload(!reload);
        newCommentRef.current.focus(); // Hacer focus en el comentario actualizado
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handleNewComment = () => {
    if (newComment === "") return;
    let rebase = comment;
    rebase += newComment;
    rebase += "}";
    setComment(rebase);
    setNewComment("");

    const send = {
      ...data,
      state,
      comment: rebase,
    };

    updateCandidate(send)
      .then(() => {
        toaster.success("Comentario agregado exitosamente");
        setReload(!reload);
        newCommentRef.current.focus(); // Hacer focus en el comentario actualizado
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handleDeleteComment = (index) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este comentario?"
    );
    if (!confirmDelete) return;

    let rebase = comment.split("}");
    rebase.splice(index, 1);
    rebase = rebase.join("}");
    setComment(rebase);

    const send = {
      ...data,
      state,
      comment: rebase,
    };
    updateCandidate(send)
      .then(() => {
        toaster.success("Comentario eliminado exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const handleStateChange = () => {
    const send = {
      ...data,
      state,
    };

    updateCandidate(send)
      .then(() => {
        toaster.success("Estado del candidato actualizado exitosamente");
        setReload(!reload);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => setShow(false)}
      style={ModalStyle}
      contentLabel="Example Modal"
    >
      <div className="container overflow-auto">
        <div className="row px-4">
          <h3 className="my-5 text-center">
            Seguimiento del Candidato: {data.names + " " + data.lastNames}
          </h3>
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="mb-4">
                <label htmlFor="state" className="form-label">
                  Estado
                </label>
                <select
                  className="form-select bg-black text-white"
                  aria-label="Default select example"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  id="state"
                >
                  <option value="">Seleccione un estado</option>
                  {tracking.tracking.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <button
                  className="btn btn-outline-light col-12"
                  onClick={handleStateChange}
                >
                  Actualizar estado
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <h4>Comentarios</h4>
            <div className="col-12 col-md-8">
              {comment?.split("}").map((item, index, array) => {
                if (index !== array.length - 1) {
                  return (
                    <div className="card mb-3" key={index}>
                      <div className="card-body position-relative">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <p className="card-text text-black p4-5">{item}</p>
                          </div>
                          <div>
                            <button
                              className="btn btn-warning me-2"
                              onClick={() => handleEditComment(index, item)}
                            >
                              <Icon icon="pen" />
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteComment(index)}
                            >
                              <Icon icon="trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null; // No renderizar el último elemento
                }
              })}

              {!comment && <p>No hay comentarios</p>}
            </div>
            <div className="col-12 col-md-4">
              <div className="mb-4">
                <label htmlFor="newComment" className="form-label">
                  Nuevo Comentario
                </label>
                <textarea
                  ref={newCommentRef}
                  className="form-control bg-black text-white"
                  id="newComment"
                  rows="6"
                  value={editIndex !== -1 ? editComment : newComment}
                  onChange={(e) =>
                    editIndex !== -1
                      ? setEditComment(e.target.value)
                      : setNewComment(e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                {editIndex !== -1 ? (
                  <>
                    <button
                      className="btn btn-outline-light col-12"
                      onClick={handleUpdateComment}
                    >
                      Actualizar Comentario
                    </button>
                    <button
                      className="btn btn-outline-light col-12 mt-2"
                      onClick={() => {
                        setEditIndex(-1);
                        setEditComment("");
                      }}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-light col-12"
                    onClick={handleNewComment}
                  >
                    Agregar Comentario
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <button
            className="btn btn-outline-light col-12 col-md-6"
            onClick={() => setShow(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
