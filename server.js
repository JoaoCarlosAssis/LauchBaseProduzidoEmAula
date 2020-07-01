const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")
nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/', (req, res)=>{
  const about = {
    avatar_url: "https://avatars1.githubusercontent.com/u/55468179?s=460&u=4ccf1990c407407b786227ec544131009c632cd6&v=4",
    name: "João Carlos",
    role: "Estudante de Desenvolvimento Web",
    description: 'Eprimorando minhas tecnicas de programação com a <a class="linkRocket" href="https://rocketseat.com.br" target="_blank"> RocketSeat',
    links: [
      {name: "Github", url: "https://github.com/JoaoCarlosAssis" },
      {name: "Linkedin", url: "https://www.linkedin.com/in/jo%C3%A3o-carlos-assis/"},
      {name: "Twitter", url: "https://www.linkedin.com/in/jo%C3%A3o-carlos-assis/" }
    ]
  }
  return res.render('about', {about})
})

server.get('/portifolio', (req, res)=>{
  return res.render('portifolio', { items: videos })
})

server.get('/video', function(req, res){
  const id = req.query.id
  const video = videos.find(function(video){
    if (video.id == id){
      return true
    }
  })
    if(!video){
      return res.send('Video not found')
    }
    return res.render("video", {item: video})
  })

server.listen(5000, () =>{
  console.log("runing server")
})