import express from "express";
import { sendSms } from "@/controllers/sendSms";

export default function (router: express.Router) {
  router.post("/emergency-send", sendSms);
}
