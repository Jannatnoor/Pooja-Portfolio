
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  } else {
    if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
      return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD, 
        },
      });
    }

    
    return nodemailer
      .createTestAccount()
      .then((account) => {
        return nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((error) => {
        console.error("Failed to create test account:", error);
        throw error;
      });
  }
};

export const emailConfig = {
  from:
    process.env.NODE_ENV === "production"
      ? process.env.EMAIL_FROM || "your-verified-sender@yourdomain.com"
      : process.env.EMAIL_USERNAME || "test@example.com", 
};

export const testEmailConfig = async () => {
  try {
   
    const tester = await getTransporter();
    await tester.verify();
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
};


let transporterPromise = null;


export const getTransporter = async () => {
  if (!transporterPromise) {
    if (typeof createTransporter() === "object") {
     
      transporterPromise = Promise.resolve(createTransporter());
    } else {
      
      transporterPromise = createTransporter();
    }
  }
  return transporterPromise;
};


export const transporter = createTransporter();
