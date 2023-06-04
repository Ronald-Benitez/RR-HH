import { useState, useEffect } from "react";
import Modal from "react-modal";

import { createPosition, updatePosition } from "../../firebase/positions";
import { getAreas } from "../../firebase/areas";
import ModalStyle from "../../utils/ModalStyle";
import { set } from "react-hook-form";

export default function AddPositionModal({
  toaster,
  reload,
  setReload,
  data,
  edit,
  setEdit,
}) {
  const [areas, setAreas] = useState([]);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    getAreas().then((areas) => {
      const data = areas.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setAreas(data || []);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setArea(data.area);
      setResponsibilities(data.responsibilities);
      setRequirements(data.requirements);
      setSalary(data.salary);
      setSkills(data.skills);
      setExperience(data.experience);
      setId(data.id);
      setIsOpen(edit);
    }
  }, [edit, data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      area,
      responsibilities,
      requirements,
      salary,
      skills,
      experience,
      id,
    };

    if (edit) {
      updatePosition(data)
        .then(() => {
          toaster.success("Puesto actualizado exitosamente");
          setReload(!reload);
          setIsOpen(false);
          setEdit(false);
          clear();
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    } else {
      createPosition(data)
        .then(() => {
          toaster.success("Puesto creado exitosamente");
          setReload(!reload);
          setIsOpen(false);
          clear();
        })
        .catch((error) => {
          toaster.error(error.message);
        });
    }
  };

  const clear = () => {
    setName("");
    setArea("");
    setResponsibilities("");
    setRequirements("");
    setSalary("");
    setSkills("");
    setExperience("");
    setId("");
  };

  return (
    <>
      <div>
        <button
          className="btn btn-outline-light"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Registrar nuevo puesto
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={ModalStyle}
        >
          <div className="container overflow-auto">
            <h2 className="text-center">Registrar puesto</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mt-3">
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control bg-black text-white"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="area" className="form-label">
                    Área
                  </label>
                  <select
                    className="form-select bg-black text-white"
                    aria-label="Default select example"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    id="area"
                    required
                  >
                    <option value="">Selecciona un área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="responsibilities" className="form-label">
                    Responsabilidades
                  </label>
                  <textarea
                    className="form-control bg-black text-white"
                    placeholder="Responsabilidades"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    id="responsibilities"
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="requirements" className="form-label">
                    Requisitos
                  </label>
                  <textarea
                    className="form-control bg-black text-white"
                    placeholder="Requisitos"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    id="requirements"
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="skills" className="form-label">
                    Habilidades
                  </label>
                  <textarea
                    className="form-control bg-black text-white"
                    placeholder="Habilidades"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    id="skills"
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="experience" className="form-label">
                    Experiencia
                  </label>
                  <textarea
                    className="form-control bg-black text-white"
                    placeholder="Experiencia"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    id="experience"
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="salary" className="form-label">
                    Salario
                  </label>
                  <input
                    type="number"
                    className="form-control bg-black text-white"
                    placeholder="Salario"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    id="salary"
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-center mt-2">
                <button
                  type="submit"
                  className="btn btn-outline-light col-12 col-md-5 m-1"
                >
                  {edit ? "Editar" : "Registrar"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-light col-12 col-md-5 m-1"
                  onClick={() => {
                    setEdit && setEdit(false);
                    setIsOpen(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
