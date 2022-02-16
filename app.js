require("dotenv").config()

const Express = require('express');
const app = Express();

const controllers = require('./controllers');
const dbConnection = require('./db');
const middleware = require('./middleware');

const bcrypt = require("bcryptjs");

app.use(Express.json());

app.use(middleware.CORS)

app.use("/user", controllers.userController);
app.use('/car', controllers.carController);

//TODO ADD our Cars Info Controller here


dbConnection.authenticate()
.then(()=> dbConnection.sync(  ))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[server]: app.js is listening on 3000`)
    })
})
.catch((err) => console.log(err))



//  app.get
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     })
//   })

// app.listen(3000, () => {
//     console.log(`[Server]: App is listening on 3000.`);
// });