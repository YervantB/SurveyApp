const express = require('express');
const app = express();

app.get('/', (req,res) => {
    console.log(req.url + ":" + req.method);
    res.send({hi: 'there'});
} );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server running on port 5000");
});