import {redirect} from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
    const user = event.cookies.get('user');
    event.locals.user = user ? JSON.parse(atob(user)) : null
    if (event.route.id?.startsWith("/dashboard") && !event.locals?.user) {
        throw redirect(302, "/auth/login?redirect=" + event.route.id)
    }

    return resolve(event);
}
