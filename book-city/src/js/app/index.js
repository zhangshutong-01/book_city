require(['jquery', 'bscroll', 'swiper'], function($, bscroll, swiper) {
    var swiperList = new swiper('.swiper-container', {
        onslideChangeStart: function() {
            var activeIndex = swiper.activeIndex;
            $('.tab-item').eq(activeIndex).addClass('active').siblings().removeClass('active');
            if (activeIndex == 1) {
                $('.line').addClass('move');
            } else {
                $('.line').removeClass('move');
            }
        }
    })
    $('.tab').on('click', '.tab-item', function() {
        $(this).addClass('active').siblings().removeClass('active')
        var ind = $(this).index();
        if (ind == 1) {
            $('.line').addClass('move');
        } else {
            $('.line').removeClass('move');
        }
        swiperList.slideTo(ind)
    })
    var Bscroll = new bscroll('.book-city', {
        probeType: 2,
        click: true,
        scrollY: true
    });
    var parent = $('.book-city>div')
    Bscroll.on("scroll", function() {
        if (this.y < this.maxScrollY - 40) {
            parent.attr('up', "释放加载更多")
        } else if (this.y < this.maxScrollY - 20) {
            if (pagenum < total) {
                parent.attr('up', "上拉加载")
            } else {
                parent.attr('up', '加载完毕')
            }

        } else if (this.y > 40) {
            parent.attr('down', "释放刷新")
        }
    });
    var total = 3;
    Bscroll.on('touchEnd', function() {
        if (parent.attr('up') === '释放加载更多') {
            if (pagenum < total) {
                pagenum++;
                gitList()
                parent.attr('up', '上拉加载')
            }
        } else if (parent.attr('down') === '释放刷新') {
            location.reload()
        }
    });
})