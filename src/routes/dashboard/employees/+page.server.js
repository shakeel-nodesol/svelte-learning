import useApi from "$lib/hooks/useApi.js";
import {fail} from "@sveltejs/kit";

/**
 *
 * @type import('./$types').PageServerLoad
 */
export const load = (({cookies}) => {
    const employees = useApi({
        url: '/api/get-all-employs',
        method: 'get',
        cookies
    }).then(res => res.data)

    return {
        employees,
    }
});


/**
 *
 * @type import('./$types').Actions
 */
export const actions = {
    deleteEmployee: async ({cookies, request}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: `/api/delete-employ/${data.get('employee_id')}`,
                method: 'delete',
                cookies
            }).then(res => res.data)
        } catch (error) {
            fail(404, error)
        }
    }
}