import Ember from 'ember';
import AdminRouteMixin from 'oddcode/mixins/admin-route';
import { module, test } from 'qunit';

module('Unit | Mixin | admin route');

// Replace this with your real tests.
test('it works', function(assert) {
  let AdminRouteObject = Ember.Object.extend(AdminRouteMixin);
  let subject = AdminRouteObject.create();
  assert.ok(subject);
});
