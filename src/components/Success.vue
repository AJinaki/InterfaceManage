<template>
	<div class="successDiv">
		<div class="successDiv-item">
			<p class="largeText">操作执行成功！</p>
			<router-link to="/Home">
				<b>点我返回首页</b>
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.successDiv {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.successDiv-item {
		background-color: chartreuse;
		height: 300px;
		width: 500px;
		border-radius: 25px;
		margin-top: 100px;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2)
	}

	.largeText {
		color: white;
		font-size: 30px;
		font-weight: bold;
	}
</style>
