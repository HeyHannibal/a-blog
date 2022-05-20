const index = require("./routes/index");

const supertest = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

const request = supertest("http://localhost:3001")

request
  .get("/article")
  .expect("Content-Type", /json/)
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    let response = JSON.parse(res.body)
    console.log(response);
  });


request
  .post("/auth/login")
  .send({'username':'ffffff', 'password': 'ffffff'})
  .expect(200)
  .expect("Content-Type", /json/)
  .end((err, res) => {
      if(err) throw err;
      console.log(res.body);
  })

request
.post("/auth/login")
.send(JSON.stringify({'username':'fff'}))
.expect(403)
.end((err, res) => {
    if(err) throw err;
    console.log(res.body);
})