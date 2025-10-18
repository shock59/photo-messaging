import { redirect } from "@sveltejs/kit";
import db from "$lib/db";

const messageId = db.data.messages[0].id;
redirect(302, `/${messageId}`);
