<template>
  <div>
    <div class="operate-course">
      <div class="operate-list">
        <i class="el-icon-plus" @click="onAddCourse()" style="padding: 10px" ></i>
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
            <el-image
              class="image"
              :src="require('D:/experiment/fileBase/'+item.cover+'.jpg')"
              fit="contain"
              slot="reference"></el-image>
          </el-popover>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'course_list',
    components: {},
    props: {
      // 列宽自动伸缩
      searchType: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        selectInput: '',
        dataSource: [],
        source: 'D:/experiment/image/',
        imageSource: {},
      }
    },
    methods: {
      onAddCourse(){
        console.log("新增课程")
        this.$emit("addCourse")
      },
      onEdit(item){
        console.log("修改",item)
      },
      onSetting(item){
        console.log("设置",item)
      },
      onDelete(item){
        console.log("删除",item)
      },
      //搜索
      handleSelect(item) {
        console.log("select", item);
      },
      initData() {
        let path = 'api/course/getCourseList'
        let args = {
          searchType: this.searchType
        }
        console.log(this.form)
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
            this.restaurants = dataSource
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

  .iconActive{
    color: red;
  }
  .course-list {
    float: right;
    width: 100%;
  }

  .operate-course {
  }
  .operate-list{
    float: left;
  }
  .select-input{
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
