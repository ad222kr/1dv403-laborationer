var MemoryApp = {
    
    init: function(){
        var mem2 = new MemoryBoard(4,4,"board2");
        mem2.start();
        
    }
};

window.onload = MemoryApp.init();