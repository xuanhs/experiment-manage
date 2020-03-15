<template>
   <el-dialog
    title="创建课程"
    :visible.sync="dialogVisible"
    @close="closeDialog">
   <el-form :model="form" label-width="120px" :rules="rules" ref="formRef" class="my-form">
            <el-form-item label="课程名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="课程描述" prop="explanation">
                <el-input v-model="form.explanation"></el-input>
            </el-form-item>
        </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="onSave">确 定</el-button>
  </span>
</el-dialog>

</template>
<script>

    export default {
        name: 'index',
        data() {
            return {
                dialogVisible: true,
                form: {
                name: null,
                explanation: null
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '必填项',
                    },
                    {
                      type: 'string',
                      max: 30,
                      message: '长度不可超过50'
                    },
                ],
                explanation: [
                  {
                    required: true,
                    message: '必填',
                  },
                   {
                      type: 'string',
                      max: 30,
                      message: '长度不可超过100'
                    },
                ],
            },
            }
        },
        methods: {
           closeDialog() {
           this.dialogVisible = false
        },
         onSave() {
           this.$refs['formRef'].validate(isValid => {
                if (!isValid) return false
                this.onAdd()
            })
           this.dialogVisible = false
        },
        onAdd(){
           let path = 'api/updateCourse'
            let args = {
                name: this.form.name,
                explanation: this.form.explanation
            }
            console.log(this.form)
            this.$http.post(path, args).then(res => {
                if (res.data.status === 200 && res.data.data.code === 1) {
                    this.$message.success('新增成功')
                } else if (res.data.status === 200 && res.data.data.code === 0){
                    this.$message.error(res.data.result.reason)
                } else {
                    this.$message.error('新增失败')
                }
            })
        }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .show-course{
    width: 80%;
    height: 100%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .operate-course{
    width: 80%;
    height: 100px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
