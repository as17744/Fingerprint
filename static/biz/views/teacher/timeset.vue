<template>
    <div>
        <div v-for="(item, index) in classSet" class="time-item">
            <span>{{item.name}}</span>
            <el-time-picker v-model="item.start" placeholder="开始时间">
            </el-time-picker>
            <el-time-picker v-model="item.end" placeholder="结束时间">
            </el-time-picker>
            <el-button type="primary" @click="save(index)">保存</el-button>
        </div>
    </div>
</template>
<script>
    import zstuAjax from '../../../lib/zstuAjax';
    export default {
        data() {
            return {
                classSet: []
            }
        },
        methods: {
            init() {
                zstuAjax('/getClasses', {
                    type: 1
                }, 'GET').then((res) => {
                    this.classSet.splice[0];
                    const arr = res.data.map((item) => {
                        const obj = {};
                        obj.name = item.name;
                        obj.id = item.id;
                        const today = new Date();
                        const y = today.getFullYear();
                        const m = today.getMonth()+1;
                        const d = today.getDate(); 
                        if(item.start) {
                            const startArr = item.start.split(':');
                            obj.start = new Date(y, m, d, +startArr[0], +startArr[1], +startArr[2]); 
                        } else {
                            obj.start = item.start;
                        }
                        if(item.end) {
                            const endArr = item.end.split(':');
                            obj.end = new Date(y, m, d, +endArr[0], +endArr[1], +endArr[2]);
                        } else {
                            obj.end = item.end;
                        }
                        return obj;
                    });
                    this.classSet = this.classSet.concat(arr);
                });
            },
            save(index) {
                try {
                    const id = this.classSet[index].id;
                    const startH = this.classSet[index].start.getHours();
                    const startM = this.classSet[index].start.getMinutes();
                    const startS = this.classSet[index].start.getSeconds();
                    const start = `${startH}:${startM}:${startS}`;
                    const endH = this.classSet[index].end.getHours();
                    const endM = this.classSet[index].end.getMinutes();
                    const endS = this.classSet[index].end.getSeconds();
                    const end = `${endH}:${endM}:${endS}`;
                    zstuAjax('/setTime', {
                        id,
                        start,
                        end
                    }, 'GET').then((res) => {
                        this.$message({
                            type: 'success',
                            message: '时间修改成功'
                        })
                    });
                } catch(e) {
                    this.$message.error('请输入完整时间');
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="less">
    .time-item {
        margin-bottom: 10px;
    }
    .save-btt {
        position: fixed;
        right: 300px;
        bottom: 100px;
    }
</style>