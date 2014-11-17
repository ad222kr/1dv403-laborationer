var MessageBoard = {
    
    messages: [],
    
    init: function(){
        window.onload;
        
        var mess = new Message("Hej! \nVad händer?", new Date());
        var mess2 = new Message("tja mannen", new Date());
        MessageBoard.messages.push(mess);
        MessageBoard.messages.push(mess2);
        
        console.log(MessageBoard.messages[1].getDate());
        }
};

MessageBoard.init();

