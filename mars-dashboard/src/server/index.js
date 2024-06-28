require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

/* API calls to get information about a given Rover and photos on most recent date availabile */
app.get('/roverinfo/:roverName', async (req, res) => {
    try {
        const roverInfoRaw = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.params.roverName}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        const roverInfo = {
            "name": roverInfoRaw.photo_manifest.name,
            "landing_date": roverInfoRaw.photo_manifest.landing_date,
            "launch_date": roverInfoRaw.photo_manifest.launch_date,
            "max_date": roverInfoRaw.photo_manifest.max_date,
            "status": roverInfoRaw.photo_manifest.status
        };

        const roverPhotosRaw = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.roverName}/photos?earth_date=${roverInfo.max_date}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        console.log(roverPhotosRaw);
        const roverPhotos = roverPhotosRaw.photos.map(photo => {
            return {
                "img_src": photo.img_src,
                "earth_date": photo.earth_date,
                "camera_name": photo.camera.full_name
            }
        });

        roverInfo.photos = roverPhotos;

        res.send(roverInfo);
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))