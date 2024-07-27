const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");

//ดูข้อมูลทั้งหมดที่เราเพิ่ม
router.get("/list/:userid", async function (req, res) {
  var notes = await Note.find({ userid: req.params.userid });
  res.json(notes);
});
//เพิ่มข้อมูล
router.post("/add", async function (req, res) {
  // newNote คือ สร้างข้อมูลขึ้นมาและต้องsave() ด้วยนะ
  const newNote = new Note({
    id: req.body.id,
    userid: req.body.userid,
    title: req.body.title,
    content: req.body.content,
  });
  await newNote.save();

  //หลังทำเสร็จก็ให้มันส่งข้อความกลับมาสักหน่อย
  const response = {
    message: "New Note Created with id: "+ req.body.id,
  };
  res.json(response);
});

//อัพเดตข้อมูล
router.put("/update", async function (req, res) {
  var updateNote = await Note.findOneAndUpdate(
    { id: req.body.id }, //เงื่อนไขที่มันจะมองหา
    { title: req.body.title, content: req.body.content },
    { new: true } // Return การอัพเดตข้อมูล
  );
  const response = {
    message: "Note has been updated with id : "+ req.body.id,
    note: updateNote,
  };
  res.json(response);
});


router.delete("/delete", async function (req, res) {
  //เงื่อนไขในการลบข้อมูลมองหาIDที่ตรงกัน
  var deleteNote = await Note.deleteOne({ id: req.body.id });
  var response = {
    massage: "Note has been deleted with id : "+ req.body.id,
    note: deleteNote,
  };
  res.json(response);
});

module.exports = router;
