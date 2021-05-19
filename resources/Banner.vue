<template>
    <div class="banner" role="banner">
        <div></div>
    </div>
</template>

<style lang="less">

.banner div {
    position: sticky;
    display: flex;
    max-width: 960px;
    margin: 0 auto;
    align-items: center;
}
</style>

<script>
var DropdownMenu = require( './DropdownMenu.vue' );
module.exports = {
    name: "Banner",
    components: {
        DropdownMenu: DropdownMenu
    }
};
</script>
