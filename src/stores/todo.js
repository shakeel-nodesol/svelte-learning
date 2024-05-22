import { writable } from 'svelte/store';

export function createTodoStore() {
    const {subscribe, update} = writable([]);

    /**
     * Add new todo
     * @param todo
     */
    const addTodo = (todo) => {
        update(($todos) => [...$todos, todo])
    }

    /**
     * Mark as done todo
     * @param index
     */
    const markAsDone = (index) => {
        update(($todos) => $todos.filter((todo, i) => {
            if (i === index) {
                todo.status = true
            }
            return todo
        }))
    }

    /**
     * Remove todo from todos
     * @param todo
     */
    const removeTodo = (todo) => {
        update($todos => $todos.filter(t => t !== todo))
    }

    return {
        addTodo,
        removeTodo,
        subscribe,
        markAsDone
    };
}

export const todos = createTodoStore()