import EmailDeliveryServiceContract from "./contracts/emailDeliveryServiceContract";
import NodeMailerService from "./nodeMailerService";
import { NodeMailerServiceConstant } from "./constant";

export default class EmailServiceFactory{
    static getServiceInstance(serviceName?: string): EmailDeliveryServiceContract{
        switch (serviceName) {
            case NodeMailerServiceConstant:
                return new NodeMailerService();
                break;
        
            default:
                return new NodeMailerService();
                break;
        }
    }
}