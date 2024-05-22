import {error, fail, redirect} from '@sveltejs/kit';
import useApi from "$lib/hooks/useApi.js";

/**
 * @type import('./$types').PageServerLoad
 **/
export const load = (async ({cookies, params}) => {
    const companies = useApi({
        url: '/api/get-all-company',
        method: 'get',
        cookies
    }).then(res => res.data);

    const employee = await useApi({
        url: `/api/edit-employ/${params.employeeId}`,
        method: 'get',
        cookies
    }).then(res => res.data);

    return {
        companies,
        employee
    }
});


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({cookies, request, params}) => {
        const data = await request.formData();

        try {
            await useApi({
                url: `/api/update-employ/${params.employeeId}`,
                method: 'put',
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