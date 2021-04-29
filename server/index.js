require('dotenv').config(); //для восприятия .env

const express = require('express');
const sequelize = require('./db/db');
const cors = require('cors');
const models = require('./models/models');

const PORT = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'message'});
})

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