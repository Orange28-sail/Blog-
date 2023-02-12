<template>
  <div class="manage">
    <el-alert
      :title="'您一共发布了 ' + articles.length + ' 条博文'"
      type="success"
      center
      :closable="false"
      style="margin-bottom: 20px"
    >
    </el-alert>
    <el-table
      :data="articles"
      border
      style="width: 100%"
      empty-text="暂无文章信息"
    >
      <el-table-column fixed prop="time" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="240"> </el-table-column>
      <el-table-column
        popper-class="popo"
        prop="intro"
        label="简介"
        width="360"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column label="标签" width="240" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <el-tag
            style="margin-right: 10px"
            v-for="(item, index) in row.tags"
            :key="index"
          >
            {{ item }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column prop="author" label="作者" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetail(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <template>
            <el-popconfirm
              title="确定删除该文章吗？"
              @confirm="remove(scope.row)"
              confirm-button-type="text"
            >
              <el-button
                style="margin-left: 12px"
                type="text"
                size="small"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    toDetail(e) {
      // console.log(e);
      this.$router.push({
        name: "detail",
        query: {
          id: e._id,
          author_id: e.author_id,
        },
      });
    },
    edit(e) {
      // console.log(e);
      this.$router.push({
        name: "article",
        params: {
          _id: e._id,
        },
      });
    },
    async remove(e) {
      const { data } = await this.$http.deleteArticle(
        this.$qs.stringify({
          id: e._id,
        })
      );
      if (data.status === 0) {
        this.$message.success({
          showClose: true,
          message: "删除成功",
        });
        this.getAllArticle();
      } else {
        this.$message.error({
          showClose: true,
          message: "删除失败",
        });
      }
    },
    async getAllArticle() {
      const { data } = await this.$http.getPrivateArticle();
      if (data.status === 0) {
        this.articles = data.data.reverse();
      } else {
        this.articles = [];
      }
    },
  },
  created() {
    this.getAllArticle();
  },
  activated() {
    this.getAllArticle();
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.manage {
  .column();
  align-items: center;
  .page {
    position: absolute;
    bottom: 20px;
  }
}
</style>