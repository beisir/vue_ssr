export default {
    // 修改state num 为参数
    updateCount(state, num) {
        state.count = num
    },


    fillTodos (state, todos) {
        state.todos = todos;
    },

    addTodo (state, todo) {
        state.todos.unshift(todo);
    },

    updateTodo (state, {id, todo}) {
        let index = state.todos.findIndex(k => k.id === id);
        state.todos.splice(index, 1, todo);
    },

    deleteTodo (state, id) {
        state.todos.splice(state.todos.find(k => k.id === id), 1);
    },

    deleteAllComputed (state) {
        state.todos = state.todos.filter(t => !t.computed);
    }

}
