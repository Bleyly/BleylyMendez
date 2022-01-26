import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getEmpleado } from "../empleados/empleadosHelpers";

export const DepartamentosModal = ({
  title,
  show,
  onClose,
  onChange,
  departamento,
  onSave,
}) => {
  const [empleados, setEmpleados] = useState([]);
  useEffect(() => {
    getEmpleado(setEmpleados);
  }, [departamento]);

  return (
    <Modal show={show} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={departamento.nombre}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              name="descripcion"
              value={departamento.descripcion}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => {
              return (
                <tr key={empleado.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value=""
                      checked={
                        !!departamento.empleados.find(
                          (e) => e.id === empleado.id
                        )
                      }
                      onChange={(event) => {
                        onChange({
                          target: {
                            name: "empleados",
                            value: event.target.checked
                              ? [...departamento.empleados]
                              : departamento.empleados.filter(
                                  (e) => e.id !== empleado.id
                                ),
                          },
                        });
                      }}
                    />
                  </td>
                  <td>
                    {empleado.nombre} {empleado.apellido}
                  </td>
                  empleado.fechaDeNacimiento.toString().substr(0, 10)
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => onSave()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
