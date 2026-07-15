/* Collections-page
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('collections') > -1) {
		// Change image on hover in collections page
		$('.collection-matrix').on('mouseover', '.product-wrap', function() {
			var image = $(this).find('.image__container img');
			image.attr('before-src', image.attr('src'));

			image.attr('src', image.attr('next-src'));
			image.attr('data-src', image.attr('next-data-src'));
			image.attr('data-srcset', image.attr('next-data-srcset'));

		})

		$('.collection-matrix').on('mouseout', '.product-wrap', function() {
			var image = $(this).find('.image__container img');
			image.attr('src', image.attr('before-src'));
		})
	}

	// 2 for 25 - append "Final sale" & add line-item property
	if (window.location.pathname.indexOf('2-for-25-leggings') > -1 || window.location.pathname.indexOf('2-for-30-leggings') > -1) {
		// collections page
		$('.product-wrap .price').each(function() {
			$(this).after('<p style="color: #ff317d;">FINAL SALE</p>');
		})
		// product page
		$('.modal_price .current_price').after('<p style="color: #ff317d;">FINAL SALE</p>');
		// line-item property
		$('#finalsale').val(true);
	}

	// Cart pop up remove ': true' for final sale items
	var lineItemProperty = $('.cart_item .line-item').text().split(":")[0];
	$('.cart_item .line-item').text(lineItemProperty);
})

// jQuery(function(){
//   var product = {{ product | json }};
//        $(product.variants).each(function(i, item){
//   if(!item.available){
//   $('#tag_filter[value=' + item.id + ']').remove();
//     products.variants.splice(i,1);
//   }
// });
// new Shopify.OptionSelectors("filter-option", { product: {{ product | json }}, onVariantSelected: selectCallback });
// });

// console.log("here"+ filter-option)


// Sort order of size filter on Collections page
$(function() {
	var keywords = ['X', 'S', 'M', 'L'];
	var order = [ 'XS', 'S', 'M', 'L', 'XL', '0X', '1X', '2X', '3X'];
	var rearrangedSizes = [];

	var rearrangeThese = $('.filter-option').filter(function() {
		for (var i = 0; i < keywords.length; i++) {
			if ($(this).html().replace('Size', '').indexOf(keywords[i]) > -1) {

				$(this).remove()
				return true;
			}
		}
		return false;
	})

	for (var i = 0; i < order.length; i++) {
		for (var j = 0; j < rearrangeThese.length; j++) {
			if (rearrangeThese[j].innerText.replace('Size: ', '') == order[i]) {
				rearrangedSizes.push(rearrangeThese[j]);
			}
		}
	}

	for (var k = 0; k < rearrangedSizes.length; k++) {
		$('.tag_filter').append(rearrangedSizes[k])
	}
})


$(function() {

    if (this.className.indexOf("sold_out") > -1) {
		$(".product-details").hide();
    }
})


/* Product-page
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('products') > -1) {

		console.log('search', window.location.search);

		if (window.location.search.indexOf('variant=') > -1) {
			setTimeout(function() {
				var replaceWithThis;
				$('.gallery-cell').each(function() {
					console.log('$this', $(this));
					if ($(this).css('display') != 'none') {
						replaceWithThis = $(this).find('img');
						return false;
					}
				})

					console.log('replaceWithThis', replaceWithThis)
					$('.product-main-image').attr('src', replaceWithThis.attr('src').replace('400x', '800x')).attr('alt', replaceWithThis.attr('alt')).attr('data-image-id', replaceWithThis.attr('data-image-id'));
					$('.zoomImg').attr('src', replaceWithThis.attr('src').replace('400x', '800x')).attr('alt', replaceWithThis.attr('alt')).attr('data-image-id', replaceWithThis.attr('data-image-id'));


			}, 2000)
		}

		// Click on thumbnails to switch featured image on product page
		$('.gallery-cell').click(function() {
			var newImage = $(this).find('img');
			$(this).siblings().removeClass('thumbnail-selected');
			$(this).addClass('thumbnail-selected');
			$('.product-main-image').attr('src', newImage.attr('src').replace('400x', '800x')).attr('alt', newImage.attr('alt')).attr('data-image-id', newImage.attr('data-image-id'));
			$('.zoomImg').attr('src', newImage.attr('src').replace('400x', '800x')).attr('alt', newImage.attr('alt')).attr('data-image-id', newImage.attr('data-image-id'));
		})

		// When clicking on variant color swatch, switch featured image on product page
		if ($(window).width() < 768) {
			// $('.product_section .swatch[data-option-index="0"] .swatch-element').on('touchstart', function(e) {
			// 	// e.preventDefault();
			// 	console.log('change!')
			// 	setTimeout(function() {
			// 		$('.gallery-cell').each(function() {
			// 			if ($(this).css('display') != 'none') {
			// 				console.log('change it!')
			// 				$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
			// 				$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
			// 				return false;
			// 			}
			// 		})
			// 	}, 500);
			// })
			// TODO: Color swatch Replacement
			$('.product_section .swatch[data-option-index="0"] .swatch-element').click(function(e) {
				var colorName = $(this).attr('data-value');

				$('.gallery-cell').each(function() {
					if ($(this).attr('data-title') == colorName) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});

				setTimeout(function() {
					$('.gallery-cell').each(function() {
						if ($(this).css('display') != 'none') {
							console.log('change it!')
							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							return false;
						}
					})
				}, 500);
			})
		} else {
			// $('.product_section .swatch[data-option-index="0"] .swatch-element').click(function(e) {
			// 	console.log('change!')
			// 	setTimeout(function() {
			// 		$('.gallery-cell').each(function() {
			// 			if ($(this).css('display') != 'none') {
			// 				console.log('change it!')
			// 				$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
			// 				$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
			// 				return false;
			// 			}
			// 		})
			// 	}, 500);
			// })
			$('.product_section .swatch[data-option-index="0"] .swatch-element').click(function(e) {
				var colorName = $(this).attr('data-value');

				$('.gallery-cell').each(function() {
					if ($(this).attr('data-title') == colorName) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});

				setTimeout(function() {
					$('.gallery-cell').each(function() {
						if ($(this).css('display') != 'none') {
							console.log('change it!')
							$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
							return false;
						}
					})
				}, 500);
			})
		}

		// Limit thumbnails to 6 images on swatch click
		$('.swatch-element').on('click', function() {
			setTimeout(function() {
				var displayed = 0;
				$('.gallery-cell').each(function() {
					if ($(this).css('display') != 'none') {
						if (displayed < 6) {
							displayed++;
						}
						else {
							$(this).css('display', 'none');
						}

					}
				})
			}, 800);
		})

		$('.viewSizeGuide a').click(function(e) {
			e.preventDefault();
			$('.size-guide-popup').show();
			$('body').addClass('noScroll');
		})

		$('#close-size-guide').click(function(e) {
			e.preventDefault();
			$(this).closest('.modal').hide();
			$('body').removeClass('noScroll');
		})

		$('.modal').click(function(event) {
			$(this).hide();
			$('body').removeClass('noScroll');
		})

		$('.modal-content').on('click', function(e) {
			e.stopPropagation();
		})

		// $('.add_to_cart').on('click', function() {
		// 	alert($('#product-form-574861279259');
		// })
	}
})

// Limit thumbnails to 6 images on page load
$(window).on('load', function() {
	setTimeout(function() {
		var displayed = 0;
		$('.gallery-cell').each(function() {
			if ($(this).css('display') != 'none') {
				if (displayed < 6) {
					displayed++;
				}
				else {
					$(this).css('display', 'none');
				}

			}
		})

		var featuredImageHeight = $('.product_gallery').height();
		var thumbnailHeight = featuredImageHeight / 4;
		console.log('featuredImageHeight', featuredImageHeight)
		console.log('thumbnailHeight', thumbnailHeight)

		$('.lSSlideWrapper').height(featuredImageHeight);
		$('.lslide').each(function() {
			if ($(this).css('display') != 'none') {
				console.log('this', $(this))
				$(this).css('height', thumbnailHeight);
			}
		})
	}, 1000);



	console.log('navigator', navigator)
	console.log('height', $('.lslide.active').height());
	console.log('outerHeight', $('.lslide.active').outerHeight());
	console.log('heightFeatured', $('.product_gallery').outerHeight());
	console.log('heightFeatured', $('.product_gallery').height());

})


/* Quick-view pop-up
====================================================================*/

$(function() {
	if (window.location.pathname.indexOf('collections') > -1 ) {
		// Switch main image when clicking on color swatch in Quick-View
		$('.js-quick-shop').on('click', '.swatch-element.color', function() {
			var variant = $(this).attr('data-value');
			console.log('clicked!', $(this).attr('data-value'))

			$('.product_gallery .gallery-cell').each(function() {
				if ($(this).find('img').attr('alt').indexOf(variant) > -1) {
					$('.pop-up-main-image').attr('src', $(this).find('img').attr('src'));
					return false;
				}
			})
		})

		$('.collection-template-section').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})

		$('.collection-matrix').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})

		$('.featured-collection-section').on('click', '.js-quick-shop-link', function(e) {
			e.preventDefault();
			// var imageSRC = $(this).find('.image__container img').attr('src');
			var imageSRC = $(this).closest('.product_image').find('.image__container img').attr('src');
			console.log('imageSRC', imageSRC)
			console.log('this', $(this))
			$('.pop-up-main-image').attr('src', 'https:' + imageSRC);
		})


		$('.purchase, #shopify-section-cart-template .js-change-quantity span, .cart_container .js-change-quantity span').click(function(e) {
			console.log('reload');
			// setTimeout(function() {
			// 	location.reload();
			// }, 900)
		})
	}
})


/* Footer (mobile)
====================================================================*/
$(function() {
	var $window = $(window);

	function resize() {
		if ($window.width() < 480) {
			$('.footer-menu-wrap').removeClass('container');
		}
		else if ($window.width() >= 480) {
			if (!$('.footer-menu-wrap').hasClass('container')) {
				$('.footer-menu-wrap').addClass('container');
			}
		}
	}

	function hideOnResize() {
		if ($window.width() < 769) {
			$('.top_bar .icon-cart').show();
			$('.top_bar .menu.right').show();
		}
		else {
			$('.top_bar .icon-cart').hide();
			$('.top_bar .menu.right').hide();
		}
	}

	function resizeThumbs() {
		setTimeout(function() {
			var featuredImageHeight = $('.product_gallery').height();

			$('.lSSlideWrapper').height(featuredImageHeight);
		}, 1000)
	}

	$window.resize(resize).resize(hideOnResize).resize(resizeThumbs).trigger('resize');


})

/* Header
====================================================================*/
$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	// console.log('scroll:', scroll)
	if (scroll > 120) {
		$('.inMainNav').hide();
		// $('.main_nav .nav .cart_content').css('top', '59px');
		$('.duplicate_main_nav .inMainNav .icon-cart.mini_cart').hide();
	}
	else {
		$('.inMainNav').show();
	}
})

// Image slider for thumbnails on product page
$(document).ready(function() {
    $('#lightSlider').lightSlider({
      gallery:true,
      item:4,
      vertical:true,
      vThumbWidth:100,
      thumbItem:6,
      thumbMargin:4,
      slideMargin:0,
      adaptiveHeight:true
    });
  });

// Add chevron symbols to image slider
$(function() {
	$('.lSPrev').html('&#x25b3;');
	$('.lSNext').html('&#x25b3;').css('transform', 'scale(1, -1)');
})

// Move dropdown menu down when promo banner is displayed
$(function() {
	if ($('body').hasClass('promo_banner-show')) {
		$('.main_nav .dropdown.menu').css('margin-top', '-11px');
	}

	$('.promo_banner-close').click(function() {
		$('.main_nav .dropdown.menu').css('margin-top', '0');
	})

	$('.icon-search.search-submit').click(function(e) {
		if ($(this).next().val().length < 1 ) {
			e.stopPropagation();
			$('.search-field.tt-input').focus();
		}
	})

	$('.search_form').on('submit', function(e) {
		if ($('.search-field.tt-input').val().length < 1) {
			e.stopPropagation();
			$('.search-field.tt-input').focus();
		}
	})
})

function regexWordsOnly(str) {
	return /^\w+$/i.test(input);
}


// $(function() {
// 	var displayed = 0;
// 	$('.gallery-cell').each(function() {
// 		if ($(this).css('display') != 'none') {
// 			if (displayed < 7) {
// 				displayed++;
// 			}
// 			else {
// 				$(this).css('display', 'none');
// 			}

// 		}
// 	})
// })


/* Home Page
====================================================================*/
$(function() {
	$('#shopify-section-1510004157046').css('height', $('.image-holder img').css('height'));

	$(window).on('resize', function() {
		$('#shopify-section-1510004157046').css('height', $('.image-holder img').css('height'));

		// $('#collection-list-section .thumbnail-overlay').css('height', $('#collection-list-section .product-wrap').css('height'));
		$('.list-collections .product-wrap .thumbnail-overlay').each(function() {
			$(this).css('height', $(this).closest('.thumbnail').find('.product-wrap').css('height'));
		})
	})

	setTimeout(function() {
		$('.lslide').css('height', $('.lslide .gallery-cell').css('height'));
	}, 3000)

	$('.list-collections .product-wrap .thumbnail-overlay').each(function() {
		$(this).css('height', $(this).closest('.thumbnail').find('.product-wrap').css('height'));
	})

	$('.mobile_nav-fixed--true .mobile_nav.dropdown_link').click(function() {
		$('body').toggleClass('noScroll');
	})


})

/* Gift Guide Page
====================================================================*/
$(function() {
	if (window.location.pathname == '/pages/gift-guide') {
		if ($(window).width() < 768) {
			$('.banner-desktop').hide();
			$('.banner-mobile').show();
		}

		$(window).on('resize', function() {
			if ($(window).width() < 768) {
				$('.banner-desktop').hide();
				$('.banner-mobile').show();
			}
			else {
				$('.banner-desktop').show();
				$('.banner-mobile').hide();
			}
		})
	}
})

// $('.icon-cart.mini_cart').hover(function() {
// 	console.log('clicked!');
// 	if ($(window).scrollTop() < 300) {
// 		if ($('.top_bar .cart_container').hasClass('active_link')) {
// 			$('.top_bar .cart_container').removeClass('active_link');
// 		}
// 		else {
// 			$('.top_bar .cart_container').addClass('active_link');
// 		}
// 	}
// 	else {
// 		console.log('triggered!');
// 		$(this).parent().addClass('active_link');
// 		$('.cart_container.active_link').css('top', 0);
// 		// if ($('.main_nav .cart_container').hasClass('active_link')) {
// 		// 	$('.main_nav .cart_container').removeClass('active_link');
// 		// }
// 		// else {
// 		// 	$('.main_nav .cart_container').addClass('active_link');
// 		// }
// 	}

// 	// if ($(this).parent().hasClass('active_link')) {
// 	// 	$(this).parent().removeClass('active_link');
// 	// }
// 	// else {
// 	// 	$(this).parent().addClass('active_link');
// 	// }

// })


// $( function () {
// 	console.log('session', sessionStorage.getItem('reloadAfterPageLoad'))
//     if ( sessionStorage.getItem('reloadAfterPageLoad') == true ) {
//     	console.log('session', sessionStorage.reloadAfterPageLoad)
//         $('.cart_container').addClass('active_link');
//         sessionStorage.reloadAfterPageLoad = false;
//     }
// } )



// $('.purchase').click(function(e) {
// 	var imageSRC = '';
// 	var cartItemHTML = '';
// 	var originalPrice,
// 			salesPrice,


// 	$('.gallery-cell').each(function() {
// 		if ($(this).css('display') != 'none') {
// 			imageSRC = $(this).find(">:first-child").attr('src');
// 			console.log('hello', imageSRC)
// 			return false;
// 		}
// 	})

// 	cartItemHTML += '<li class="cart_item clearfix">'
// 	cartItemHTML += '<div class="cart_image testing">'
// 	cartItemHTML += '<img src="' + imageSRC + '"/> </div>'
// 	cartItemHTML += '</li>'


// 	$('.js-cart_items').append(cartItemHTML);
// 	console.log('imageSRC', imageSRC);
// 	console.log('cartItemHTML', cartItemHTML);
// 	console.log('append!')

// 	// e.preventDefault();
// 	// setTimeout(function() {
// 	// 	location.reload();
// 	// }, 200);
// })

$('.product_form').submit(function(e){
  e.preventDefault();
})


// /* Search Results Page
// ====================================================================*/
// if (window.location.pathname.indexOf('omega-search') > -1) {
// 	var query = window.location.search.split('q=')[1].split('#')[0];
// 	query = query.replace('+', ' ');
// 	$('.main .page h1').append('<span> for: ' + query + '</span>');
// }
	$('.search-form-wrapper .search-submit').click(function() {
		$('#search_results_form').submit();
	})

/* A/B Testing Page w/ Crazy Egg
  ====================================================================*/
	$(function() {
		$('#shopify-section-header').on('click', '.go_to_checkout_button', function() {
			// alert('Going to checkout!')
			CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
		})

		$('#shopify-section-cart-template').on('click', '.add_to_cart', function() {
			// alert('Going to checkout!!')
			CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
		})
	})


	// $('form.js-cart_content__form').on('submit', function() {
	// 	alert('Going to checkout!!!')
	// 	CE2.converted("50d167d5-86dd-4c46-b473-e5b4ea16bef6")
	// })

	// $(function() {
  //   $("#lightSliderCart").lightSlider();
  // });
	$(function() {
		var popularProductsSlider = $('.flickity-popular-products').flickity({
		  // options
		  cellAlign: 'left',
		  contain: true,
			groupCells: true,
			prevNextButtons: true,
			draggable: true
		});

		$('.flickity-prev-next-button.next').click(function(e) {
			e.preventDefault();
			popularProductsSlider.flickity('next');
		})

		$('.flickity-prev-next-button.previous').click(function(e) {
			e.preventDefault();
			popularProductsSlider.flickity('previous');
		})
	})

	/* Gift Card
  ====================================================================*/
	$(function() {
		if (window.location.pathname.indexOf('giftcard') > -1) {
			$('.product_form .select').show();
			$('.product_form .selector-wrapper').show();
			$('.product_form .swatch_options').hide();
			// $('.product_form .select label').text('Amount');
		}
	})


	// TODO: Color swatch Replacement
	$('.quick-shop .swatch[data-option-index="0"] .swatch-element').click(function(e) {
		var colorName = $(this).attr('data-value');
		alert('clicked!')

		$('.gallery-cell').each(function() {
			if ($(this).attr('data-title') == colorName) {
				console.log('match!')
				$(this).show();
			} else {
				$(this).hide();
			}
		});

		setTimeout(function() {
			$('.gallery-cell').each(function() {
				if ($(this).css('display') != 'none') {
					console.log('change it!')
					$('.product-main-image').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
					$('.zoomImg').attr('src', $(this).find(">:first-child").attr('src').replace('400x', '800x'));
					return false;
				}
			})
		}, 500);
	});


 /* Blog - recently viewed items
  ====================================================================*/
    
var recentlyViewed = {
  init: function(recentlyViewedContainer){
    
    
    if(!$('body').hasClass('.article')) {
      if($('.recently-viewed__title').length) {
        var productHandle = $('.recently-viewed__title').data('rv-handle').toString();
      } else {
        var productHandle = $('.product_form').data('rv-handle').toString();
      }
    }
    
   if ($.cookie('recentlyViewed') != '') {

      var cookieValues = unescape($.cookie('recentlyViewed'));
      var cookieSplit = cookieValues.split(',');

      cookieSize = cookieSplit.length;
      shiftAmount = $('.rv-main').data('products-limit') + 1;
      rvPerAmount = $('.rv-main').data('products-per-slide');

      //Update Cookie
      for(var i = 0; i < cookieSplit.length; i++) {
        if(cookieSplit.length > shiftAmount) {
          cookieSplit.unshift();
        }
      }

      //Check if item has already been viewed
      if($.inArray(productHandle, cookieSplit) !== -1 || productHandle == null || productHandle == "null" ){
      } else {
        cookieSplit.unshift(productHandle);
      }

      //Set cookie
      if (escape(cookieSplit.join(',')) != 'null'){
        $.cookie('recentlyViewed', escape(cookieSplit.join(',')), { path: '/' }, {expires: 30});
      }

      if(cookieSplit.length && $.cookie('recentlyViewed') != '%2Cnull') {
        $(recentlyViewedContainer).removeClass('hidden');
        $(recentlyViewedContainer).find('.js-recently-viewed').removeClass('hidden');
      } else {
        $(recentlyViewedContainer).parents('.sidebar-block').remove();
      }

      if (recentlyViewedContainer) {
        recentlyViewed.getProductInformation(cookieSplit, recentlyViewedContainer, productHandle);
      }

    } else {
      $.cookie('recentlyViewed', productHandle );
    }

  },
  getProductInformation: function(cookieSplit, parent, productHandle){

    var shiftAmount = $(parent).find('.rv-element').length;

    var i = cookieSplit.indexOf('null');
    if(i != -1) {
      cookieSplit.splice(i, 1);
    }

    var i = cookieSplit.indexOf(productHandle);
    if(i != -1) {
      cookieSplit.splice(i, 1);
    }

    cookieSplit = cookieSplit.slice(0, shiftAmount);

    $.each(cookieSplit, function (index, value) {

      $.ajax({
        type: 'GET',
        url: '/products/' + value  + '?view=rv',
        success: function(data) {

          var rvProduct = $(data).find('.js-recently-viewed-product');

          $(parent + ' .rv-box-' + index ).append(rvProduct);

          //Convert pricing
//           {% if settings.show_multiple_currencies %}
//             convertCurrencies();
//           {% endif %}

         },
         error: function(x, t, m) {
          console.log(x);
          console.log(t);
          console.log(m);
         },
         dataType: "html"
      });

      if ($(parent).find('.rv-main').hasClass('js-rv-slider')){
        recentlyViewed.createSlider(parent, shiftAmount);
      } else {
        var indexProductsAvailable = shiftAmount;
        $('.js-rv-grid .thumbnail').eq(indexProductsAvailable).nextAll().remove();
      }
    });
  },

  createSlider: function(el, productsAvailable){

    var products_per_slide = $('.js-rv-slider').data('products-per-slide');
    var products_limit = $('.js-rv-slider').data('products-limit');
    var products_available = productsAvailable;
    var indexProductsAvailable = productsAvailable - 1;
    var cellAlign,
        draggable,
        prevNext,
        wrapAround,
        initialIndex;

    $('.js-rv-slider .gallery-cell').eq(indexProductsAvailable).nextAll().remove();

    if (products_per_slide == "2" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "4" && products_available > products_per_slide && products_limit > products_per_slide || products_per_slide == "6" && products_available > products_per_slide && products_limit > products_per_slide){
      cellAlign = "left";
    } else {
      cellAlign = "center";
    }

    if (products_available > products_per_slide && products_limit > products_per_slide) {
      draggable = true;
      prevNext = true;
      wrapAround = true;
    } else {
      draggable = false;
      prevNext = false;
      wrapAround = false;
    }

    if (products_per_slide == "2" && products_available > products_per_slide || products_per_slide == "4" && products_available > products_per_slide || products_per_slide == "6" && products_available > products_per_slide){
      initialIndex = 0;
    } else if (products_per_slide == "3" && products_available) {
      initialIndex = 1;
    } else if (products_per_slide == "5" && products_available) {
      initialIndex = 2;
    } else if (products_per_slide == "7" && products_available) {
      initialIndex = 3;
    }

    if ($(window).width() <= 768) {
      cellAlign = "center";
      draggable = true;
      prevNext = true;
      wrapAround = true;
      initialIndex = 1;

      $('.js-rv-slider').parents('.even-num-slides').removeClass('even-num-slides');
    }

    $('.js-rv-slider').flickity({
      "lazyLoad": 2,
      "imagesLoaded": true,
      "draggable": draggable,
      "prevNextButtons": prevNext,
      "wrapAround": wrapAround,
      "cellAlign": cellAlign,
      "pageDots": false,
      "contain": true,
      "freeScroll": true,
      "arrowShape": arrowSize,
      "initialIndex": initialIndex
    });

    $('.js-rv-slider').addClass('slider-initialized');
  }
}


$(document)
  .on('shopify:section:load', function(e){

    var $parentSection = $('#shopify-section-' + e.detail.sectionId);

    utils.pageBannerCheck();
 
  if ($parentSection.hasClass('article-template')){
    console.log("ARTICL-templ");
      productPage.init();
      productPage.relatedProducts();

      //Initiate recently viewed below product
      if ($('.js-recently-viewed .rv-main').length) {
        recentlyViewed.init('.js-recently-viewed');
      } else if ($('.article-template').length) {
        recentlyViewed.init();
      }

      if ($('.sidebar .js-sidebar-recently-viewed').length) {
        if ($.cookie('recentlyViewed') != ''){
          recentlyViewed.init('.sidebar .js-sidebar-recently-viewed');
        } else {
          $('.js-sidebar-recently-viewed.hidden').parents('.sidebar-block').remove();
        }
      }
    }
  
});