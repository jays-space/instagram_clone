import { firestore, db } from "../lib/firebase.lib.js";
const {
  collection,
  query,
  where,
  getDocs,
  limit,
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
} = firestore;

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
 ** userId :current user's uid
 ** array of uid's that are currently being followed by the current user
 ** returns an array of all users (limited to 10), then filters out current user's uid and the user id's of all currently followed users.
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

export const updateCurrentUserFollowing = async (
  profileId, //* uid of user requested to be followed by currentUser
  currentUserDocId, //* currentUser uid
  isCurrentlyFollowing //* boolean -> is currentUser currently following requested profile
) => {
  const docRef = doc(db, "users", currentUserDocId);
  try {
    await updateDoc(docRef, {
      following: isCurrentlyFollowing
        ? arrayRemove(profileId)
        : arrayUnion(profileId),
    });
    return true;
  } catch (error) {
    console.log("error: ", error.message);
    return false;
  }
};

export const updateFollowedUserFollowers = async (
  profileDocId, //* document id of requested profile
  currentUserId, //* currentUser uid
  isCurrentlyFollower //* boolean -> is requested profile currently being followed by currentUser
) => {
  const docRef = doc(db, "users", profileDocId);

  try {
    await updateDoc(docRef, {
      followers: isCurrentlyFollower
        ? arrayRemove(currentUserId)
        : arrayUnion(currentUserId),
    });
    return true;
  } catch (error) {
    console.log("error: ", error.message);
    return false;
  }
};
