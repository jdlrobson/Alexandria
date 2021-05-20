<?php
class SkinAlexandria extends SkinMustache {
    public function getTemplateData() {
        $data = parent::getTemplateData();

        return $data + [
            'data-json' => json_encode( $data ),
        ];
    }
}