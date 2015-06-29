var jsonRoute = Picker.filter(function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	return true;
});

jsonRoute.route('/.json', function(params, req, res, next) {
	var post = Booze.find({
		apk: {
			$ne: 0
		}
	}, {
		sort: {apk: -1},
		limit: 50,
		fields: {
			original: 0
		}
	}).fetch();
	res.end(JSON.stringify(post));
});

jsonRoute.route('/:group.json', function(params, req, res, next) {
	slug = slugify(params.group)
	var post = Booze.find({
		groupSlug: slug
	}, {
		sort: {apk: -1},
		limit: 50,
		fields: {
			original: 0
		}
	}).fetch();
	var post = JSON.stringify(post)
	res.end(post);
});
