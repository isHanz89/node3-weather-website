const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



//1) configuring the Library/Framework
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//customize Express the default is views and change to templates
const viewsPath = path.join(__dirname, '../templates/views') //defined the 'template' path
app.set('views', viewsPath)
app.set('view engine', 'hbs'); // using hbs template dynamic with Express.js

hbs.registerPartials(partialsPath) // registering the folder 'Partials'

// declaring the path using 'path' module from node.js
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


// setup static directory 
app.use(express.static(publicDirectoryPath))

//#region Example of setting the route and sending back a html or Json result
//2) define the route & response
// defining the default route
// app.get() have 2 arg , route and function contain (reqeust, response)
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>') // example of sending HTML 
// })

// Server need to be restart if there is a new route added
// we can use nodemon whenver there a change to restart the server.
// app.get('/help', (req, res) => {
//     res.send([{ name: 'Andrew' }, { name: 'Sara' }]) // example of sending JSON by array or object
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us </h1>')
// })
//#endregion

//Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is help page',
        name: 'Andrew Mead'
    })
})

//JSON EndPoint
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "You must provide address!" })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            //console.log(location)
            //console.log(forecastData)

            const data = {
                forecast: forecastData,
                location,
                address: req.query.address
            }

            res.send(data)
        })
    })

})

//API example
app.get('/products', (req, res) => {

    //Checking the query parameter, the return is used to stop the code from traverse more
    if (!req.query.search) {
        return res.send({ error: 'You must provide search term' })
    }

    //extracting parameter from query property
    console.log(req.query.search)
    res.send({ products: [] })
})


// help 404
app.get('/help/*', (req, res) => {  // 404 error page for sub-pages under 'help'
    // res.send('Help article not found')
    res.render('error', {
        title: '404',
        name: 'Andrew Mead',
        errorMsg: 'Help article not found.'
    })
})


//this is for 404, default route to find non-matching, reason that it should look for last becasue Express will look from top to down for matching route
app.get('*', (req, res) => {
    // res.send("My 404 page")
    res.render('error', {
        title: '404',
        name: 'Andrew Mead',
        errorMsg: 'Page not found.'
    })
})


// app.com -> assuming owning this domain
// app.com/help
// app.com/about

//3) start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})