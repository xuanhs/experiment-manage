<template>
  <div class="all-in">

    <div>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="show-course"

      >
        <el-tab-pane
          label="班级管理"
          name="create"

        >
          <class_manage :courseId="form.id">
          </class_manage>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>
<script>
  import class_manage from '@/pages/course/class_manage.vue'
  import courseList from '@/pages/course/course_list.vue'

  export default {
    name: 'index',
    data() {
      return {
        dateValue: new Date(),
        activeName: "create",
        isTeacher: true,
        isAddCourseDialog: false,
        form: {
          id: null,
        },
        dataSource: {},
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.form.id = this.$route.params.id
        console.log("courseId", this.form.id)
        this.searchCourse(this.form.id)
      },
      searchCourse(courseId) {
        let path = 'api/user/course/getCourseDetail'
        let args = {
          id: courseId
        }
        this.$http.post(path, args).then(res => {
          if (res.data.status == 0) {
            this.dataSource = res.data.data
            console.log("datasource", this.dataSource)
          } else if (res.data.status === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('搜索失败')
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addCourse() {
        console.log("新增课程弹窗")
        this.isAddCourseDialog = true
      },
      closeDialog() {
        this.isAddCourseDialog = false
      }
    },
    components: {class_manage, courseList}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .show-course {
    width: 100%;
    height: 100%;
  }

  .in-right {
    float: right;
    width: 20%;
    height: 1000px;
    background: aliceblue;
  }

  .in-left {
    float: left;
    width: 70%;
    height: 1000px;
  }

  .all-in {
    width: 80%;
    margin: auto;
  }

  .date-show {
    width: 100%;
    height: 100px;
    font-size: 10px
  }

  /deep/ .el-calendar-day {
    height: 20px;
  }
</style>
<style>
  /deep/ .el-calendar-day {
    height: 20px;
  }
</style>
