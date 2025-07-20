
// 1. Identify at least two problems (bugs or performance issues) here.
// SOLUTION:
// Problem 1: Sorting occurs in memory after fetching all posts
// The line posts.sort((a, b) => b.created - a.created); sorts the posts in
//  memory after fetching them from the database, which is inefficient. Sorting a 
//  large number of posts in memory can cause performance issues, especially when there are many posts.

// Problem 2: Potential duplicates in the result
// The code does not include any mechanism for preventing or handling duplicate posts.
// If the database query somehow fetches duplicate posts due to improper indexing or joins,
// they would still be included in the result.





//2. Propose correction
// Fix 1: Perform sorting at the database level 
//Instead of fetching all the posts and sorting them in memory, 
//we can modify the query to sort posts directly in the database using MongoDB's sort() function,
//  which is much more efficient.
async function getSortedPosts(req, res) {
  const posts = await Posts.find().sort({ created: -1 });  
  res.json(posts);
}


// Fix 2: Handle duplicates

//  If the posts model has a unique identifier (_id), MongoDB should prevent duplicate entries by design.
//  If duplicates do exist due to potential issues (e.g., invalid queries),
//  we can remove them after fetching
async function getSortedPosts(req, res) {
  const posts = await Posts.find().sort({ created: -1 }).distinct('_id');  
  res.json(posts);
}

