import express from "express";
import { json } from "express";
import { PORT } from "./env.js";
import cors from "cors";


const app = express();
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hell11")
})

app.listen(PORT, () => {
    console.log(`App is running in PORT ${PORT}`);
});

