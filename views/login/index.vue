<template>
  <div
    class="login-container"
    @keyup.enter.native="handleLogin"
  >
    <div class="login-border">
      <div class="login-main">
        <div class="login-logo">
          <img
            src="./image/logo-co.png"
            alt="logo"
          >
        </div>
        <loginBox></loginBox>
      </div>
    </div>
  </div>
</template>

<script>
import loginBox from "./loginbox";
export default {
  name: "login",
  components: {
    loginBox
  },
  data() {
    return {
      activeName: "user"
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-image: url("./image/bg2.jpg");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 55px 25px 55px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-logo {
  margin: 0 0 20px;
  text-align: center;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>
