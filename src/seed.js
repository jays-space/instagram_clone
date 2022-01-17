export async function seedDatabase(db, collection, addDoc) {
  const users = [
    {
      userId: "igPUAuFMzmO7979l3nFdctDR3Ph2",
      username: "jays_space",
      fullName: "Jay Mondlana",
      emailAddress: "contact.jays.space@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["igPUAuFMzmO7979l3nFdctDR3Ph2"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["igPUAuFMzmO7979l3nFdctDR3Ph2"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["igPUAuFMzmO7979l3nFdctDR3Ph2"],
      dateCreated: Date.now(),
    },
  ];

  // add users
  // for (let k = 0; k < users.length; k++) {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), users[k]);
  //     console.log(`User ${k} written with ID: ${docRef.id}`);
  //   } catch (error) {
  //     console.error(`Error adding user: ${k} `, error.message);
  //   }
  // }

  //  add photo posts
  for (let i = 1; i <= 13; ++i) {
    try {
      const docRef = await addDoc(collection(db, "photos"), {
        photoId: i,
        userId: "igPUAuFMzmO7979l3nFdctDR3Ph2",
        imageSrc: `/images/users/jay/${i}.jpg`,
        caption: "jays space",
        likes: [],
        comments: [],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now(),
      });
      console.log(`Photo ${i} written with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding photo: ${i} `, error.message);
    }
  }
}
