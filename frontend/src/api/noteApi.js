import API from "./axios";

/*
Get user notes
*/
export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

/*
Create note
*/
export const createNote = async (data) => {
  const res = await API.post("/notes", data);
  return res.data;
};