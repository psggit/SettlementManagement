const express = require("express")
const path = require("path")
const app = express()

// app.use((req, res, next) => {
//   if(req) 
//   next()
// })

app.get("*.pdf", (req, res) => {
  res.sendFile(path.join(__dirname, `pdf/${req.url.split("/")[2]}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/images/:name', (req, res) => {
  res.sendFile(path.join(__dirname, `images/${req.params.name}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// app.get('*.js', function (req, res, next) {
//   console.log("js", req.url)
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.use(express.static(path.join(__dirname, "dist")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//Binding the server to a port(3000)
app.listen(8080,()=>console.log("express server started at the  port 8080"))