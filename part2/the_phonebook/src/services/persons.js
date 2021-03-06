import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const updatePerson = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id, name) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

const modulesToExport = {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};

export default modulesToExport;
