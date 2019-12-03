<template>
  <el-tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <el-button class="yu-mr btn-text can-hover" type="text" @click="toggle">
      <yu-icon v-if="active" name="compress"/>
      <yu-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('yuadmin/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('yuadmin/fullscreen', [
      'toggle'
    ])
  }
}
</script>
