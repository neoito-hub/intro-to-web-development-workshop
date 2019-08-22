const API = 'http://localhost:3030';

const get = async (route = '', id = null) => {
  try {
    let url = `${API}${route}`;
    if (id) {
      url += '/' + id
    }
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    // console.log(e);
    return null
  }
};

// const put = async (id = null, payload) => {

// };

// const post = async (id = null, payload) => {

// };

// const del = async (id = null) => {

// };


export {
  get
}