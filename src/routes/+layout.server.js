import {deserialize} from "$app/forms";

/**
 *
 * @type import('./$types').LayoutLoad
 */
export const load = ({cookies}) => {
    return {
        user: cookies.get('user') ? deserialize(atob(cookies.get('user'))) : '',
    }
};