<template>
  <div class="tags">
    <el-select
      v-model="tags"
      multiple
      placeholder="请选择标签"
      @change="change"
    >
      <el-option
        v-for="item in $store.state.tags"
        :key="item.index"
        :label="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
    };
  },
  methods: {
    change(arr) {
      // console.log(arr);
      //  arr 选中的标签数组
      this.$emit("selTags", arr);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("@/assets/less/index.less");
.tags {
  width: 100%;
  // height: 120px;
  position: relative;
  /deep/ .el-select__tags-text {
    color: #edc139;
  }
  /deep/ .el-input__inner {
    width: 220px;
    padding: 0px 10px;
    color: gray;
    font-size: 14px;
  }
}
</style>