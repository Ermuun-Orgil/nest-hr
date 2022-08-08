import { Request, Response } from "express";
import { getAllTicket, getTicket, getTickets, addTicket, deleteTicket, updateTicket } from "../queries/ticketService";

export const getAllTicketsService = async (request: Request, response: Response) => {
  response.send(await getAllTicket());
};

export const getTicketService = async (request: Request, response: Response) => {
  try {
    const result = await getTicket(request);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

export const getTicketsService = async (request: Request, response: Response) => {
  if (!request.body.id) {
    response.status(404).send("Not Found");
    return;
  }
  try {
    const result = await getTickets(request);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

export const updateTicketService = async (request: Request, response: Response) => {
  if (Object.keys(request.body).length === 0) {
    response.status(400).send("Not request body");
    return;
  }
  try {
    const result = await updateTicket(request);
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
};

export const createTicketService = async (request: Request, response: Response) => {
  if (Object.keys(request.body).length === 0) {
    response.status(400).send("Not request body");
    return;
  }
  try {
    const result = await addTicket(request);
    response.status(201).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
};

export const deleteTicketService = async (request: Request, response: Response) => {
  try {
    await deleteTicket(request);
    response.status(200).send({
      message: "Deleted successfully",
    });
  } catch (error) {
    response.status(500).send(error);
  }
};
