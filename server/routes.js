import {slugify} from 'meteor/yasaricli:slugify';
import {Picker} from 'meteor/meteorhacks:picker';
import {Booze} from '../lib/booze';

const jsonRoute = Picker.filter((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return true;
});

jsonRoute.route('/.json', (params, req, res) => {
  const post = Booze.find(
    {
      apk: {
        $ne: 0,
      },
    },
    {
      sort: {apk: -1},
      limit: 50,
      fields: {
        original: 0,
      },
    },
  ).fetch();
  res.end(JSON.stringify(post));
});

jsonRoute.route('/:group.json', (params, req, res) => {
  const slug = slugify(params.group);
  const post = Booze.find(
    {
      groupSlug: slug,
    },
    {
      sort: {apk: -1},
      limit: 50,
      fields: {
        original: 0,
      },
    },
  ).fetch();
  const json = JSON.stringify(post);
  res.end(json);
});
