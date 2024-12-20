import { TransportModel } from "../models/transport";


export const getTransport = async () => {
    try {
        const result = await TransportModel.find();
        if (result) {
            return result;
        }
        return null;

    } catch (error) {
        return null;
    }
}

