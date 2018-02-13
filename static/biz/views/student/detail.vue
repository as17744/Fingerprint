<template>
    <div>
        <el-table :data="firstLine" border class="punch-table">
            <el-table-column v-for="(item, index) in firstLine[0]" :label="index + 1 + ''" width="110">
                <template slot-scope="s">
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="secondLine" border class="punch-table">
            <el-table-column v-for="(item, index) in secondLine[0]" :label="index + 11 + ''" width="110">
                <template slot-scope="s">
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="thirdLine" border class="punch-table">
            <el-table-column v-for="(item, index) in thirdLine[0]" :label="index + 21 + ''" width="110">
                <template slot-scope="s">
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                firstLine: [],
                secondLine: [],
                thirdLine: []
            }
        },
        methods: {
            init() {
                zstuAjax('/getRecord', {}, 'GET').then((res) => {
                    this.firstLine.splice(0);
                    this.secondLine.splice(0);
                    this.thirdLine.splice(0);
                    const first = res.data.slice(0, 10);
                    const second = res.data.slice(10, 20);
                    const third = res.data.slice(20);
                    this.firstLine.push(first);
                    this.secondLine.push(second);
                    this.thirdLine.push(third);
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .abnormal {
        color: #FF0000;
    }
    .punch-table {
        margin-bottom: 10px;
    }
</style>