<script>
    import {enhance} from '$app/forms'

    /**
     * @type import('./$types').PageData
     */
    export let data;


    let loading = false;
</script>

<main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Edit New Employee
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
                                value={data.employee.name}
                                autocomplete="name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                value={data.employee.email}
                                autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div class="mt-2">
                        <input
                                required
                                id="address"
                                name="address"
                                type="text"
                                value={data.employee.address}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="salary" class="block text-sm font-medium leading-6 text-gray-900">Salary</label>
                    <div class="mt-2">
                        <input
                                required
                                id="salary"
                                value={data.employee.salary}
                                name="salary"
                                type="number"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="join_date" class="block text-sm font-medium leading-6 text-gray-900">Joining
                        Date</label>
                    <div class="mt-2">
                        <input
                                required
                                id="join_date"
                                name="join_date"
                                value={data.employee.join_date}
                                type="date"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Company
                    </label>
                    <select
                            required
                            name="company_id"
                            id="company_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value="" hidden>Choose a Company</option>
                        {#await data.companies}
                            <option value="">Loading....</option>
                        {:then companies}
                            {#each companies as company (company.id)}
                                <option value={company.id} selected={data.employee.company_id === company.id}>{ company.name }</option>
                            {/each}
                        {:catch error}
                            <option value="">{error?.message}</option>
                        {/await}
                    </select>
                </div>
                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        {#if !loading}
                            Update
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