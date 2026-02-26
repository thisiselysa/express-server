// models/memonote.js

let memonotes = [
  {
    id: 1,
    title: "Memo pertama",
    content: "Ini isi memo pertama"
  }
];

let nextId = 2;


// GET ALL
export function getAll() {
  return memonotes;
}


// GET BY ID
export function getById(id) {

  const memonote = memonotes.find(
    (memonote) => memonote.id === id
  );

  if (!memonote) {
    throw new Error("MemoNote not found");
  }

  return memonote;
}


// CREATE
export function create(title, content) {

  const memonote = {
    id: nextId++,
    title,
    content
  };

  memonotes.push(memonote);

  return memonote;
}


// UPDATE
export function update(id, title, content) {

  const index = memonotes.findIndex(
    (memonote) => memonote.id === id
  );

  if (index < 0) {
    throw new Error("MemoNote not found for update");
  }

  const memonote = memonotes[index];

  memonote.title = title;
  memonote.content = content;

  memonotes[index] = memonote;

  return memonote;
}


// DELETE
export function remove(id) {

  const index = memonotes.findIndex(
    (memonote) => memonote.id === id
  );

  if (index < 0) {
    throw new Error("MemoNote not found for delete");
  }

  const deleted = memonotes[index];

  memonotes.splice(index, 1);

  return deleted;
}