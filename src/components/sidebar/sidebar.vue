<template>
	<div id="sidemain">
				<el-menu :default-active="this.$router.path" class="el-menu-vertical-demo" router>
					<template
					v-for="(item, index) in this.$router.options.routes[0].children">
					<el-menu-item :index="item.path" ><i class="fa" :class="item.class"></i>{{item.name}}
					</el-menu-item>
					</template>
				</el-menu>
	</div>
</template>

<script>
	export default {
		name: 'sidebar',
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped="scoped">
	i{
		font-size: 20px;
		margin-right: 5px;
	}
</style>
