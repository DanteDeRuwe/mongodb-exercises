
/* ---
nyse collection loaded with data from nyse.json

example:
{ 
    "_id" : ObjectId("5f8d50cf2bf41c40efab4edc"), 
    "stock_symbol" : "ASP", 
    "date" : "37256", 
    "stock_price_open" : 12.55, 
    "stock_price_high" : 12.8, 
    "stock_price_low" : 12.42, 
    "stock_price_close" : 12.8, 
    "stock_volume" : 11300
}
--- */

//1 Calculate the number of entries for each stock_symbol
db.nyse.mapReduce(
    function(){ emit(this.stock_symbol, 1)},
    function(k,v){ return Array.sum(v) },
    {out: "temp"}
).find().sort({_id:1})

db.temp.drop()


//2 Calculate the maximum stock_price_close for each stock_symbol
db.nyse.mapReduce(
    function(){ emit(this.stock_symbol, this.stock_price_close)},
    function(k,v){ return Math.max(...v) }, //spread operator!
    {out: "temp"}
).find().sort({_id:1})

db.temp.drop()

// 3 Calculate the maximum stock_price_close and the date on which this 
// stock_price_close was reached, for each stock_symbol
db.nyse.mapReduce(
    function(){ emit(this.stock_symbol, {priceClose: this.stock_price_close, date: this.date})}, //emit tuple of values
    function(k,v){ 
        return v.reduce( // use js reduce
            (result, current) => (current.priceClose > result.priceClose ? current : result), //update the result with the current value if priceclose is higher 
            {priceClose: 0, date: new Date()} //initial value
        )
    },
    {out: "temp"}
).find().sort({_id:1})

db.temp.drop()
