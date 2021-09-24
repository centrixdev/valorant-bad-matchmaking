const express = require('express')
const app = express()
var axios = require('axios');
const { name } = require('ejs');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/results/', ({body},res) => {
    var config = {
        method: 'get',
        url: `https://api.henrikdev.xyz/valorant/v3/matches/eu/${body.name}/${body.tag}?filter=competitive`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
          var amount = 0
        response.data.data.forEach(match => {
            var playerStats = []
            match.players.all_players.forEach(player => {
                playerStats.push({
                    name: player.name,
                    team: player.team,
                    kills: player.stats.kills
                })
            })
            const op = playerStats.find(player => player.name === body.name);

            if(playerStats[8].team && playerStats[9].team === op.team) {
                amount++
            } 
            // matchStats.push(playerStats.sort(({kills:a}, {kills:b}) => b-a));

        })

            res.render('result', { amount: amount.toString() })

      })
      .catch(function (error) {
        console.log(error);
      });
      

})

app.listen(process.env.PORT || 5000, () => {
    console.log('Up and Running')
});