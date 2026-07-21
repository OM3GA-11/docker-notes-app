const express = require("express");
const noteRoutes = require("./routes/note.routes");
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
    }
));

app.use("/notes",noteRoutes);

module.exports = app;