import Ember from 'ember';
import SubmissionRouteAndPostRouteOverlapMixin from 'oddcode/mixins/submission-route-and-post-route-overlap';
import { module, test } from 'qunit';

module('Unit | Mixin | submission route and post route overlap');

// Replace this with your real tests.
test('it works', function(assert) {
  let SubmissionRouteAndPostRouteOverlapObject = Ember.Object.extend(SubmissionRouteAndPostRouteOverlapMixin);
  let subject = SubmissionRouteAndPostRouteOverlapObject.create();
  assert.ok(subject);
});
