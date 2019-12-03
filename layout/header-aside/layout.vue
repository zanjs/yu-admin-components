<template>
  <div
    class="yu-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}"
  >
    <!-- 半透明遮罩 -->
    <div class="yu-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div
      class="yu-layout-header-aside-content"
      flex="dir:top"
    >
      <!-- 顶栏 -->
      <div
        class="yu-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex
      >
        <div
          class="logo-group"
          :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          flex-box="0"
        >
          <img
            v-if="asideCollapse"
            :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`"
          >
          <img
            v-else
            :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`"
          >
        </div>
        <div
          class="toggle-aside-btn"
          @click="handleToggleAside"
          flex-box="0"
        >
          <yu-icon name="bars" />
        </div>
        <yu-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div
          class="yu-header-right"
          flex-box="0"
        >
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <yu-header-search @click="handleSearchClick" />
          <yu-header-log />
          <yu-header-fullscreen />
          <yu-header-size />
          <yu-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div
        class="yu-theme-container"
        flex-box="1"
        flex
      >
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="yu-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }"
        >
          <yu-menu-side />
        </div>
        <!-- 主体 -->
        <div
          class="yu-theme-container-main"
          flex-box="1"
          flex
        >
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div
              v-if="searchActive"
              class="yu-theme-container-main-layer"
              flex
            >
              <yu-panel-search
                ref="panelSearch"
                @close="searchPanelClose"
              />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div
              v-if="!searchActive"
              class="yu-theme-container-main-layer"
              flex="dir:top"
            >
              <!-- tab -->
              <div
                class="yu-theme-container-main-header"
                flex-box="0"
              >
                <yu-tabs />
              </div>
              <!-- 页面 -->
              <div
                class="yu-theme-container-main-body"
                flex-box="1"
              >
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yuMenuSide from "./components/menu-side";
import yuMenuHeader from "./components/menu-header";
import yuTabs from "./components/tabs";
import yuHeaderFullscreen from "./components/header-fullscreen";
import yuHeaderLocales from "./components/header-locales";
import yuHeaderSearch from "./components/header-search";
import yuHeaderSize from "./components/header-size";
import yuHeaderUser from "./components/header-user";
import yuHeaderLog from "./components/header-log";
import { mapState, mapGetters, mapActions } from "vuex";
import mixinSearch from "./mixins/search";
export default {
  name: "yu-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    yuMenuSide,
    yuMenuHeader,
    yuTabs,
    yuHeaderFullscreen,
    yuHeaderLocales,
    yuHeaderSearch,
    yuHeaderSize,
    yuHeaderUser,
    yuHeaderLog
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: "200px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px"
    };
  },
  computed: {
    ...mapState("yuadmin", {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters("yuadmin", {
      themeActiveSetting: "theme/activeSetting"
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...(this.themeActiveSetting.backgroundImage
          ? {
              backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
            }
          : {})
      };
    }
  },
  methods: {
    ...mapActions("yuadmin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    }
  }
};
</script>

<style lang="scss">
// 注册主题
@import "../../theme/register.scss";
</style>
