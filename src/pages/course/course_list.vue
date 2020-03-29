<template>
  <el-row >
    <el-col :span="24" v-for="(item,index) in dataSource" :key="index" :value="item">
      <el-card :body-style="{ padding: '0px' }">
        <img :src='item.cover' class="image">
        <div style="padding: 14px;">
          <span>{{item.cover}}</span>
          <div class="bottom clearfix">
            <time class="time">时间</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
      dataSource: [],
      source:'D:/experiment/image/',
    }
  },
  methods: {
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
          for(let i = 0;i<dataSource.length;i++){
            let cover = dataSource[i].cover
            dataSource[i].cover = require('D:/experiment/image/'+cover)
            console.log("dataSource",dataSource)
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

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width:80%;
    height:200px;
    display: block;
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
