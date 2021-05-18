<template>
	<header id="header-bar" class="header-bar">
		<div class="hamburger-component checkbox-menu">
			<label for="toggle-hamburger" class="hamburger-button">
				<img src="/w/skins/OpenLibrary/static/images/menu.png" alt="additional options menu">
			</label>

			<input role="button" type="checkbox" class="hamburger-component__checkbox" id="toggle-hamburger">
			<div class="hamburger-dropdown-component navigation-dropdown-component">
				<ul class="dropdown-menu hamburger-dropdown-menu">
					<li><a href="/books/add">Add a Book</a></li>
					<li><a href="/sponsorship">Sponsor a Book</a></li>
					<li><a href="/recentchanges">Recent Community Edits</a></li>
					<li><a href="/developers">Developer Center</a></li>
					<li><a href="/help">Help &amp; Support</a></li>
				</ul>
			</div>
		</div>

		<div class="logo-component">
			<a href="/" :title="tagline">
				<div class="logo-txt">
				<img v-if="logoSrc" class="logo-icon" :src="logoSrc" :alt="title"
					:width="logoWidth" :height="logoHeight">
				<h1 v-else>{{title}}</h1>
				</div>
			</a>
		</div>

		<div class="search-component">
			<typeahead-search
				initialInputValue=""
				buttonLabel="Search"
				formAction="/w/index.php"
				domain="en.wikipedia.org"
				footerSearchText="Search for pages containing"
				suggestionsLabel="search suggestions"
				:focused="false"
				showThumbnail
				showDescription
				placeholder="Search Wikipedia"
			/>
		</div>

		<ul class="navigation-component">
			<dropdown-menu label="Browse" id="browse">
				<li><a href="/subjects">Subjects</a></li>
				<li><a href="/lists">Lists</a></li>
				<li><a href="/k-12">K-12 Student Library</a></li>
				<li><a href="/random">Random Book</a></li>
				<li><a href="/advancedsearch">Advanced Search</a></li>
			</dropdown-menu>
			<dropdown-menu label="More" id="more">
				<li><a href="/books/add">Add a Book</a></li>
				<li><a href="/sponsorship">Sponsor a Book</a></li>
				<li><a href="/recentchanges">Recent Community Edits</a></li>
				<li><a href="/developers">Developer Center</a></li>
				<li><a href="/help">Help &amp; Support</a></li>
			</dropdown-menu>
		</ul>


		<div class="account-component checkbox-menu">
			<dropdown-menu label="My account" id="account">
				<li><a href="/people/jdlrobson">My Profile</a></li>
					<li><a href="/account/loans">My Loans</a></li>
					<li><a href="/people/jdlrobson/lists">My Lists</a></li>
					<li><a href="/account/books">My Reading Log</a></li>
					<li><a href="/account/books/already-read/stats">My Reading Stats</a></li>
					<li><a href="/account">Settings</a></li>
					<li>
						<form name="logout" action="/account/logout" method="post">
							<button>Log out</button>
						</form>
					</li>
			</<dropdown-menu>
		</div>
	</header>
</template>

<style lang="less">
header {

	.hamburger-component {
			display: none;
	}
	
	.logo-component {
			padding-right: 15px;
			margin: 0 0 5px;
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


	.account-component {
		flex: none;
		order: 4;
		padding-left: 5px;

		> div {
			display: flex;
			align-items: center;
		}
	
		label {
			display: inline-block;
			color: transparent;
			background-image: url(avatar.png);
			border: none;
			margin-right: 5px;
			background-size: cover;
			background-position: center;
			width: 45px;
			height: 45px;
			background-color: #999;
			border-radius: 3px;
		}
	}
}
</style>

<script>
var DropdownMenu = require( './DropdownMenu.vue' );
var wvui = require( 'wvui' );

console.log(wvui);

module.exports = {
	name: 'Header',
	props: [ 'title', 'tagline', 'logoSrc', 'logoWidth', 'logoHeight' ],
	components: {
		TypeaheadSearch: wvui.WvuiTypeaheadSearch,
		DropdownMenu: DropdownMenu
	}
};
</script>
