;(function($) {

    /*-------------------  Function Active Scrolling  --------------------*/

    var windowHeight = $(window).height();

    function onScroll(){
        var scroll_top = $(document).scrollTop();
        $('.menu-item a').each(function(){
            var hash = $(this).attr('href');
            var target = $(hash);
            if (target.length) {
                if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                    $('.menu-item a.active').removeClass('active');
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }   
            }
        });
    }

    /*-------------------  Function Is Visible Section  --------------------*/

    function isVisiblePage(elem) {

        var target = elem.position().top,
            scroll_top = $(document).scrollTop();

        return ( target - 200 <= scroll_top && target + elem.height() > scroll_top);
    }

    /*-------------------  Function Skills Progress Section  --------------------*/

    function skillsProgress() {

        $('.skillbar-bar').each(function(){
            var percent = $(this).attr('data-percent');
            $(this).find('.skillbar-percent').animate({
                width:$(this).attr('data-percent')
            },3000);
            $(this).find('.skillbar-percent').html('<span>'+ percent+'</span>');
        });

    }



    $(document).ready(function() {

    /*-------------------  Mobile Menu  --------------------*/

        $('.mobile-button').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('act');
            $('.menu-mobile').slideToggle();
        });

    /*-------------------  Process Tabs  --------------------*/

        var counter = 1;
        $('.p-list__item a').each(function() {
            $(this).attr('data-tab', counter);
            counter++;
        });

        counter = 1;
        $('.p-content__tab').each(function() {
            $(this).attr('data-tab', counter);
            counter++;
        });

        $(document).on('click', '.p-list__item a', function(e) {

            e.preventDefault();
            var tab_id = $(this).attr('data-tab');
            $('.active[data-tab]').removeClass('active');
            $('[data-tab="' + tab_id + '"]').addClass('active');

        });

    /*-------------------  Process Tabs  --------------------*/

        $(document).on('click', '.tab-head', function() {

            if ($(this).hasClass('active')){

                $(this).next('.tab-body').slideUp();
                $(this).removeClass('active');

            }
            else {

                $('.tab-head').not(this).next('.tab-body').slideUp();
                $('.tab-head').not(this).removeClass('active');
                $(this).next('.tab-body').slideDown();
                $(this).addClass('active');

            }

        });

    /*-------------------  Slick Slider  --------------------*/

        $('.slider').slick({

           'arrows': false,
           'autoplay': true

        });

    /*-------------------  Placeholder  --------------------*/

        $(document).on('focus', 'input, textarea', function() {

            $(this).data('placeholder', $(this).attr('placeholder'))
            $(this).attr('placeholder', '');

        });

        $(document).on('blur', 'input, textarea', function() {

            $(this).attr('placeholder', $(this).data('placeholder'));

        });

    /*-------------------  Scrolling to Sections  --------------------*/

        $(document).on('click', '.mobile-menu-item a, .header-b__works, .header-b__features, .with-us__button, .menu-item a', function(e) {
            e.preventDefault();
            var id  = $(this).attr('href');
            var top = $(id).offset().top - 20;
            $('.menu-mobile').slideUp();
            $('body,html').animate({scrollTop: top}, 1500);
        });

    /*-------------------  Scroll Event  --------------------*/

        var fixed_head_pos = $('.header-menu').offset().top,
            fixed_head_height = $('.header-menu').outerHeight();
        var showSkills = true,
            showFacts = true;
        var skillsPage = $('#skills'),
            factsPage = $('#facts');

        $(document).scroll(function() {

            onScroll(); // Active item when scrolling.

            /*-------------------  Sticky Header  --------------------*/

            var scroll_top = $(window).scrollTop();
            if ( scroll_top >= fixed_head_pos ) {
                $('.header-menu').addClass('fixed');
                $('.mobile-button').removeClass('act');
                $('body').css('padding-top', fixed_head_height + 'px');
            } else {
                $('.header-menu').removeClass('fixed');
                $('body').css('padding-top', 0);
            }

            /*-------------------  Progress Skills  --------------------*/

            if ( isVisiblePage( skillsPage ) && showSkills ) {

                skillsProgress();

                showSkills = false;

            }

            /*-------------------  Increment Numbers --------------------*/

            if ( isVisiblePage( factsPage ) && showFacts ) {

                $('.facts-number').spincrement({
                    thousandSeparator: '',
                    duration: 4000,
                });

                showFacts = false;

            }

        });
        
    });

})(jQuery);