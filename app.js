const Express = require('express');
const app = Express();
const bcrypt = require("bcryptjs");

app.use(Express.json());

app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000.`);
});