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
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    
    var dateText = hour + ":" + minute +":" + seconds;
    
    return dateText;
    
};
Message.prototype.toString = function(){
    return this.getText() +" (" + this.getDate() + " )";
};
Message.prototype.getHTMLtext = function(){
    var htmlText = this.getText();
    return htmlText.replace(/[\n\r]/g, "<br />");
};

