import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import { createEmployee, updateEmployee } from "../../firebase/employees";
import { getAreas } from "../../firebase/areas";
import { getPosition } from "../../firebase/positions";
import { updateCandidate } from "../../firebase/candidates";
import banks from "../../config/banks";
import ModalStyle from "../../utils/ModalStyle";

export default function CreateModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
  candidate,
  setAddEmployee,
  addEmployee,
}) {
  Modal.setAppElement("#root");

  const [areas, setAreas] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [area, setArea] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dui, setDui] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");

  useEffect(() => {
    if (data) {
      setNames(data.names);
      setLastNames(data.lastNames);
      setArea(data.area);
      setPosition(data.position);
      setSalary(data.salary);
      setEntryDate(data.entryDate);
      setBirthDate(data.birthDate);
      setPhone(data.phone);
      setEmail(data.email);
      setDui(data.dui);
      setBankAccount(data.bankAccount);
      setAddress(data.address);
      setBank(data.bank);
      setIsOpen(edit);
    } else {
      clear();
    }
    getAreas()
      .then((areas) => {
        const data = areas.docs.map((area) => ({
          id: area.id,
          ...area.data(),
        }));
        setAreas(data);
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  }, [edit]);

  useEffect(() => {
    if (candidate) {
      if (candidate.position) {
        try {
          getPosition(candidate.position).then((res) => {
            if (res.exists()) {
              const data = res.data();
              setPosition(data.name);
              setArea(data.area);
              setSalary(data.salary);
            }
          });
        } catch (error) {}
      }
      setNames(candidate.names);
      setLastNames(candidate.lastNames);
      setEntryDate(candidate.date);
      setBirthDate(candidate.birthDate);
      setPhone(candidate.phone);
      setEmail(candidate.email);
      setDui(candidate.dui);
      setAddress(candidate.address);
      setIsOpen(addEmployee);
    }
  }, [candidate, addEmployee]);

  const handleCreate = () => {
    const NewData = {
      names,
      lastNames,
      area,
      position,
      salary,
      entryDate,
      birthDate,
      phone,
      email,
      dui,
      bankAccount,
      address,
      bank,
      pdfUrl: candidate ? candidate.pdfUrl : "",
      pdfId: candidate ? candidate.pdfId : "",
    };
    if (data) {
      NewData.id = data.id;
      updateEmployee(NewData)
        .then(() => {
          setReload(!reload);
          toaster.success("Empleado actualizado exitosamente");
          setIsOpen(false);
          setEdit(false);
          clear();
        })
        .catch((error) => {
          toaster.error("Error al actualizar el empleado");
        });
    } else {
      createEmployee(NewData)
        .then(() => {
          setReload(!reload);
          toaster.success("Empleado creado exitosamente");
          setIsOpen(false);
          clear();
          if (addEmployee) {
            setAddEmployee(false);
            updateCandidate({
              ...candidate,
              saved: true,
            }).then(() => {
              toaster.success("Candidato actualizado exitosamente");
            });
          }
        })
        .catch((error) => {
          toaster.error("Error al crear el empleado");
        });
    }
  };

  const clear = () => {
    setNames("");
    setLastNames("");
    setArea("");
    setPosition("");
    setSalary("");
    setEntryDate("");
    setBirthDate("");
    setPhone("");
    setEmail("");
    setDui("");
    setBankAccount("");
    setAddress("");
    setBank("");
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
      {data || candidate ? null : (
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(true)}
        >
          Registrar empleado
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setEdit && setEdit(false);
          setAddEmployee && setAddEmployee(false);
          clear();
        }}
        style={ModalStyle}
      >
        <div className="container overflow-auto">
          <h2 className="mt-2">
            {" "}
            {data ? "Actualizar" : "Registrar"} empleado
          </h2>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="row mt-3">
              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="names">Nombres</label>
                  <input
                    {...register("names", { required: true })}
                    aria-invalid={errors.names ? "true" : "false"}
                    type="text"
                    className="form-control bg-black text-white"
                    id="names"
                    placeholder="Nombres"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
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
                    className="form-control bg-black text-white"
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
                  <label htmlFor="area">Área</label>
                  <select
                    {...register("area", { required: true })}
                    aria-invalid={errors.area ? "true" : "false"}
                    className="form-control bg-black text-white"
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="">Seleccionar área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  {errors.area && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="position">Cargo</label>
                  <input
                    {...register("position", { required: true })}
                    aria-invalid={errors.position ? "true" : "false"}
                    type="text"
                    className="form-control bg-black text-white"
                    id="position"
                    placeholder="Cargo"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  {errors.position && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="salary">Salario</label>
                  <input
                    {...register("salary", { required: true })}
                    aria-invalid={errors.salary ? "true" : "false"}
                    type="number"
                    className="form-control bg-black text-white"
                    id="salary"
                    placeholder="Salario"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  {errors.salary && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="entryDate">Fecha de ingreso</label>
                  <input
                    {...register("entryDate", { required: true })}
                    aria-invalid={errors.entryDate ? "true" : "false"}
                    type="date"
                    className="custom-date-input"
                    id="entryDate"
                    placeholder="Fecha de ingreso"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                  />
                  {errors.entryDate && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="birthDate">Fecha de nacimiento</label>
                  <input
                    {...register("birthDate", { required: true })}
                    aria-invalid={errors.birthDate ? "true" : "false"}
                    type="date"
                    className="custom-date-input"
                    id="birthDate"
                    placeholder="Fecha de nacimiento"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                  {errors.birthDate && requiredSpan}
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
                    aria-invalid={errors.phone ? "true" : "false"}
                    type="text"
                    className="form-control bg-black text-white"
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
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    aria-invalid={errors.email ? "true" : "false"}
                    type="email"
                    className="form-control bg-black text-white"
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
                  <label htmlFor="dui">DUI</label>
                  <input
                    {...register("dui", {
                      required: true,
                      pattern: /^[0-9]{8}-[0-9]{1}$/,
                    })}
                    aria-invalid={errors.dui ? "true" : "false"}
                    type="text"
                    className="form-control bg-black text-white"
                    id="dui"
                    placeholder="DUI"
                    value={dui}
                    onChange={(e) => setDui(e.target.value)}
                  />
                  {errors.dui && duiPatternSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="bank">Banco</label>
                  <select
                    {...register("bank", { required: true })}
                    aria-invalid={errors.bank ? "true" : "false"}
                    className="form-control bg-black text-white"
                    id="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <option value="">Seleccionar banco</option>
                    {banks.Banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  {errors.bank && requiredSpan}
                </div>
              </div>

              <div className="col-12 col-md-6 mt-2">
                <div className="form-group">
                  <label htmlFor="bankAccount">Cuenta bancaria</label>
                  <input
                    {...register("bankAccount", { required: true })}
                    aria-invalid={errors.bankAccount ? "true" : "false"}
                    type="text"
                    className="form-control bg-black text-white"
                    id="bankAccount"
                    placeholder="Cuenta bancaria"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                  {errors.bankAccount && requiredSpan}
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group">
                <label htmlFor="bankAccount">Dirección</label>
                <input
                  {...register("address", { required: true })}
                  aria-invalid={errors.address ? "true" : "false"}
                  type="text"
                  className="form-control bg-black text-white"
                  id="bankAccount"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && requiredSpan}
              </div>
            </div>
            <div className="row mt-4 p-2 mb-2">
              <div className="col-12 col-md-6">
                <button
                  type="submit"
                  className="btn btn-outline-light m-1 w-100"
                >
                  {edit ? "Editar" : "Agregar"}
                </button>
              </div>
              <div className="col-12 col-md-6">
                <button
                  type="button"
                  className="btn btn-outline-light m-1 w-100"
                  onClick={() => {
                    setIsOpen(false);
                    setEdit && setEdit(false);
                    setAddEmployee && setAddEmployee(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
