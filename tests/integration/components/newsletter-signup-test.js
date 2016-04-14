import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('newsletter-signup', 'Integration | Component | newsletter signup', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{newsletter-signup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#newsletter-signup}}
      template block text
    {{/newsletter-signup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
