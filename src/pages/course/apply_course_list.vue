<template>
  <div style="width: 80%;margin-right: auto;margin-left: auto">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%;margin-right: auto;margin-left: auto">
      <el-table-column
        prop="name"
        width="180"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        width="180"
        label="联系方式">
      </el-table-column>
      <el-table-column
        width="180"
        label="申请时间">
        <template slot-scope="scope">
          <span>{{formatDate(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status != 0"
            size="mini"
            @click="handleApply(scope.row,1)">同意
          </el-button>
          <el-button
            :disabled="scope.row.status != 0"
            size="mini"
            type="danger"
            @click="handleApply(scope.row,-1)">拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

  export default {
    name: 'course_list',
    components: {},
    props: {
      courseId: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
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
      handleApply(row, status) {
        if (!row) {
          this.$message.warning("出现错误")
        }
        let message = '同意'
        if (status == -1) {
          message = '拒绝'
        }
        this.$confirm('是否' + message + '学生' + row.name + '加入课程 ? ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dealApply(row.id,status)
        }).catch(() => {
        });
      },
      dealApply(id,status){
        let path = 'api/user/course/dealApply'
        let args = {
          id: id,
          status: status,
        }
        let message = '同意'
        if (status == -1) {
          message = '拒绝'
        }
        this.$http.post(path, args).then(res => {
          if (res.data.status == 0) {
            this.$message.success(message+'成功')
          } else if (res.data.status === 1) {
            this.$message.error(res.data.result.reason)
          } else {
            this.$message.error(message+'失败')
          }
        })
      },
      formatDate(value) {
        let date = new Date(value * 1000);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
      init() {
        let path = 'api/user/course/searchApplyMessage'
        let args = {
          courseId: this.courseId
        }
        this.$http.post(path, args).then(res => {
          if (res.data.status == 0) {
            this.tableData = res.data.data
            console.log("applytableData", this.tableData)
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

  .table-center {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .tab-left {
    float: left;
    width: 100px;
  }

  .table-right {
    float: left;
    margin-left: 20px;
  }


</style>
