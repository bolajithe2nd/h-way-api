import express from "express";
import Main from "./Main";

const router = express.Router();

export default function (): express.Router {
  Main(router);

  return router;
}
