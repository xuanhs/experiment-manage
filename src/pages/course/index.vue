<template>
  <div class="all-in">
    <div class="in-left">
      <div>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="show-course"

        >
          <el-tab-pane
            label="我创建的课程"
            name="create"

          >
            <courseList :searchType='1' @addCourse="addCourse"></courseList>
          </el-tab-pane>
          <el-tab-pane
            label="我加入的课程"
            name="join"
          >
            <courseList :searchType='0'></courseList>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="in-right">
      <div class="date-show">
        <el-calendar v-model="dateValue"
                     height="15px">
        </el-calendar>
      </div>
    </div>
    <!-- 弹窗区 -->
    <addCourseDialog v-if="isAddCourseDialog" @closeDialog="closeDialog"></addCourseDialog>
  </div>

</template>
<script>
  import addCourseDialog from '@/pages/course/add_course_dialog.vue'
  import courseList from '@/pages/course/course_list.vue'

  export default {
    name: 'index',
    data() {
      return {
        dateValue: new Date(),
        activeName: "create",
        isTeacher: true,
        isAddCourseDialog: false,
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addCourse() {
        console.log("新增课程弹窗")
        this.isAddCourseDialog = true
      },
      closeDialog(){
        this.isAddCourseDialog = false
      }
    },
    components: {addCourseDialog, courseList}
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
