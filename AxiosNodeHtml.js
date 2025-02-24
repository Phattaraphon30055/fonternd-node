const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

//const base_url = "http://localhost:4091";
const base_url = "http://node75878-env-6349498.proen.app.ruk-com.cloud:11822/";

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ให้ Express เสิร์ฟไฟล์ Static
app.use(express.static(__dirname + '/public'));

// หน้าแรก แสดงรายการหนังสือทั้งหมด
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books", { books: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

// ดูรายละเอียดหนังสือ
app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: response.data }); // ✅ แก้เป็น book
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

// แสดงหน้าเพิ่มหนังสือใหม่
app.get("/create", (req, res) => {
    res.render("create");
});

// บันทึกหนังสือใหม่ลงฐานข้อมูล
app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

// แสดงหน้าแก้ไขหนังสือ
app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

// อัปเดตหนังสือ
app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

// ลบหนังสือ
app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }
});

// เปิดเซิร์ฟเวอร์ที่พอร์ต 5500
app.listen(5500, () => {
    console.log(`App running at http://localhost:5500`);
});
