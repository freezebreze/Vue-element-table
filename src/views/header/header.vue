<template>
	<div>
		<header>
			<a href="#">
				<img class="header-logo" src="../../assets/logo.svg" alt="logo"/>
			</a>
			<div class="line"></div>
		</header>
	</div>
</template>
<script>
  export default {
	data () {
	return {};
    },
};
</script>
<style>
header {
	background-color: #fff;
	height: 80px;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	padding: 0 20px;
	z-index: 999;
	box-sizing: border-box;
	position: fixed;
}
.header-logo {
	margin-top: 20px;
	display: inline-block;
	vertical-align: middle;
}
.line {
	position: absolute;
	margin-top: 20px;
	width: 100%;
	height: 1px;
	background-color: #DCDFE6;
}
</style>
