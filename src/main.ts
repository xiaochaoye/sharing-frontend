import {createApp} from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import routes from './config/route.ts';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm';
import 'katex/dist/katex.min.css'
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/npm';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createCopyCodePreview from '@kangc/v-md-editor/lib/plugins/copy-code/preview';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
      Prism,
});
VMdPreview.use(vuepressTheme, {
      Prism
})

VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(createKatexPlugin());
VueMarkdownEditor.use(createMermaidPlugin());
VueMarkdownEditor.use(createTodoListPlugin({color: 'blue'}));
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createHighlightLinesPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());

VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createKatexPlugin());
VMdPreview.use(createMermaidPlugin());
VMdPreview.use(createTodoListPlugin({color: 'blue'}));
VMdPreview.use(createLineNumbertPlugin());
VMdPreview.use(createHighlightLinesPlugin());

VMdPreviewHtml.use(createCopyCodePreview());

const app = createApp(App);

const router = VueRouter.createRouter({
      //内部提供了 history 模式的实现。为了简单起见，这里使用 hash 模式。
      history: VueRouter.createWebHashHistory(),
      routes, // `routes: routes` 的缩写
})

app.use(VueMarkdownEditor)
app.use(VMdPreview)
app.use(VMdPreviewHtml)
app.use(router);
app.use(ElementPlus, {
      locale: zhCn,
})
app.mount('#app');

