import React, { useEffect, useState } from "react";
import { DepartamentosModal } from "./DepartamentosModal";
import {
  getDepartementos,
  createDepartamento,
  updateDepartamento,
  deleteDepartemento,
} from "./departamentoHelpers";

export const Departamentos = () => {
  const [departamento, setDepartamento] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    empleados: [],
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [show, setShow] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setDepartamento((prevDepartamento) => ({
      ...prevDepartamento,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (departamento.id) {
      const updatedDepartamento = await updateDepartamento(departamento);
      setDepartamentos((prevDepartamentos) =>
        prevDepartamentos.map((departamento) => {
          if (departamento.id === updateDepartamento.id) {
            return updatedDepartamento;
          }
          return departamento;
        })
      );
    } else {
      const newDepartamento = await createDepartamento(departamento);
      setDepartamentos((prevDepartamentos) => [
        ...prevDepartamentos,
        newDepartamento,
      ]);
    }
    setDepartamento({
      id: 0,
      nombre: "",
      descripcion: "",
      empleados: [],
    });

    setShow(false);
    getDepartementos(setDepartamentos);
  };

  const handleClean = async () => {
    setDepartamento({
      id: 0,
      nombre: "",
      descripcion: "",
      empleados: [],
    });

    setShow(false);
  };

  const handleDelete = async (id) => {
    await deleteDepartemento(id);

    setDepartamentos((prevDepartamentos) =>
      prevDepartamentos.filter((departamento) => departamento.id !== id)
    );
  };

  useEffect(() => {
    getDepartementos(setDepartamentos);
  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary float-end mb-5"
          onClick={() => setShow(true)}
        >
          Nuevo
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripci??n</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.id}</td>
              <td>{departamento.nombre}</td>
              <td>{departamento.descripcion}</td>
              <td>
                <span
                  className="link-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDepartamento(departamento);
                    setShow(true);
                  }}
                >
                  Editar
                </span>
                &nbsp;
                <span
                  className="link-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(departamento.id)}
                >
                  Eliminar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DepartamentosModal
        title={departamento?.id ? "Editar Departamento" : "A??adir Departamento"}
        show={show}
        onClose={handleClean}
        onChange={handleChange}
        departamento={departamento}
        onSave={handleSave}
      />
    </div>
  );
};
