import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Push content onto the database 
export const putDb = async (content) => {
  console.log('PUT to the database');
  //Create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);
  //Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('todos','readwrite');
  //Open up the desired object store.
  const store = tx.objectStore('todos');
  //Use the .put() method to add data to the database
  const request = store.put(content);
  //Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Get all content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  //Create a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);
  //Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('todos', 'readonly');
  //Open up the desired object store.
  const store = tx.objectStore('todos');
  //Use the .getAll() method to get all data in the database
  const request = store.getAll();
  //Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result; 
}
initdb();
