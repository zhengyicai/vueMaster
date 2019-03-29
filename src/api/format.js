import moment from 'moment';
export function timeFormat(row,column){
    var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export function dateFormat(row,column){
    var date = row[column.property];
          if (date == undefined) {
             return "";
          }
          return moment(date).format("YYYY-MM-DD");
};

export function state(row){
    var date = row;
          return date =='10'?'正常':date =='20'?'禁用':'';
};
export function cardState(row){
    var date = row;
          return date =='10'?'已发卡':date =='20'?'未发卡':'';
};
