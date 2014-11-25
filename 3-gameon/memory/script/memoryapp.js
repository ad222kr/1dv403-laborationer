var MemoryApp = {
    
    init: function(){
        
        var mem1 = new MemoryBoard(3,4,"game1");
        var mem2 = new MemoryBoard(2,3,"game2");
        
        mem1.start();
        mem2.start();
        
    }
};

window.onload = MemoryApp.init();