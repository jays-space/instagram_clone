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
  for (let k = 0; k < users.length; k++) {
    try {
      const docRef = await addDoc(collection(db, "users"), users[k]);
      console.log(`User ${k} written with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding user: ${k} `, error.message);
    }
  }

  //  add photo posts
  for (let i = 1; i <= 5; ++i) {
    try {
      const docRef = await addDoc(collection(db, "photos"), {
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: "Saint George and the Dragon",
        likes: [],
        comments: [
          {
            displayName: "dali",
            comment: "Love this place, looks like my animal farm!",
          },
          {
            displayName: "orwell",
            comment: "Would you mind if I used this picture?",
          },
        ],
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
