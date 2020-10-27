import Vue from "vue";
import VueRouter from "vue-router";
import Header from '../views/header/header.vue';
import Table from '../views/table/table.vue';

Vue.use(VueRouter);

const routes = [
	{
	path: "/",
	components: {
		a: Header,
		b: Table
	}
}
];

const router = new VueRouter({
  routes
});

export default router;
