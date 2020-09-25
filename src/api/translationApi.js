import axios from "axios";
import { KEY, ENDPOINT, REGION } from "../env/environment";

export default axios.create({
  baseURL: ENDPOINT,
  headers: {
    "Ocp-Apim-Subscription-Key": KEY,
    "Ocp-Apim-Subscription-Region": REGION,
    "Content-type": "application/json",
  },
});
