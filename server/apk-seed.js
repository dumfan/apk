import {slugify} from 'meteor/yasaricli:slugify';
import * as xml2js from 'xml2js';
import {CryptoJS} from 'meteor/jparker:crypto-core';
import fetch from 'node-fetch';
import {BoozeGroups, Booze, Settings} from '/lib/booze';
import {log} from '/lib/helpers';

const getArticles = async url => {
  const result = await fetch(url);
  const xml = await result.text();
  log('seed', `Got XML!`);
  const articles = await xml2js.parseStringPromise(xml, {
    explicitArray: false,
  });
  log('seed', `Parsed XML`);
  return articles;
};

function insert(item) {
  const price = parseFloat(item.Prisinklmoms);
  const volume = parseFloat(item.Volymiml);
  const alcohol = parseFloat(item.Alkoholhalt);
  const standardUnit = volume * alcohol * 0.01 * (1 / 15);
  const kps = price / standardUnit;

  const apk = alcohol / 100 * volume / price;
  Booze.upsert(+item.nr, {
    realId: +item.nr,
    apk,
    price,
    volume,
    alcohol,
    kps,
    name: item.Namn,
    name2: item.Namn2,
    group: item.Varugrupp,
    groupSlug: slugify(item.Varugrupp),
    selection: item.Sortiment,
    eco: +item.Ekologisk,
    container: item.Forpackning,
    original: item,
  });
}

export const seed = async () => {
  const slugs = {};
  log('seed', 'Fetching XML to seed database...');
  const result = await getArticles(
    'http://www.systembolaget.se/api/assortment/products/xml',
  );
  const hash = CryptoJS.SHA1(
    JSON.stringify(result.artiklar.artikel),
  ).toString();
  const settings = Settings.findOne('settings');
  if (settings && settings.hash === hash) {
    log('seed', `Database already seeded`);
    Settings.upsert('settings', {
      $set: {
        lastCheck: Date.now(),
      },
    });
    return;
  }
  log('seed', `Seed started`);
  Booze.remove({});
  BoozeGroups.remove({});
  result.artiklar.artikel.forEach(item => {
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
  Settings.upsert('settings', {
    hash,
    time: Date.now(),
    lastCheck: Date.now(),
  });
  log('seed', `Done seeding database with hash ${hash}`);
};
