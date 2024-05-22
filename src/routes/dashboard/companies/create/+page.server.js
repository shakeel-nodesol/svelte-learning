import {fail, redirect} from '@sveltejs/kit';
import useApi from "$lib/hooks/useApi.js";


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: '/api/add-company',
                method: 'post',
                data: data,
                cookies
            })
        } catch (errors) {
            return fail(422, {
                error: errors?.response?.data?.errors
            });
        }

        throw redirect(307, '/dashboard/companies');
    }
};