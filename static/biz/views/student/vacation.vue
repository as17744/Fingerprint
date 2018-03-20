<template>
    <div>
        <el-table :data="reqList">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="s">
                    <span v-if="s.row.status === 2" class="refuse">已拒绝</span>
                    <span v-if="s.row.status === 1" class="done">已受理</span>
                    <span v-if="s.row.status === 0" class="processing">审核中</span>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" class="reqBtt" @click="restReq">请假申请</el-button>
        <el-dialog title="请假请求" :visible.sync="restDialog">
            <el-form>
                <el-form-item label="请假日期">
                    <el-date-picker v-model="restForm.date" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="请假理由">
                    <el-input type="textarea" placeholder="请输入理由" v-model="restForm.reason">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="restDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                reqList: [],
                restDialog: false,
                restForm: {
                    date: '',
                    reason: ''
                }
            }
        },
        methods: {
            init() {
                zstuAjax('/vacation', {
                    type: 5
                }, 'GET').then((res) => {
                    this.reqList.splice(0);
                    this.reqList = this.reqList.concat(res.reqList);
                });
            },
            restReq() {
                this.restForm = Object.assign({}, {
                    date: '',
                    reason: ''
                });
                this.restDialog = true;
            },
            confirm() {
                if (!this.restForm.date) {
                    this.$message.error('请输入请假日期');
                } else {
                    const y = this.restForm.date.getFullYear(); 
                    const m = this.restForm.date.getMonth()+1;
                    const d = this.restForm.date.getDate();
                    const reqDate = `${y}-${m}-${d}`;
                    const reason = this.restForm.reason;
                    zstuAjax('/vacation', {
                        type: 1,
                        date: reqDate,
                        reason
                    }, 'GET').then((res) => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: `${res.message}`
                            });
                            this.init();
                            this.restDialog = false;
                        } else {
                            this.$message.error(`${res.message}`);
                        }
                    });
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .processing {
        color: #CDCD00;
    }
    .done {
        color:#191970;
    }
    .refuse {
        color: #FF0000;
    }
    .reqBtt {
        margin-top: 20px;
    }
</style>