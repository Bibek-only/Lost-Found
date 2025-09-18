type SendEmailType = {
    to: string;
    subject: string;
    listerName: string;
    listerEmail: string;
    description: string;
    keywords: string[];
    productImageUrl?: string;
};
export declare const sendEmail: (obj: SendEmailType) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export {};
