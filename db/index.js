const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/book', {
        useNewUrlParser: true
    }).then((result) => {
        console.log('数据库连接成功');
    }).catch((err) => {
       console.log(err); 
    });
}