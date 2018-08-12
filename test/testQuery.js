const buildDatabaseNames = (DatabaseNameStr, callback) => {
  let camelSingular = DatabaseNameStr.slice(0,1);
  camelSingular = camelSingular.toLowerCase();
  camelSingular = camelSingular + DatabaseNameStr.slice(1, DatabaseNameStr.length);
  let camelPlural = DatabaseNameStr.slice(0,1);
  camelPlural = camelPlural.toLowerCase();
  camelPlural = camelPlural + DatabaseNameStr.slice(1, DatabaseNameStr.length) + 's';
  let databaseNameStr = `{ "capsSingular": ${"\"" + DatabaseNameStr + "\""}, "capsPlural": ${"\"" + DatabaseNameStr + 's' + "\""}, "camelSingular": ${"\"" + camelSingular + "\""}, "camelPlural": ${"\"" + camelPlural + "\""} }`;
  let names = JSON.parse(databaseNameStr);
  return callback(names);
};

let dbName = 'PrimaryTopic';

buildDatabaseNames(dbName, (res) => {
  console.log(res);
});
