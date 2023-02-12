<template>
  <div ref="show">
    <div class="show-bar">
      <div class="tab-view">
        <p class="isAct">
          Change the world by code <i class="el-icon-loading"></i>
        </p>
      </div>
      <div class="search-view">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <el-select
            :popper-append-to-body="false"
            v-model="select"
            slot="prepend"
          >
            <el-option label="全文" value="content"></el-option>
            <el-option label="标题" value="title"></el-option>
          </el-select>
          <el-button slot="append" @click="search">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div v-if="isSearch" style="margin-bottom: 10px">
      <el-alert
        :title="searchResult.tip"
        :type="searchResult.data.length === 0 ? 'warning' : 'success'"
        close-text="清除搜索"
        show-icon
        @close="returnAll"
      >
        <slot>{{ `搜索到 ${searchResult.data.length} 条内容` }}</slot>
      </el-alert>
    </div>
    <div class="show-list">
      <div
        class="show-item"
        v-for="item in articles"
        :key="item.index"
        @click="toDetail(item)"
      >
        <div class="top-show">
          <p class="title">{{ item.title }}</p>
          <p class="author">{{ item.author }}</p>
        </div>

        <div class="center-show">
          <div class="main-show">
            <p class="info">
              {{ item.intro }}
            </p>
            <div class="bottom-show">
              <div class="tags">
                <div class="tag" v-for="(tag, index) in item.tags" :key="index">
                  <span></span>
                  <p>{{ tag }}</p>
                </div>
              </div>
              <p class="time">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style="margin-top: 100px"
        v-if="
          $store.state.ArticleIsAll === false &&
          $store.state.searchArticles.length === 0
        "
      >
        <div v-if="$store.state.searchArticles.length === 0">
          <el-empty description="暂无内容"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: { type: Array },
  },
  data() {
    return {
      input: "",
      select: "title",
      isSearch: false,
      searchResult: [],
    };
  },
  methods: {
    toDetail(e) {
      this.$router.push({
        name: "detail",
        query: {
          id: e._id,
          author_id: e.author_id,
        },
      });
    },
    async search() {
      if (this.input === "") {
        return this.$message.warning({
          showClose: true,
          message: "不可搜索空值",
        });
      }
      const query = this.$qs.stringify({
        select: this.select,
        input: this.input,
      });
      const { data } = await this.$http.searchByInput(query);
      this.isSearch = true;
      this.$store.commit("toSearch", false);
      this.$store.commit("searchArticles", data.data);
      this.searchResult = data;
      console.log(data);
    },
    returnAll() {
      this.isSearch = false;
      this.$store.commit("toSearch", true);
      this.input = "";
    },
  },
};
</script>
<style lang="less" scoped>
@import url("@/assets/less/index.less");
.show-bar {
  .row();
  align-items: center;
  justify-content: space-between;
  width: 916px;
  height: 50px;
  margin-bottom: 12px;
  // border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  // border-bottom: 1px solid #dfe0e2;
  .tab-view {
    .row();
    align-items: center;
    p {
      margin-right: 10px;
      font-size: 16px;
      color: #999;
      cursor: pointer;
    }
    .isAct {
      color: rgb(237, 193, 57);
      font-weight: 500;
    }
  }
  .search-view {
    width: 450px;
    /deep/ .el-select .el-input {
      width: 100px;
    }
    /deep/ .el-input__inner {
      text-align: left;
    }
  }
}
.back-top {
  position: fixed;
  bottom: 40px;
  right: 360px;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.show-list {
  position: relative;
  width: 100%;
  // min-height: 560px;
  // background-color: pink;
  .column();
  align-items: center;
  .show-item {
    width: 100%;
    min-height: 150px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dfe0e2;
    cursor: pointer;
    .column();
    align-items: center;
    &:last-child {
      margin-bottom: 0px;
    }
    .top-show {
      .row();
      justify-content: space-between;
      width: 916px;
      padding: 10px 0;
      border-bottom: 1px solid #dfe0e2;
      .title {
        width: 50%;
        font-size: 16px;
        font-weight: 700;
        line-height: 18px;
        text-align-last: left;
        letter-spacing: 1px;
        color: #444;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; //行数
      }
      .author {
        // color: @orange;
        font-weight: 550;
        span {
          color: #86909c;
        }
      }
    }

    .center-show {
      .row();
      width: 916px;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .main-show {
        .column();
        align-items: center;
        justify-content: space-between;
        width: 916px;
        height: 130px;
        .info {
          align-self: flex-start;
          display: -webkit-box;
          font-size: 14px;
          letter-spacing: 1px;
          color: #86909c;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4; //行数
        }
        .bottom-show {
          .row();
          align-items: center;
          width: 916px;
          justify-content: space-between;
          .tags {
            .row();
            align-items: center;
            width: 600px !important;
            height: 18px;
            overflow: hidden;
            // text-overflow: ellipsis;
            .tag {
              .row();
              align-items: center;
              padding-right: 10px;
              font-size: 14px;
              color: #86909c;
              span {
                display: block;
                margin-right: 10px;
                width: 4px;
                height: 18px;
                background-color: #eeef9e;
              }
            }
          }
          .time {
            min-width: 120px;
            font-size: 14px;
            color: #86909c;
          }
        }
      }
      .img {
        width: 210px;
        height: 130px;
        border-radius: 4px;
      }
    }
  }
}
</style>