db.firstnames.find()

/*---
firstnames collection loaded with json data from firstnames.json
example: 
{ 
    "_id" : ObjectId("5f8d59d02bf41c40efb7b6c1"), 
    "firstname" : "Aaron", 
    "region" : "Brussel", 
    "year" : 2001, 
    "amount" : 9
}
--- */


//1 Give per region the total number of children born between 2000 and 2004 (limits included)
//[(Brussel,23282), (Vlaanderen,129239), (Wallonie,82910)]
db.firstnames.mapReduce(
    function () { if (this.year >= 2000 && this.year <= 2004) emit(this.region, this.amount) },
    function (k, v) { return Array.sum(v) },
    { out: "temp" }
).find().sort({ _id: 1 })

db.temp.drop()


//2 Give the total number of times that Thomas was born throughout Belgium each year
//[(1995,1046), (1996,1132), (1997,1157), (1998,1044), (1999,966), (2000,1041), (2001,997), (2002,907), (2003,720), (2004,708)]
db.firstnames.mapReduce(
    function () { if (this.firstname == "Thomas") emit(this.year, this.amount) },
    function (k, v) { return Array.sum(v) },
    { out: "temp" }
).find().sort({ _id: 1 })

db.temp.drop()

//3 Give the top 10 of firstnames for the year 1995 throughout Belgium. There is sorting from more to less popular.
db.firstnames.mapReduce(
    function () { if (this.year == 1995) emit(this.firstname, this.amount) },
    function (k, v) { return Array.sum(v) },
    { out: "temp" }
).find().sort({ value: -1 })

db.temp.drop()

//4 Give the most popular firstname for every year throughout Belgium
//[(1995,(Thomas,1046)), (1996,(Thomas,1132)), (1997,(Thomas,1157)), (1998,(Thomas,1044)),
//(1999,(Thomas,966)), (2000,(Thomas,1041)), (2001,(Thomas,997)), (2002,(Thomas,907)),
//(2003,(Thomas,720)), (2004,(Noah,724))]

db.firstnames.mapReduce(
    function () { emit({name: this.firstname, year: this.year}, this.amount) },
    function (k, v) { return Array.sum(v) },
    { out: "temp" }
) //first get the number of people per firstname, per year, over all regions

db.temp.mapReduce(
    function () { emit(this._id.year, {name: this._id.name, amount: this.value}) },
    function (k, v) {
        return v.reduce(
            (result, current) => (current.amount > result.amount ? current : result), //get the most popular name-amount combo
            {name: "", amount: 0}
        ) },
    { out: "temp2"}
).find().sort({ _id: 1 })

db.temp.drop()
db.temp2.drop()


//5 Give the firstnames that were given between 40 and 50 times to new born baby boys between the
//years 1995 and 2004 (limits included) in Belgium. The output looks like this:
//[(César,50), (Mick,50), (Yentel,50), (Basil,50), (Chesney,50), (Lance,49), (Jorgen,49), (Célestin,49),
//(Matis,48), (Harry,48), (Billy,48), (Eray,48), (Soulaimane,47), (Lucca,47), (Timothé,47), (Gianluca,47),
//(Kelvin,47), (Rhune,46), … ]
db.firstnames.mapReduce( //first get the number of people per firstname, per year, over all regions, between 1995 and 2004
    function () { if(this.year >= 1995 && this.year <=2004) emit(this.firstname, this.amount) },
    function (k, v) { return Array.sum(v) },
    { out: "temp" }
    //first get the number of people per firstname, per year, over all regions, between 1995 and 2004
)
.find({value: {$gte: 40, $lte: 50}}).sort({value:-1}) //then filter by the amount

db.temp.drop()
