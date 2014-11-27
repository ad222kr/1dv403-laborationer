var MemoryApp = {

    init: function(){
        var mem1 = new MemoryBoard(2,2,"board1");
        var mem2 = new MemoryBoard(2,2,"board2");
        mem1.start();
        mem2.start();

    }
};

window.onload = MemoryApp.init();
