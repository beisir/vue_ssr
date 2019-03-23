<script type="text/javascript">
export default {
    name: 'Tab',
    // inject 属性和props 类似 但是inject 获取父级甚至父父 级组件传入参数，不局限于父亲级
    // inject: ['data'],
    props: {
        index: {
            type: [Number, String],
            required: true
        },
        label: {
            type: String,
            default: 'tab'
        }
    },
    computed: {
        active() {
            return this.$parent.value === this.index
        }
    },
    mounted() {
        this.$parent.panes.push(this)
    },
    render() {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
            tab: true,
            active: this.active
        }
        return (
            <li class={classNames} on-click={this.handleClick}>{tab}</li>
        );
    },
    methods: {
        handleClick() {
            this.$parent.onChange(this.index)
        }
    }

}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
</style>
