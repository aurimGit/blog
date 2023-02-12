import httpClient from'../http-common';

const getAll = () => {
    return httpClient.get('/persons');
}

const create = (person) => {
    return httpClient.post('/persons', person);
}

const get = id => {
    return httpClient.get(`/persons/${id}`);
}

const update = (data) => {
    return httpClient.put('/persons', data);
}

const remove = id => {
    return httpClient.delete(`/persons/${id}`);
}

const personService = {getAll, create, get, update, remove}
export default personService; 