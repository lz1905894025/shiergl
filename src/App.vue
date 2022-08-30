<template>
  <div class="app">
    <div class="header">
      <span>用户管理</span>
    </div>
    <div class="main">
      <div class="top">
        <el-button type="success" @click="showAU('add')">新建</el-button>
        <el-input
          placeholder="按关键字搜索用户"
          clearable
          v-model="selectInput"
          @input="selectUsers"
        />
        <el-button type="info">撤销</el-button>
      </div>

      <div class="center">
        <el-table
          :data="myData.showInfos"
          style="width: 100%"
          ref="selectedUsers"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column prop="birth" label="年龄" width="100" />
          <el-table-column prop="gender" label="性别" width="100" />
          <el-table-column prop="phone" label="联系电话" width="150" />
          <el-table-column prop="address" label="详细地址" />
          <el-table-column
            label="操作"
            fixed="right"
            width="150"
            align="center"
          >
            <template #default="scope">
              <el-button size="small" @click="showAU(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="deleteUser(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="footer">
        <el-button type="danger" @click="deleteUsers">批量删除</el-button>
      </div>
    </div>

    <!-- 这是弹出层 -->
    <el-dialog
      v-model="showOperate"
      :title="title"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="body">
        <ul>
          <li><span>姓名</span><el-input v-model="myData.user.name" /></li>
          <li>
            <span>性别</span>
            <el-select v-model="myData.user.gender">
              <el-option
                v-for="item in genderOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </li>
          <li><span>联系电话</span><el-input v-model="myData.user.phone" /></li>
          <li>
            <span>生日</span
            ><el-date-picker
              type="date"
              placeholder="Pick a day"
              v-model="myData.birthValue"
              @change="dateChange"
            />
          </li>

          <li class="bigLi">
            <span>详细地址</span>
            <div class="addressInput">
              <el-cascader
                :options="cityOptions"
                v-model="myData.addressValue"
                @change="handleChange"
              />
              <el-input
                placeholder="请输入详细地址"
                v-model="myData.user.address.detail"
              />
            </div>
          </li>
        </ul>
        <div class="bottom">
          <el-button type="info" plain @click="closeDialog">取消</el-button>
          <el-button type="primary" plain @click="operate">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref, reactive, computed } from "vue";
// import { ElButton } from "element-plus";

// 类型导入
import { user, Data, address } from "./ts/type";

// 逻辑处理
import { getInitData, getRandomId } from "./ts/index";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // 我的数据
    let myData: Data = reactive({
      userInfos: [],
      showInfos: [],
      user: {
        id: 0,
        name: "",
        gender: 1,
        birth: new Date().getFullYear(),
        phone: "",
        address: {
          province: "",
          city: "",
          county: "",
          detail: "",
        },
      },
      addressValue: [],
      birthValue: new Date(),
    });
    // 搜索框的值
    let selectInput = ref("");
    // 弹出层的值
    let showOperate = ref(false);
    // 弹出层的标题
    let title = ref("");

    // 获取那个多选的
    const selectedUsers = ref();

    const curYear = new Date().getFullYear();

    // 下拉选择器的数据
    // 性别
    const genderOptions = [
      {
        value: 1,
        label: "男",
      },
      {
        value: 0,
        label: "女",
      },
    ];
    // 城市
    const cityOptions = [
      {
        value: "湖南省",
        label: "湖南省",
        children: [
          {
            value: "长沙市",
            label: "长沙市",
            children: [{ value: "醴陵市", label: "醴陵市" }],
          },
        ],
      },
    ];

    // 初始化数据
    getInitData().then((data: any) => {
      myData.userInfos = data as user[];
      parseData(myData.userInfos);
    });

    // 删除 操作
    const deleteUser = (row: user) => {
      const index = myData.userInfos.findIndex(
        (user: user) => user.id === row.id
      );
      myData.userInfos.splice(index, 1);
      parseData(myData.userInfos);
      selectInput.value = "";
    };

    // 批量删除
    const deleteUsers = () => {
      selectedUsers.value.forEach((user: user) => {
        deleteUser(user);
      });
    };

    // 获取选择的用户(可多选)
    const handleSelectionChange = (val: user[]) => {
      selectedUsers.value = val;
    };

    // 查找用户
    const selectUsers = () => {
      const newInfos = myData.userInfos.filter((user: user) => {
        return user.name.startsWith(selectInput.value);
      });
      console.log(newInfos);
      parseData(newInfos);
    };

    // 展示弹出层
    const showAU = (type: any) => {
      title.value = type === "add" ? "新建用户" : "编辑用户";
      if (title.value === "编辑用户") {
        myData.user = type;
        myData.addressValue = [
          myData.user.address.province,
          myData.user.address.city,
          myData.user.address.county,
        ];
      }
      showOperate.value = true;
    };

    // 关闭弹出层
    const closeDialog = () => {
      myData.user = {
        id: 0,
        name: "",
        gender: 1,
        birth: new Date().getFullYear(),
        phone: "",
        address: {
          province: "",
          city: "",
          county: "",
          detail: "",
        },
      };
      myData.addressValue = [];
      myData.birthValue = new Date();
      showOperate.value = false;
    };

    // 执行的逻辑 点击保存
    // 分两种 一种是添加用户  一种是修改用户 可以通过title 来判断是执行的哪个操作
    const operate = () => {
      // 先对 传过来的值 做校验
      // if (checkUserInfo) {
      if (true) {
        if (title.value === "新建用户") {
          saveUser();
        } else {
          updateUser();
        }
        parseData(myData.userInfos);
      } else {
        // 做一些处理
      }
      showOperate.value = false;
    };

    // 做校验
    const checkUserInfo = () => {
      return true;
    };

    // 添加用户
    const saveUser = () => {
      myData.user.id = getRandomId();
      myData.userInfos.push(myData.user);
      myData.user = {
        id: 0,
        name: "",
        gender: 1,
        birth: new Date().getFullYear(),
        phone: "",
        address: {
          province: "",
          city: "",
          county: "",
          detail: "",
        },
      };
      myData.addressValue = [];
      myData.birthValue = new Date();
    };

    // 修改用户
    const updateUser = () => {
      const index = myData.userInfos.findIndex(
        (user) => user.id === myData.user.id
      );
      myData.userInfos[index] = Object.assign({}, myData.user);
      console.log("编辑用户");
    };

    // 日期
    const dateChange = () => {
      myData.user.birth = myData.birthValue.getFullYear();
    };

    //
    const handleChange = () => {
      const addressObj = {
        province: myData.addressValue[0],
        city: myData.addressValue[1],
        county: myData.addressValue[2],
      };
      myData.user.address = addressObj as address;
    };

    // 将后台数据转换为表格展示的数据
    const parseData = (userData: any) => {
      userData.map((user: any) => {
        if (user.birth > 1000) {
          user.birth = curYear - user.birth;
        }
        user.gender = user.gender ? "男" : "女";
        if (typeof user.address === "object") {
          user.address = `${user.address.province} ${user.address.city} ${user.address.county} ${user.address.detail}`;
        }
      });
      myData.showInfos = userData;
    };

    return {
      myData,
      selectInput,
      showOperate,
      title,
      genderOptions,
      cityOptions,
      deleteUser,
      deleteUsers,
      handleSelectionChange,
      selectUsers,
      showAU,
      closeDialog,
      operate,
      handleChange,
      dateChange,
    };
  },
});
</script>

<style lang="less">
@import url("./assets/css/reset.less");
</style>
<style lang="less">
.app {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10rem;
    margin-bottom: 2rem;
    background-color: #ebecec;
    span {
      font-size: 1.6rem;
      letter-spacing: 0.2rem;
      color: #262626;
      font-weight: 600;
    }
  }
  .main {
    width: 80%;
    .top {
      display: flex;
      margin-bottom: 2rem;
    }
    .center {
      margin-bottom: 1rem;
    }
    .footer {
    }
  }

  .body {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 40%;
        margin-bottom: 1.5rem;
        span {
          display: block;
        }
      }
      .bigLi {
        width: 100%;
        .addressInput {
          display: flex;
        }
      }
    }
    .bottom {
    }
  }
}
</style>
