<script>
    import TodoList from "$lib/components/todo/TodoList.svelte";
    import {todos} from "../../stores/todo.js";
    import Alert from "$lib/components/Alert.svelte";

    let todoText = "";
    let message = ""

    /**
     * Add new todo in list
     */
    const addTodo = () => {
        todos.addTodo({text: todoText, status: false})
        todoText = ''
        message = "Todo Added Successfully"
    }

    /**
     * Mark todo as done
     * @param event
     */
    const markAsDone = (event) => {
        todos.markAsDone(event.detail.index)
        message = "Todo Done"
    }

    /**
     * Delete todo from list
     * @param event
     */
    const deleteTodo = (event) => {
        todos.removeTodo(event.detail.todo)
        message = "Todo deleted Successfully"
    }
</script>

<div>
    <main class="flex justify-center items-center">
        <div class="grid-cols-6">
            <div class="grid gap-2">
                <input bind:value={todoText}
                       class="w-full placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                       name="search" placeholder="Create New TODO'S" type="text"/>
                <button on:click={addTodo}
                        class="py-2 bg-violet-500 rounded hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
                    Add
                </button>
            </div>
            <TodoList
                    todos={$todos}
                    on:markTodo={markAsDone}
                    on:deleteTodo={deleteTodo}
            />
        </div>
    </main>
    {#if message}
        <Alert bind:message={message}/>
    {/if}
</div>
