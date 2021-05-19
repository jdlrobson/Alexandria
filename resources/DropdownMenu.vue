<template>
	<li class="dropdown-menu">
		<label :for="id">
			{{ label }}
		</label>
		<input :id="id"
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
	props: [ 'id', 'label' ],
	name: 'DropdownMenu'
};
</script>

<style lang="less">
	.dropdown-menu {
		list-style: none;

		label {
			position: relative;

			&:after {
				content: '';
				background-image: url(down-arrow.png);
				background-size: 7 4px;
				height: 100%;
				background-repeat: no-repeat;
				background-position: center;
				width: 7px;
				display: inline-block;
				position: absolute;
				top: 0;
				right: -14px;
			}
		}
	}

	.navigation-component__checkbox {
		opacity: 0;

		~ .navigation-dropdown-component > ul {
			display: none;
		}

		&:checked ~ .navigation-dropdown-component > ul {
			display: block;
		}
	}

	.navigation-dropdown-component {
		position: relative;

		> ul {
			z-index: 1;
			position: absolute;
			text-align: right;
			padding-top: 5px;
			text-align: left;
			background-color: #f2f0e7;
			border: 1px solid #babbae;
			border-radius: 3px;
			list-style: none;
			cursor: pointer;
			padding: 0;
		}

		> ul > li {
			padding: 10px 20px 10px 10px;
			border-bottom: 1px solid #dfe0cb;
		}

		a {
			text-decoration: none;
			color: #333;
			white-space: nowrap;
			font-size: .9em;
			padding: 10px;
			display: block;
		}
	}
</style>
