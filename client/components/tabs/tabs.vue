<script type="text/javascript">
import TabContainer from './tab-container.vue'
export default {
    name: 'Tabs',
    // provide 传入参数，不局限于子级获取，孙级都可以，缺陷在于传入值不会动态变化
    // provide () {
    //     let data = {};
    //     Object.defineProperty(data, 'value', {
    //         get: () => this.value,
    //         enumerable: true
    //     });
    //     return {
    //         data
    //     };
    // },
    components: {
        TabContainer
    },
    props: {
        value: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            panes: []
        }
    },
    render() {
        return (
            <div class="tabs">
                <ul class="tabs-header">{this.$slots.default}</ul>
                <tab-container panes={this.panes}></tab-container>
            </div>
        )
    },
    methods: {
        onChange(index) {
            this.$emit('change', index)
        }
    }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
