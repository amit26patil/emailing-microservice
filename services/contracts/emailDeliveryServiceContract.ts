import EmailRequest from "../../models/emailRequest";

export default abstract class EmailDeliveryServiceContract{
    public abstract sendMail(emailRequest: EmailRequest): Promise<any>;
}