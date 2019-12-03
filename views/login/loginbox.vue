<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
    size="default"
  >
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入账号"
      >
        <i
          slot="prefix"
          class="fa fa-user-circle-o"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        ></i>
        <i
          slot="prefix"
          class="fa fa-keyboard-o"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="34">
        <el-col :span="14">
          <el-input
            @keyup.enter.native="handleLogin"
            :maxlength="code.len"
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
          >
            <i
              slot="prefix"
              class="fa fa-shield"
            ></i>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span
              class="login-code-img"
              @click="refreshCode"
              v-if="code.type === 'text'"
            >{{code.value}}</span>
            <img
              v-else
              :src="code.src"
              class="login-code-img"
              @click="refreshCode"
              alt=""
            />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button
        type="info"
        :loading="loading"
        @click.native.prevent="handleLogin"
        class="login-submit"
      >登 录
      </el-button>
    </el-form-item>
  </el-form>
</template>



<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import util from "yu-admins/utils/util";
import localeMixin from "yu-admins/locales/mixin.js";
export default {
  mixins: [localeMixin],
  data() {
    return {
      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 快速选择用户
      dialogVisible: false,
      loginForm: {
        username: "admin",
        password: "123",
        code: "",
        redomStr: ""
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" }
        ]
      },
      passwordType: "password",
      loading: false,
      // 表单
      formLogin: {
        username: "admin",
        password: "admin",
        code: "v9am"
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("yuadmin/account", ["login"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.handleLogin();
    },
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    refreshCode() {
      this.loginForm.redomStr = util.randomLenNum(this.code.len, true);
      this.code.value = util.randomLenNum(this.code.len);
      this.loginForm.code = this.code.value;
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || "/");
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败，请检查");
        }
      });
    }
  }
};
</script>