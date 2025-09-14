import { transporter } from "../utils/NodemailerSetup";
import { validENV } from "../schemas/envSchema";

type SendEmailType = {
  to: string;
  subject: string;
  productName: string;
  productImageUrl: string;
  description: string;
  keywords: string[];
  founderName: string;
  founderDepartment: string;
  founderRole: string;
};

export const sendEmail = async (obj: SendEmailType) => {
  try {
    const mailOptions = {
      from: `"Lost & Found Portal" <${validENV.GMAIL}>`,
      to: obj.to,
      subject: obj.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
          <h2 style="color: #2c3e50; text-align: center;">📢 Lost & Found Portal</h2>
          <p>Hello,</p>
          <p>A product has been <strong>found</strong> and reported on the portal. Please review the details below to check if it belongs to you.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <img src="${obj.productImageUrl}" alt="Product Image" style="max-width: 100%; border-radius: 6px;" />
          </div>
          
          <h3 style="color: #2c3e50;">${obj.productName}</h3>
          <p><strong>Description:</strong> ${obj.description}</p>
          <p><strong>Keywords:</strong> ${obj.keywords.join(", ")}</p>
          
          <hr style="margin: 20px 0;" />
          
          <h4 style="color: #2c3e50;">🧑 Founder Details</h4>
          <p><strong>Name:</strong> ${obj.founderName}</p>
          <p><strong>Department:</strong> ${obj.founderDepartment}</p>
          <p><strong>Role:</strong> ${obj.founderRole}</p>
          
          <hr style="margin: 20px 0;" />
          
          <p>If this item belongs to you, please visit the <a href="${validENV.FRONTEND_URL_DEV}" style="color: #007bff; text-decoration: none;">Lost & Found Portal</a> to claim it.</p>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            © ${new Date().getFullYear()} Lost & Found Portal | Indira Gandhi Institute of Technology
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
