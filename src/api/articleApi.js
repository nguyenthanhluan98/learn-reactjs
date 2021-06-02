import axiosClientRealWorld from './axiosClientRealWorld.js';

const articleApi = {
  getAll(params) {
    const url = '/articles?limit=4';
    return axiosClientRealWorld.get(url, { params });
  },

  get(id) {
    const url = `/categories/${id}`;
    return axiosClientRealWorld.get(url);
  },

  add(data) {
    const url = '/categories';
    return axiosClientRealWorld.post(url, data);
  },

  update(data) {
    const url = `/categories/${data.id}`;
    return axiosClientRealWorld.patch(url, data);
  },

  remove(id) {
    const url = `/categories/${id}`;
    return axiosClientRealWorld.delete(url);
  },
};

export default articleApi;
