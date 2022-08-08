import express from "express";
import {
  getTicketService,
  getAllTicketsService,
  getTicketsService,
  createTicketService,
  deleteTicketService,
  updateTicketService,
} from "../controller/ticketControllers";

const ticketRouter = express.Router();

ticketRouter.get("/tickets", getAllTicketsService);
ticketRouter.get("/ticket/:id", getTicketService);
ticketRouter.delete("/ticket", deleteTicketService);
ticketRouter.patch("/ticket/:id", updateTicketService);
ticketRouter.post("/ticket", createTicketService);

ticketRouter.post("/tickets", getTicketsService);

export default ticketRouter;
