import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filepicker-wrapper', 'Integration | Component | filepicker wrapper', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{filepicker-wrapper}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#filepicker-wrapper}}
      template block text
    {{/filepicker-wrapper}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
