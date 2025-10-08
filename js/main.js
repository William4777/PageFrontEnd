(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    //Datos de archios planos
    fetch('../db/productos.txt')
        .then(res => res.text())
        .then(data => {
            const contenedor = document.getElementById('producto');
            const lineas = data.trim().split('\n');

            lineas.forEach(linea => {
                const [imagen, nombre, precio, descripcion] = linea.split(',');
                const productoHTML = `
          <div class="col-lg-6 mb-5">
            <div class="row align-items-center">
              <div class="col-sm-5">
                <img class="img-fluid mb-3 mb-sm-0" src="${imagen.trim()}" alt="">
              </div>
              <div class="col-sm-7">
                <h4><i class="fa fa-dollar-sign service-icon"></i>${precio.trim()}</h4>
                <h3>${nombre.trim()}</h3>
                <p class="m-0">${descripcion.trim()}</p>
              </div>
            </div>
          </div>
        `;
                contenedor.innerHTML += productoHTML;
            });
        })
        .catch(err => console.error('Error cargando productos:', err));
})(jQuery);

