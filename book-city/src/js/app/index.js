require(['jquery', 'bscroll', 'swiper', 'render', 'direction'], function($, bscroll, swiper, render, direction) {
    var swiperList = new swiper('.wrap-swiper', {
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
    var pagenum = 1;
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
                parent.attr('up', '上拉加载')
            }
        } else if (parent.attr('down') === '释放刷新') {
            location.reload()
        }
    });
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(res) {
            render('#swiper', '.wrapper2', res.items[0].data);
            new swiper('.swiper2', {
                autoplay: 3000,
                loop: true
            })
        },
        error: function(error) {
            console.warn(error)
        }
    });
    $.ajax({
        url: "/api/top-home",
        dataType: "json",
        success: function(res) {
            console.log(res)
            render('#list', '.top-home__btn', res.items[0].data);
        },
        error: function(error) {
            console.warn(error)
        }
    });

})