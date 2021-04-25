// require는 NodeJS에서 사용되고 있는 CommonJS 키워드
// import express from 'express'
// 위와같은 방식은 ES6에서 새로 도입된 키워드이고,
// 아래와 같은 방식이 CommonJS의 방식이다.
// 동작은 같으나 ES6 모듈 시스템이 import, from, export, default처럼 모듈관리 전용 키워드를 사용하기 때문에
// 가독성이 훨씬 좋다고 판단 할 수 있고, 모듈에서 실제로 쓰이는 부분만 가져올 수 있기 때문에 성능과 메모리부분에서 유리한 측면.
// 뿐만아니라 Naemd parameter와 같은 CommonsJS에서는 지원하지 않는 기능이 존재.
// 본파일에서는 Node.js의 문법을 따르므로 CommonJS 방식을 따른다.
const express = require('express');
const app = express();
const port = 5000;

// bodyParser를 통해 req바디의 정보를 json형태로 받아들일수있게해준다.
const bodyParser = require('body-parser');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = require('./config/key');
const mongoose = require('mongoose');
// mongoose.connect(String url, {options})
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    // useNewUrlParser : Set to true to opt in to the MongoDB driver's new URL parser logic.
    // useUnifiedTopology : Set to true to opt in to the MongoDB driver's replica set and sharded cluster monitoring engine.
    // useCreateIndex : If true, this connection will use createIndex() instead of ensureIndex() for automatic index builds via Model.init().
    // useFindAndModify : Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
}).then(() => console.log('MongoDB Connected...'))// 성공시
  .catch(err => console.log(err));// 실패시

// app.get(path, callback [, callback ...])
// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/', (req,res) => res.send('Hello World'));



app.post('/register', (req, res) => {
  // 회원 가입 할 때, 필요한 정보를 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err});

    return res.status(200).json({
      success: true
    });
  });
});


// app.listen(path, [callback])
// Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().
app.listen(port, () => console.log(`Example app listening on poort ${port}!`))

