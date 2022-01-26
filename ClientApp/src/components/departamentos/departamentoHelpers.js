import axios from "axios";

export const getDepartementos = async (callback) => {
  const { data } = await axios.get("/api/departamentos");
  callback(data);
};

export const createDepartamento = async (departamento) => {
  const { data } = await axios.post("/api/departamentos", departamento);

  return data;
};

export const updateDepartamento = async (departamento) => {
  const { data } = await axios.put(
    `/api/departamentos/${departamento.id}`,
    departamento
  );

  return data;
};

export const deleteDepartemento = async (id) => {
  await axios.delete(`/api/departamentos/${id}`);
};
