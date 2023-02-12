import httpClient from'../http-common';

const getAll = () => {
    return httpClient.get('/blogs');
}

const create = (data) => {
    return httpClient.post('/blogs', data);
}

const get = id => {
    return httpClient.get(`/blogs/${id}`);
}

const update = (data) => {
    return httpClient.put('/blogs', data);
}

const remove = id => {
    return httpClient.delete(`/blogs/${id}`);
}

const blogService = {getAll, create, get, update, remove}
export default blogService; 