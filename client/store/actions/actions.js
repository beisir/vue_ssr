import model from '../../model/client-model.js';
import notify from '../../components/notification/function.js';
import bus from '../../util/bus.js';
const handleError = (err) => {
    if (err.code === 401) {
        notify({
            content: '请先登录!'
        });
        bus.$emit('auth');
    };
};


export default {
    updateCountAsync(store, data) {
        setTimeout(() => {
            store.commit('updateCount', data.num)
        }, data.time)
    },


    fetchTodos ({commit}) {
        commit('startLoading');
        model.getAllTodos().then(data => {
            commit('fillTodos', data);
            commit('endLoading');
        }).catch(err => {
            handleError(err);
            commit('endLoading');
        })
    },
    login ({commit}, {username, password}) {
        commit('startLoading');
        return new Promise((resolve, reject) => {
            model.login(username, password).then(data => {
                // commit('doLogin', data);
                notify({
                    content: '登陆成功'
                });
                commit('endLoading');
                resolve()
            }).catch(err => {
                handleError(err);
                reject(err);
                commit('endLoading');
            })
        })
    },

    addTodo ({commit}, todo) {
        commit('startLoading');
        model.createTodo(todo).then(data => {
            commit('addTodo', data);
            notify({
                content: '添加成功'
            });
            commit('endLoading');

        }).catch(err => {
            handleError(err);
            commit('endLoading');
        })
    },

    updateTodo ({commit}, {id, todo}) {
        commit('startLoading');

        model.updateTodo(id, todo).then(data => {
            commit('updateTodo', {id, todo: data});
            notify({
                content: '更新成功'
            });
            commit('endLoading');

        }).catch(err => {
            handleError(err);
            commit('endLoading');

        })
    },

    deleteTodo ({commit}, id) {
        commit('startLoading');

        model.deleteTodo(id).then(data => {
            commit('deleteTodo', id);
            notify({
                content: '删除成功'
            });
            commit('endLoading');

        }).catch(err => {
            handleError(err);
            commit('endLoading');

        });
    },

    deleteAllComputed ({commit, state}) {
        commit('startLoading');

        const ids = state.todos.filter(item => item.computed).map(t => t.id);

        model.deleteAllComputed(ids).then(() => {
            commit('deleteAllComputed');
            notify({
                content: '删除全部成功'
            });
            commit('endLoading');

        }).catch(err => {
            handleError(err);
            commit('endLoading');
        });
    }





}
