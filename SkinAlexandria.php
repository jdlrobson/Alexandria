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

        return $data + [
            'data-json' => json_encode( $data ),
        ];
    }
}