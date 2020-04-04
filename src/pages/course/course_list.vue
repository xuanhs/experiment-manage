<template>
  <div :style="{backgroundImage: bodyBgImage }">
    <div class="operate-course">
      <div class="operate-list" v-if="searchType == 1">
        <i class="el-icon-plus" @click="onAddCourse()" style="padding: 10px"></i>
      </div>

      <div style="float: right">
        <el-button type="primary" icon="el-icon-search" @click="handleSelect">搜索</el-button>
      </div>
      <el-input
        class="select-input"
        placeholder="请输入课程名称"
        v-model="selectInput"
        clearable>
      </el-input>
    </div>
    <div class="course-list">
      <el-row>
        <el-col :span="12" v-for="(item,index) in dataSource" :key="index" :value="item">
          <el-popover
            placement="left-start"
            :title="item.name"
            width="200"
            trigger="hover">
            <span>课程名称：</span>
            <span>{{item.name}}</span>
            <br>
            <span>任课教师：</span>
            <span>{{item.teacherName}}</span>
            <br>
            <span>简介：</span>
            <p>{{item.explanation}}</p>
            <br>
            <div v-if="searchType == 1" class="course-icon-list">
              <i @click="onEdit(item)" class="el-icon-edit" style="padding: 10px"></i>
              <i @click="onSetting(item)" class="el-icon-setting" style="padding: 10px"></i>
              <i @click="onDelete(item)" class="el-icon-delete" style="padding: 10px"></i>
            </div>
            <div v-if="searchType == 2" class="course-icon-list">
              <i @click="onApply(item)" class="el-icon-user" style="padding: 10px">申请加入</i>
            </div>
            <el-image
              class="image"
              :src="require('D:/experiment/fileBase/'+item.cover+'.jpg')"
              fit="contain"
              slot="reference"></el-image>
          </el-popover>
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗区 -->
    <addCourseDialog v-if="isAddCourseDialog" @closeDialog="closeDialog" type="edit"
                     :course="data"></addCourseDialog>
  </div>

</template>
<script>
  import addCourseDialog from '@/pages/course/add_course_dialog.vue'

  export default {
    name: 'course_list',
    components: {addCourseDialog},
    props: {
      searchType: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        bodyBgImage: 'url(' + require('D:/experiment/fileBase/default.jpg') + ')',
        selectInput: '',
        dataSource: [],
        source: 'D:/experiment/image/',
        imageSource: {},
        data: {},
        isAddCourseDialog: false,
      }
    },
    methods: {
      closeDialog() {
        this.initData()
        this.isAddCourseDialog = false
      },
      onApply(item) {
        console.log("申请加入课程")
      },
      onAddCourse() {
        console.log("新增课程")
        this.$emit("addCourse")
      },
      onEdit(item) {
        console.log("编辑课程", item)
        this.data = item
        this.isAddCourseDialog = true
      },
      onSetting(item) {
        this.$router.push(
          {
            name: 'course_setting',
            params:
              {
                id: item.id
              }
          }
        )
      },
      onDelete(item) {
        console.log("删除", item)
      },
      //搜索
      handleSelect() {
        console.log("select", this.selectInput);
        if (!this.selectInput) {
          this.initData()
          return;
        }
        if (this.searchType == 0 || this.searchType == 1) {
          this.searchCourseBySearchType()
        } else {
          this.searchCourseByName();
        }
      },
      searchCourseBySearchType() {
        this.initData()
      },
      searchCourseByName() {
        let path = 'api/user/course/searchCourse'
        let args = {
          name: this.selectInput
        }
        this.$http.post(path, args).then(res => {
          console.log(res.data.status === 200)
          if (res.data.data) {
            let dataSource = res.data.data
            console.log("dataSource", dataSource)
            for (let i = 0; i < dataSource.length; i++) {
              let file = dataSource[i].fileBase
              if (!file) {
                dataSource[i].cover = ""
                continue
              }
              let name = file.memoryName
              dataSource[i].cover = name
            }
            this.dataSource = dataSource
          } else if (res.data.data.code === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('搜索失败')
          }
        })
      },
      initData() {
        let path = 'api/user/course/getCourseList'
        let args = {
          searchType: this.searchType,
          name: this.selectInput
        }
        this.$http.post(path, args).then(res => {
          console.log(res.data.status === 200)
          if (res.data.data) {
            let dataSource = res.data.data
            console.log("dataSource", dataSource)
            for (let i = 0; i < dataSource.length; i++) {
              let file = dataSource[i].fileBase
              if (!file) {
                dataSource[i].cover = ""
                continue
              }
              let name = file.memoryName
              dataSource[i].cover = name
            }
            this.dataSource = dataSource
          } else if (res.data.data.code === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error('查询失败')
          }
        })
      }
    },
    created() {
      this.initData()
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
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
