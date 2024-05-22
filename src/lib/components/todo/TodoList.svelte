<script>
    import {createEventDispatcher} from "svelte";
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    export let todos;

    const dispatch = createEventDispatcher();
</script>
<div>
    <ul class="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-5">
        {#each todos as todo, index}
            <li
                    class="border-t border-gray-200 grid px-2"
                    class:bg-gradient-to-r={!todo.status}
                    class:from-violet-500={!todo.status}
                    class:to-fuchsia-500={!todo.status}
                    class:bg-gray-400={todo.status}
                    transition:fade
            >
                <div>
                    <input
                            type="checkbox"
                            disabled={todo.status}
                            value={todo.status}
                            on:click={() => dispatch('markTodo', {index: index})}
                            class=" text-blue-600 rounded border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </div>
                <div class="sm:px-6 col-span-11">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 stroke">
                        {todo.text}
                    </h3>
                </div>
                <div class="mt-4 row-start-2 col-span-10">
                    <p class="text-sm font-medium">
                        Status: <span class="text-yellow-600">{todo.status ? "Done" : "Pending"}</span>
                    </p>
                </div>
                <div class="mt-4 row-start-2 col-span-2">
                    <button on:click={() => dispatch('deleteTodo', {todo: todo})} class="text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                    </button>
                </div>
            </li>
        {/each}
    </ul>
</div>