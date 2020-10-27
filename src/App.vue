<template>
	<div id="app">
		<router-view class="header" name="a"></router-view>
		<router-view class="myTable" name="b"></router-view>
	</div>
</template>

<script>
	
export default {
	name: 'app',
	components: {
		
	}
}
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
.header {
	margin-bottom: 100px;
}
.myTable {
	margin-left: 10px;
}
</style>