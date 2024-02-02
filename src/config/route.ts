import Login from "../views/user/Login.vue";
import ArticleEditor from "../views/articles/ArticleEditor.vue";
import ShowArticle from "../views/articles/ShowArticle.vue";

const routes = [
      {path: '/', title: '登录页', component: Login},
      {path: '/write', title: '写文章', component: ArticleEditor},
      {path: '/read', title: '读文章', component: ShowArticle},
]

export default routes;