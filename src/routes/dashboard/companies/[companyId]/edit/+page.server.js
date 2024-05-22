import {fail, redirect} from '@sveltejs/kit';
import useApi from "$lib/hooks/useApi.js";

/**
 * @type {import('./$types').PageServerLoad}
 * @param params
 * @param cookies
 * @returns {Promise<{company: any}>}
 */
export const load = async ({params, cookies}) => {
    const company = await useApi({
        url: `/api/edit-company/${params.companyId}`,
        method: 'get',
        cookies
    }).then(res => res.data);

    return {
        company
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, params}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: `/api/update-company/${params.companyId}`,
                method: 'post',
                data: data,
                cookies: cookies
            })
        } catch (errors) {
            return fail(422, {
                error: errors?.response?.data?.errors
            });
        }

        throw redirect(307, '/dashboard/companies');
    }
};