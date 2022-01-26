import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const DepartamentosModal = ({
  title,
  show,
  onClose,
  onChange,
  departamento,
  onSave,
}) => {
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
