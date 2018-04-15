<template>
    <header :class="$style.mainHeader">
        <h1>TodoAPP</h1>
    </header>
</template>

<style lang="stylus" scoped module>
    .main-header {
        text-align center
        h1 {
            font-size 100px
            color rgba(175, 47, 47, 0.4)
            margin 20px
        }
    }
</style>
<!-- 在调用header的app组件内部查看调用结果:只支持docs名称组件 -->
<!-- 一般是用在写文档的时候 -->
<docs>
    abs = 123456
</docs>
