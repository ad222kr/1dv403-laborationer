"use strict";
function Message(message, date){
    
    
    this.getText = function(){
        return message;
    }
    this.setText = function(_text){
        message = _text;
    }
    this.getDate = function(){
        return date;
    }
    this.setDate = function(_date){
        date = _date;
    }
}

Message.prototype.toString = function(){
    return this.getText() +" (" + this.getDate() + " )";
};
Message.prototype.getHTMLtext = function(){
    var htmlText = this.getText();
    return htmlText.replace(/\n/g, "<br />");
};
Message.prototype.getDateText = function(){
    var dateText = this.getDate();
    return dateText;
    
};
