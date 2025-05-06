let express = require('express');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());


app.get('/', (req, res) => { 
    res.send('Hello World!'); 
    //connect to frontend
    // res.sendFile('/../' + 'frontend/index.html');
})

app.get('/login', (req, res) => {
    res.send('Login Page');
    
})

app.post('/login/:id', (req, res) => {
    // Handle login logic here
    let currentID = req.params.id;
    console.log("This is my ID: rs"+currentID);

    res.send({status:1, msg:"Login successful"})
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);