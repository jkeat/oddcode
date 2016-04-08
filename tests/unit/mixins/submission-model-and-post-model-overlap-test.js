import Ember from 'ember';
import SubmissionModelAndPostModelOverlapMixin from 'oddcode/mixins/submission-model-and-post-model-overlap';
import { module, test } from 'qunit';

module('Unit | Mixin | submission model and post model overlap');

// Replace this with your real tests.
test('it works', function(assert) {
  let SubmissionModelAndPostModelOverlapObject = Ember.Object.extend(SubmissionModelAndPostModelOverlapMixin);
  let subject = SubmissionModelAndPostModelOverlapObject.create();
  assert.ok(subject);
});
