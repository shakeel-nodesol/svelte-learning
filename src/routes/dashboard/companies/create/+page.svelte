<script>
    import {enhance} from '$app/forms'

    let loading = false;
</script>

<main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create New Company
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    await update()
                    loading = false;
                }
            }}
                  method="post" enctype="multipart/form-data">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                        <input
                                required
                                id="name"
                                name="name"
                                type="text"
                                autocomplete="name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="ceo" class="block text-sm font-medium leading-6 text-gray-900">CEO Name</label>
                    <div class="mt-2">
                        <input required id="ceo" name="ceo" type="text"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="col-span-full">
                    <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Logo</label>
                    <input name="logo" type="file" class="">
                </div>
                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {#if !loading}
                            Create
                        {:else}
                            <img src="/loading-icon.gif" height="24px" width="24px" style="mix-blend-mode: color-burn"
                                 alt="loading">
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>