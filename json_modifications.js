function read_json() {
	return fetch('https://www.reddit.com/r/funny.json')
	  .then(response => response.json())
	  .then(data => {
	  	return data;
	  })
}

function transform_json(json) {
	var new_json = {
		posts: [],
		count: 0
	}
	new_json.count = json.data.dist;

	for(var item in json.data.children) {
		var date = new Date(json.data.children[item].data.created_utc * 1000);
	  	var tmp_post = {
			title: json.data.children[item].data.title,
			upvotes: json.data.children[item].data.ups,
			score: json.data.children[item].data.score,
			num_comments: json.data.children[item].data.num_comments,
			created: date.toLocaleString()
		}
		new_json.posts.push(tmp_post);
	}

	return new_json;
}

function string_date_to_number(str) {
	if(str.length == 19) {
		str = '0'+str;
	}
	var sorted = str.substring(6,10) + str.substring(3,5) + str.substring(0,2) + str.substring(12,14) + str.substring(15,17) + str.substring(18,20);
	return parseInt(sorted, 10);
}

function sort(json_object, sort_by) {
	if(sort_by=='created') {
		for(var i in json_object.posts) {
			json_object.posts[i]['numeric_date'] = string_date_to_number(json_object.posts[i].created);
		}

		json_object.posts.sort(function(a, b){
		    return b['numeric_date'] - a['numeric_date'];
		});

		for(var i in json_object.posts) {
			delete json_object.posts[i]['numeric_date'];
		}
	} else {
		json_object.posts.sort(function(a, b){
		    return b[sort_by] - a[sort_by];
		});
	}

	return json_object;
}

function greatest_votes_per_comment(json_object) {
	var highest_rate = 0;

	for(var i in json_object.posts) {
		json_object.posts[i]['rate'] = (json_object.posts[i].upvotes * 1.0) / json_object.posts[i].num_comments;
		if(json_object.posts[i]['rate'] > highest_rate) {
			highest_rate = json_object.posts[i]['rate'];
		}
	}

	for(var i in json_object.posts) {
		if (highest_rate > json_object.posts[i]['rate']) {
			delete json_object.posts[i];
		}
	}

	var all_with_highest_score = sort(json_object, 'created');

	return all_with_highest_score.posts[0].title;
}

function string_date_to_date(str) {
	if(str.length == 19) {
		str = '0'+str;
	}
	var date = new Date( str.substring(6,10), str.substring(3,5), str.substring(0,2), str.substring(12,14), str.substring(15,17), str.substring(18,20) );
	return date;
}

function select_last_24h_posts(json_object) {
	var now = new Date();
	for(var i in json_object.posts) {
		var dif_seconds = Math.abs(now - string_date_to_date( json_object.posts[i].created) )/1000;
		if( dif_seconds > (24 * 3600) ) {
			json_object.posts.splice(i, 1);
		}
	}
	json_object.count = json_object.posts.length;
	return json_object;
}

read_json().then( function(result) {
	// console.log( transform_json(result) );
	// console.log( sort( transform_json(result), 'created' ) );
	// console.log( greatest_votes_per_comment( transform_json(result) ) );
	console.log( select_last_24h_posts( transform_json(result) ) );
});