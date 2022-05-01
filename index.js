const express = require('express');
const errorHandler = require('./src/middlewares/errorHandler');
const loginRouter = require('./src/routes/login.routes');
const userRouter = require('./src/routes/user.routes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
