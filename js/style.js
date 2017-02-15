var updateProgress = function ()
{
    var trs = document.querySelectorAll('.table-body tr');
    for (var i=0; i<trs.length; i++) {
        var tr = trs[i];
        var pr = tr.querySelector('.progress');
        if (pr != null)
        {
          pr.style.left = (tr.dataset.progress - 100)+'%';
        }
    }
}
