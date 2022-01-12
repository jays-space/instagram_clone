import { firestore, db } from "../lib/firebase.lib.js";

/*
    * Checks the db if the username exists. 

    * Queries the users collection for any usernames matching the submitted username and returns the result as an array of objects. There should always be up to one result in the array. Checks the array length to see if there exists a document.
*/
export const doesUsernameExist = async (username) => {
  const { collection, query, where, getDocs } = firestore;

  const q = query(collection(db, "users"), where("username", "==", username));

  const result = await getDocs(q);
  const resultLength = result.docs.map((user) => user.data()); //return the snapshot and map to an array
  return resultLength.length;
};

/*
 * Checks and returns a user document where the document.userId matches the userId passed as a paramater. The result is spread into an object
 */
export const getUserByUserId = async (userId) => {
  const { collection, query, where, getDocs } = firestore;

  const q = query(collection(db, "users"), where("userId", "==", userId));

  const result = await getDocs(q);
  const userData = result.docs.map((document) => ({
    ...document.data(),
    docId: document.id,
  }));

  return userData;
};
