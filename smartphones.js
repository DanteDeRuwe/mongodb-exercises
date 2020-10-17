use exercises

db.smartphones.insert({ name: 'Samsung Galaxy S7', price: 645, system: { os: 'Android 6.0', processor: 'EQualcomm MSM8996 Snapdragon 820', screensize: 5.1, screen: 'Super Amoled', storageCapacity: '32GB', batteryCapacity: '3000 mAh' }, organizer: ['Agenda', 'Contact persons', 'Phonebook', 'Tasks', 'Calculator', 'Call list', 'Clock'], properties: ['voice control', 'fingerprint scanner', 'heart rate monitor', 'barometer'], review: [{ by: 'Alex', stars: 4, text: 'Super' }, { by: 'El pico', stars: 5, text: 'Very fast' }] })

db.smartphones.insert({ name: 'Samsung Galaxy A5', price: 320, system: { os: 'Android 5.1', processor: '1.6 GHz Octa-Core', screensize: 5.2, batteryCapacity: '3000 mAh' }, organizer: ['Agenda', 'Contact persons', 'Phonebook', 'Clock'], properties: ['voice control', 'fingerprint scanner'], reviews: [{ by: 'Stefan', stars: 4, text: 'Very good' }, { by: 'Emiel', starts: 4, text: 'No problems' }] })

db.smartphones.insert({ name: 'Apple iPhone SE 64GB', price: 549, system: { os: 'iOS 9', processor: 'Quad core (4)', screensize: 4 }, organizer: ['Agenda', 'Phonebook', 'Tasks', 'Calculator', 'Call list'], reviews: [{ by: 'Paul', stars: 5, text: 'Good quality' }] })

db.smartphones.find()

// 1 Give all smartphones with a price between 400 and 700 euro
db.smartphones.find({ price: { $gt: 400, $lt: 700 } })

//2 Give all smartphones with Android as operating system
db.smartphones.find({ "system.os": /.*android.*/i })

//3 Give name, price and reviews of the most expensive smartphone
db.smartphones.find({}, { name: 1, price: 1, review: 1 }).sort({ price: -1 }).limit(1)

//4 Add to the Apple iPhone the field ‘wifi’ with the following values: 802.11b, 802.11g, 802.11n
db.smartphones.updateOne({ name: /.*iPhone.*/i }, { $set: { wifi: ["802.11b", "802.11g", "802.11n"] } })

//5 Give all smartphones with a phonebook and a clock, but no call list or calculator in the organizer
db.smartphones.find({
    $and: [
        { organizer: { $in: ["Phonebook", "Clock"]}},
        { organizer: { $nin: "Call list", "Calculator"]}}
    ]
})
