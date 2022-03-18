require('dotenv').config()

const express = require('express')
const res = require('express/lib/response')
const hbs = require('hbs')

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
})
  
  // Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))

spotifyApi
    .searchArtists()
    .then(data => {
      console.log('The received data from the API: ', data.body);
      res.render('/artist-search-resutls', data)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
// Our routes go here:

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/artist-search-results')

app.listen(5000, () => console.log('My Spotify project running on port 5000 🎧 🥁 🎸 🔊'))
