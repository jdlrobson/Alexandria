<template>
	<header id="header-bar" class="header-bar">
		<div class="hamburger-component checkbox-menu">
			<dropdown-menu menu-id="more" label="Home">
				<ul v-html="htmlSidebar"></ul>
			</dropdown-menu>
		</div>

		<div class="logo-component">
			<a :href="mainpage" :title="tagline">
				<div class="logo-txt">
					<img v-if="logoSrc"
						class="logo-icon"
						:src="logoSrc"
						:alt="sitetitle"
						:width="logoWidth"
						:height="logoHeight">
					<h1 v-else>{{ sitetitle }}</h1>
				</div>
			</a>
		</div>

		<div class="search-component">
			<typeahead-search
				id="skin-ol-search"
				:domain="domain"
				initial-input-value=""
				:button-label="buttonLabel"
				:form-action="formAction"
				:footer-search-text="footerSearchText"
				:focused="false"
				show-thumbnail
				show-description
				:placeholder="placeholder"
			></typeahead-search>
		</div>

		<div class="account-component checkbox-menu">
			<dropdown-menu menu-id="p-personal" label="My account">
				<ul v-html="htmlUserMenu"></ul>
			</dropdown-menu>
		</div>
	</header>
</template>

<script>
const DropdownMenu = require( './DropdownMenu.vue' );
const wvui = require( 'wvui' );

module.exports = {
	name: 'Header',
	props: [
		'sitetitle', 'tagline',
		// logo
		'logoSrc', 'logoWidth', 'logoHeight', 'mainpage',
		// for search
		'footerSearchText', 'placeholder', 'buttonLabel', 'formAction', 'domain',
		// menus
		'htmlUserMenu', 'htmlSidebar'
	],
	components: {
		TypeaheadSearch: wvui.WvuiTypeaheadSearch,
		DropdownMenu: DropdownMenu
	}
};
</script>

<style lang="less">
// @import 'AppHeader.vue.less';
</style>
