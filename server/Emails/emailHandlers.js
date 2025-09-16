import resendClient, { sender } from "../config/resend.js";
import createWelcomeTemplate from "./emailTemplate.js";

const sendWelcomeMail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Nagdista Chat",
    html: createWelcomeTemplate(name, clientURL),
  });

  if (error) {
    console.error("error from sending welcome email:", error);
    throw error;
  }

  console.log("welcome email sent successfully", data);
};

export default sendWelcomeMail;
