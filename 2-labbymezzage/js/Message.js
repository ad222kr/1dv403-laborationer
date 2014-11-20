"use strict";
function Message(message, date){
    
    
    this.getText = function(){
        return message;
    };
    this.setText = function(_text){
        message = _text;
    };
    this.getDate = function(){
        return date;
    };
    this.setDate = function(_date){
        date = _date;
    };
}

Message.prototype.getDateText = function(){
    // Hittade på http://stackoverflow.com/a/3067896
    
    var date = this.getDate();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString(); 
    var day  = date.getDate().toString();
    var dateText = year + "-" + (month.length === 2  ? month : "0" + month[0]) + "-" +(day.length === 2 ? day : "0" + day[0]); 
    return dateText;
    
};
Message.prototype.toString = function(){
    return this.getText() +" (" + this.getDate() + " )";
};
Message.prototype.getHTMLtext = function(){
    var htmlText = this.getText();
    return htmlText.replace(/\n/g, "<br />");
};

