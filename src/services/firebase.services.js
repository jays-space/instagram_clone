import { firestore, db } from "../lib/firebase.lib.js";
const { collection, query, where, getDocs, limit } = firestore;

/*
    * Checks the db if the username exists. 

    * Queries the users collection for any usernames matching the submitted username and returns the result as an array of objects. There should always be up to one result in the array. Checks the array length to see if there exists a document.
*/
export const doesUsernameExist = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));

  const result = await getDocs(q);
  const resultLength = result.docs.map((user) => user.data()); //return the snapshot and map to an array
  return resultLength.length;
};

/*
 * Checks firestore and returns a user document where the document.userId matches the userId passed as a paramater. The result is spread into an object
 */
export const getUserByUserId = async (userId) => {
  const q = query(collection(db, "users"), where("userId", "==", userId));

  const result = await getDocs(q);
  const userData = result.docs.map((document) => ({
    ...document.data(),
    docId: document.id,
  }));

  return userData;
};

/**
 * 
 * @param {*} userId :current user's uid 
 * @param {*} following : array of uid's that are currently being followed by the current user
 * @returns an array of all users (limited to 10), then filters out current user's uid and the user id's of all currently followed users.
 */
export const getSuggestedProfiles = async (userId, following) => {
  const q = query(collection(db, "users"), limit(10));
  const result = await getDocs(q);
  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
};
