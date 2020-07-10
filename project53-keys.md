#### 09 -项目-用户管理-用户列表-分页组件-文档-引入
>该接口支持分页url参数中有pagenum pagesize
1.@size-chuang 每页显示条数变化时触发
2.@current-chuang 当前页改变时触发
current-page 设置当前页是第几页
page-size 设置显示多少条
total数据总数
#### 10-项目-用户管理-用户列表-分页组件-分页请求
1.current-page="pagenum"
2.page-size=2
3.:total="total"
#### 11-项目-用户管理-用户列表-分页组件-分页请求
1.每页显示条数改变->this.pagesize = val -> this.getUseList()
2.页码改变时-> this.pagenum = val -> this.getUseList()
3.希望每页条数改变时从第一开始显示this.pagenum = 1 -> currpage = 1
#### 12项目-用户管理-用户列表-搜索用户
1.给搜索输入框绑定query v-model="query"
2.点击搜索按钮发送请求 query
3.一键清除clearable
4.点击清除按钮->重新获取数据
```html
<el-input @clear="loadUserList()" clearable placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
```
#### 13项目-用户管理-用户列表-添加用户-显示对话框
1.引入对话框->el-form
2.点击添加用户的按钮->显示对话框 this.dialogFormVisibleAdd = true
3.配置对话框
3.1 :model=form:{看接口文档中添加用户时用哪个数据}
3.2 dialogFormVisibleAdd:false
3.3 el-form->el-input-> v-model="form.xxx"
#### 14项目-用户管理-用户列表-添加用户-发送请求

#### 15-项目-用户管理-用户列表 -添加用户-处理响应

#### 16-项目-用户管理-用户列表-删除用户-打开确认框
>this.$confirm().then().catch()
1.点击确定->.then的参数
2.点击取消->.catch的参数
#### 20-项目-用户管理-用户列表-合并分支-推送分支
1. git add .
2. git commit -m "注释"
3. git branch
4. git checkout master
5. git merge dev-login
6. git push
#### 21-项目-权限管理-角色列表-创建分支
1. git checkout -b dev-rights

