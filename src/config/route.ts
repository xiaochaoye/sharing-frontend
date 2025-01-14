import Login from "../views/user/Login-Register.vue";
import ArticleEditor from "../views/articles/ArticleEditor.vue";
import ShowArticle from "../views/articles/ShowArticle.vue";
import UserInfo from "../views/user/UserInfo.vue";
import ArticleList from "../views/articles/ArticleList.vue";
import PersonHomePage from "../views/user/PersonHomePage.vue";
import UserManage from "../views/user/UserManage.vue";
import ChatRoom from "../views/chat/ChatRoom.vue";
import ErrorPage from "../404.vue";

/**
 *    @author 超
 *    定义和导出页面路由
 */

const routes = [
      {path: '/', title: '主页面', redirect:'/list', component: ()=>import("../components/BasicLayout.vue"), children:[
            {path: '/list', title: '平台主页面', component: ArticleList},
            {path: '/write', title: '写文章', component: ArticleEditor},
            {path: '/read', title: '读文章', component: ShowArticle},
            {path: '/edit', title: '编辑个人信息', component: UserInfo},
            {path: '/user', title: '个人主页', component: PersonHomePage},
            {path: '/manage', title: '用户管理', component: UserManage},
            {path: '/chat', title: '知识问答区', component: ChatRoom},
      ]},
      {path: '/login', title: '登录注册页', component: Login},
      { path: '/404', title: '错误页', component: ErrorPage},
      { path: '/:pathMatch(.*)', redirect: '/404' }
]

export default routes;