var fs = require('fs');
var globArr = [];
var lng = {};
var count_ru = 0, count_all =0;
var text =  {};
 //{'GUID кат':'***GUID cat',
// 'GUID категории вставки':'***GUID of spot catogory',
// 'GUID клипа':'***GUID of clip',
// 'GUID передачи':'***GUID of program',
// 'GUID прем':'***GUID prem#'};

var en = fs.readFileSync('en.csv', 'utf8');
var en_arr = en.split("\r\n");
for(var i in en_arr){
    var tmp_arr = en_arr[i].split(";");
    text[tmp_arr[0]]=tmp_arr[1];
}
// console.log(text);

var contents = fs.readFileSync('test.txt', 'utf8');
var arr = contents.split("\r\n");
for(var i in arr){
    var tmp = arr[i].split("=");
    lng[tmp[0]]=tmp[1];

     if (tmp[1] in text){
        //console.log(tmp[0] + " - " + text[tmp[1]] );
        count_all++;
        // globArr[tmp[0]]=text[tmp[1]];
        if (text[tmp[1]].search(/[А-яЁё]/) > 0 ){
            globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]];
            console.log(globArr[tmp[0]]);
            count_ru++;
        }
        else {
            text[tmp[1]] = text[tmp[1]].replace("***","")
            globArr[tmp[0]] = tmp[0] + "=" + text[tmp[1]];
            //console.log(text[tmp[1]]);
        }

    }else globArr[tmp[0]] = tmp[0];


}
for (var j in globArr){
    fs.appendFile('./tpChannel_en.lng', globArr[j] + '\r\n' , function (err) {
});
}
console.log("RU =" + count_ru + " and ALL = " + count_all);
