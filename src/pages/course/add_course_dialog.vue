<template>
  <el-dialog
    title="创建课程"
    width="30%"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @open=""
    @close="closeDialog">
    <el-form :model="form" label-width="100px" :rules="rules" ref="formRef" class="my-form">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="form.name" class="input-course"></el-input>
      </el-form-item>
      <el-form-item label="课程描述" prop="explanation">
        <el-input v-model="form.explanation" class="input-course"></el-input>
      </el-form-item>
      <el-form-item label="课程封面" prop="file">
        <image_upload @updateFileId="updateFileId" :image="form.fileNmae" :file_id="form.fileId"></image_upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="onSave">确 定</el-button>
  </span>
  </el-dialog>

</template>
<script>
  import image_upload from '@/components/image_upload.vue'

  export default {
    name: 'index',
    data() {
      return {
        dialogVisible: true,
        form: {
          fileId: null,
          fileName:null,
          courseId: null,
          name: null,
          explanation: null,
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
    created() {
      if (this.type == 'edit') {
        this.initEdit();
      }
    },
    props: {
      type: {
        type: String,
        default: 'add',
      },
      course:{
        type: Object,
      },
    },
    methods: {
      initEdit() {

        this.form.fileId = this.course.fileBase.id
        this.form.fileNmae = this.course.fileBase.memoryName
        this.form.courseId = this.course.id
        this.form.name = this.course.name
        this.form.explanation = this.course.explanation
        console.log("initEdit",this.form)
      },
      updateFileId(id) {
        console.log("更新封面id", id)
        this.form.fileId = id;
      },
      closeDialog() {
        this.$emit("closeDialog")
      },
      onSave() {
        this.$refs['formRef'].validate(isValid => {
          if (!isValid) return false
          this.onAdd()
        })
      },
      onAdd() {
        let path = 'api/user/course/updateCourse'
        let args = {
          name: this.form.name,
          explanation: this.form.explanation,
          fileId: this.form.fileId
        }
        if(this.form.courseId){
          args.id = this.form.courseId
        }
        console.log(this.form)
        this.$http.post(path, args).then(res => {
          if (res.data.status === 0 && res.data.data.code === 1) {
            this.$message.success('成功')
            this.$emit("closeDialog")
          } else if (res.data.status === 0 && res.data.data.code === 0) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('新增失败')
          }
        })
      }
    },
    components: {
      image_upload,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .show-course {
    width: 80%;
    height: 100%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .operate-course {
    width: 80%;
    height: 100px;
    margin-right: auto;
    margin-left: auto;
  }

  .input-course {
    width: 200px;
    float: left;
  }
</style>
