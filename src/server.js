//express เอาไว้สร้าง API ในเว็บเรา
const express = require("express");
const app = express();

//mongoose เชื่อมต่อกับ Database ที่เราอยากเชื่อม ส่วนผมเลือกใช้ mongoDB
const mongoose = require("mongoose");
const Note = require("./models/Notes");

//มันทำให้อ่านข้อมูลดิบได้ง่ายขึ้น(Optional)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//เชื่อมต่อกับDatabase MongoDB
mongoose
  .connect(
    "mongodb+srv://pathack12345:soulpat1234@cluster0.qt0zsfl.mongodb.net/nodesdb"
  )
  .then(function () {
    //หน้าแรกแสดงข้อความสักหน่อย
    app.get("/", function (req, res) {
  
      res.json({
        message:"Service เราทำงานปกติจร้าาาา"
      });
    });
    
    // service ทั้งหมดจะอยู่ใน router/note.js นะครับ และเราก็ใช้package routeมาที่ไฟล์server.jsเราทำแบบนี้ทำให้code clean ขึ้น localhost:3000/notes/เซอร์วิส
    const noteRouter = require('./routes/Note');
    app.use('/notes',noteRouter); 


  });

//สร้างตัวแปรPortไว้ เดี๋ยวเราซนเชื่อมโน้นนี่นั้นจะได้แก้ง่ายๆ
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at PORT: "+ PORT);
});
