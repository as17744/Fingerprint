<template>
    <div>
        <div class="tips">实验时请在{{tipsInf.start}}前打卡，离开请在{{tipsInf.end}}后打卡</div>
        <el-table :data="firstLine" border class="punch-table">
            <el-table-column v-for="(item, index) in firstLine[0]" :label="index + 1 + ''" :key="index + 1 + ''" width="110">
                <template slot-scope="s">
                    <span class="rest" v-if="s.row[index] === 2">请假</span>
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="secondLine" border class="punch-table">
            <el-table-column v-for="(item, index) in secondLine[0]" :label="index + 11 + ''" :key="index + 11 + ''" width="110">
                <template slot-scope="s">
                    <span class="rest" v-if="s.row[index] === 2">请假</span>
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="thirdLine" border class="punch-table">
            <el-table-column v-for="(item, index) in thirdLine[0]" :label="index + 21 + ''" :key="index + 21 + ''" width="110">
                <template slot-scope="s">
                    <span class="rest" v-if="s.row[index] === 2">请假</span>
                    <span class="normal" v-if="s.row[index] === 1">正常</span>
                    <span class="abnormal" v-if="s.row[index] === 0">异常</span>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <span class="footer">本月出勤率{{tipsInf.rate}}</span>
            <span>本月实验总时长{{tipsInf.duration}}小时</span>
            <span class="abnormal-rate">本月异常率: {{tipsInf.abnormal}}</span>
            <span class="rest-day">本月请假天数: {{tipsInf.rest}}</span>
        </div>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                firstLine: [],
                secondLine: [],
                thirdLine: [],
                tipsInf: {
                    start: '',
                    end: '',
                    rate: '',
                    duration: 0
                },
                duration: 0
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
                    this.tipsInf.start = res.start;
                    this.tipsInf.end = res.end;
                    this.tipsInf.duration = Math.floor(res.duration / (1000 * 60 * 60));
                    this.tipsInf.rate = res.rate;
                    this.tipsInf.abnormal = `${res.abnormal}`;
                    this.tipsInf.rest = res.rest;
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
    .rest {
        color: #76EE00;
    }
    .punch-table {
        margin-bottom: 10px;
    }
    .footer {
        margin-right: 30px;
    }
    .abnormal-rate {
        margin-left: 30px;
        color: #FF0000;
    }
    .rest-day {
        margin-left: 30px;
        color: #76EE00;
    }
</style>