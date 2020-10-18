use exercises

db.cheeses.insert({ factory: 'Belgomilk', name: 'Brugge', properties: { taste: 'Salty', cheesetype: 'hard cheese' }, variants: ['Brugge Oud', 'Brugge Blomme', 'Brugge Belegen'], comments: [{ by: 'Aline', score: 8.5, text: 'Very fine' }, { by: 'Thomas', score: 7.5, text: 'Very tasteful' }] });
db.cheeses.insert({ factory: 'Lindenhof', name: 'Affligem', properties: { taste: 'Soft', cheesetype: 'abbeycheese' }, variants: ['Affligem Traditie', 'Affligem Jong belegen'], comments: [{ by: 'Albert', score: 9, text: 'Very good choice' }, { by: 'Thamara', score: 7.5, text: 'Positif' }] });
db.cheeses.insert({ factory: 'Belgomilk', name: 'Nazareth', properties: { taste: 'Soft', cheesetype: 'hard cheese' }, variants: ['Nazareth Classic', 'Nazareth Light'], comments: [{ by: 'Ellen', score: 4, text: 'Not nice' }, { by: 'Kjell', score: 7.5, text: 'Nice' }, { by: 'Kristel', score: 6, text: 'Delicious' }] });
db.cheeses.insert({ factory: 'Lindenhof', name: 'Grimbergen', properties: { taste: 'Soft', cheesetype: 'abbeycheese' }, variants: ['Grimbergen Grand Cru'], comments: [{ by: 'Katrien', score: 6.5, text: 'Good choice' }, { by: 'Martine', score: 7, text: 'Very tasteful' }] });

//1 Specify the number of cheeses per cheesetype. Put the cheesetype in capital letters.
db.cheeses.aggregate([
    { $project: { type: "$properties.cheesetype", _id: false } }, //project to only cheesetype
    { $group: { _id: "$type", count: { $sum: 1 } } }, //group by
    { $project: { cheesetype: { $toUpper: "$_id" }, numberOfCheeses: "$count", _id: false } } //format
])

//2 Give the number of cheeses per cheese factory with at least 2 variants.
db.cheeses.aggregate([
    //{$match: { $where: "this.variants.length>=2"} } $WHERE CANNOT BE IN $MATCH ! https://docs.mongodb.com/manual/reference/operator/aggregation/match/#restrictions
    { $project: { factory: true, variants: true, name: true, _id: false } },
    { $unwind: "$variants" },
    { $group: { _id: { factory: "$factory", cheese: "$name" }, numberOfVariantsPerFactoryPerCheese: { $sum: 1 } } },
    { $match: { numberOfVariantsPerFactoryPerCheese: { $gte: 2 } } },
    { $group: { _id: "$_id.factory", numberOfCheesesWithAtLeast2Variants: { $sum: 1 } } },
])
