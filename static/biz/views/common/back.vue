<template>
    <div class="back" @click="back">
        <i class="el-icon-back"></i>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            back() {
                this.$router.push('/');
            }
        }
    }
</script>
<style lang="less">
    .back {
        position: fixed;
        right: 50px;
        bottom: 50px;
        width: 80px;
        height: 80px;
        font-size: 50px;
        color: #fff;
        background: #80a9d3;
        border-radius: 50%;
        line-height: 80px;
        text-align: center;
        &:hover {
            cursor: pointer;
        } 
    }
</style>