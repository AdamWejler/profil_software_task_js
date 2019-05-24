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
		var date = new Date(json.data.children[item].data.created * 1000);
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


read_json().then( function(result) {
	console.log( transform_json(result) );
});