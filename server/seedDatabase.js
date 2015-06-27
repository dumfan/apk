seed = function() {
	console.log("Starting database seed");
	console.log("Getting XML");
	var xml = HTTP.get('http://www.systembolaget.se/api/assortment/products/xml').content
	console.log("Got XML");
	var articles = xml2js.parseStringSync(xml);
	BoozeGroups.remove({});
	articles.artiklar.artikel.forEach(function (item) {
		var price = parseFloat(item.Prisinklmoms[0]);
		var volume = parseFloat(item.Volymiml[0]);
		var alcohol = parseFloat(item.Alkoholhalt[0]);

		var apk = ((alcohol/100)*volume)/price;
		var id = Booze.upsert(+item.Varnummer[0], {
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
			original: item

		})
		slug = slugify(item.Varugrupp[0])
		BoozeGroups.upsert(slug, {
			slug: slug,
			name: item.Varugrupp[0]
		})
	});
	console.log("Done seeding database")
	return true;
}

Meteor.methods({
	seed: function () {
		seed();
	}
});

Meteor.startup(function () {
	if (Booze.find().count() === 0) {
		seed();
	}
});

SyncedCron.add({
	name: 'Seed the database every 24 hours',
	schedule: function(parser) {
		return parser.text('every 24 hours');
	},
	job: function() {
		return seed();
	}
});
