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
        model.getAllTodos().then(data => {
            commit('fillTodos', data);
        }).catch(err => {
            handleError(err);
        })
    },
    login ({commit}, {username, password}) {
        return new Promise((resolve, reject) => {
            model.login(username, password).then(data => {
                commit('doLogin', data);
                notify({
                    content: '登陆成功'
                });

                resolve()
            }).catch(err => {
                handleError(err);
                reject(err);
            })
        })
    },

    addTodo ({commit}, todo) {
        model.createTodo(todo).then(data => {
            commit('addTodo', data);
            notify({
                content: '添加成功'
            });
        }).catch(err => {
            handleError(err);
        })
    },

    updateTodo ({commit}, {id, todo}) {
        model.updateTodo(id, todo).then(data => {
            commit('updateTodo', {id, todo: data});
            notify({
                content: '更新成功'
            });
        }).catch(err => {
            handleError(err);
        })
    },

    deleteTodo ({commit}, id) {
        model.deleteTodo(id).then(data => {
            commit('deleteTodo', id);
            notify({
                content: '删除成功'
            });
        }).catch(err => {
            handleError(err);
        })
    },

    deleteAllComputed ({commit, state}) {
        const ids = state.todos.filter(item => item.computed).map(t => t.id);
        console.log(ids);

        model.deleteAllComputed(ids).then(() => {
            commit('deleteAllComputed');
            notify({
                content: '删除全部成功'
            });
        }).catch(err => {
            handleError(err);
        })
    }





}
