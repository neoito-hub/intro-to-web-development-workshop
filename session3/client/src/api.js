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

const put = async (route = '', id = null, payload) => {
  try {
    const options = {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let url = `${API}${route}`;
    if (id) {
      url += '/' + id
    }
    const res = await fetch(url, options);
    return await res.json();
  } catch (e) {
    // console.log(e)
    return null
  }
};

const post = async (route = '', payload) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let url = `${API}${route}`;
    const res = await fetch(url, options);
    return await res.json();
  } catch (e) {
    // console.log(e)
    return null
  }
};

// const del = async (id = null) => {

// };


export {
  get, put, post
}