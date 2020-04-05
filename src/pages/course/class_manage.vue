<template>
  <div>
    <div class="tab-left">
      <el-tag
        :key="tag"
        style="float: right;margin-bottom: 10px"
        v-for="tag in className"
        closable
        :disable-transitions="false"
        @click="handleClick(tag)"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <div class="table-right">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          width="180"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="cardId"
          width="180"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="phone"
          width="180"
          label="联系方式">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleRemove(scope.row)">移动
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import addCourseDialog from '@/pages/course/add_course_dialog.vue'

  export default {
    name: 'course_list',
    components: {addCourseDialog},
    props: {
      courseId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        classManageVOList: [],
        tableData: [],
        dataSource: [],
        className: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    created() {
      this.init();
    },
    methods: {
      handleDelete(row){
        console.log("删除学生",row);
      },
      handleRemove(row){
        console.log("移动学生",row);
      },
      handleClick(tag){

        let index = this.className.indexOf(tag);
        if(index >= this.dataSource.length){
          this.tableData = null
          return
        }
        this.tableData = this.dataSource[index].userListVOList
        console.log("点击标签",this.tableData)
      },
      handleClose(tag) {
        this.className.splice(this.className.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.addClass(inputValue)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      addClass(val) {
        if(!val){
          return
        }
        let path = 'api/user/course/updateClass'
        let args = {
          courseId: this.courseId,
          classId: 0,
          name: val,
        }
        this.$http.post(path, args).then(res => {
          console.log("res",res.data.status == 0)
          if (res.data.status == 0) {
            this.className.push(val);
          } else if (res.data.status === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('新增班级失败')
          }
        })
      },
      init() {
        let path = 'api/user/course/getCourseClass'
        let args = {
          id: this.courseId
        }
        this.$http.post(path, args).then(res => {
          if (res.data.status == 0) {
            this.dataSource = res.data.data
            console.log("datasource", this.dataSource)
            for (let i = 0; i < this.dataSource.length; i++) {
              this.className.push(this.dataSource[i].name);
            }
          } else if (res.data.status === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('搜索失败')
          }
        })
      },
    }
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .tab-left {
    float: left;
    width: 100px;
  }

  .table-right {
    float: right;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .iconActive {
    color: red;
  }

  .course-list {
    float: right;
    width: 100%;
  }

  .operate-course {
  }

  .operate-list {
    float: left;
  }

  .select-input {
    float: right;
    width: 200px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 80%;
    height: 200px;
    display: block;
  }

  .course-icon-list {
    float: right;
  }

  .course-icon {
    padding: 10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
