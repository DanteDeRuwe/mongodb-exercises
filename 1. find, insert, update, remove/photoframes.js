use exercises

db.photoframes.drop()

db.photoframes.insert({ name: 'Proline PL-DPF707 Black', price: 29, properties: { screensize: 17.2, compatibility: 'JPEG', power: 'AC', contrastratio: '400:1' }, memorycard: ['SD', 'MMC', 'MS'], reviews: [{ by: 'Aline', score: 4, text: 'Very good' }, { by: 'Anita', score: 4.5, text: 'Excellent price/quality' }] })

db.photoframes.insert({ name: 'PHILIPS SPF 1208/10', price: 69, properties: { screensize: 20.32, compatibility: 'JPEG', power: 'AC', contrastratio: '500:1' }, memorycard: ['CF', 'SD', 'SDHC', 'MMC', 'xD', 'MS'], reviews: [{ by: 'MS', score: 4.5, text: 'Easy to use' }, { by: 'Ani', score: 4.2, text: 'Nice design' }] })

db.photoframes.insert({ name: 'TELEFUNKEN DPF 9323', price: 99, properties: { screensize: 20.3, compatibility: 'JPEG', power: 'AC', contrastratio: '500:1' }, memorycard: ['SD', 'SDHC', 'MMC', 'xD', 'Memory card'], reviews: [{ by: 'Alex', score: 4.6, text: 'Super product' }] })

db.photoframes.find({})

// 1 Give all photoframes with a price lower than 50 euro or with a screensize smaller then 20
db.photoframes.find({
    $or: [
        { price: { $lt: 50 } },
        { "properties.screensize": { $lt: 20 } }
    ]
})

// 2 Give name, price and screensize of the second cheapest photoframe
db.photoframes.find(
    {}, { name: true, price: true, "properties.screensize": true }
).sort({price: 1}).skip(1).limit(1)

// 3 Give all photoframes with 2 or more reviews
db.photoframes.find({$where: "this.reviews.length >=2"})

// 4 Give all photoframes that can handle memorycards of type SDHC, MMC, xD, but can’t handle memorycards of type MS or CF
db.photoframes.find({
    $and: [
        {memorycard: {$in: ["SDHC", "MMC"]}},
        {memorycard: {$nin: ["MS", "CF"]}}
    ]
})

// 5 Add the remark ‘Not available’ to all the photoframes with a contrastratio different from 500:1, 600:1 or 700:1
db.photoframes.updateMany(
    {"properties.contrastratio": {$nin: ["500:1", "600:1", "700:1"]}},
    {$set: {remark: "Not available"}}
)