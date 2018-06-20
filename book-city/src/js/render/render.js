define(['jquery', 'handlebars'], function($, handlebars) {
    function render(source, cla, res) {
        var tem = $(source).html();
        var template = handlebars.compile(tem);
        var html = template(res);
        $(cla).html(html)
    }
    return render
});