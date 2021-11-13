const express = require('express');
const  mongoose  = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0bzor.mongodb.net/app?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(process.env.PORT || 4000);
    console.log('conecatado ao db');
})
.catch(()=>{
    console.log('falha ao conectar no db');
});


try {
    app.get('/', (req, res) => {
        res.status(200).json({
            docsIn: "https://api-card-task/docs.herokuapp.com"
        })
    });
} catch (err) {
    console.log('erro ', err);
}


require('./controllers/createUser')(app);
require('./controllers/controllersUser')(app);
require('./controllers/authenticate/tokenLogin')(app);
require('./controllers/controllersLink')(app);
