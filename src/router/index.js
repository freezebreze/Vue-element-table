import Vue from "vue";
import VueRouter from "vue-router";
import Header from '../views/header/header.vue';
import Table from '../views/table/table.vue';
import Form from '../views/form/form.vue';
import App from '../App.vue';
import Home from '../views/home/home.vue';
import Echarts from '../views/echarts/echarts.vue';
import Index from '../views/index/index.vue';
Vue.use(VueRouter);

const routes = [
	{
	path: "/",
	component: Home,
	children: [
		{path: "/index", component:Index, name: '首页', class: 'el-icon-s-home'},
		{path: "/table", component: Table, name: '表格', class: 'el-icon-postcard'},
		{path: "/form", component: Form, name: '备忘录', class: 'el-icon-document-remove'},
		{path: "/echarts", component: Echarts, name: '统计', class: 'el-icon-s-data'}
	]
}
];

const router = new VueRouter({
  routes
});

export default router;