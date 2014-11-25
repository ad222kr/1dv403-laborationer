var MemoryApp = {
    
    init: function(){
        
        var mem1 = new MemoryBoard(3,4,"board1");
        var mem2 = new MemoryBoard(4,4,"board2");
        
        mem1.start();
        mem2.start();
        
    }
};

window.onload = MemoryApp.init();