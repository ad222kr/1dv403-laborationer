var MemoryApp = {

    init: function(){
        var mem1 = new MemoryBoard(2,4,"board1");
        var mem2 = new MemoryBoard(4,4,"board2");
    }
};

window.onload = MemoryApp.init();
