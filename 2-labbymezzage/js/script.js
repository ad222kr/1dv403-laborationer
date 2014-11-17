var messsageBoard = {
    
    messages: [],
    
    init: function(){
        window.onload;
        
        var mess = new Message("Hej! \nVad händer?", new Date());
        console.log(mess.getText());
        console.log(mess.getDate());
        console.log(mess.toString());
        console.log(mess.getHTMLtext());
        }
};

messsageBoard.init();