<!--
 * @Description: 菜单组件，用于首页商品展示模块的右上角菜单
 -->
<template>
<el-menu :default-openeds="['1']">
  <el-submenu index="1">
    <template slot="title"><i class="el-icon-menu"></i>工单管理</template>
    <el-menu-item-group>
      <el-menu-item index="1-1" @click="jump_to_orders">工单列表</el-menu-item>
      <el-menu-item index="1-2" @click="jump_to_actions">类型</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title"><i class="el-icon-menu"></i>护工管理</template>
    <el-menu-item-group>
      <el-menu-item index="2-1" @click="jump_to_caregivers">护工列表</el-menu-item>
    </el-menu-item-group>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
    <el-menu-item-group>
      <!-- <el-menu-item index="2-1">权限</el-menu-item> -->
      <!-- <el-menu-item index="2-2">角色</el-menu-item> -->
      <el-menu-item index="2-3" @click="jump_to_users" >系统用户</el-menu-item>
    </el-menu-item-group>
  </el-submenu>

</el-menu>
</template>

<script>
export default {
  props: ["val"],
  name: "MyMenu",
  data() {
    return {
      activeClass: 1
    };
  },
  methods: {
    // 通过mouseover事件控制当前显示的商品分类，1为该类别的热门商品
    mouseover(e, val) {
      this.activeClass = val;
    },
    jump_to_orders() {
      this.$router.push({
        path: '/orders'
      })
    },
    jump_to_categories() {
      this.$router.push({
        path: '/categories'
      })
    },
    jump_to_caregivers() {
      this.$router.push({
        path: '/caregivers'
      })
    },

    jump_to_users() {
      this.$router.push({
        path: '/users'
      })
    },
    jump_to_actions() {
      this.$router.push({
        path: '/actions'
      })
    },
  },
  watch: {
    // 向父组件传过去当前要显示的商品分类，从而更新商品列表
    activeClass: function (val) {
      this.$emit("fromChild", val);
    }
  }
};
</script>

<style scoped>
</style>
