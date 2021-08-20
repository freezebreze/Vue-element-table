<template>
	<div id="admi_main">
		<el-avatar :size="100" :src="imgBox[0].src" style="display: inline-block;"></el-avatar>
		<div class="userName">君子不器</div>
		<div class="admi">
			<ul class="userlist">
				<li><i class="el-icon-s-custom"></i>性别：男</li>
				<li><i class="el-icon-location-information"></i>现居地：广西</li>
				<li><i class="el-icon-chat-dot-round"></i>联系方式：🐧1156341958</li>
				//<li><i class="el-icon-link"></i>项目地址: <a href="https://github.com/freezebreze/Vue-element-table">Click Me</a></li>
				//<li><i class="el-icon-chat-line-square"></i>随便说说：小张是猪，哈哈哈</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgBox: [
					{id: 1, src: require('../../assets/img/user.jpg')}
				]
			}
		}
	}
</script>

<style>
	#admi_main {
		position: relative;
		color: #2f3542;
	}
	.userName {
		position: absolute;
		left: 50%;
		top: 20px;
		font-size: 50px;
		text-align: center;
	}
	.userlist {
		list-style: none;
		font-size: 40px;
	}
	.userlist li {
		margin-bottom: 30px;
		text-align: left;
	}
	.userlist li a {
		text-decoration: none;
		color: #1e90ff;
	}
</style>
