import express from "express";
import cors from "cors";
import movieRouter from "./routes/movieRouter";
import groupRouter from "./routes/groupRouter";
import userRouter from "./routes/userRouter";
import ticketRouter from "./routes/ticketRouter";

const app = express();

// CORS Policy configuration
app.use(cors());

// Use Express
app.use(express.json());

// Routers
app.use(movieRouter);
app.use(groupRouter);
app.use(userRouter);
app.use(ticketRouter);

app.get("/", (req, res) => {
  res.send("SERVICE RUNNING");
});

export default app;
