require('dotenv').config(); //для восприятия .env

const express = require('express');
const sequelize = require('./db/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 3000
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);


//Обработка ошибок,крайний
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Подключение к бд
        await sequelize.sync(); //Сверка бд со схемой
        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`);
        })
    }catch (e) {
        console.log(e)
    }
}

start()