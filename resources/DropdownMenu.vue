<template>
	<li class="dropdown-menu">
		<label :for="menuId">
			{{ label }}
		</label>
		<input :id="menuId"
			role="button"
			type="checkbox"
			class="navigation-component__checkbox">
		<div class="navigation-dropdown-component">
			<slot></slot>
		</div>
	</li>
</template>

<script>
module.exports = {
	props: [ 'menuId', 'label' ],
	name: 'DropdownMenu'
};
</script>

<style lang="less">
@import 'DropdownMenu.vue.less';
</style>
