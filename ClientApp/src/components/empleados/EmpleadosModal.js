import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { getDepartementos } from "../departamentos/departamentoHelpers";

export const EmpleadosModal = ({
  title,
  show,
  onClose,
  onChange,
  empleado,
  onSave,
}) => {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    getDepartementos(setDepartamentos);
  }, [empleado]);

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
              value={empleado.nombre}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="apellido"
              value={empleado.apellido}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <InputMask
              mask="999-9999999-9"
              value={empleado.cedula}
              onChange={onChange}
              name="cedula"
            >
              {(inputProps) => <Form.Control {...inputProps} type="text" />}
            </InputMask>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              placeholder="Fecha de Nacimiento"
              name="fecha_nacimiento"
              value={empleado.fecha_nacimiento}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de posición</Form.Label>
            <Form.Control
              type="text"
              name="nombredeposicion"
              value={empleado.nombredeposicion}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Departamento</Form.Label>
            <select
              className="form-control"
              value={empleado.departamentoId}
              name="departamentoId"
              onChange={onChange}
            >
              <option value="">Seleccione</option>
              {departamentos.map((departamento) => {
                return (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nombre}
                  </option>
                );
              })}
            </select>
          </Form.Group>
        </Form>
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
