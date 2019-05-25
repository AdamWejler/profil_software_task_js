const { 
	read_json,
	transform_json,
	string_date_to_number,
	sort,
	greatest_votes_per_comment,
	string_date_to_date,
	select_last_24h_posts
} = require('../json_modifications');

var json = require('./funny.json');
var transformed_json = transform_json(json);

test('Transforming json', () => {
	var expected_transformated_json = require('./expected_transformated_json.json');
	expect( JSON.stringify( transformed_json ) === JSON.stringify( expected_transformated_json )  ).toBe( true );
})

test('Sorting by upvotes', () => {
	var expected_sort_upvotes = require('./expected_sort_upvotes.json');
	expect( JSON.stringify( sort( transformed_json, 'upvotes' ) ) === JSON.stringify( expected_sort_upvotes )  ).toBe( true );
})

test('Sorting by num_comments', () => {
	var expected_sort_num_comments = require('./expected_sort_num_comments.json');
	expect( JSON.stringify( sort( transformed_json, 'num_comments' ) ) === JSON.stringify( expected_sort_num_comments )  ).toBe( true );
})

test('Sorting by score', () => {
	var expected_sort_score = require('./expected_sort_score.json');
	expect( JSON.stringify( sort( transformed_json, 'score' ) ) === JSON.stringify( expected_sort_score )  ).toBe( true );
})

test('Sorting by created', () => {
	var expected_sort_created = require('./expected_sort_created.json');
	expect( JSON.stringify( sort( transformed_json, 'created' ) ) === JSON.stringify( expected_sort_created )  ).toBe( true );
})

test('greatest_votes_per_comment', () => {
	var expected_greatest_votes_per_comment = require('./expected_greatest_votes_per_comment.json');
	expect( JSON.stringify( greatest_votes_per_comment( transformed_json ) ) === JSON.stringify( expected_greatest_votes_per_comment )  ).toBe( true );
})