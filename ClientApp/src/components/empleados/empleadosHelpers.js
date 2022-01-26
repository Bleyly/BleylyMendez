import axios from "axios";

export const getEmpleado = async (callback) => {
  const { data } = await axios.get("/api/empleados");
  callback(data);
};

export const createEmpleado = async (empleado) => {
  const { data } = await axios.post("/api/empleados", empleado);

  return data;
};

export const updateEmpleado = async (empleado) => {
  const { data } = await axios.put(`/api/empleados/${empleado.id}`, empleado);

  return data;
};

export const deleteEmpleado = async (id) => {
  await axios.delete(`/api/empleados/${id}`);
};
