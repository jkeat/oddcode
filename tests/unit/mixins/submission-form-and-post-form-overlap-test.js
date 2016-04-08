import Ember from 'ember';
import SubmissionFormAndPostFormOverlapMixin from 'oddcode/mixins/submission-form-and-post-form-overlap';
import { module, test } from 'qunit';

module('Unit | Mixin | submission form and post form overlap');

// Replace this with your real tests.
test('it works', function(assert) {
  let SubmissionFormAndPostFormOverlapObject = Ember.Object.extend(SubmissionFormAndPostFormOverlapMixin);
  let subject = SubmissionFormAndPostFormOverlapObject.create();
  assert.ok(subject);
});
