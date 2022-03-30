import getBaseAPI from "./getBaseAPI";

export const getAllUsers = async () =>{
  return await getBaseAPI().get("/users");
} 

export const getUser = async () => {
  return await getBaseAPI().get('/users/get-user');
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
  return await getBaseAPI.post('/login/signin', {
    email: email,
    password: password
  });
}

export const logoutUser = async () => {
  return await getBaseAPI.post('/login/signout');
}

export const updateUser = async id => {
  return await getBaseAPI.patch(`/users/update/${id}`);
}

export const deleteUser = async id => {
  return await getBaseAPI.delete(`/users/delete/${id}`);
}

export const changePassword = async id => {
  return await getBaseAPI.patch(`/users/change-password/${id}`);
}

export const addArticle = async () => {
  return await getBaseAPI.post('/articles/add-article');
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