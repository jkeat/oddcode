import Ember from 'ember';
import moment from 'moment';

export function relativeDate(params/*, hash*/) {
	const date = params[0];
	return moment(date).calendar(null, {
	    sameDay: '[Today]',
	    nextDay: '[Tomorrow]',
	    nextWeek: 'dddd',
	    lastDay: '[Yesterday]',
	    lastWeek: '[Last] dddd',
	    sameElse: 'll'
	});
}

export default Ember.Helper.helper(relativeDate);
