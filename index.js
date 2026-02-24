const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('HELLO ELLLLLLLL');
});
app.get('/say/:greeting', (req, res) => {
    const greeting = req.params.greeting;
    res.send(greeting);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});