<template>
    <div>
        <div class="searchBar">
            <el-form>
                <el-form-item label="班级">
                    <el-select v-model="searchClass" placeholder="请选择班级">
                        <el-option v-for="item in classes" :label="item.name" :value="item.id" :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月份">
                    <el-select v-model="searchMonth" placeholder="请选择查询月份">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询类型">
                    <el-select v-model="config.type" placeholder="请选择查询类型">
                        <el-option label="异常次数" value="abnormal"></el-option>
                        <el-option label="请假天数" value="rest"></el-option>
                        <el-option label="缺勤天数" value="absence"></el-option>
                    </el-select>
                    <el-select v-model="config.sign" placeholder="请选择符号">
                        <el-option label="大于等于" value="2"></el-option>
                        <el-option label="小于等于" value="1"></el-option>
                    </el-select>
                    <el-input v-model="config.num" placeholder="请输入查询值" class="search-num" type="number"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="clear">清空查询条件</el-button>
            </div>
        </div>
        <div>截至今日，本月工作日{{days}}天</div>
        <el-table :data="records">
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="id" label="学号">
            </el-table-column>
            <el-table-column prop="className" label="班级">
            </el-table-column>
            <el-table-column prop="abnormal" label="异常次数">
                <template slot-scope="s">
                    <span class="abnormal">{{s.row.abnormal}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="absence" label="缺勤次数">
                <template slot-scope="s">
                    <span class="absence">{{s.row.absence}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="rest" label="请假天数">
                <template slot-scope="s">
                    <span class="rest">{{s.row.rest}}</span>
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
                days: '',
                records: [],
                classes: [],
                searchClass: '',
                searchMonth: '',
                config: {
                    type: '',
                    num: '',
                    sign: ''
                }
            }
        },
        methods: {
            init(m = '', clas='', type='', num='', sign='') {
                zstuAjax('/datas', {
                    month: m,
                    clas,
                    type,
                    num,
                    sign
                }, 'GET').then((res) => {
                    this.records.splice(0);
                    this.days = res.days;
                    this.records = this.records.concat(res.data);
                });
            },
            getClasses () {
                zstuAjax('/getClasses', {
                    type: 1
                }, 'GET').then((res) => {
                    this.classes = this.classes.concat(res.data);
                });
            }, 
            search() {
                if (this.config.type && (!this.config.sign || !this.config.num)) {
                    this.$message.error('请输入完整查询信息');
                } else {
                    this.init(this.searchMonth, this.searchClass, this.config.type, this.config.num, this.config.sign);
                }
            },
            clear() {
                this.searchClass = '';
                this.config = Object.assign({}, {
                    type: '',
                    num: '',
                    sign: ''
                });
            }
        },
        created() {
            this.getClasses();
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .searchBar {
        padding-bottom: 10px;
        border-bottom: 2px solid #7A8B8B;
    }
    .abnormal {
        color: #FF0000;
    }
    .absence {
        color: #6495ED;
    }
    .rest {
        color: #54FF9F;
    }
    .search-num {
        width: 100px;
    }
</style>