import React, { useEffect, useState } from "react";
import { EmpleadosModal } from "./EmpleadosModal";
import {
  getEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "./empleadosHelpers";

export const Empleados = () => {
  const [empleado, setEmpleado] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    cedula: "",
    fechaDeNacimiento: "",
    nombreDePosicion: "",
    departamentoId: 0,
    departamento: "",
  });
  const [empleados, setEmpleados] = useState([]);
  const [show, setShow] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setEmpleado((prevEmpleado) => ({ ...prevEmpleado, [name]: value }));
  };

  const handleSave = async () => {
    if (empleado.id) {
      const updatedEmpleado = await updateEmpleado(empleado);
      setEmpleados.map((empleado) => {
        if (empleado.id === updateEmpleado.id) {
          return updatedEmpleado;
        }
        return empleado;
      });
    } else {
      const newEmpleado = await createEmpleado(empleado);
      setEmpleados((prevEmpleados) => [...prevEmpleados, newEmpleado]);
    }
    setEmpleado({
      id: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      fechaDeNacimiento: "",
      nombreDePosicion: "",
      departamentoId: 0,
      departamento: "",
    });

    setShow(false);
  };
  const handleClear = async () => {
    setEmpleado({
      id: 0,
      nombre: "",
      apellido: "",
      cedula: "",
      fechaDeNacimiento: "",
      nombreDePosicion: "",
      departamentoId: 0,
      departamento: "",
    });

    setShow(false);
  };

  const handleDelete = async (id) => {
    await deleteEmpleado(id);

    setEmpleados((prevEmpleados) =>
      prevEmpleados.filter((empleado) => empleado.id !== id)
    );
  };

  useEffect(() => {
    getEmpleado(setEmpleados);
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
            <th scope="col">Apellido</th>
            <th scope="col">Cédula</th>
            <th scope="col">Fecha de Nacimieto</th>
            <th scope="col">Nombre de posición</th>
            <th scope="col">Departamento</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => {
            return (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.cedula}</td>
                <td>{empleado.fechaDeNacimiento.toString().substr(0, 10)}</td>
                <td>{empleado.nombreDePosicion}</td>
                <td>{empleado.departamento.nombre}</td>
                <td>
                  <span
                    className="link-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEmpleado(empleado);
                      setShow(true);
                    }}
                  >
                    Editar
                  </span>
                  &nbsp;
                  <span
                    className="link-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(empleado.id)}
                  >
                    Eliminar
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <EmpleadosModal
        title={empleado?.id ? "Editar Empleado" : "Añadir Empleado"}
        show={show}
        onClose={handleClear}
        onChange={handleChange}
        empleado={empleado}
        onSave={handleSave}
      />
    </div>
  );
};
