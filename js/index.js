$(function () {
    $('pre code').each(function(i, element) {
        hljs.highlightBlock(element);
    });
});
