(($) => {
    //Menu
    function menu() {
        const $hasSubMenu = $('.has-sub-menu');
        const $navbarCollapse = $('.navbar-collapse');

        $('.has-sub-menu > a').click((ev) => {
            const $parent = $(ev.target).closest('.has-sub-menu');

            if (!$parent.is('.showing-sub-menu')) {
                $hasSubMenu.removeClass('showing-sub-menu');
                $parent.addClass('showing-sub-menu');
            } else {
                $hasSubMenu.removeClass('showing-sub-menu');
            }

            return false;
        });
        $(document).on('click.clearMenu', () => {
            $hasSubMenu.removeClass('showing-sub-menu');
            $navbarCollapse.removeClass('show');
        });
    }
    $(function () {
        menu();
    })
})($);

