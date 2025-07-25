import axios from "axios";
import { parser } from "../config";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error";

export const fetchJobsFromXML = async (url: string) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "Accept": "application/xml",
            },
        });

        const json = parser.parse(response.data);
        let items = json.rss?.channel?.item;
        if (!items) {
            throw new NotFoundError("Item not found!");
        }

        return Array.isArray(items) ? items : [items];
    } catch (error) {
        throw new InternalServerError(`Failed to fetch or parse jobs from ${url}`);
    }
}