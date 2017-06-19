function insert(item) {
	var price = parseFloat(item.Prisinklmoms[0]);
	var volume = parseFloat(item.Volymiml[0]);
	var alcohol = parseFloat(item.Alkoholhalt[0]);

	var apk = ((alcohol/100) * volume) / price;
	var id = Booze.upsert(+item.Varnummer[0], {
		realId: +item.Varnummer[0],
		apk: apk,
		price: price,
		volume: volume,
		alcohol: alcohol,
		name: item.Namn[0],
		name2: item.Namn2[0],
		group: item.Varugrupp[0],
		groupSlug: slugify(item.Varugrupp[0]),
		selection: item.Sortiment[0],
		eco: +item.Ekologisk[0],
		container: item.Forpackning[0],
		original: item,
	});
}

seed = function() {
	var slugs = {};
	console.log("Starting database seed");
	console.log("Getting XML");
	HTTP.get('http://www.systembolaget.se/api/assortment/products/xml', {}, function(err, result) {
		var xml = result.content;
		console.log("Got XML");
		var articles = xml2js.parseStringSync(xml);
		var hash = CryptoJS.SHA1(JSON.stringify(articles.artiklar.artikel)).toString();
		if (Settings.find({ hash: hash }).count() > 0) {
			console.log("Database already seeded");
			return;
		}
		Settings.remove({});
		Booze.remove({});
		BoozeGroups.remove({});
		articles.artiklar.artikel.forEach(function (item) {
			insert(item);
			slug = slugify(item.Varugrupp[0]);
			if (!slugs[slug]) {
				BoozeGroups.upsert(slug, {
					slug: slug,
					name: item.Varugrupp[0]
				});
				slugs[slug] = true;
			}
		});
		Settings.insert({
			hash: hash
		});
		console.log("Done seeding database with hash " + hash);
		Email.send({
			to: process.env.EMAILTO,
			from: process.env.EMAILFROM,
			subject: 'Seeding finished',
			text: 'Just so you know'
		});
	});
}
