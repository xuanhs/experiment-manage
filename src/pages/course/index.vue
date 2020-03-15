<template>
  <div>
    <div class="operate-course">
      <el-col>
        <el-button @click="addCourse">创建课程</el-button>
      </el-col>
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
</style>
