import prisma from "$lib/prisma.js";

export async function load() {
    const response = await prisma.post.findMany()
    return {
        response,
        message: 'this data came from the server',
        cool: true
    };
}
