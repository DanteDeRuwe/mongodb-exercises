use exercises

db.users.insert({ _id: "jane", joined: ISODate("2011-03-02"), likes: ["golf", "racquetball"] })
db.users.insert({ _id: "joe", joined: ISODate("2012-07-02"), likes: ["tennis", "golf", "swimming"] })
db.users.insert({ _id: "jill", joined: ISODate("2012-09-02"), likes: ["golf", "racquetball"] })
db.users.insert({ _id: "ruth", joined: ISODate("2011-01-12"), likes: ["swimmig", "golf", "racquetball"] })
db.users.insert({ _id: "kate", joined: ISODate("2012-01-23"), likes: ["tennis", "darts"] })
db.users.insert({ _id: "harold", joined: ISODate("2012-01-15"), likes: ["golf", "basketball", "darts", "tennis"] })

// 1 normalize usernames: in upper case and in alphabetical order
db.users.aggregate([
    { $project: { name: { $toUpper: "$_id" }, _id: false } },
    { $sort: { name: 1 } }
])


// 2 Return usernames ordered by join month
db.users.aggregate([
    { $project: { name: "$_id", join_month: { $month: "$joined" }, _id: false } },
    { $sort: { join_month: 1 } }
])

// 3 Return Total Number of Joins per month, sorted by ascending month
db.users.aggregate([
    { $project: { name: "$_id", join_month: { $month: "$joined" }, _id: false } }, //get join month per user
    { $group: { _id: "$join_month", count: { $sum: 1 } } }, //group by join month
    { $sort: { _id: 1 } }, //sort by month
    { $project: { month: "$_id", numberOfUsersJoined: "$count", _id: false } } //format output
])


// 4 Return the Five Most Common “Likes”
db.users.aggregate([
    { $unwind: "$likes" }, //unwind an array: creates a document per array item, with the other fields being "duplicated" across them all
    { $group: { _id: "$likes", count: { $sum: 1 } } }, //group by likes and keep score
    { $sort: { count: -1 } }, //sort by likes
    { $limit: 5 }, //top 5
    { $project: { like: "$_id", numberOfUsersLiked: "$count", _id: false } } //format output
])
