<template>
	<div id="index_main">
		<el-row type="flex" justify="center">
			<el-col :span="18">
				<el-carousel indicator-position="outside" type="card">
					<el-carousel-item v-for="item in imgBox" :key="item.id">
						<img :src="item.imgSrc" />
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row>
		<el-row type="flex" justify="space-between">
			<el-col :span="10">
				<v-admi></v-admi>
			</el-col>
			<el-col :span="10">
				<el-calendar v-model="dateValue">
				</el-calendar>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import admi from '../admi/admi.vue';
	export default {
		name: 'index',
		components: {
			vAdmi: admi
		},
		data() {
			return {
				dateValue: new Date(),
				imgBox: [
					{id: 1, imgSrc: require('../../assets/img/1.jpg')},
					{id: 2, imgSrc: require('../../assets/img/2.jpg')},
					{id: 3, imgSrc: require('../../assets/img/3.jpg')},
					{id: 4, imgSrc: require('../../assets/img/4.jpg')}
				]
			}
		}
	}
</script>

<style>
	
</style>
