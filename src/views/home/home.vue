<template>
	<el-row class="container" style="height: 100%;">
			<v-header></v-header>
		<el-row>
			<el-col :span="2">
				<v-sidebar style="margin-top: 80px;"></v-sidebar>
			</el-col>
			<el-col :span="22" style="margin-top: 10px;">
				<transition>
					<router-view style="margin-top: 80px;"></router-view>
				</transition>
			</el-col>
		</el-row>
	</el-row>
</template>

<script>
	import header from '../header/header.vue'
	import sidebar from '../../components/sidebar/sidebar.vue'
	export default {
		name: 'home',
		components: {
			vHeader : header,
			vSidebar: sidebar
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped="scoped">
	
</style>
