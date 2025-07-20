import { ObjectId, Db } from "mongodb";

interface PostWithAuthor {
  content: string;
  createdAt: Date;
  authorName: string;
}

export async function getRecentFollowingsPosts(
  db: Db,
  userId: string
): Promise<PostWithAuthor[]> {
  const userObjectId = new ObjectId(userId);

  const pipeline = [
    // Match all followings of the user
    { $match: { followerId: userObjectId } },

    // Join with posts made by those followings
    {
      $lookup: {
        from: "posts",
        localField: "followingId",
        foreignField: "authorId",
        as: "posts"
      }
    },

    { $unwind: "$posts" },

    // Join with users collection to get author's name
    {
      $lookup: {
        from: "users",
        localField: "posts.authorId",
        foreignField: "_id",
        as: "author"
      }
    },

    { $unwind: "$author" },

    // Select required fields
    {
      $project: {
        _id: 0,
        content: "$posts.content",
        createdAt: "$posts.createdAt",
        authorName: "$author.name"
      }
    },

    // Sort newest → oldest and limit to 10
    { $sort: { createdAt: -1 } },
    { $limit: 10 }
  ];

  return db.collection("follows").aggregate<PostWithAuthor>(pipeline).toArray();
}
