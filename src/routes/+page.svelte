<script>
    import cookie from "cookie"
    import {onMount} from "svelte";

    onMount(() => {
        cookie.serialize('name', 'shakeel', {
            httpOnly: true,
            secure: true,
            path: '/'
        })
    })
</script>

<main class="min-w-screen bg-purple-500 text-purple-700 text-xs min-h-screen flex items-center justify-center">
    <div class="grid grid-cols-6 bg-amber-200">
        <kbd>Esc</kbd>
    </div>
</main>