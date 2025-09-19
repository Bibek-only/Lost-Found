import { transporter } from "../utils/NodemailerSetup";
import { validENV } from "../schemas/envSchema";

type SendEmailType = {
  to: string;
  subject: string;
  listerName: string;
  listerEmail: string; // who posted (lost or found person)
  description: string;
  keywords: string[];
  productImageUrl?: string; // optional
};

export const sendEmail = async (obj: SendEmailType) => {
  try {
    const mailOptions = {
      from: validENV.GMAIL,
      to: obj.to,
      subject: obj.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 6px; padding: 16px;">
          <h3 style="color: #2c3e50; margin-bottom: 10px;">🔔 Possible Match Found</h3>
          
          <p><strong>Listed by:</strong> ${obj.listerName}</p>
          <p><strong>Listed by:</strong> ${obj.listerEmail}</p>
          <p><strong>Description:</strong> ${obj.description}</p>
          <p><strong>Keywords:</strong> ${obj.keywords.join(", ")}</p>

          ${
            obj.productImageUrl
              ? `<div style="margin: 15px 0; text-align: center;">
                   <img src="${obj.productImageUrl}" alt="Product Image" style="max-width: 100%; border-radius: 4px;" />
                 </div>`
              : ""
          }

          <p style="margin-top: 20px;">👉 Visit the 
            <a href="${validENV.FRONTEND_URL}" style="color: #007bff; text-decoration: none;">Lost & Found Portal</a> 
            to connect with the owner/finder.
          </p>
          
          <p style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
            © ${new Date().getFullYear()} Lost & Found Portal | IGIT Sarang
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
