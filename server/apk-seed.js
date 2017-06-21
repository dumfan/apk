/* eslint-disable no-console */
import {slugify} from 'meteor/yasaricli:slugify';
import {HTTP} from 'meteor/http';
import {Email} from 'meteor/email';
import {xml2js} from 'meteor/peerlibrary:xml2js';
import {CryptoJS} from 'meteor/jparker:crypto-core';
import {BoozeGroups, Booze, Settings} from '../lib/booze';

function insert(item) {
  const price = parseFloat(item.Prisinklmoms[0]);
  const volume = parseFloat(item.Volymiml[0]);
  const alcohol = parseFloat(item.Alkoholhalt[0]);

  const apk = alcohol / 100 * volume / price;
  Booze.upsert(+item.Varnummer[0], {
    realId: +item.Varnummer[0],
    apk,
    price,
    volume,
    alcohol,
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

export const seed = () => {
  const slugs = {};
  console.log('Starting database seed');
  console.log('Getting XML');
  HTTP.get(
    'http://www.systembolaget.se/api/assortment/products/xml',
    {},
    (err, result) => {
      const xml = result.content;
      console.log('Got XML');
      const articles = xml2js.parseStringSync(xml);
      const hash = CryptoJS.SHA1(
        JSON.stringify(articles.artiklar.artikel),
      ).toString();
      if (Settings.find({hash}).count() > 0) {
        console.log('Database already seeded');
        return;
      }
      Settings.remove({});
      Booze.remove({});
      BoozeGroups.remove({});
      articles.artiklar.artikel.forEach(item => {
        insert(item);
        const slug = slugify(item.Varugrupp[0]);
        if (!slugs[slug]) {
          BoozeGroups.upsert(slug, {
            slug,
            name: item.Varugrupp[0],
          });
          slugs[slug] = true;
        }
      });
      Settings.insert({
        hash,
      });
      console.log(`Done seeding database with hash ${hash}`);
      Email.send({
        to: process.env.EMAILTO,
        from: process.env.EMAILFROM,
        subject: 'Seeding finished',
        text: 'Just so you know',
      });
    },
  );
};