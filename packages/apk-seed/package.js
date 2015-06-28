Package.describe({
  name: 'apk-seed',
  version: '1.0.0',
  summary: 'Seed the database from Systembolagets "API"',
  git: 'https://github.com/dumfan/apk',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['http','email', 'yasaricli:slugify'], 'server')
  api.addFiles('apk-seed.js', 'server');
  api.export('seed', 'server')
});