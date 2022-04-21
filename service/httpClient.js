import getBaseAPI from "./getBaseAPI";


export const getUsers = async () => {
  return await getBaseAPI.get('/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export const getUser = async () => {
  return await getBaseAPI.get('/users/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export const createUser = async (nama, email, password, passwordConf) => {
  return await getBaseAPI.post('/login/register', {
    name: nama,
    email: email,
    password: password,
    passwordConf: passwordConf
  });
}

export const loginUser = async (email, password) => {
  return await getBaseAPI.post('/login/', {
    email: email,
    password: password
  });
}

export const logoutUser = async () => {
  return await getBaseAPI.post('/login/signout');
}

export const updateUser = async (id, name, email, image) => {
  return await getBaseAPI.patch(`/users/update/${id}`, {
    name: name,
    email: email,
    image: image
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

export const deleteUser = async id => {
  return await getBaseAPI.delete(`/users/delete/${id}`);
}

export const changePassword = async (id, password, passwordConf) => {
  return await getBaseAPI.patch(`/users/change-password/${id}`, {
    password: password,
    passwordConf: passwordConf
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}

export const getArticles = async () => {
  return await getBaseAPI.get('/articles');
}

export const addArticle = async (title, content, year, author, link) => {
  return await getBaseAPI.post('/articles/add-article', {
    title: title,
    content: content,
    year: year,
    author: author,
    link: link
  });
}

export const updateArticle = async id => {
  return await getBaseAPI.patch(`/articles/article/${id}`);
}

export const deleteArticle = async id => {
  return await getBaseAPI.delete(`/articles/article/${id}`);
}

export const searchArticle = async keyword => {
  return await getBaseAPI.get(`/articles/search/${keyword}`);
}

export const editArticle = async (id, title, content, year, author, link) => {
  return await getBaseAPI.patch(`/articles/article/${id}`, {
    title: title,
    content: content,
    year: year,
    author: author,
    link: link
  })
}

export const getOneArticle = async id => {
  return await getBaseAPI.get(`/articles/article/${id}`);
}