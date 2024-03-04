import Login from "../views/user/Login-Register.vue";
import ArticleEditor from "../views/articles/ArticleEditor.vue";
import ShowArticle from "../views/articles/ShowArticle.vue";
import UserInfo from "../views/user/UserInfo.vue";
import ArticleList from "../views/articles/ArticleList.vue";

/**
 *    @author 超
 *    定义和导出页面路由
 */

const routes = [
      {path: '/login', title: '登录注册页', component: Login},
      {path: '/write', title: '写文章', component: ArticleEditor},
      {path: '/read', title: '读文章', component: ShowArticle},
      {path: '/edit', title: '编辑个人信息', component: UserInfo},
      {path: '/main', title: '平台主页面', component: ArticleList}
]

export default routes;