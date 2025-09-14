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
export declare const sendEmail: (obj: SendEmailType) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export {};
