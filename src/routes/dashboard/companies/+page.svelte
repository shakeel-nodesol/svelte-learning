<script>
    import {enhance} from "$app/forms";
    import Alert from "$lib/components/Alert.svelte";

    /**
     * @type import('./$types').PageData
     */
    export let data;

    let deleting = false;
    let alertMessage = '';
</script>


<main>
    <div class="text-center">
        <h1 class="text-6xl pb-5">Companies</h1>
        <a href="/dashboard/companies/create"
           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Create Company
        </a>
    </div>

    <div class="flex justify-center pt-7">
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Company Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            CEO
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {#await data.companies}
                        <!-- promise is pending -->
                        <p>waiting for the promise to resolve...</p>
                    {:then companies}
                        <!-- promise was fulfilled or not a Promise -->
                        {#each companies as company (company.id)}
                            <tr>
                                <td class="px-6 py-3">
                                    { company.name }
                                </td>
                                <td class="px-6 py-3">
                                    { company.ceo }
                                </td>
                                <td class="px-6 py-3 flex">
                                    <a href="/dashboard/companies/{company.id}/edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px"
                                             height="30px" viewBox="0 0 48 48">
                                            <path fill="#c94f60"
                                                  d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718	C43.139,10.526,43.139,9.625,42.583,9.067"></path>
                                            <path fill="#f0f0f0"
                                                  d="M6.905,35.43L5,43l7.571-1.906l0.794-6.567L6.905,35.43z"></path>
                                            <path fill="#edbe00"
                                                  d="M36.032,17.632l-23.46,23.461l-5.665-5.665l23.46-23.461L36.032,17.632z"></path>
                                            <linearGradient
                                                    id="o-p5DWUWqOn9GY3Aui69-a_D7WUsUhXDMGW_gr1"
                                                    x1="35.612"
                                                    x2="35.612"
                                                    y1="7.494"
                                                    y2="17.921"
                                                    gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stop-color="#dedede"></stop>
                                                <stop offset="1" stop-color="#d6d6d6"></stop>
                                            </linearGradient>
                                            <path fill="url(#o-p5DWUWqOn9GY3Aui69-a_D7WUsUhXDMGW_gr1)"
                                                  d="M30.363,11.968l4.832-4.834l5.668,5.664l-4.832,4.834L30.363,11.968z"></path>
                                            <path fill="#787878"
                                                  d="M5.965,39.172L5,43l3.827-0.965L5.965,39.172z"></path>
                                        </svg>
                                    </a>
                                    <form use:enhance={() => {
                                        deleting = true
                                        return async ({ result }) => {
                                            companies.splice(companies.findIndex(c => c.id === company.id), 1)
                                            alertMessage = "Company deleted successfully"
                                            deleting = false
                                        }
                                    }} action="?/deleteCompany" method="POST">
                                        <input type="hidden" name="company_id" value="{company.id}"/>
                                        <button disabled={deleting}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px"
                                                 y="0px" width="30px"
                                                 height="30px" viewBox="0 0 48 48">
                                                <path fill="#f44336"
                                                      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                                <path fill="#fff"
                                                      d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
                                                <path fill="#fff"
                                                      d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        {/each}
                    {:catch error}
                        <!-- promise was rejected -->
                        <p>Something went wrong: {error.message}</p>
                    {/await}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    {#if alertMessage}
        <Alert bind:message={alertMessage}/>
    {/if}
</main>
