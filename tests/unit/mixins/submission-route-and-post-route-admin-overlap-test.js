import Ember from 'ember';
import SubmissionRouteAndPostRouteAdminOverlapMixin from 'oddcode/mixins/submission-route-and-post-route-admin-overlap';
import { module, test } from 'qunit';

module('Unit | Mixin | submission route and post route admin overlap');

// Replace this with your real tests.
test('it works', function(assert) {
  let SubmissionRouteAndPostRouteAdminOverlapObject = Ember.Object.extend(SubmissionRouteAndPostRouteAdminOverlapMixin);
  let subject = SubmissionRouteAndPostRouteAdminOverlapObject.create();
  assert.ok(subject);
});
