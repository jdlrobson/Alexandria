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
.header-bar {
	height: 61px;
	max-width: 960px;
	min-width: 300px;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	z-index: 1;
	position: relative;
	margin: 20px auto;
	position: sticky;
	top: 40px;
	background: #e1dcc5;

	h1 {
		flex-grow: 1;
	}

	.hamburger-component {
		order: 0;
		margin-right: 5px;

		label {
			background-image: url(menu.png);
		}
	}

	.logo-component {
		padding-right: 15px;
		margin: 0 40px 5px 0;
	}

	.navigation-component {
		flex: 1;
		order: 2;
		display: flex;
		text-align: center;
		position: relative;

		li {
			flex-basis: 100%;
			cursor: pointer;
			padding: 5px 0;
			font-size: 1em;
			list-style: none;
		}
	}

	.search-component {
		width: 45px;
		flex: 1;
		order: 3;
		margin-right: 0;

		.search-bar-component {
			width: 207px;
			display: inline-block;
			border: 1px solid #babbae;
			border-radius: .3em;
			background-color: #f9f9f9;
			position: relative;

			.search-bar {
					transition: all .2s;
					background: #f9f9f9;
					border-radius: .3em;
					display: flex;
			}
		}

		// FIXME: override bad defaults...
		.wvui-typeahead-search__submit {
			display: none;
		}

		// FIXME: override bad defaults...
		.wvui-typeahead-search .wvui-input__input {
			border-right-color: #a2a9b1;
		}
	}

	label {
		display: inline-block;
		color: transparent;
		border: none;
		margin-right: 5px;
		background-size: cover;
		background-position: center;
		width: 45px;
		height: 45px;
		border-radius: 3px;
	}

	.account-component {
		flex: none;
		order: 4;
		padding-left: 5px;

		// notifications

		> div {
			display: flex;
			align-items: center;
		}

		label {
			background-color: #999;
			background-image: url(avatar.png);
		}

		ul {
			right: 11px;
		}
	}
}
</style>
