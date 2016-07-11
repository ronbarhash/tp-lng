var fs = require('fs');
var globArr = [];
var text, lng = {};
var count_ru = 0, count_all =0;
var ifile = 'src/en.csv'; // Словарь [RU|EN] терминов разделенных ";"
var rufile = 'src/lng/tpChannel_ru.lng'; //  Начальный лингво-файл
var enfile = 'dist/tpChannel_en.lng'; // Результирующий файл

function file4Arr(fileName, separate){
    // Функция преобрахования файла в объект
    var arr =  {};
    var f = fs.readFileSync(fileName, 'utf8');
    var f_arr = f.split("\r\n");
    for(var i in f_arr){
        var tmp_arr = f_arr[i].split(separate);
        arr[tmp_arr[0]]=tmp_arr[1];
    }
    return arr;
}

text = file4Arr(ifile, ";"); //Словарь
lng = file4Arr(rufile,"="); // RU

for(var i in lng){ // Перевод русского файла в соответствии с словарем
     if (lng[i] in text){
        count_all++;
        if (text[lng[i]].search(/[А-яЁё]/) > 0 ){
            // globArr[i] = i + "=" + i + "!!!"; // miCaptions
            // globArr[i] = i + "=" + text[lng[i]] + " - "+i; // RU + caption
            globArr[i] = i + "=" + text[lng[i]] + " - "+i; // RU ***
            count_ru++;
        }
        else {
            text[lng[i]] = text[lng[i]].replace("***","") // очистка латинских слов от звезд-"***"
            globArr[i] = i + "=" + text[lng[i]];
        }
    }else {
        globArr[i] = i;
    }
}
console.log(globArr);
if ( fs.existsSync(enfile) ) fs.truncateSync(enfile); // Удаление файла с результатами

for (var j in globArr){
    // Формирование файла результатов
    if( (typeof(globArr[j]) == 'undefined') || (globArr[j]) == '')
        fs.appendFileSync(enfile, "\n" + j + '\r\n');
    else
        fs.appendFileSync(enfile, globArr[j] + '\r\n' );
}

console.log("RU =" + count_ru + " and ALL = " + count_all); //посчет количесва строк
