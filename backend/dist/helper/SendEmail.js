"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const NodemailerSetup_1 = require("../utils/NodemailerSetup");
const envSchema_1 = require("../schemas/envSchema");
const sendEmail = async (obj) => {
    try {
        const mailOptions = {
            from: envSchema_1.validENV.GMAIL,
            to: obj.to,
            subject: obj.subject,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 6px; padding: 16px;">
          <h3 style="color: #2c3e50; margin-bottom: 10px;">🔔 Possible Match Found</h3>
          
          <p><strong>Listed by:</strong> ${obj.listerName}</p>
          <p><strong>Listed by:</strong> ${obj.listerEmail}</p>
          <p><strong>Description:</strong> ${obj.description}</p>
          <p><strong>Keywords:</strong> ${obj.keywords.join(", ")}</p>

          ${obj.productImageUrl
                ? `<div style="margin: 15px 0; text-align: center;">
                   <img src="${obj.productImageUrl}" alt="Product Image" style="max-width: 100%; border-radius: 4px;" />
                 </div>`
                : ""}

          <p style="margin-top: 20px;">👉 Visit the 
            <a href="${envSchema_1.validENV.FRONTEND_URL_DEV}" style="color: #007bff; text-decoration: none;">Lost & Found Portal</a> 
            to connect with the owner/finder.
          </p>
          
          <p style="margin-top: 20px; font-size: 12px; color: #888; text-align: center;">
            © ${new Date().getFullYear()} Lost & Found Portal | IGIT Sarang
          </p>
        </div>
      `,
        };
        const result = await NodemailerSetup_1.transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", result.messageId);
        return result;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};
exports.sendEmail = sendEmail;
