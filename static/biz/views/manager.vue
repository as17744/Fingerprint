<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" class="el-menu-vertical" @select="handleSelect">
                    <el-menu-item index="1">
                        <i class="el-icon-location"></i>
                        <span slot="title">数据导入</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span slot="title">教师审核</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">密码修改</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <div class="upload-part" v-if="key === 1">
                    <div class="btt" @click="upload"><i class="el-icon-upload2"></i>今日考勤信息上传</div>
                    <input type="file" accept=".txt, .dat" class="input-btt" ref="uploadBtt" @change="uploadFile">
                </div>
                <div v-if="key === 2">
                    <el-table :data="unValidate">
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="id" label="工号"></el-table-column>
                        <el-table-column prop="duty" label="负责班级"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="success" @click="validate(scope.row.id)" round>授权</el-button>
                                <el-button type="warning" @click="refuse(scope.row.id)" round>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="key === 3">
                    <Password></Password>
                </div>
            </el-main>
        </el-container>
        <Back></Back>
    </div>
</template>
<script>
    import _ from 'lodash';
    import zstuAjax from '../../lib/zstuAjax';
    import Password from './common/password.vue';
    import Back from './common/back.vue';
    export default {
        data() {
            return {
                key: 1,
                name: '',
                unValidate: []
            }
        },
        created() {
            zstuAjax('/check', {}, 'GET').then((res) => {
                if (!res.success) {
                    this.$router.push('/');
                } else {
                    this.name = res.name;
                }
            })
        },
        methods: {
            uploadFile() {
                const reader = new FileReader();
                reader.readAsText(this.$refs.uploadBtt.files[0], 'gbk');
                const that = this;
                reader.onload = function() {
                    const identityArr = this.result.trim().split('\n');
                    const arr = _.map(identityArr, (item) => {
                        const trimedItem = item.trim();
                        const chips = trimedItem.split('	');
                        const useInf = {};
                        useInf.id = chips[0];
                        useInf.punch = chips[1];
                        return useInf;
                    });
                    zstuAjax('getId', {}, 'GET').then((res) => {
                        const ids = res.data;
                        const records = _.map(ids, (id) => {
                            const userRecord = _.filter(arr, (item) => {
                                return item.id === id;
                            });
                            const record = {};
                            record.id = id;
                            record.start = userRecord.length === 0 ? '' :userRecord[0].punch;
                            record.end = userRecord.length <= 1 ? '' : userRecord[userRecord.length - 1].punch;
                            return record;
                        });
                        const recordData = JSON.stringify(records);
                        zstuAjax('/readfile', {
                            records: recordData
                        }, 'GET').then((res) => {
                            if (res.success) {
                                that.$alert('今日所有打卡记录已经导入，记得清空指纹考勤机所有考勤数据噢！', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {}
                                  });
                            } else {
                                that.$message.error('今天已经导入过了');
                            }
                        });
                    });
                }
            },
            tableInit() {
                zstuAjax('/unvalidate', {}, 'GET').then((res) => {
                    this.unValidate.splice(0);
                    const flagData = [].concat(res.data);
                    zstuAjax('/getClasses', {}, 'GET').then((data) => {
                        _.map(flagData, (item) => {
                            let classes = '';
                            const classArr = JSON.parse(item.classes);
                            _.map(classArr, (classId) => {
                                const matchClass = _.find(data.data, (cla) => {
                                    return cla.id === classId;
                                });
                                classes += (matchClass.name + ' ');
                            });
                            item.duty = classes;
                        });
                        this.unValidate = this.unValidate.concat(flagData);
                    });
                })
            },
            handleSelect(key) {
                this.key = +key;
                if (this.key === 2) {
                    this.tableInit();
                }
            },
            upload() {
                this.$refs.uploadBtt.click();
            },
            validate(id) {
                zstuAjax('/validate', {
                    id
                }, 'GET').then((res) => {
                    if (res.success) {
                        this.tableInit();
                        this.$message({
                            type: 'success',
                            message: '成功授权'
                        })
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            refuse(id) {
                zstuAjax('/del', {
                    id
                }, 'GET').then((res) => {
                    this.tableInit();
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                });
            }
        },
        components: {
            Password,
            Back
        }
    }
</script>
<style lang="less">
    .main {
        background: #fff;
    }
    .upload-part {
        width: 100%;
        height: 100%;
        text-align: center;
        .btt {
            margin: 200px auto;
            width: 200px;
            height: 80px;
            border-radius: 8px;
            border: 1px solid #75f6ab;
            line-height: 80px;
            text-align: center;
            font-size: 20px;
            color: #fff;
            background: #04fa6c;
            &:hover {
                cursor: pointer;
            }
        }
    }
    .el-menu-vertical {
        height: 1000px;
        width: 200px;
    }
    .input-btt {
        display: none;
    }
</style>
