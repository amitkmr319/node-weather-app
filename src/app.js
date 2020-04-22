const geoCode = require('./utils/geoCode.js')
const foreCast = require('./utils/foreCast.js')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

//Define paths for express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather',
        name: 'Amit Kumar'
    })
}
)
app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About me',
        name: 'Amit Kumar'
    })
}
)
app.get('/help', (req, res) =>
{
    res.render('help', {
        helptext: 'Dynamic help page',
        title: 'Help',
        name: 'Amit Kumar'
    })
}
)

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.render('weather', {
//             error: 'Please provide an address',
//             title: 'Weather forecast',
//             name: 'Amit Kumar'
//         })
//     }
//     geoCode
//         (req.query.address, (error,
//             { longitude, latitude, location } = {}) => {
//             if (error) {
//                 return res.render('weather', {
//                     error: 'Can not fetch data - geoCode.',
//                     title: 'Weather forecast',
//                     name: 'Amit Kumar'
//                 })
//             }
//             foreCast(latitude, longitude, (error, dataOne) => {
//                 if (error) {
//                     return res.render('weather', {
//                         error: 'Can not fetch data - forecast.',
//                         title: 'Weather forecast',
//                         name: 'Amit Kumar'
//                     })
//                 }
//                 return res.render('weather', {
//                     forecast: dataOne,
//                     location,
//                     //address: req.query.address,
//                     title: 'Weather forecast',
//                     name: 'Amit Kumar'
//                 });
//             }
//             )
//         }
//         )
// }
// )

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address',
        })
    }
    geoCode
        (req.query.address, (error,
            { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: 'Can not fetch data - geoCode.'
                })
            }
            foreCast(latitude, longitude, (error, dataOne) => {
                if (error) {
                    return res.send({
                        error: 'Can not fetch data - forecast.',
                    })
                }
                return res.send({
                    forecast: dataOne,
                    location,
                    //address: req.query.address,
                });
            }
            )
        }
        )
}
)

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 'Error 404',
        name: 'Amit Kumar'
    })
}
)

// app.get('/weather', (req, res) =>
// {
//     if (!req.query.address)
//     {
//         return res.send({ error: `Please provide an address` })
//     }
//     geoCode
//         (req.query.address, (error,
//             { longitude, latitude, location }) =>
//         {
//             if (error) {
//                 return res.send({ error })
//             }
//             foreCast(latitude, longitude, (error, dataOne) =>
//             {
//                 if (error) {
//                 return res.send({ error })
//                 }
//             return res.send({
//                 forecast: dataOne,
//                 location,
//                 address: req.query.address
//             });
//             }
//             )
//         }
//     )
// }
// )

app.get('*', (req, res) =>
{
    res.render('404',{
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Amit Kumar',
    })
}
)


app.listen(3000, ()=> {console.log('Server is ON.')})