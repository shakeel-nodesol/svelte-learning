import useApi from "$lib/hooks/useApi.js";
import {fail} from "@sveltejs/kit";

/**
 *
 * @type import('./$types').PageServerLoad
 */
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


/**
 * @type import('./$types').Actions
 */
export const actions = {
    deleteCompany: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: `/api/delete-company/${data.get('company_id')}`,
                method: 'delete',
                cookies
            }).then(res => res.data)
        } catch (error) {
            fail(404, error)
        }
    }
}