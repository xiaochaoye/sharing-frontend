import Login from "../views/user/Login-Register.vue";
import ArticleEditor from "../views/articles/ArticleEditor.vue";
import ShowArticle from "../views/articles/ShowArticle.vue";
import UserInfo from "../views/user/UserInfo.vue";

const routes = [
      {path: '/login', title: '登录注册页', component: Login},
      {path: '/write', title: '写文章', component: ArticleEditor},
      {path: '/read', title: '读文章', component: ShowArticle},
      {path: '/edit', title: '编辑个人信息', component: UserInfo}
]

export default routes;