export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token: string) =>
  localStorage.setItem("access_token", token);

export const setUserId = (id: string) => localStorage.setItem("user_id", id);

export const getUserId = () => localStorage.getItem("user_id");
