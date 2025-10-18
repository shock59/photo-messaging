import { PEXELS_KEY } from "$env/static/private";
import { createClient } from "pexels";

const pexelsClient = createClient(PEXELS_KEY);
export default pexelsClient;
