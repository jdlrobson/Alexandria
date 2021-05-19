<template>
    <article>
        <div class="article__tagline">{{ tagline }}</div>
        <h1 v-html="title"></h1>
        <div class="article__subtitle" v-html="subtitle"></div>
        <div v-html="html"></div>
    </article>
</template>
<script>
module.exports = {
    name: 'Article',
    data: function () {
        return {
            'tagline': '',
            'title': '',
            'subtitle': '',
            'html': ''
        };
    }
};
</script>
