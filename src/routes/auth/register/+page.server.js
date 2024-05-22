import {fail, redirect} from '@sveltejs/kit';
import useApi from "$lib/hooks/useApi.js";

export async function load({locals}) {
    if (locals.user) throw redirect(307, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: '/api/register',
                method: 'post',
                data: {
                    name: data.get('name'),
                    email: data.get('email'),
                    password: data.get('password'),
                    address: data.get('address'),
                },
                cookies
            }).then(res => {
                cookies.set('user', btoa(JSON.stringify(res.user)), {
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    expires: new Date((new Date().getFullYear() + 1), 0, 0,)
                })
                cookies.set('token', btoa(res.token), {
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    expires: new Date((new Date().getFullYear() + 1), 0, 0,)
                })
            })
        } catch (error) {
            return fail(422, {
                error: error
            });
        }

        throw redirect(307, '/dashboard/companies');
    }
};