// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//載入外部檔案
const restList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 靜態檔案
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { rests: restList.results })  //把資料傳入 index 檔
})

app.get('/restaurants/:rest_id', (req, res) => {
  const one = restList.results.find(rest => rest.id.toString() === req.params.rest_id)
  res.render('show', { rest: one })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search_results = restList.results.filter(rest => {
    return rest.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { rests: search_results, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})