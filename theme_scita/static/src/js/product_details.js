odoo.define('theme_scita.scita_product_js', function(require) {
    "use strict";
// Multi image gallery
    var api;
    setTimeout(function() {
        var dynamic_data = {}
        dynamic_data['gallery_images_preload_type'] = 'all'
        dynamic_data['slider_enable_text_panel'] = false
        dynamic_data['gallery_skin'] = "alexis"
        dynamic_data['gallery_height'] = 800
        api = $('#gallery').unitegallery(dynamic_data);
        api.on("item_change", function(num, data) {
        if (data['index'] == 0) {
            update_gallery_product_image();
        }
    });

    if (api != undefined && $('#gallery').length != 0) {
        setTimeout(function() {
            update_gallery_product_image()
        }, 200);
    }

    }, 100)


    function update_gallery_product_variant_image(event_source, product_id) {
        var $imgs = $(event_source).closest('.oe_website_sale').find('.ug-slide-wrapper');
        var $img = $imgs.find('img');
        var total_img = api.getNumItems()
        if (total_img != undefined) {
            api.selectItem(0);
        }
        var $stay;
        $img.each(function(e) {
            if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                if ($(this).attr("src").match('/flip_image') == null) {
                    $(this).attr("src", "/web/image/product.product/" + product_id + "/image");
                    $("img.js_variant_img_small").attr("src", "/web/image/product.product/" + product_id + "/image");
                    $stay = $(this).parent().parent();
                    $(this).css({
                        'width': 'initial',
                        'height': 'initial'
                    });
                    api.resetZoom();
                    api.zoomIn();
                }
            }
        });
    }

    setTimeout(function() {
        $('.oe_website_sale').on('change', 'ul[data-attribute_exclusions]', function(ev) {
            var self = this
            setTimeout(function() {
                var product_id = $('input.product_id').val();
                if (product_id) {
                    update_gallery_product_variant_image(self, product_id);
                }
            }, 500)
        });
   } ,500)

   function update_gallery_product_image() {
        var $container = $('.oe_website_sale').find('.ug-slide-wrapper');
        var $img = $container.find('img');
        var $product_container = $('.oe_website_sale').find('.js_product').first();
        var p_id = parseInt($product_container.find('input.product_id').first().val());

        if (p_id > 0) {
            $img.each(function(e_img) {
                if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                    if ($(this).attr("src").match('/flip_image') == null) {
                        $(this).attr("src", "/web/image/product.product/" + p_id + "/image");
                    }
                }
            });
        } else {
            var spare_link = api.getItem(0).urlThumb;
            $img.each(function(e_img) {
                if ($(this).attr("src").startsWith('/web/image/scita.product.images/') == false) {
                    if ($(this).attr("src").match('/flip_image') == null) {
                        $(this).attr("src", spare_link);
                    }
                }
            });
        }
    }
});