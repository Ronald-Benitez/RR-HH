import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment/moment";
import { useForm } from "react-hook-form";

import ModalStyle from "../../utils/ModalStyle";
import { createCandidate, updateCandidate } from "../../firebase/candidates";
import { uploadPDF, deletePDF } from "../../firebase/pdf";
import { getPositions } from "../../firebase/positions";

export default function AddCandidateModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
}) {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfId, setPdfId] = useState("");
  const [date, setDate] = useState(moment());
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const clear = () => {
    setNames("");
    setLastNames("");
    setPosition("");
    setEmail("");
    setPhone("");
    setPdf(null);
    setPdfName("");
    setPdfUrl("");
    setDate(moment());
    setDui("");
    setAddress("");
    setBirthDate("");
  };

  useEffect(() => {
    getPositions().then((positions) => {
      const data = positions.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setPositions(data || []);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setNames(data.names);
      setLastNames(data.lastNames);
      setPosition(data.position);
      setEmail(data.email);
      setPhone(data.phone);
      setPdfName(data.pdfName);
      setPdfUrl(data.pdfUrl);
      setDate(moment(data.date));
      setDui(data.dui);
      setAddress(data.address);
      setPdfId(data.pdfId);
      setBirthDate(data.birthDate);
      setIsOpen(edit);
    }
  }, [data]);

  const handleFile = async () => {
    if (!pdf) return { url: "", id: "" };

    if (!pdf || pdf.type !== "application/pdf") {
      toaster.error("El archivo debe ser un PDF");
      return false;
    }

    const result = await uploadPDF(pdf, toaster);
    if (result) await deletePDF(pdfId, toaster);
    return result;
  };

  const handleSubmitData = async (e) => {
    try {
      const result = await handleFile();
      if (!result) return;

      const sendData = {
        names,
        lastNames,
        position,
        email,
        phone,
        pdfName,
        pdfUrl: result.url,
        pdfId: result.id,
        date: date.format("YYYY-MM-DD"),
        dui,
        address,
        birthDate,
        state: "Registrado",
        comment: "",
        saved: false,
      };

      if (!edit) {
        await createCandidate(sendData);
        toaster.success("Candidato creado");
        clear();
      } else {
        if (pdf) {
          const updateData = {
            ...sendData,
            id: data.id,
          };
          await updateCandidate(updateData);
          toaster.success("Candidato actualizado");
        } else {
          const updateData = {
            ...sendData,
            id: data.id,
            pdfName: data.pdfName,
            pdfUrl: data.pdfUrl,
            pdfId: data.pdfId,
            date: data.date,
          };
          await updateCandidate(updateData);
          toaster.success("Candidato actualizado");
          setEdit(false);
        }
      }

      setReload(!reload);
      setIsOpen(false);
      clear();
    } catch (err) {
      toaster.error(err.message);
      console.log(err);
    }
  };

  const requiredSpan = (
    <span className="text-warning">Este campo es requerido</span>
  );

  const phonePatternSpan = (
    <span className="text-warning">El número de teléfono es inválido</span>
  );

  const emailPatternSpan = (
    <span className="text-warning">El correo electrónico es inválido</span>
  );

  const duiPatternSpan = (
    <span className="text-warning">Inválido (formato: 12345678-9)</span>
  );

  return (
    <div>
      {!edit && (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Agregar candidato
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          clear();
          setEdit && setEdit(false);
        }}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <h2 className="text-center">Registrar candidato</h2>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="row">
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="names">Nombres</label>
                  <input
                    {...register("names", { required: true })}
                    aria-invalid={errors.names ? "true" : "false"}
                    type="text"
                    className="form-control"
                    id="names"
                    placeholder="Nombres"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    required
                  />
                  {errors.names && requiredSpan}
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="lastNames">Apellidos</label>
                  <input
                    {...register("lastNames", { required: true })}
                    aria-invalid={errors.lastNames ? "true" : "false"}
                    type="text"
                    className="form-control"
                    id="lastNames"
                    placeholder="Apellidos"
                    value={lastNames}
                    onChange={(e) => setLastNames(e.target.value)}
                  />
                  {errors.lastNames && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="position">Cargo</label>
                  <select
                    {...register("position", { required: true })}
                    aria-invalid={errors.position ? "true" : "false"}
                    className="form-control"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Seleccione un cargo</option>
                    {positions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.name + " - " + position.area}
                      </option>
                    ))}
                  </select>
                  {errors.position && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && emailPatternSpan}
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0-9]{8}$/,
                    })}
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Teléfono"
                    value={phone}
                    maxLength={8}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && phonePatternSpan}
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="pdf">Curriculum</label>
                  <input
                    type="file"
                    className="form-control"
                    id="pdf"
                    onChange={(e) => {
                      setPdf(e.target.files[0]);
                      setPdfName(e.target.files[0].name);
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="date">Fecha de nacimiento</label>
                  <input
                    {...register("birthDate", { required: true })}
                    type="date"
                    className="form-control"
                    id="date"
                    placeholder="Fecha de nacimiento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                  {errors.birthDate && requiredSpan}
                </div>
              </div>
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="dui">DUI</label>
                  <input
                    {...register("dui", {
                      required: true,
                      pattern: /^[0-9]{8}-[0-9]{1}$/,
                    })}
                    type="text"
                    className="form-control"
                    id="dui"
                    placeholder="DUI"
                    value={dui}
                    onChange={(e) => setDui(e.target.value)}
                  />
                  {errors.dui && duiPatternSpan}
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="form-group">
                  <label htmlFor="address">Dirección</label>
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && requiredSpan}
                </div>
              </div>
            </div>
            <div className="row mt-4 justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-light col-12 col-md-4 m-2"
              >
                {edit ? "Actualizar" : "Registrar"}
              </button>
              <button
                type="button"
                className="btn btn-outline-light col-12 col-md-4 m-2"
                onClick={() => {
                  setIsOpen(false);
                  clear();
                  setEdit && setEdit(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
