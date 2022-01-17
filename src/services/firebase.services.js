import { firestore, db } from "../lib/firebase.lib.js";
// import { seedDatabase } from "../seed";
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
  // addDoc,
} = firestore;

// seedDatabase(db, collection, addDoc);

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
    * Checks the db if the username exists. 

    * Queries the users collection for any usernames matching the submitted username and returns the result as an array of objects. There should always be up to one result in the array. Checks the array length to see if there exists a document. Returns the array with user if it exists
*/
export const getUserByUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));

  const result = await getDocs(q);
  return result.docs.map((user) => ({ ...user.data(), docId: user.id }));
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

export const getPhotos = async (userId, following) => {
  const q = query(collection(db, "photos"), where("userId", "in", following)); //* go to 'photos' collection and get an array of all photos where the userId is in 'following' array

  const result = await getDocs(q);

  //* get photos
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  //* check if current user likes photo(s), then get uploader's (user) data if true
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;

      /**
       ** if currentUser has liked the photo (likes array from 'photo' firestore includes currentUser's uid), set userLikedPhoto true, else leave as false
       */
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const userWhoUploadedPhoto = await getUserByUserId(photo.userId); //* get user who posted photo
      const { username } = userWhoUploadedPhoto[0];
      return {
        username,
        ...photo,
        userLikedPhoto, //* pass bool into obj
      };
    })
  );

  return photosWithUserDetails;
};

export const getPhotosByUsername = async (username) => {
  const [user] = await getUserByUsername(username);
  const q = query(
    collection(db, "photos"),
    where("userId", "==", user?.userId)
  );
  const result = await getDocs(q);

  return result?.docs?.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
};

export const updatePhotoLikes = async (docId, toggleLiked, userId) => {
  const docRef = doc(db, "photos", docId); //* get firestore doc reference

  //* update likes array in firestore if toggleLiked is true
  await updateDoc(docRef, {
    likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
};

export const submitComment = async (docId, displayName, comment) => {
  const docRef = doc(db, "photos", docId); //* get firestore doc reference

  await updateDoc(docRef, {
    comments: arrayUnion({ displayName, comment }),
  });
};

export const isUserFollowingProfile = async (
  currentUserUsername, //current user
  profileUserId
) => {
  /**
   ** query: finds all documents in 'users' where username is currentUserUsername (i.e: jay) && 'following' array contains profileUserId (i.e: 2). 

   ** if either condition does not match, return default {}

   ** will return up to one document as the usernames in firestore are unique
   */
  const q = query(
    collection(db, "users"),
    where("username", "==", currentUserUsername),
    where("following", "array-contains", profileUserId)
  );
  const intermediateResult = await getDocs(q);

  const [response = null] = intermediateResult?.docs?.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response;
};

export const toggleFollow = async (
  isFollowingfProfile,
  profileDocId,
  profileUserId,
  currentUserDocId,
  currentUserId
) => {
  await updateCurrentUserFollowing(
    profileUserId,
    currentUserDocId,
    isFollowingfProfile
  ); //* update current user profile following
  await updateFollowedUserFollowers(
    profileDocId,
    currentUserId,
    isFollowingfProfile
  ); //* update profile users profle followers
};
