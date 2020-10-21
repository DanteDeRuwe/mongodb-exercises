use exercises

/*---
tweets collection loaded with json data from tweets.json
{ id: ..., tweet: "example of a #tweet" } 
--- */

// We want to know which hashtags are trending. Make a list of how often each hashtag occurs. There is no
// difference between small letters and capital letters. The list is ordered from high to low. 
db.tweets.mapReduce(
    function () { 
        var words = this.tweet.split(" ")
        var hashtags = words.filter(w=>w.startsWith("#"))
        hashtags.forEach(h => emit(h.toLowerCase(), 1)) //emit each lowercase hashtag with a value of 1
    },
    function (k, v) { return Array.sum(v) }, //sum all the 1s
    { out: "temp" }
).find().sort({value: -1})

db.temp.drop()
