import {fail, redirect} from "@sveltejs/kit";
import prisma from "$lib/prisma.js";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();


        try {
            await prisma.post.create({
                data: {
                    title: data.get('title'),
                    content: data.get('content')
                }
            })
        } catch (error) {
            return fail(422, {
                error: error
            });
        }

        throw redirect(307, '/posts');
    }
};
