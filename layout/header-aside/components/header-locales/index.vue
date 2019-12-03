<template>
  <el-dropdown
    placement="bottom"
    size="small"
    @command="onChangeLocale"
  >
    <el-button
      class="yu-mr btn-text can-hover"
      type="text"
    >
      <yu-icon
        name="language"
        style="font-size: 16px;"
      />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="language in $languages"
        :key="language.value"
        :command="language.value"
      >
        <yu-icon
          :name="$i18n.locale === language.value ? 'dot-circle-o' : 'circle-o'"
          class="yu-mr-5"
        />
        {{ language.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import localeMixin from "../../../../locales/mixin.js";
export default {
  mixins: [localeMixin]
};
</script>
