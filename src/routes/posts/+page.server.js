export async function load() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
    return {
        response,
        message: 'this data came from the server',
        cool: true
    };
}