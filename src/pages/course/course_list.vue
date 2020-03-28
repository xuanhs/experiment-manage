<template>
  <el-table
    :data="dataSource"
    style="width: 100%"
  >
    <el-table-column
      prop="name"
      label="课程名称"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="teacherName"
      label="所属教师"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="explanation"
      label="说明"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="cover"
      label="封面"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)"
        >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
      dataSource: []
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
          this.dataSource = res.data.data
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
