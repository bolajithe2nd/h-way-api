import express from "express";
import twilio from "twilio";

export const sendSms = async (req: express.Request, res: express.Response) => {
  try {
    const {
      category,
      description,
      media,
      emergency_contacts,
    }: {
      category: string;
      description: string;
      media?: [];
      emergency_contacts: string[];
    } = req.body;

    if (!category || !description || !emergency_contacts.length) {
      throw new Error("Some parameters are required");
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // Use Promise.all to send SMS to all emergency contacts concurrently
    const messages = await Promise.all(
      emergency_contacts.map((contact) =>
        client.messages.create({
          body: "This is a test sms emergency message",
          from: process.env.TWILIO_PHONE_NUMBER,
          to: contact,
        })
      )
    );

    const failedMessages = messages.filter((message) => !message.sid);

    if (failedMessages.length) {
      console.log(failedMessages);
      throw new Error(
        "An error occurred when reporting your emergency to some contacts."
      );
    }

    res.status(200).json({
      error: false,
      msg: "Your emergency report has been sent successfully.",
    });
  } catch (error: any) {
    res.status(400).json({ error: true, msg: error.message });
  }
};
