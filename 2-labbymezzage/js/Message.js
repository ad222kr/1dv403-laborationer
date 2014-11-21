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
    
    var dateText = hour + ":" + minute +":" + (seconds.length == 2 ? seconds : "0" + seconds);
    
    return dateText;
    
};
Message.prototype.toString = function(){
    
    var monthNames = [ "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December" ];
        
    var date = this.getDate();
    console.log(date);
    var year = date.getFullYear().toString();
    var month = monthNames[date.getMonth()];
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    
    var dateTest = "Inlägget skapades den " +day+" "+month+ " "+year+" klockan "+hour+":"+minute+":"+seconds;
    return dateTest;
};
Message.prototype.getHTMLtext = function(){
    var htmlText = this.getText();
    return htmlText.replace(/[\n\r]/g, "<br />");
};

