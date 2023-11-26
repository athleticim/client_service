const express=require('express');
const app=express();
const userRoutes=require('./routes/userDetails');

app.use(express.json());
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    res.header('Access-Control-Allow-Credentials');
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,' +
        'X-HTTP-Method-Override, Content-Type, Accept,' +
        'x_chord, y_chord, z_chord, d_chord');
    next();
};
app.use(allowCrossDomain);

app.use('/api/user', userRoutes);

module.exports=app;