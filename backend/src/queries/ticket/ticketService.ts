import { Request } from "express";
import Ticket from "../../models/ticket/ticket";

export const getAllTicket = () => {
  return Ticket.find({});
};

export const getTicket = (request: Request) => {
  return Ticket.findOne({ _id: request.params.id });
};

export const getTickets = async (request: Request) => {
  return Ticket.find({
    $or: [
      { reporter_id: request.body.id },
      {
        assignee_id: request.body.id,
      },
    ],
  });
};

export const updateTicket = async (request: Request) => {
  return Ticket.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
};

export const addTicket = (request: Request) => {
  return new Ticket(request.body).save();
};

export const deleteTicket = (request: Request) => {
  return Ticket.findByIdAndDelete(request.body._id);
};
