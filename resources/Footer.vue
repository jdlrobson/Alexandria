<template>
    <footer>
        <div class="footer__content">
            <div class="footer__menus">
                <div>
                    <h2>Open Library</h2>
                    <ul>
                        <li><a href="/about/vision">Vision</a></li>
                        <li><a href="/volunteer">Volunteer</a></li>
                        <li><a href="/partner-with-us">Partner With Us</a></li>
                        <li><a href="https://archive.org/about/jobs.php" title="Jobs">Careers</a></li>
                        <li><a href="https://blog.openlibrary.org/">Blog</a></li>
                        <li><a href="https://archive.org/about/terms.php">Terms of Service</a></li>
                        <li><a href="https://archive.org/donate/?platform=ol">Donate</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Discover</h2>
                    <ul>
                    <li><a href="/" title="Go home">Home</a></li>
                    <li><a href="/search" title="Explore Books">Books</a></li>
                    <li><a href="/search/authors" title="Explore authors">Authors</a></li>
                    <li><a href="/subjects" title="Explore subjects">Subjects</a></li>
                    <li><a href="/advancedsearch">Advanced Search</a></li>
                    <li><a href="#top" title="Navigate to top of this page">Return to Top</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Develop</h2>
                    <ul>
                    <li><a href="/developers" title="Explore Open Library Development Center">Development Center</a></li>
                    <li><a href="/developers/api" title="Explore Open Library APIs">API Documentation</a></li>
                    <li><a href="/developers/dumps" title="Bulk Open Library data">Bulk Data Dumps</a></li>
                    <li><a href="https://github.com/internetarchive/openlibrary/wiki/Writing-Bots" title="Write a bot">Writing Bots</a></li>
                    <li><a href="/books/add" title="Add a new book to Open Library">Add a Book</a></li>
                    </ul>
                </div>
                <div>
                    <h2>Help</h2>
                    <ul>
                    <li><a href="/help">Help Center</a></li>
                    <li><a href="/contact?path=/books/OL7830141M" title="Problems">Report A Problem</a></li>
                    <li><a href="/help/faq/editing" title="Suggest Edits">Suggesting Edits</a></li>
                    </ul>
                    <aside id="footer-icons">
                    <a class="footer-icons__twitter" href="https://twitter.com/OpenLibrary">twitter</a>
                    <a class="footer-icons__github" href="https://github.com/internetarchive/openlibrary">github</a>
                    </aside>
                </div>
                <div id="footer-locale-menu">
                    <h2>Change Website Language</h2> 
                    <ul id="locale-options">
                    <li><a href="#" data-lang-id="cs" title="Czech" lang="cs">Čeština (cs)</a> </li>
                    <li><a href="#" data-lang-id="de" title="German" lang="de">Deutsch (de)</a> </li>
                    <li><a href="#" data-lang-id="en" title="English" lang="en">English (en)</a></li>
                    <li><a href="#" data-lang-id="es" title="Spanish" lang="es">Español (es)</a></li>
                    <li><a href="#" data-lang-id="fr" title="French" lang="fr">Français (fr)</a></li>
                    <li><a href="#" data-lang-id="hr" title="Croatian" lang="hr">Hrvatski (hr)</a></li>
                    <li><a href="#" data-lang-id="te" title="Telugu" lang="te">తెలుగు (te)</a></li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div class="footer__end">
                <img id="archive-logo" src="/static/images/pantheon.png" alt="" aria-hidden="true">
                <div id="legal-details">
                    <span>Open Library is an initiative of the <a href="//archive.org/">Internet Archive</a>, a 501(c)(3) non-profit, building a digital library of Internet sites and other cultural artifacts in  digital form. Other <a href="//archive.org/projects/">projects</a> include the <a href="//archive.org/web/">Wayback Machine</a>, <a href="//archive.org/">archive.org</a> and <a href="//archive-it.org">archive-it.org</a></span>
                </div>
                <div id="version-details">
                    <span class="version">version <a href="https://github.com/internetarchive/openlibrary/commit/4d4fe57">4d4fe57</a></span>
                </div>
            </div>
        </div>
    </footer>
</template>
<style lang="less">
footer {
    display: flex;
    width: 100%;
    font-size: .8em;

    ul {
        padding: 0;
    }

    hr {
        border: 0;
        border-top: 1px solid #babbae;
        margin: 20px 0;
        background: hsla(48,33%,83%,.66);
        height: 1px;
        box-sizing: border-box;
    }
}

.footer__content {
    max-width: 960px;
    margin: 5px auto;
    padding: 20px;
}

.footer__menus {
    flex-wrap: wrap;
    min-width: 150px;
    display: flex;
    margin-left: 10px;
    line-height: 1.5em;

    > div {
        flex: 1;
        min-width: 150px;
        margin: 20px 0;
        padding: 0;

        h2 {
            color: #333;
            font-size: 1em;
            margin: 0;
        }

        li {
            font-size: 1em;
            list-style-type: none;
            white-space: nowrap;
            margin: 5px 0;
        }

        a {
            color: #003266;
            text-decoration: underline;
        }
    }
}

.footer__end {
    color: #333;
    display: flex;
    width: 100%;
}
</style>
<script>
module.exports = {
    name: 'Footer'
};
</script>
