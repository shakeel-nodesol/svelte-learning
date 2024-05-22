import {error, fail, redirect} from '@sveltejs/kit';
import useApi from "$lib/hooks/useApi.js";

/**
 * @type import('./$types').PageServerLoad
 **/
export const load = (({cookies}) => {
    const companies = useApi({
        url: '/api/get-all-company',
        method: 'get',
        cookies
    }).then(res => res.data);

    return {
        companies: companies,
    }
});


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: '/api/add-employ',
                method: 'post',
                data: data,
                cookies: cookies
            })
        } catch (errors) {
            return fail(422, {
                error: errors?.response?.data?.errors
            });
        }

        throw redirect(307, '/dashboard/employees');
    }
};