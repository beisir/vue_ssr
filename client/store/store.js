import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'
const isDev = process.env.NODE_ENV === 'developoment'
export default (Vuex) => {
  const store = new Vuex.Store({
    // strict 如果为true则禁止vuex外部通过
    // this.$store.state.xxx = xxx
    // 这种方式进行修改变量
    strict: isDev,
    state: defaultState,
    getters,
    mutations,
    actions,
    // 定义一些插件
    plugins: [
      (store) => {
        // console.log('plugins   ', store)
      }
    ],
    // 模块创建并且使用
    modules: {
      a: {
        state: {
          text: 1
        },

        // 如果不想把mutations的命名空间放到全局下，
        // 这样不可以在多个相同的mutatiosn之内 使用相同名字
        // 可以通过namespaced 禁止
        // 这样就会在多个mutations里面使用相同的名字
        namespaced: true,
        mutations: {
          updateText (state, text) {
            // console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          // 在命名下面的getters接受三个参数
          // state ： 本身的命名空间的state
          // getters：本身的命名空间的getters
          // rootState: 接受全局的state对象
          textPlus (state, getters, rootState) {
            // console.log(rootState)
            return state.text + rootState.count
          }
        },
        actions: {
          // 相当于 这一个模块的 state， commit 方法 以及rootState
          add ({state, commit, rootState}) {
            // 默认情况下commit 只会提交当前模块的命名空间下的mutations
            commit('updateText', rootState.b.text)

            // 如果想要在全局空间之中提交全局的mutations 添加第三个参数
            // commit('updateCount', {
            // num: rootState.b.text
            // }, {
            //   root: true
            // })
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          testAction ({commit}) {
            // 调用其他的模块的 mutations 也是用这种方式开启root：true
            commit('a/updateText', 'test test', {
              root: true
            })
          }
        }
      },
      c: {
        state: {
          text: 'cccccccc'
        }
      }
    }
  })

  // console.log(`vuex 的热跟新 ${module}`)
  // 开启vuex 的热更新
  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './getters/getters.js',
      './actions/actions.js'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newGetters = require('./getters/getters.js').default
      const newActions = require('./actions/actions.js').default
      store.hotupdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
