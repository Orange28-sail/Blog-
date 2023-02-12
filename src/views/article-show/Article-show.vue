<template>
  <div class="main">
    <div class="show-view">
      <!-- show -->
      <div class="main-view">
        <template v-if="item === null">
          <h1 style="margin-bottom: 20px">文章正在加载中</h1>
          <i style="font-size: 30px" class="el-icon-loading"></i>
        </template>
        <template v-else>
          <h1 class="title">{{ item.title }}</h1>
          <div class="intro">{{ item.intro }}</div>
          <div class="content">
            <div class="markdown-body" v-html="item.content" v-highlight></div>
          </div>
        </template>
        <!-- 评论区 -->
        <el-divider id="comment" content-position="center"
          ><p ref="comment_sign" id="comment1">Comments</p></el-divider
        >
        <div class="comment-view">
          <!-- 编辑框 -->
          <div class="edit-view">
            <div class="edit-box">
              <div class="edit-top">
                <div class="name">
                  <el-input
                    placeholder="壮士请留名"
                    v-model="master"
                    maxlength="16"
                    minlength="1"
                    clearable
                  >
                    <i slot="prepend" class="el-icon-user-solid"></i>
                  </el-input>
                </div>
                <div class="aite">
                  <el-input
                    placeholder="本文章"
                    v-model="to_name"
                    maxlength="16"
                    minlength="1"
                    clearable
                    disabled
                  >
                    <i slot="prepend" class="el-icon-position"></i>
                  </el-input>
                </div>
              </div>
              <div class="edit-center">
                <el-input
                  type="textarea"
                  placeholder="请输入评论"
                  v-model="comment_content"
                  :autosize="{ minRows: 6 }"
                  maxlength="520"
                  show-word-limit
                  resize="none"
                >
                </el-input>
              </div>
              <div class="edit-bottom">
                <div style="margin-left: 15px">
                  <i class="el-icon-loading"></i
                  ><span style="margin-left: 5px">Say what you think</span>
                </div>
                <div class="sumbit" @click="addComment">评论</div>
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <div class="one-comment-view">
            <div class="one-item" v-for="(one, index) in comments" :key="index">
              <div class="one-view">
                <div class="one-name">
                  {{ one.master }}
                </div>
                <div class="one-comment">
                  {{ one.content }}
                </div>
              </div>
              <div class="one-bottom">
                <div class="one-time">{{ one.time }}</div>
                <el-button
                  type="text"
                  size="mini"
                  @click="addToName(one.master, one._id)"
                  >回复</el-button
                >
              </div>
              <template>
                <div
                  class="two-comment-view"
                  v-for="(two, index) in one.son"
                  :key="index"
                >
                  <div class="two-view">
                    <div class="two-name">
                      <p>
                        {{ two.master }}
                      </p>
                      <span>></span>
                      <p>{{ two.to }}</p>
                    </div>
                    <div class="two-comment">
                      {{ two.content }}
                    </div>
                  </div>
                  <div class="two-bottom">
                    <div class="two-time">2022-04-05</div>
                    <el-button
                      type="text"
                      size="mini"
                      @click="addToName(two.master, one._id)"
                      >回复</el-button
                    >
                  </div>
                </div>
              </template>
            </div>
            <el-empty
              v-if="comments.length === 0"
              description="暂无评论"
            ></el-empty>
          </div>
        </div>
      </div>
      <div class="right-view">
        <div class="class-view">
          <template v-if="item === null">
            <div style="margin-bottom: 20px">标签信息正在加载中</div>
            <i style="font-size: 30px" class="el-icon-loading"></i>
          </template>
          <template v-else>
            <p>分类</p>
            <div class="row">
              <div
                class="class-item"
                v-for="(item, index) in item.tags"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </template>
        </div>
        <div class="info-view">
          <template class="a-tip" v-if="author === null">
            <div style="margin-bottom: 20px">作者信息正在加载中</div>
            <i style="font-size: 30px" class="el-icon-loading"></i>
          </template>
          <template v-else>
            <div class="main-info">
              <template>
                <img :src="author.user_pic" />
                <div class="author-name">{{ author.name }}</div>
              </template>
            </div>
            <div class="intro">{{ author.intro }}</div>
            <div class="time"><span>发布时间：</span>{{ item.time }}</div>
          </template>
        </div>
      </div>

      <el-backtop target=".show-view" :right="40" :bottom="60">
        <div class="back-top">UP</div>
      </el-backtop>
      <div class="to-comment" @click="toComment">
        <i style="font-size: 40px" class="el-icon-s-comment"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import dayjs from "dayjs";
export default {
  name: "detail",
  data() {
    return {
      page_index: 6,
      item: null,
      author: null,
      master: "",
      to_name: "",
      to_id: "",
      comment_content: "",
      comments: [],
    };
  },
  methods: {
    toComment() {
      document.querySelector("#comment1").scrollIntoView();
      // const comment_sign = document.querySelector("#comment").scrollTop;

      // console.log(comment_sign);
    },
    addToName(name, id) {
      this.to_name = name;
      this.to_id = id;
      this.toComment();
    },
    async addComment() {
      if (this.master === "") {
        return this.$message.warning({
          showClose: true,
          message: "匿名不可以为空哦",
          type: "warning",
        });
      }
      if (this.comment_content === "") {
        return this.$message.warning({
          showClose: true,
          message: "内容不可以为空哦",
          type: "warning",
        });
      }
      if (this.to_id === "") {
        // console.log(this.to_id);
        const commentOne = this.$qs.stringify({
          article_id: this.$route.query.id,
          time: dayjs(new Date()).format("YYYY-MM-DD"),
          master: this.master,
          content: this.comment_content,
        });
        const { data } = await this.$http.addCommentOne(commentOne);
        if (data.status === 0) {
          this.$message.success({
            showClose: true,
            message: data.tip,
          });
        }
      } else {
        // console.log(2);
        // console.log("this.to_id :>> ", this.to_id);
        const commentTwo = this.$qs.stringify({
          father: this.to_id,
          time: dayjs(new Date()).format("YYYY-MM-DD"),
          master: this.master,
          content: this.comment_content,
          to: this.to_name,
        });
        const { data } = await this.$http.addCommentTwo(commentTwo);
        if (data.status === 0) {
          this.$message.success({
            showClose: true,
            message: data.tip,
          });
        }
      }
      // console.log(this.comments);
      this.getAllComment();
      this.to_name = "";
      this.to_id = "";
      // console.log("this.to_name :>> ", this.to_name);
      // console.log("this.to_id :>> ", this.to_id);
    },
    async init() {
      this.$store.commit("ctrlIndex", this.page_index);
      this.getDetail();
      this.getAuthorInfo();
      this.getAllComment();
    },
    async getDetail() {
      const query = this.$qs.stringify({
        article_id: this.$route.query.id,
      });
      const { data } = await this.$http.getArticleDetail(query);
      // console.log("data :>> ", data);
      if (data.status === 0) {
        data.data.content = `${marked.parse(data.data.content)}`;
        this.item = data.data;
      }
    },
    async getAuthorInfo() {
      const query = this.$qs.stringify({
        author_id: this.$route.query.author_id,
      });
      const { data } = await this.$http.getAuthorInfo(query);
      if (data.status === 0) {
        this.author = data.data;
      }
    },
    async getAllComment() {
      // console.log(this.$route.query.id);
      const query = this.$qs.stringify({ id: this.$route.query.id });
      // console.log(query);
      const { data } = await this.$http.getAllComment(query);
      // console.log(data);
      if (data.status === 0) {
        this.comments = data.data.reverse();
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
@import url("../../assets//less/markdown-style.css");
.main {
  width: 1496px !important;
  height: 600px;
  background: none !important;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  .column();
  align-items: center;
  .show-view {
    position: relative;
    width: 1072px;
    overflow: scroll;
    min-height: 600px;
    border-radius: 10px;
    .row();
    align-items: center;
    justify-content: space-between;
    // .minScroller();
    .noneScroller();
    .to-comment {
      position: fixed;
      right: 40px;
      bottom: 160px;
      font-size: 40px;
      // width: 40px;
      // height: 40px;
      // border-radius: 50%;
      // background-color: #1890ff;
      color: #1890ff;
      cursor: pointer;
      // text-align: center;
      // line-height: 40px;
    }
    .back-top {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #ffce65;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
      text-align: center;
      font-size: 18px;
      line-height: 40px;
      color: #ffffff;
    }
    .main-view {
      position: absolute;
      top: 0;
      right: 0;
      width: 792px;
      min-height: 600px;
      background-color: #fff;
      border-radius: 10px;
      padding: 30px;
      .title {
        font-size: 1.5rem;
        padding-bottom: 10px;
        padding-left: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
        border-left: 4px solid #ffce65;
        word-break: break-all;
      }
      .intro {
        width: 732px;
        padding: 5px 15px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        margin-bottom: 20px;
        text-indent: 2rem;
        border-left: 2px solid #ffce65;
        word-break: break-all;
      }
      .content {
        width: 732px;
        // min-height: 64px;
        padding: 5px 15px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        border-left: 1px solid #ffce65;
        margin-bottom: 60px;
      }
      #comment {
        color: #ffce65;
        /deep/ .el-divider__text {
          color: #ffce65;
        }
      }
      /deep/ .el-divider {
        background-color: #ffce65;
      }
      .comment-view {
        .column();
        align-items: center;
        width: 732px;
        min-height: 300px;
        height: auto;
        .edit-view {
          width: 732px;
          min-height: 260px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          .row();
          justify-content: space-between;
          .user-img {
            width: 50px;
            height: 50px;
            .row();
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            img {
              width: 40px;
              height: 40px;
              border-radius: 4px;
            }
          }
          .edit-box {
            width: 732px;
            min-height: 230px;
            // border: 1px solid black;
            border-radius: 4px;
            .edit-top {
              .row();
              align-items: center;
              justify-content: space-between;
              .name {
                width: 320px;
              }
              .aite {
                width: 320px;
              }
              margin-bottom: 10px;
            }
            .edit-center {
              width: 732px;
              min-height: 138px;
              overflow: hidden;
              margin-bottom: 10px;
            }
            .edit-bottom {
              width: 732px;
              height: 42px;
              .row();
              align-items: center;
              justify-content: space-between;
              border: 1px solid #dcdfe6;
              border-radius: 4px;
              span {
                color: #1890ff;
              }
              .sumbit {
                width: 88px;
                height: 32px;
                margin-right: 5px;
                background-color: #1890ff;
                border-radius: 4px;
                color: #fff;
                text-align: center;
                font-size: 14px;
                line-height: 32px;
                cursor: pointer;
                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }
        }
        .one-comment-view {
          width: 100%;
          padding-top: 20px;
          .column();
          align-items: center;
          // border: 1px solid #000;
          .one-item {
            width: 100%;
            .column();
            align-items: center;
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
            .one-view {
              .row();
              width: 100%;
              align-items: flex-start;
              justify-content: space-between;
              .one-name {
                margin-top: 15px;
                width: 92px;
                padding: 5px;
                font-size: 12px;
                line-height: 18px;
                text-align: center;
                background-color: #f5f7fa;
                // border: 1px solid #dcdfe6;
                border-radius: 4px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; //行数
              }
              .one-comment {
                width: 630px;
                padding: 10px;
                word-break: break-all;
                border-radius: 4px;
                border-bottom: 1px solid #ffce65;
                border-right: 1px solid #ffce65;
                letter-spacing: 1px;
              }
            }
            .one-bottom {
              width: 630px;
              align-self: flex-end;
              .row();
              align-items: center;
              padding-left: 5px;
              padding-right: 10px;
              justify-content: space-between;
              border-bottom: 1px solid #ffce65;
              border-right: 1px solid #ffce65;
              // border-left: 1px solid #ffce65;
              border-radius: 0 4px;
              .one-time {
                font-size: 12px;
                font-weight: normal;
                color: #ffce65;
              }
            }
            .two-comment-view {
              align-self: flex-end;
              width: 630px;
              padding-top: 20px;
              .column();
              align-items: center;
              justify-content: space-between;
              .two-bottom {
                width: 480px;
                align-self: flex-end;
                .row();
                align-items: center;
                padding-left: 5px;
                padding-right: 10px;
                justify-content: space-between;
                border-bottom: 1px solid #ffce65;
                border-right: 1px solid #ffce65;
                // border-left: 1px solid #ffce65;
                border-radius: 0 4px;
                .two-time {
                  color: #ffce65;
                  font-size: 12px;
                }
              }
              .two-view {
                width: 100%;
                .row();
                align-items: flex-start;
                justify-content: space-between;
                .two-name {
                  margin-top: 20px;
                  width: 150px;
                  padding-right: 10px;
                  line-height: 18px;
                  font-size: 12px;
                  .row();
                  align-items: center;
                  justify-content: space-between;
                  span {
                    display: block;
                    margin: 3px;
                    font-weight: 550;
                    color: #1890ff;
                  }
                  p {
                    width: 60px;
                    text-align: center;
                    line-height: 18px;
                    background-color: #f5f7fa;
                    // border: 1px solid #dcdfe6;
                    border-radius: 4px;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1; //行数
                  }
                }
                .two-comment {
                  width: 480px;
                  padding: 10px;
                  word-break: break-all;
                  border-radius: 4px;
                  border-bottom: 1px solid #ffce65;
                  border-right: 1px solid #ffce65;
                  letter-spacing: 1px;
                }
              }
            }
          }
        }
      }
    }
    .right-view {
      position: sticky;
      top: 0px;
      right: 0px;
      width: 260px;
      min-height: 600px;
      border-radius: 10px;
      .info-view {
        width: 260px;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        .column();
        align-items: center;
        overflow: hidden;
        .main-info {
          width: 100%;
          .row();
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .author-name {
            font-size: 20px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; //行数
          }
        }
        .intro {
          text-indent: 2rem;
          margin-top: 20px;
          align-self: flex-start;
          width: 100%;
          word-break: break-all;
        }
        .time {
          width: 100%;
          margin-top: 20px;
          align-self: flex-start;
          .row();
          align-items: center;
          justify-content: space-between;
          span {
            color: #ffce65;
            display: block;
          }
        }
      }
      .class-view {
        p {
          color: #ffce65;
          margin-bottom: 10px;
        }
        width: 260px;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        .column();
        align-content: flex-start;
        margin-bottom: 20px;
        .row {
          .row();
          flex-wrap: wrap;
          .class-item {
            border: 1px solid #ffce65;
            border-radius: 5px;
            padding: 5px;
            margin: 5px;
            margin-left: 0;
            margin-right: 10px;
            color: #ffce65;
            font-weight: 600;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>