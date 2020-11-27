<template>
	<div id="echarts-container">
		<el-row>
			<el-col :span="12">
				<div id="echarts_one" style="height: 800px;"></div>
			</el-col>
			<el-col :span="12">
				<div id="echarts_two" style="height: 800px;"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				option1: {
					title: {
						text: '折线图'
					},
					 xAxis: {
					        type: 'category',
					        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data: [820, 932, 901, 934, 1290, 1330, 1320],
					        type: 'line'
					    }]
				},
				option2: {
					title: {
						text: '柱状图'
					},
					xAxis: {
					        type: 'category',
					        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data: [120, 200, 150, 80, 70, 110, 130],
					        type: 'bar',
					        showBackground: true,
					        backgroundStyle: {
					            color: 'rgba(220, 220, 220, 0.8)'
					        }
					    }]
				}
			}
		},
		methods: {
			initEcharts() {
				let a = document.getElementById('echarts_one');
				let b = document.getElementById('echarts_two');
				let ec1 = echarts.init(a);
				let ec2 = echarts.init(b);
				ec1.setOption(this.option1);
				ec2.setOption(this.option2);
			}
		},
		mounted() {
			this.initEcharts();
		}
	}
</script>

<style>
</style>
