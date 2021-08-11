import { createClient } from "contentful/dist/contentful.browser.min.js";
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from "@env";
const client = createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: CONTENTFUL_ACCESS_TOKEN,
});
export default client;
