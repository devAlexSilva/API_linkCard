const express = require('express');
const  mongoose  = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0bzor.mongodb.net/app?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(process.env.DB_PORT);
    console.log('conecatado ao db');
})
.catch(()=>{
    console.log('falha ao conectar no db');
});


try {
    app.get('/', (req, res) => {
        res.status(200).json({
            ok: "rota inicial na porta 4000"
        })
    });
} catch (err) {
    console.log('erro no express', err);
}


require('./controllers/createUser')(app);
require('./controllers/controllersUser')(app);
require('./controllers/authenticate/tokenLogin')(app);
