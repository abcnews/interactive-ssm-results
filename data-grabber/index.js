var gsjson = require('google-spreadsheet-to-json');
var fs = require('fs');
 
gsjson({
    spreadsheetId: '1Y930hOdqJgCFoq2-FeesOke0zg2ZFTq8NnfTV7y53b0',
    worksheet: ['survey', 'house', 'politician']
})
.then(function(result) {
    fs.writeFileSync('../public/data.json', JSON.stringify(result, null, 2) , 'utf-8');
})
.catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
});
