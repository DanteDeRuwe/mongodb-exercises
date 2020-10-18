use exercises

db.laptops.insert({ name: 'Acer Aspire F5-573G-57GD', price: 749, properties: { processor: 'Intel Core i5', RAM: '8GB', HD: '650GB', OS: 'Windows 10', USB: { USB2_0: 0, USB3_0: 2, USB3_1: 1 } }, LanguageOS: ['Dutch', 'French', 'English'], reviews: [{ by: 'Aline', score: 4, text: 'Very well' }, { by: 'Me', score: 3.5, text: 'Compact' }] })

db.laptops.insert({ name: 'HP Pavilion 17-g101nd', price: 534, properties: { processor: 'Intel Pentium N3700', RAM: '4GB', HD: '1000GB', HDSpeed: 5400, OS: 'Windows 10', displayType: 'Shiny', USB: { USB2_0: 0, USB3_0: 3 } }, LanguageOS: ['Dutch', 'French', 'English', 'German'], networkConnections: ['bluetooth', 'wi-fi', 'ethernet'], reviews: [{ by: 'Melanie', score: 4.3, text: 'Very good' }, { by: 'Eric', score: 4.5, text: 'Nice' }] })

db.laptops.insert({ name: 'Apple MacBook Pro Retina', price: 1359, properties: { processor: 'Intel Core i5', RAM: '8GB', clockSpeed: '2.3 GHz', HD: '850GB', OS: 'Mac OS X 10.11', USB: { USB2_0: 0, USB3_0: 2, USB3_0: 0 } }, LanguageOS: ['Dutch', 'French'], software: ['iMovie', 'GarageBand', 'iBooks', 'Safari', 'FaceTime'], reviews: [{ by: 'Tom', score: 4.4, text: 'Superb' }] })

// 1 Give all laptops with a price between 500 and 1000 euro or with a hard disk of 750 GB
db.laptops.find({
    $or: [
        { price: { $gte: 500, $lte: 1000 } },
        { "properties.HD": "750GB" }
    ]
})

// 2 Change Windows 10 to Windows 8
db.laptops.updateMany({"properties.OS": "Windows 10"}, {$set: {"properties.OS": "Windows 8"}})

// 3 Give name, price and operating system of the 2 cheapest laptops
db.laptops.find({},{name:true, price: true, "properties.OS": true}).sort({price: 1}).limit(2)

// 4 Give all laptops with at least 1 review with a score between 4 and 4.2
db.laptops.find({"reviews.score": {$gte: 4, $lte: 4.2}})

// 5 Give all laptops with 2 USB 3_0 ports and that support at least 2 languages including Dutch 
db.laptops.find({
    $and: [
    {"properties.USB.USB3_0": 2},
    {$where: "this.LanguageOS.length >= 2"},
    {LanguageOS: "Dutch"}
    ]
})






