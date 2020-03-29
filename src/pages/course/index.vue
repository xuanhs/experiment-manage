<template>
  <div class="all-in">
    <div class="in-left">
      <div class="operate-course">
        <i class="el-icon-edit"></i>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
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
            <courseList :searchType='1'></courseList>
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

    </div>
    <!-- 弹窗区 -->
    <addCourseDialog v-if="isAddCourseDialog"></addCourseDialog>
  </div>

</template>
<script>
import addCourseDialog from '@/pages/course/add_course_dialog.vue'
import courseList from '@/pages/course/course_list.vue'
export default {
  name: 'index',
  data() {
    return {
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
      this.isAddCourseDialog = true
      console.log("this" + this.isAddCourseDialog)
    }
  },
  components: { addCourseDialog, courseList }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-course {
  width: 100%;
  height: 100%;
}

.operate-course {
  height: 50px;
}
.in-right{
  float: right;
  width: 20%;
  height: 1000px;
  background: aliceblue;
}
.in-left{
  float: left;
  width: 70%;
  height: 1000px;
}
  .all-in{
    width: 80%;
    margin: auto;
  }
</style>
