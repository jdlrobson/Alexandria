<?php
class SkinAlexandria extends SkinMustache {
    public function getTemplateData() {
        $data = parent::getTemplateData();
        $data['alex-footer-icons'] = implode( '',
            array_map(function ( $item ) {
                return $item['html'];
            }, $data['data-footer']['data-icons']['array-items'])
        );

        $sidebar = $data['data-portlets-sidebar'];
        $data['alex-sidebar'] = $sidebar['data-portlets-first']['html-items'] . implode( '',
            array_map(function ( $item ) {
                return $item['html-items'];
            }, $sidebar['array-portlets-rest'])
        );

        $data['alex-lastmod'] = '';
        foreach( $data['data-footer']['data-info']['array-items'] as $item ) {
            if ( $item['name'] === 'lastmod' ) {
                $historyLink = $data['data-portlets']['data-alexandria-history']['html-items'] ?? '';
                $data['alex-lastmod'] = '<li>' . $item['html'] . '</li>' . $historyLink;
            }
        }

        return $data + [
            'data-json' => json_encode( $data ),
        ];
    }

    protected function getJsConfigVars() : array {
        return [
            'wgAlexandriaSearchApi' => $this->getConfig()->get( 'AlexandriaSearchApi' )
        ];
    }

    public static function onSkinTemplateNavigation( $sk, &$content_navigation ) {
        // There is no way to render edit icons without history.
        // https://phabricator.wikimedia.org/T283184
        if ( $sk->getSkinName() === 'alexandria' ) {
            if (isset($content_navigation['views' ]['history'])) {
                $content_navigation['alexandria-history'] = [
                    'history' => $content_navigation['views' ]['history'],
                ];
                unset( $content_navigation['views' ]['history'] );
            }
            unset( $content_navigation['views' ]['view'] );
        }
    }
}