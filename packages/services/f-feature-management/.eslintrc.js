module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'plugin:json-schema-validator/base'
  ],
  overrides: [
    {
      files: ["*.json", "*.jsonc", "*.json5", "*.json6"],
      parserOptions: {
        parser: 'jsonc-eslint-parser',
      }
    }
  ],
  rules: {
    // json-schema-validator plugin does not play nicely with the vuejs-accessibility plugin.
    // Github issue open here: https://github.com/ota-meshi/eslint-plugin-json-schema-validator/issues/76
    // For now, disable all vuejs-accessibility rules as this service does not contain any vue dependencies.
    //
    // Add further rules whenever the following error is encountered:
    //     `Error while loading rule 'vuejs-accessibility/*': context.parserServices.defineTemplateBodyVisitor is not a function`
    'vuejs-accessibility/alt-text': 'off',
    'vuejs-accessibility/anchor-has-content': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/accessible-emoji': 'off',
    'vuejs-accessibility/aria-props': 'off',
    'vuejs-accessibility/aria-role': 'off',
    'vuejs-accessibility/aria-unsupported-elements': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/heading-has-content': 'off',
    'vuejs-accessibility/iframe-has-title': 'off',
    'vuejs-accessibility/iframe-has-title': 'off',
    'vuejs-accessibility/interactive-supports-focus': 'off',
    'vuejs-accessibility/media-has-caption': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vuejs-accessibility/no-access-key': 'off',
    'vuejs-accessibility/no-autofocus': 'off',
    'vuejs-accessibility/no-distracting-elements': 'off',
    'vuejs-accessibility/no-onchange': 'off',
    'vuejs-accessibility/no-redundant-roles': 'off',
    'vuejs-accessibility/role-has-required-aria-props': 'off',
    'vuejs-accessibility/tabindex-no-positive': 'off',
    
    'json-schema-validator/no-invalid': [
      'error',
      {
          'schemas': [
              {
                  fileMatch: ['**/*-fmconfig.json'],
                  schema: 'test/data/schema.json'
              }
          ]
      }
  ]   
  }
}