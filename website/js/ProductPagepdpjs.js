/* Minification failed. Returning unminified contents.
(6235,46-47): run-time warning JS1195: Expected expression: >
(6239,18-19): run-time warning JS1195: Expected expression: )
(6242,14-15): run-time warning JS1006: Expected ')': ;
(6416,5-6): run-time warning JS1002: Syntax error: }
(6419,23-24): run-time warning JS1004: Expected ';': {
(6480,2-3): run-time warning JS1195: Expected expression: )
(6482,23-24): run-time warning JS1004: Expected ';': {
(6613,2-3): run-time warning JS1195: Expected expression: )
 */
(function (global, $) {
    'use strict';

    global.UiCarousel = global.UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            // Private properties
            var
                me = this,
                page = me.Page,
                model = me.Model,
                carousel,
                currentThumbnailPosition,
                displayThumbnails = !page.isMobileDevice,
                displayVerticalThumbnails,
                imageNumber = 1,
                getLastVideoIndex,
                nextSetted,
                player,
                prevSetted,
                productId = model.productId,
                swiping = false,
                swipingThreshold = 15,
                tapped,
                thumbnailGap,
                wasTouchSwipe;


            if ($('#dataHeader_' + productId).length > 0) {
                var
                    dataHeader = JSON.parse($('#dataHeader_' + productId).text()),
                    productBrand = dataHeader.brand,
                    productTitle = dataHeader.title;
            }

            // Public properties
            me.createdEvent = 'created';

            // DOM picks
            var $addToWishlistButton = $('[id^="btnAddToWishList_"]'),
                $largeZoomIcon = $('#largeZoomGlass'),
                $leftArrow = $('#leftArrow'),
                $navigation = $("#indicators"),
                $mobileVideoLink = $("#mobileVideoLink"),
                $pdp = $('.pdp'),
                $productCarousel = $('#prodCarousel_' + productId),
                $rightArrow = $('#rightArrow');

            me.$productCarousel = $productCarousel;

            // Private methods
            var
                alignThumbnail = function (index) {
                    if (index > imageNumber) {
                        currentThumbnailPosition = imageNumber;
                    } else if (index < 1) {
                        currentThumbnailPosition = 1;
                    } else {
                        currentThumbnailPosition = index;
                    }

                    // Hide or show thumbnail's arrows
                    if (imageNumber > thumbnailGap) {
                        if (currentThumbnailPosition > 1) {
                            $thumbnailsLeft.show();
                            if (imageNumber - currentThumbnailPosition <= thumbnailGap) {
                                $thumbnailsRight.hide();
                                currentThumbnailPosition = imageNumber - thumbnailGap;
                            } else {
                                $thumbnailsRight.show();
                            }
                        } else {
                            $thumbnailsRight.show();
                            $thumbnailsLeft.hide();
                        }
                    }

                    var containerPos = displayVerticalThumbnails ? $thumbnailsContainer.position().top : $thumbnailsContainer.position().left,
                        imgPos = $thumbnailsContent.find('.item:nth-child(' + (index) + ')').data('initialPosition'),
                        gapSize = displayVerticalThumbnails ? 20 : 8,
                        gap = imgPos - containerPos + gapSize;
                    if (!page.isMobileDevice) {
                        $thumbnailsContainer.mCustomScrollbar('stop');
                        $thumbnailsContainer.mCustomScrollbar('scrollTo', gap >= 0 ? gap : 0);
                        // To avoid missing adjustements in some rare cases
                        setTimeout(function () {
                            $thumbnailsContainer.mCustomScrollbar('scrollTo', gap >= 0 ? gap : 0, { timeout: 0 });
                        }, 60);
                    }
                },
                createCarousel = function () {
                    $productCarousel.trigger(me.createdEvent);
                    var thumbnalImgs = $productCarousel.find('.swipe-wrap .item');

                    carousel = new Swipe($productCarousel[0], {
                        startSlide: 0,
                        speed: 400,
                        width: 440,
                        draggable: false,
                        continuous: true,
                        disableScroll: false,
                        stopPropagation: false,
                        callback: function () {
                            swiping = true;
                            if (page.Blocs.WishListAdd !== undefined) {
                                page.Blocs.WishListAdd.tooltips.$customTextError.tooltip('close');
                                page.Blocs.WishListAdd.tooltips.$noSizeErrorTooltip.tooltip('close');
                            }
                            var
                                pos = carousel.getPos() + 1,
                                length = carousel.getNumSlides(),
                                $current = $productCarousel.find('.item:nth-child(' + pos + ')'),
                                $img = $current.find('img'),
                                $prevImg = pos === 1 ? $productCarousel.find('.item:last-child').find('img') : $current.prev().find('img'),
                                $nextImg = pos === length ? $productCarousel.find('.item:first-child').find('img') : $current.next().find('img');
                            if ($img.prop('src').indexOf('placeholder') !== -1) $img.prop('src', $img.data('src'));
                            if ($prevImg.prop('src').indexOf('placeholder') !== -1) $prevImg.prop('src', $prevImg.data('src'));
                            if ($nextImg.prop('src').indexOf('placeholder') !== -1) $nextImg.prop('src', $nextImg.data('src'));
                        },
                        transitionEnd: function (index, elem) {
                            swiping = false;
                            tapped = undefined;
                            var indicators = $navigation.find('li');
                            indicators.removeActive();
                            thumbnalImgs.removeActive();
                            $(indicators[index]).addActive();
                            $(thumbnalImgs[index]).addActive().trigger('cssClassChanged');
                            if (displayThumbnails) {
                                if (wasTouchSwipe) selectThumbnail(index);
                                wasTouchSwipe = true;
                            }
                            if (model.hasVideo === true) {
                                player.pause();
                                /* FIX : display big play button on videos on iPhone devices */
                                $('.vjs-big-play-button').show();
                            }
                        }
                    });

                    if (displayThumbnails) {
                        if (!prevSetted) {
                            prevSetted = true;
                            $thumbnailsLeft.on('click', function () { alignThumbnail(currentThumbnailPosition - thumbnailGap); });
                        }
                        if (!nextSetted) {
                            nextSetted = true;
                            $thumbnailsRight.on('click', function () { alignThumbnail(currentThumbnailPosition + thumbnailGap); });
                        }
                    }
                },
                getThumbnailGap = function () {
                    return displayVerticalThumbnails ? 6 : _LaRedoute.getScreenType() + 1;
                },
                goNext = function () {
                    carousel.next();
                },
                goPrevious = function () {
                    carousel.prev();
                },
                hideIndicator = function () {
                    $navigation.hide();
                    $leftArrow.hide();
                    $rightArrow.hide();
                },
                selectThumbnail = function (index) {
                    if ($currentThumbnail.length) {
                        $currentThumbnail.removeActive();
                    }
                    var $newThumb = $thumbnailsContent.find('.item[data-slideto=' + index + ']');
                    if ($newThumb.length > 0) $currentThumbnail = $newThumb.addActive();
                },
                showIndicator = function () {
                    hideIndicator();
                    // if ($navigation.find('li').length > 1) {
                    //     $navigation.show();
                    // }
                    $leftArrow.show();
                    $rightArrow.show();
                },
                slideTo = function (index) {
                    if (model.hasVideo) {
                        player.pause();
                        if (index === getLastVideoIndex) {
                            $largeZoomIcon.hide();
                        } else {
                            $largeZoomIcon.show();
                        }
                    }
                    var speed = displayThumbnails ? -1 : 0;
                    carousel.slide(index, speed);
                    if (displayThumbnails) {
                        selectThumbnail(index);
                        wasTouchSwipe = false;
                    }
                },
                thumbnailsInitialize = function () {
                    if (!page.isMobileDevice) {
                        $thumbnailsContainer.mCustomScrollbar(
                            $.extend({}, global.Utils.Enum.CustomScrollBar.DefaultParams, {
                                horizontalScroll: !displayVerticalThumbnails,
                                mouseWheel: {
                                    enable: false
                                },
                                contentTouchScroll: false
                            })
                        );
                    }
                },
                thumbnailsReset = function () {
                    if (!page.isMobileDevice) {
                        $thumbnailsContainer.mCustomScrollbar('destroy');
                        thumbnailsInitialize();
                        currentThumbnailPosition = 1;
                    }
                };

            // Public methods
            me.ReloadImg = function (listImg) {
                if (model.hasVideo === false || (model.hasVideo && carousel !== undefined)) {
                    var hasChildren = $('#playerCedemo').children().length;
                    listImg = listImg || (page.GetVariant1() != null ? page.GetVariant1().VariantMedia : []);
                    getLastVideoIndex = listImg.length - 1;

                    var slideToCallback = function () {
                        slideTo($(this).data('slideto'));
                    };
                    var thumbnailsTriggerEvent = 'click mouseenter';

                    if (listImg.length > 0) {
                        var mediaContainer = $productCarousel.children('div:first-child');
                        if (mediaContainer == null) {
                            global.console.error('PDP - SelectVariant1 : can\'t update medias for product ' + productId + ' can\'t select dic container');
                        }

                        if (carousel !== undefined) {
                            carousel.kill();
                        }

                        // HANDLE CAROUSEL
                        var cmpt = 0;

                        if (model.hasVideo === true) {
                            if (hasChildren == 0) {
                                mediaContainer.empty();
                                $navigation.empty();

                                var divVideo = document.createElement('div');
                                divVideo.setAttribute('id', 'playerCedemo');

                                var divItemVideo = document.createElement('div');
                                divItemVideo.className = 'item';
                                divItemVideo.appendChild(divVideo);

                                player.stop();
                            } else {
                                // On thumbnail rollover, 
                                // delete only images from the carousel;
                                // keep video in the DOM
                                $productCarousel.find('div.item:not(:last)').remove();
                                // same for indicator
                                $('#indicators li:not(:last)').remove();

                                player.stop();
                            }
                        } else {
                            mediaContainer.empty();
                            $navigation.empty();
                        }

                        if (displayThumbnails) $thumbnailsContent.empty();

                        // Add each img vs selected variant
                        imageNumber = 1;
                        $.each(listImg,
                            function (index, value) {
                                if ((model.hasVideo === false && typeof value.FileName !== 'undefined' && value.Type !== 'Video')
                                    ||
                                    (model.hasVideo === true && index != listImg.length - 1 && typeof value.FileName !== 'undefined')
                                ) {
                                    var arrName = value.FileName.split('/');
                                    var imgId = arrName[arrName.length - 1].split('.')[0];

                                    var img = document.createElement('img');
                                    if (index === 0 || index === 1) {
                                        img.src = value.FileName.replace('|Dimension|', global.imageSizeRegular);
                                    } else {
                                        img.src = '/images/PDP/placeholder_680.png';
                                        img.setAttribute('data-src', value.FileName.replace('|Dimension|', global.imageSizeRegular));
                                    }

                                    img.setAttribute('data-id', imgId);
                                    img.setAttribute('data-cerberus', model.isMultiPDP ? 'img_multiPdp_setImage' : 'img_pdp_thumbnails' + index);
                                    img.setAttribute('itemprop', 'image');

                                    var imgContainer = document.createElement('div');
                                    imgContainer.className = 'item' + (cmpt == 0 ? ' active' : '');
                                    imgContainer.appendChild(img);
                                    imgContainer.style.backgroundImage = '/images/PDP/placeholder_680.png';

                                    mediaContainer.append(imgContainer).append(divItemVideo);

                                    var li = document.createElement('li');
                                    li.setAttribute('class', 'extended-area');
                                    li.setAttribute('data-slideto', cmpt);
                                    model.isMultiPDP ? li.setAttribute('data-cerberus', 'img_multiPdp_thumbnail_productImage' + (cmpt)) : '';
                                    $navigation.append(li);

                                    // Handle thumbnails
                                    if (displayThumbnails) {
                                        $thumbnailsLeft.hide();
                                        if (imageNumber > thumbnailGap) {
                                            $thumbnailsRight.show();
                                        } else {
                                            $thumbnailsRight.hide();
                                        }
                                        var $imgThumb = $('<img>', {
                                            class: 'item' + (cmpt == 0 ? ' active' : ''),
                                            src: value.FileName.replace('|Dimension|', global.imageSizeSmall),
                                            'data-slideto': cmpt,
                                            width: '70px',
                                            height: '70px',
                                            alt: productTitle + ' ' + productBrand + ' (' + imageNumber + ')',
                                            title: productTitle + ' ' + productBrand
                                        });
                                        $imgThumb.on(thumbnailsTriggerEvent, slideToCallback);
                                        if ($imgThumb.hasClass('active')) $currentThumbnail = $imgThumb;
                                        $thumbnailsContent.append($imgThumb);
                                        var imgPosition = displayVerticalThumbnails ? $imgThumb.position().top : $imgThumb.position().left;
                                        $imgThumb.data('initialPosition', imgPosition);
                                    }

                                    cmpt++;
                                }
                                imageNumber++;
                            }

                        );
                        // Allow zoom to work by getting data-index if there's only one image
                        $productCarousel.find('div.item').first().attr('data-index', 0);

                        // Set the first indicator as active
                        $navigation.find('li').first().addActive();
                        $productCarousel.find('div.item').first().addActive();

                        if (listImg.length > 1) {
                            showIndicator();
                        } else {
                            hideIndicator();
                        }
                        /**
                         * If there is only one image, we enable
                         * the swipe. Else we only trigger the event.
                         */
                        if (listImg.length > 1) {
                            createCarousel();
                        } else {
                            $productCarousel.trigger(me.createdEvent);
                        }

                        if (model.hasVideo && !page.isMobileDevice) {
                            var $lastThumbnailCloned = $thumbnailsContent
                                .children()
                                .last().clone()
                                .removeAttr('data-slideto')
                                .removeClass('item')
                                .wrap('<div class="itemVideo"></div>')
                                .parent()
                                .html('<span class="lr-icon lr-icon-video"></span>')
                                .append('Vidéo')
                                .attr('data-slideto', getLastVideoIndex)
                                .on('click', slideToCallback);
                            $thumbnails.append($lastThumbnailCloned);
                            carousel.stop();
                            player.pause();
                        }

                        $mobileVideoLink.hide();
                        if (model.hasVideo && page.isMobileDevice) {
                            $mobileVideoLink.show()
                                .html(' <span class="lr-icon lr-icon-video-mobile"></span>')
                                .append('<span>Vidéo</span>')
                                .attr('data-slideto', getLastVideoIndex)
                                .on('click', slideToCallback);
                            carousel.stop();
                        }

                        model.set_carousel_images(listImg);
                    }
                    else global.console.warning('PDP - ContainerCarousel.LoadImg : No medias for this variant ' + me.VariantId + ' product ' + productId);


                }
            };

            // Events
            $productCarousel.on('touchstart', 'img', function () {
                if (swiping === false) {
                    if (tapped === undefined) { //if tap is not set, set up single tap
                        tapped = setTimeout(function () {
                            tapped = undefined;
                            //insert things you want to do when single tapped
                        }, 300);   //wait 300ms then run single click code
                    } else {    //tapped within 300ms of last tap. double tap
                        clearTimeout(tapped); //stop single tap callback
                        tapped = undefined;
                        page.Blocs.Zoom = new UiZoom(page, 'UiZoom');
                        page.Blocs.Zoom.enable(this);
                    }
                }
            })
                .on('touchmove', 'img', function (event) {
                    var selfOffsetLeft = $(event.target).offset().left;
                    if (selfOffsetLeft > -swipingThreshold && selfOffsetLeft < swipingThreshold) {
                        swiping = false;
                    } else {
                        swiping = true;
                    }
                });
            $navigation.on('click', 'li', function (e) {
                slideTo($(this).data('slideto'));
            });
            $('.pdp-filter-item.color-item').on('click', function () {
                showIndicator();
                $addToWishlistButton.show();
            });
            $leftArrow.on('click', goPrevious);
            $rightArrow.on('click', goNext);

            // Init
            if (model.hasVideo) {
                $pdp.addClass('hasVideo');
            }

            if (displayThumbnails) {
                currentThumbnailPosition = 1;
                displayVerticalThumbnails = page.screenSize >= 4;
                thumbnailGap = getThumbnailGap();
                model.$container.on('page.size.change', function () {
                    displayVerticalThumbnails = page.screenSize >= 4;
                    thumbnailGap = getThumbnailGap();
                    thumbnailsReset();
                });
                var
                    $currentThumbnail,
                    $thumbnails = $('#thumbnails_' + productId),
                    $thumbnailsContainer = $thumbnails.find('.thumbnails'),
                    $thumbnailsLeft = $thumbnails.find('.thumbnails-left'),
                    $thumbnailsRight = $thumbnails.find('.thumbnails-right'),
                    $thumbnailsContent = $thumbnails.find('.thumbnails-content');

                thumbnailsInitialize();
                model.$eventContainer.on(pdpEvent.selectVariant1, function () { thumbnailsReset(); });
                wasTouchSwipe = true;
            }

            if (model.hasVideo && (typeof CDM === 'undefined' || typeof CDM.player === 'undefined')) {
                // Handle video resource
                var scriptElement = document.createElement('script');
                var s = document.scripts[0];
                // Parameters of the player are pushed via the URL of the script
                scriptElement.src = '//video.cedemo.com/p/clID/150/tpID/1/div/playerCedemo/html5/1/bg/FFFFFF/codeType/sku/autoplay/0/showControls/0/prefer/html5/endvideobehavior/rewind/showBigPlayButton/1/disableControls/1/?w=100%25&h=100%25&code=' + productId;

                $(model.listVariant[0].VariantMedia).each(function () {
                    if (me.TypeDescription === 'TechnicalMovie') {
                        scriptElement.src = this.FileName.replace('|ProductId|', productId);
                        return;
                    }
                });

                scriptElement.onload = function () {
                    player = new CDM.player.api('playerCedemo');

                    createCarousel();
                    me.ReloadImg();
                    carousel.stop();
                    if (model.hasVideo === true) {
                        player.pause();
                    }
                };
                s.parentNode.insertBefore(scriptElement, s);
                //Disable zoom
                $('#zoom').addClass('hide');
            }
            else createCarousel();
        }
    });

})(window, window.jQuery);;
(function ($) {
    $.fn.bootstrapValidator.validators.giftCardValidatorEmail = {
        validate: function (validateInstance, $field, options) {
            if (options.ownerIsChecked === 'recipient') {
                return (
                    $('#myAddress').is(':checked') ||
                    ($('#recipient').is(':checked') &&
                        $('#receiverEmail').val() !== '' &&
                        RegExp(options.regexp).test($('#receiverEmail').val()))
                );
            } else if (options.ownerIsChecked === 'myAddress') {
                return (
                    $('#recipient').is(':checked') ||
                    ($('#myAddress').is(':checked') &&
                        $('#buyerEmail').val() !== '' &&
                        RegExp(options.regexp).test($('#buyerEmail').val()))
                );
            }
        }
    };
})(window.jQuery);
(function ($) {
    $.fn.bootstrapValidator.validators.giftCardValidatorMessageText = {
        validate: function (validateInstance, $field, options) {
            var giftCardMessageRegexp = new RegExp(options.regexp, 'gm');

            if (
                $field.val() !== undefined &&
                $field.val() !== null &&
                $field.val().match(giftCardMessageRegexp)
            ) {
                return false;
            }

            return true;
        }
    };
})(window.jQuery);
(function ($) {
    $.fn.bootstrapValidator.validators.giftCardMandatoryDate = {
        validate: function (validateInstance, $field, options) {
            if ($('#myAddress').is(':checked')) {
                return true;
            } else if ($('#recipient').is(':checked')) {
                return $field.val() !== '';
            }
        }
    };
})(window.jQuery);
var UiGiftCardInfos = UiBloc.extend({
    init: function (page, name) {
        var me = this;
        me._super(page, name);

        // DOM picks
        var $container = $('#eGiftCardContainer');

        // private properties
        var validator;

        // private function
        me.IsValid = function () {
            if (validator) {
                validator.validate();
            }
            // compute the validation of the fields
            var allTrue = true;
            for (var property in this.validateField) {
                if (this.validateField.hasOwnProperty(property)) {
                    allTrue = allTrue && this.validateField[property];
                }
            }
            return allTrue;
        };
        me.ComputeCharLeft = function (node) {
            var numberChar = $(node).val().replace(/[\n]/gi, '  ').length;
            if (this.maxNumberChar - numberChar > 0)
                $('#labelTextAttached')
                    .find('span')
                    .text(this.maxNumberChar - numberChar);
            else $('#labelTextAttached').find('span').text('0');
        };
        me.ChangeReceiptChoice = function () {
            var cardForReceipt = true;
            if (
                $(".email-choice input[type='radio']:checked").val() ==
                'recipient'
            ) {
                $('.recipient-choice')
                    .removeClass('fadeOut')
                    .stop()
                    .slideDown(300);
                $('.my-address-choice').addClass('fadeOut').stop().slideUp(300);
            } else if (
                $(".email-choice input[type='radio']:checked").val() ==
                'myAddress'
            ) {
                cardForReceipt = false;
                $('.recipient-choice').addClass('fadeOut').stop().slideUp(300);
                $('.my-address-choice')
                    .removeClass('fadeOut')
                    .stop()
                    .slideDown(300);
            }

            validator.updateStatus('receiverDate', 'NOT_VALIDATED');
            $('#receiverDate').blur();
            if (cardForReceipt) {
                validator.updateStatus('receiverEmail', 'NOT_VALIDATED');
                $('#receiverEmail').blur();
            } else {
                validator.updateStatus('buyerEmail', 'NOT_VALIDATED');
                $('#buyerEmail').blur();
            }
        };
        me.GetInfo = function () {
            var ret = {};

            ret.PersonalisedMessage = $('#textAttached').val();
            if (this.Model.isEGiftCard) {
                ret.Sender = { FirstName: $('#buyerName').val() };
                ret.Recipient = { FirstName: $('#receiverName').val() };

                if ($('#recipient').is(':checked')) {
                    ret.DeliveryDate = $('.input-group.date')
                        .datepicker('getDate')
                        .toJSON();
                    ret.Recipient.EmailAddress = $('#receiverEmail').val();
                } else {
                    ret.DeliveryDate = '';
                    ret.Sender.EmailAddress = $('#buyerEmail').val();
                }
            }

            return ret;
        };

        // init
        var bootstrapDatepickerPathPrefix =
            '/js/Libraries/bootstrap-datepicker';
        $.when($.get(bootstrapDatepickerPathPrefix + '.min.js')).done(
            function () {
                $.get(bootstrapDatepickerPathPrefix + '_1.js', '', function () {
                    $('<link/>', {
                        rel: 'stylesheet',
                        href:
                            bootstrapDatepickerPathPrefix +
                            '3.standalone.min.css'
                    }).appendTo('head');
                    me.options = {};
                    if ($('#data-giftCard-date').length) {
                        me.options = JSON.parse(
                            $('#data-giftCard-date').html()
                        );
                    }

                    if (
                        me.Model.isEGiftCard &&
                        me.Model.Mode === 'MOD_BASKET'
                    ) {
                        me.Datas = JSON.parse(
                            Utils.CookieManager.ReadCookie(
                                'giftCard-article-modify'
                            )
                        );
                    }

                    // The form validation is handle with bootstrap validator
                    // BUT
                    // for historic reason we can't let bootstrap validator to handle the status of the ATB button
                    if (me.Model.isEGiftCard) {
                        // init date picker component
                        $('.input-group.date').datepicker({
                            format: 'dd/mm/yyyy',
                            language: 'fr',

                            startDate: me.options.minDate,
                            endDate: me.options.maxDate,

                            autoclose: true
                        });
                        $('.input-group.date')
                            .datepicker()
                            .on('changeDate', function (e) {
                                if (e.format(e) === me.options.minDate) {
                                    $('#receiverDateInfo').show();
                                } else {
                                    $('#receiverDateInfo').hide();
                                }
                            });

                        $(".email-choice input[type='radio']").on(
                            'change',
                            function () {
                                me.ChangeReceiptChoice();
                            }
                        );

                        me.maxNumberChar = parseInt(
                            $('#textAttached').attr('maxlength')
                        );
                        $('#textAttached').on('keyup', function (n) {
                            me.ComputeCharLeft($(this));
                        });
                        var $ecardTextarea = $('#textAttached');
                        $ecardTextarea.on(
                            'keydown keyup change focus blur',
                            function (e) {
                                if (e.which === 13) {
                                    e.preventDefault();
                                }
                            }
                        );
                        // prevent Quote char
                        $('#textAttached').keypress(function (n) {
                            if (n.keyCode == 34) {
                                return false;
                            }
                        });

                        // declare validators for fields
                        // add input name into this list & into the bootstrap validator settings !!!
                        me.validateField = { email: false, receiverDate: true, textAttached: true };

                        var emailRegex =
                            Utils.Enum.Form.Input.Email.ValidationRegExp;
                        var textRegex = me.Model.giftCardMessageRegexp;

                        $container.bootstrapValidator({
                            message: 'error on eGiftCard field',
                            trigger: 'blur',
                            fields: {
                                buyerEmail: {
                                    message: labels.MobileV3_PDP.EmailError,
                                    validators: {
                                        stringLength: {
                                            min: 0,
                                            max: 37,
                                            message:
                                                labels.MobileV3_PDP
                                                    .EmailLengthError
                                        },
                                        giftCardValidatorEmail: {
                                            regexp: emailRegex,
                                            ownerIsChecked: 'myAddress',
                                            message:
                                                labels.MobileV3_PDP
                                                    .EmailFormatError
                                        }
                                    }
                                },
                                receiverEmail: {
                                    message: labels.MobileV3_PDP.EmailError,
                                    validators: {
                                        stringLength: {
                                            min: 0,
                                            max: 37,
                                            message:
                                                labels.MobileV3_PDP
                                                    .EmailLengthError
                                        },
                                        giftCardValidatorEmail: {
                                            regexp: emailRegex,
                                            ownerIsChecked: 'recipient',
                                            message:
                                                labels.MobileV3_PDP
                                                    .EmailFormatError
                                        }
                                    }
                                },
                                receiverDate: {
                                    message: 'date obligatoire !!!',
                                    validators: {
                                        giftCardMandatoryDate: {}
                                    }
                                },
                                textAttached: {
                                    message:
                                        labels.MobileV3_PDP.GiftCardFormatError,
                                    validators: {
                                        giftCardValidatorMessageText: {
                                            regexp: textRegex
                                        }
                                    }
                                }
                            }
                        });
                        validator = $container.data('bootstrapValidator');

                        /*
                        SPECIFIC CODE TO HANDLE BTN enabelisation
                    */
                        // create an observer instance
                        var observer = new MutationObserver(function (
                            mutations
                        ) {
                            // on each mutation detection
                            mutations.forEach(function (mutation) {
                                var node = $(mutation.target);

                                // if modified attribute is "class"
                                if (mutation.attributeName === 'class') {
                                    // retrieve the dependant input
                                    var input = node.find('input');

                                    // get input name
                                    var inputName = input.attr('name');

                                    // override the inputName if handling email fields (receipt or myAddress) ==> unique identifier email
                                    if (
                                        inputName !== undefined &&
                                        inputName !== null &&
                                        inputName
                                            .toLowerCase()
                                            .indexOf('email') !== -1
                                    ) {
                                        inputName = 'email';
                                    }
                                    // store the result in result structure
                                    me.validateField[inputName] = $(
                                        mutation.target
                                    ).hasClass('has-success');
                                }
                            });

                            // commute ATB button function of previous result
                            // if (me.IsValid() === true)
                            //     me.Page.EnableAddToBasket();
                            // else me.Page.DisableAddToBasket();
                            me.Model.set_giftCardInfos_status(me.IsValid());
                        });

                        // select the target node
                        var target = document.querySelectorAll('.form-group');

                        // configuration of the observer:
                        var config = { attributes: true };
                        // pass in the target node, as well as the observer options

                        for (var i = 0; i < target.length; ++i) {
                            if (
                                !target[i].classList.contains(
                                    'gift-message-field'
                                )
                            ) {
                                observer.observe(target[i], config);
                            }
                        }

                        $( ".gift-ecard-message" ).blur(function() {
                            me.validateField['textAttached'] = !$('.gift-message-field').hasClass('has-error');
                        });
                    }

                    if (me.Model.Mode === 'MOD_BASKET') {
                        var cardForReceipt = me.Datas.deliveryDate != '';

                        if (cardForReceipt === true) {
                            var dateMod = new Date(me.Datas.deliveryDateLocal);
                            var today = new Date(me.options.minDate);

                            if (dateMod < today)
                                $('.input-group.date').datepicker(
                                    'update',
                                    me.options.minDate
                                );
                            else
                                $('.input-group.date').datepicker(
                                    'update',
                                    me.Datas.deliveryDateLocal
                                );

                            $('#recipient').prop('checked', true);
                        } else {
                            $('#myAddress').prop('checked', true);
                            $('.input-group.date').datepicker(
                                'update',
                                me.options.minDate
                            );
                        }

                        $('#textAttached').val(me.Datas.persoText);
                        $('#buyerName').val(me.Datas.buyerName);
                        $('#receiverName').val(me.Datas.receiverName);
                        $('#buyerEmail').val(me.Datas.buyerEmail);
                        $('#receiverEmail').val(me.Datas.receiverEmail);

                        me.ChangeReceiptChoice();
                    } else $('.input-group.date').datepicker('update', me.options.minDate);

                    // me.Page.HandleDisabledATBButtonMessages();
                });
            }
        );
    }
});
;
(function (global, $) {
    'use strict';

    global.UiInformations = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            // Private properties
            var me = this;
            var model = me.Model;
            var productId = model.productId;

            // DOM picks
            var $vendorName = $('#vendorName_' + productId);
            var $purchaseDetailsTabsMainVendor = $(
                '#purchaseDetailsTabsMainVendor'
            );

            // DOM building elements
            var $tick = $('<span>', {
                class: 'lr-tick lr-tick-light-success'
            });
            var $lrandme = $('<span>', {
                class: 'lr-icon lr-icon-lrandme-color'
            });

            // DOM adjustments

            // Public methods

            // Private methods
            var update = function () {
                var article = model.article;

                var $vendor = $vendorName.find('.name-vendor');
                var $vendorReviews = $vendorName.find('.reviews-vendor');
                var $loyaltyLrMeDeliveryInfo = $('.loyalty-lrme-delivery-info-item');
                var $deliveryInfo = model.$productContainer.find(
                    '.delivery-info'
                );
                var $servicePanel = $('#servicePanel');
                var $nbReviews = $vendorName.find('#nbReview');

                $('.delivery-return-info').hide();

                if (article != null) {
                    var isLRMainVendor = article.Vendor.Name === 'La Redoute';
                    var isProductMarketPlace = $.inArray(article.ProductClassification, ['MarketplaceRegular', 'MarketplaceBulky']) !== -1;

                    if (
                        $vendorName.length > 0 &&
                        $vendorName.data('text').length > 0
                    ) {
                        var url = $vendorName
                            .data('mkpurl')
                            .replace('{vendorId}', article.Vendor.VendorId);
                        var wordAdd = '';
                        var wording = '';
                        if (
                            article.Vendor.VendorId === '0' ||
                            article.Vendor.VendorId === 0
                        ) {
                            wording = article.Vendor.Name;
                        } else {
                            wording =
                                '<a href="' +
                                url +
                                '" class="underline">' +
                                article.Vendor.Name +
                                '</a>';
                            if (page.switchBuyBoxAB === true) {
                                $purchaseDetailsTabsMainVendor.html(
                                    '<span>' +
                                        $vendorName
                                            .data('text')
                                            .replaceAll('et expédié ', '')
                                            .replaceAll(':', '') +
                                        article.Vendor.Name +
                                        '</span>'
                                );
                            }
                        }
                        if (article.Vendor.IsCertified) {
                            wordAdd =
                                '<span id="openLabelMarketPlace" class="logo-topSeller"> </span><div class="plugin-popin popin" data-trigger="#openLabelMarketPlace" data-url="/popuplabelmarketplace"></div>';
                        }
                        $vendor.html(wording + wordAdd);

                        if (
                            global.contextInfo &&
                            global.contextInfo.Configuration.ConfigFlags
                                .EnableVendorReviews
                        ) {
                            //-- 22657: If a vendor has no reviews, do not display the review mockups --//
                            //-- 22657: The vendor "La Redoute" is not concerned by me project, only the marketplace vendors --//
                            if (
                                article.Vendor.NumberOfReviews > 0 &&
                                parseInt(article.Vendor.VendorId) > 0
                            ) {
                                $vendorReviews
                                    .find('.enable-stars')
                                    .removeClass()
                                    .addClass(
                                        'enable-stars rating-' +
                                            (
                                                '' +
                                                Math.round(
                                                    2 *
                                                        article.Vendor
                                                            .AverageOverallRating
                                                ) /
                                                    2
                                            ).replace(/\.|,/, '_')
                                    );

                                $nbReviews.html(
                                    '(' + article.Vendor.NumberOfReviews + ')'
                                );
                                $vendorReviews.show();
                                $nbReviews.show();
                            } else {
                                $vendorReviews.hide();
                                $nbReviews.hide();
                            }
                        }

                        $vendor.find('.plugin-popin').popin();
                        $vendorName.show();
                    }

                    //-- Delivery Price --//
                    var deliveryInfoPriceMask = '[[DELIVERYPRICE]]';
                    var deliveryInfoDataText = $deliveryInfo.data('text');
                    var deliveryInfoText = deliveryInfoDataText;

                    if ($deliveryInfo.data('marketplace-delivery') && isProductMarketPlace) {
                        $deliveryInfo.show();
                        //-- Use specific marketplace delivery message --//
                        var dataString = article.IsDeliverableInPlace
                            ? 'marketplace-deliveryinplace'
                            : 'marketplace-delivery';
                        deliveryInfoText = $deliveryInfo
                            .data(dataString)
                            .replace(
                                deliveryInfoPriceMask,
                                article.FormattedDeliveryFee
                            );
                    } else if (
                        deliveryInfoDataText !== undefined &&
                        deliveryInfoDataText.indexOf(deliveryInfoPriceMask) !==
                            -1
                    ) {
                        //-- Use normal delivery message --//
                        deliveryInfoText = deliveryInfoDataText.replace(
                            deliveryInfoPriceMask,
                            article.FormattedDeliveryFee
                        );
                    }

                    if (isLRMainVendor) {
                        $loyaltyLrMeDeliveryInfo.show();
                    } else {
                        $loyaltyLrMeDeliveryInfo.hide();
                    }

                    if (article.WebInfo.VendorFreeReturnsMessage) {
                        var vendorUrl = $('.delivery-return-info').attr('data-vendorUrl').replace("{vendorId}", article.Vendor.VendorId);
                        $('.delivery-return-info').find('a').text(article.WebInfo.VendorFreeReturnsMessage).attr('href', vendorUrl);
                        $('.delivery-return-info').show();
                    }

                    model.$productContainer
                        .find('.delivery-info-content')
                        .html(deliveryInfoText)
                        .prepend($tick.clone());

                        if (
                            $deliveryInfo.data('isLrAndMe') === 'True' &&
                            deliveryInfoText === deliveryInfoDataText
                        ) {
                            model.$productContainer
                                .find('.delivery-info-content')
                                .hide();
                        } else {
                            $deliveryInfo.show();
                        }

                    // display related services
                    if (global._LaRedoute.getScreenType() > 1) {
                        // dynamicly add service based on article config
                        var $ul = $servicePanel.find('ul');
                        $ul.empty();
                        article.RelatedServices.forEach(function (e, i) {
                            $ul.append(
                                $('<li>', {
                                    class:
                                        'pdp-services-element icon icon-check-small icon-block-left',
                                    text: e.Name
                                })
                            );
                        });

                        if ($ul.children().length > 0) $servicePanel.show();
                        else $servicePanel.hide();
                    }
                } else {
                    $servicePanel.hide();
                }

                if ($('#sequraInstalmentDiv').length != 0) {
                    me.Page.Blocs.Price.LoadSequraPayment();
                }
            };

            // Events
            model.$eventContainer
                .on(global.pdpEvent.selectVariant1, function () {
                    if (!model.article) {
                        update();
                    }
                })
                .on(global.pdpEvent.articleSelected, update);
            $('.reviews-vendor').on('click', function () {
                window.location.href =
                    $(this)
                        .data('basevendorurl')
                        .replace('{vendorId}', $('#vendorId').val()) +
                    '#vendor-reviews';
            });

            // Init
        }
    });
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.pdpEvent = {
        ATBUpdate: 'pdp.ATB.update',
        articleSelected: 'pdp.article.selected',
        articleUnselected: 'pdp.article.unselected',
        articleUpdated: 'pdp.article.updated',
        atbOpen: 'pdp.atb.open',
        carouselUpdated: 'pdp.carousel.updated',
        priceUpdate: 'pdp.price.update',
        productReloaded: 'pdp.product.reloaded',
        selectorClose: 'selector.close',
        selectorOpen: 'selector.open',
        selectVariant1: 'pdp.variant1.selected',
        servicesRemoved: 'services.removed',
        unselectVariant2: 'variant2.unselected',
        realTimePriceReady: 'pdp.realTimePrice.ready',
        reviewsFilterAndSortUpdated: 'pdp.reviewsFilterAndSort.updated'
    };

    global.artType = {
        redReg: 'RedouteRegular',
        redBul: 'RedouteBulky',
        mktReg: 'MarketplaceRegular'
    };

    global.ModelPDP = global.Model.extend({
        init: function (name, properties) {
            var me = this;
            me._super(name, properties);

            // Private properties
            var productId = me.productId;
            var LRandMeDisplayAtLoading;
            var isFR = $('body').data('countrycode') === 'fr-FR';
            var isRedouteVendor;
            var isRedouteVendorAtLoading =
                [global.artType.redReg, global.artType.redBul].indexOf(
                    me.productClassification
                ) < 0
                    ? false
                    : true;
            var pdpBrand = $('#pdpBrand_' + productId).text();
            var purchaseDetailsData = $(
                '#dataPurchaseDetails_' + productId
            ).text();
            var selectorData = $('#dataSelector_' + productId).text();
            var eGiftCardInfos_isValid = !me.isEGiftCard;
            var personalization_isValid =
                $('#customisable_' + productId).length === 0;
            var selector_isValid = false;
            var alreadyRatedReviewsCookie = [
                Utils.CookieManager.ReadCookie('ratedReviews') || '[]'
            ];
            var reportedReviewsCookie =
                Utils.CookieManager.ReadCookie('reportedReviews') || '[]';
            var $reviewsData = $('#reviewsData');

            // Public properties
            me.article = null;
            me.idCartLine = $('#hidCartLineId_' + productId).val();
            me.Mode = me.idCartLine === '' ? 'ATB' : 'MOD_BASKET';
            me.isChildProduct = me.isChildProduct || me.isPdpComparator;
            me.isCustomizable = $('#customisable_' + productId).length > 0;
            me.isFromCompleteLook = me.isFromCompleteLook || false;
            me.shoppingTool =
                me.shoppingTool || (global.wa_data && global.wa_data.eVar12);
            me.sortFields = {
                submissionTime: 'SubmissionTime',
                rating: 'Rating',
                helpfulness: 'Helpfulness'
            };
            me.sortDirections = {
                ascending: 'Ascending',
                descending: 'Descending'
            };
            me.voteTypes = {
                positive: 'Positive',
                negative: 'Negative',
                inappropriate: 'Inappropriate'
            };
            (me.reviews = []),
                (me.totalNbOfReviews = 0),
                (me.offset = 8),
                (me.selectedSortDir = me.sortDirections.descending);
            me.selectedSortField = me.sortFields.submissionTime;
            me.selectedRatingFilter;
            me.selectedLanguageFilter;
            me.reviewsData = {
                initialSelectedLanguage: '',
            };
            if ($reviewsData.length > 0) {
                me.reviewsData = JSON.parse($reviewsData.text());
            }
            me.alreadyRatedReviews = JSON.parse(alreadyRatedReviewsCookie);
            me.reportedReviews = JSON.parse(reportedReviewsCookie);
            if (purchaseDetailsData !== '') {
                $.extend(me, JSON.parse(purchaseDetailsData));
            }
            if (selectorData !== '') {
                $.extend(me, JSON.parse(selectorData));
            }

            if (me.isMultiPDP === undefined) {
                me.isMultiPDP = false;
            }
            if (me.product === undefined) {
                me.productList =
                    global['hidProductVariants_' + productId] || {};
                me.listVariant = $.isArray(me.productList)
                    ? me.productList[0].Variants
                    : me.productList.Variants;
            } else {
                me.listVariant = me.product.Variants;
            }
            if (
                global.Utils.UrlManager.getUrlParameter('wishListLineId') !==
                undefined
            ) {
                me.Mode = 'MOD_WISHLIST';
            }

            // DOM picks
            me.$button = $('#btnAddToBasket_' + productId);
            me.$buttonsContainer = $('#buttonsContainer_' + productId);
            me.$deliveryInfo = $('#pdpDeliveryInfo_' + productId);
            me.$filterColor = $('#filterColor_' + productId);
            me.$filterQuantity = $('#filterQuantity_' + productId);
            me.$filterSize = $('#filterSize_' + productId);
            me.$eventContainer = $('#pdpEventContainer_' + productId);
            me.$productContainer = $('#product-' + productId);
            me.$btnAddToWishlistInButtonsContainer = $(
                '#buttonsContainer_' + productId
            ).find('.btn-add-to-wishlist');
            me.$btnAddToWishlistInBackOrderedBlock = $(
                '#backOrderedBlock'
            ).find('.btn-add-to-wishlist');
            me.$reviewsList = $('.product-rating ul');

            if (!me.isChildProduct) {
                me.$sizeGuide = $('#sizeGuide');
            }

            // Private methods
            var update_ATB_status = function () {
                me.ATB_isActive =
                    selector_isValid &&
                    eGiftCardInfos_isValid &&
                    personalization_isValid;
                me.$eventContainer.trigger(global.pdpEvent.ATBUpdate);
            };

            var update_article = function () {
                me.LRandMe_isAvailable =
                    (selector_isValid && isRedouteVendor) ||
                    (!selector_isValid && LRandMeDisplayAtLoading);
                me.$eventContainer.trigger(global.pdpEvent.articleUpdated);
            };

            var update_carousel = function () {
                me.$eventContainer.trigger(global.pdpEvent.carouselUpdated);
            };

            var refreshReviewsList = function () {
                emptyReviewsList();
                me.$eventContainer.trigger(
                    global.pdpServiceEvent.reviewsRequested
                );
            };

            var emptyReviewsList = function () {
                me.reviews = [];
                me.offset = 0;
                me.$reviewsList.empty();
            };

            // Public methods
            me.getDataReco = function (type) {
                var variables = {};
                if (['ATB', 'PDPCrossSell', 'PDPUpSell'].indexOf(type) > -1) {
                    var bc1 = '',
                        bc2 = '',
                        bc3 = '',
                        brand = 'B_',
                        breadcrumb = global.tc_vars.page_breadcrumb_label;

                    if (breadcrumb && breadcrumb.length > 1) {
                        bc1 = breadcrumb[1];
                        bc2 =
                            breadcrumb.length === 2
                                ? breadcrumb[1]
                                : breadcrumb[2];
                        bc3 =
                            breadcrumb.length === 2
                                ? breadcrumb[1]
                                : breadcrumb.length === 3
                                ? breadcrumb[2]
                                : breadcrumb[3];
                    }
                    if (me.siteName === global.siteName.Castaluna) {
                        brand = 'CASTALUNA';
                    } else if (pdpBrand) {
                        brand += pdpBrand.replace(/[ .']/g, '-').toLowerCase();
                    }

                    variables.$brand = brand;
                    variables.$page_cat0 = 'CAT_' + me.siteName;
                    variables.$page_cat1 = 'CAT_' + bc1;
                    variables.$page_cat2 = 'CAT_' + bc2;
                    variables.$page_cat3 = 'CAT_' + bc3;
                }
                if (type === 'ATB') {
                    var pageCat = '',
                        productIdsToBan = [];
                    if (isFR) {
                        if (bc3 !== bc2 && bc3 !== bc1) pageCat = 'CAT_' + bc3;
                        $('.product').each(function () {
                            var productid = $(this).data('productid');
                            if (productid !== undefined) {
                                productIdsToBan.push(productid.toString());
                            }
                        });
                    }

                    variables.$productId = global.tc_vars.add_product_id;

                    if ([bc1, bc2].indexOf(bc3) > -1) variables.$page_cat3 = '';
                    if (isFR) {
                        variables.$page_cat = pageCat;
                        variables.$gamme =
                            global.tc_vars.add_product_gamme || '';
                        variables.$toBan = productIdsToBan;
                    } else {
                        variables.$price =
                            global.tc_vars.add_product_unitprice_ati;
                    }
                }
                if (type === 'PDPCrossSell') {
                    if (isFR) {
                        var productVendorIds = [];
                        if (
                            global.tc_vars &&
                            global.tc_vars.product_vendor_ids
                        ) {
                            if (
                                global.tc_vars.product_vendor_ids.indexOf('|')
                            ) {
                                productVendorIds = global.tc_vars.product_vendor_ids.split(
                                    '|'
                                );
                            } else {
                                productVendorIds =
                                    global.tc_vars.product_vendor_ids;
                            }
                        }
                    }

                    variables.$gamme = global.tc_vars.product_gamme || '';
                    variables.$productId = productId.toString();

                    if (bc1.indexOf('Nouvelle') > -1)
                        variables.$page_cat1 = 'CAT_Nouveautés';
                    if (bc1.indexOf('Collection') > -1)
                        variables.$page_cat1 = '';
                    if (bc2 === bc3) variables.$page_cat3 = '';
                    if (isFR) {
                        variables.$productVendorIds = productVendorIds;
                    } else {
                        variables.$price = global.tc_vars.product_unitprice_ati;
                    }
                }
                if (type === 'PDPUpSell') {
                    if (isFR) {
                        var universe = 'PAP';
                        if (bc1 === 'Linge de maison') universe = 'LDM';
                        if (bc1 === 'Meubles, déco') universe = 'M&D';

                        variables.$genericColorId =
                            $('.color-item.selected').data('genericcolor') ||
                            '';
                        variables.$universe = universe;
                    }

                    variables.$gamme = global.tc_vars.product_gamme || '';
                    variables.$price = global.tc_vars.product_unitprice_ati;
                    variables.$productId = productId.toString();
                }
                return variables;
            };
            me.set_giftCardInfos_status = function (boolean) {
                eGiftCardInfos_isValid = boolean;
                update_ATB_status();
            };
            me.set_selector_status = function (boolean) {
                selector_isValid = boolean;
                isRedouteVendor =
                    me.article !== null
                        ? me.article.Vendor.VendorId === '0'
                        : isRedouteVendorAtLoading;
                update_ATB_status();
                update_article();
            };
            me.set_personalization_status = function (boolean) {
                personalization_isValid = boolean;
                update_ATB_status();
            };
            me.set_carousel_images = function (listImg) {
                me.listImg = listImg;
                update_carousel();
            };
            me.filterAvailableVoteOptions = function (review) {
                var $reviewVoteElt = $('[data-review-id=' + review.reviewId + ']');
                var $helpfulnessVoteBtn = $reviewVoteElt.find('[value=' + me.voteTypes.positive + ']');
                var $inappropriateVoteBtn = $reviewVoteElt.find('[value=' + me.voteTypes.inappropriate + ']');

                if (review.voteType === me.voteTypes.inappropriate) $inappropriateVoteBtn.hide();
                if (review.voteType === me.voteTypes.positive) $helpfulnessVoteBtn.hide();

                if (!$inappropriateVoteBtn.is(':visible') && !$helpfulnessVoteBtn.is(':visible')) $reviewVoteElt.hide();
            };

            // Events
            if (!me.isChildProduct) {
                me.$eventContainer
                    .on(
                        global.globalTrackingEvent.dataLayerUpdated,
                        function () {
                            if (!me.shoppingTool)
                                me.shoppingTool = global.wa_data.eVar12;
                        }
                    )
                    .on(
                        global.pdpServiceEvent.realTimePriceSucceeded,
                        function (e, data) {
                            me.$eventContainer.trigger(
                                global.pdpEvent.realTimePriceReady,
                                [data]
                            );
                        }
                    )
                    .on(
                        global.pdpEvent.reviewsFilterAndSortUpdated,
                        function () {
                            refreshReviewsList();
                        }
                    );
            }

            // Init
            LRandMeDisplayAtLoading = me.$buttonsContainer
                .find('#loyalty')
                .is(':visible');
            me.selectedLanguageFilter = me.reviewsData.initialSelectedLanguage; // On page load, reviews need to be filtered by user's locale
            // Find already rated reviews, and hide them
            me.alreadyRatedReviews.forEach(function (review) {
                me.filterAvailableVoteOptions(review);
            });
        }
    });
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.MultiPDP = global.Page.extend({
        init: function (listBlocks, params) {
            var me = this;
            me.listProduct = params.listProd;
            me.products = [];
            if (params.isPdpComparator) {
                params.products = global.hidProductVariants_comparison;
            }

            me.listProduct.forEach(function (productId, index) {
                var component = {
                    Selector: 'UiSelector',
                    Price: 'UiPrice',
                    WishListAdd: 'UiWishListAdd',
                    Thumbnail: 'thumbnailContainer'
                };
                if (!params.isPdpComparator) {
                    component.Informations = 'UiInformations';
                }
                if (index === 0 && params.carousel !== false && params.isPdpComparator === false) {
                    component.Carousel = 'UiCarousel';
                    if (me.isMobileDevice) component.Zoom = 'UiZoom';
                    else component.Zoom = 'UiLargeZoom';
                }
                if (me.isBackOrderedEnabled()) {
                    component.backOrdered = 'UiBackOrdered';
                }

                $.extend(params, {
                    hasVideo: false,
                    isGiftCard: false,
                    isEGiftCard: false,
                    productId: productId,
                    ProductID: productId,
                    isMultiPDP: true,
                    displayTagFromPLP: true,
                });

                if (params.products !== undefined) {
                    params.product = params.products[index];
                }

                me.products.push(new global.PDP(component, params, global.model.PDP));
            });

            if (params.isPdpComparator) {
                me._super(listBlocks, params);
            }

            if (params.isPdpComparator && !me.isMobileDevice) {
                var storageComparedProducts = [];
                $.each(me.listProduct, function (index, productId) {
                    storageComparedProducts.push({
                        productId: productId,
                        imageUrl: $('#seeProduct_' + productId).children('.product-img').attr('src')
                    });
                });
                global.Utils.StorageManager.CreateStorageValue('comparedProducts', storageComparedProducts);
            }
        },
        isBackOrderedEnabled: function () {
            var page = this.Page;
            if (page && page.country === 'fr') {
                return true;
            }
            return false;
        },
        removeProduct: function (productId) {
            var productIdString = productId.toString();
            var comparedProductsFromStorage = global.Utils.StorageManager.ReadStorageValue('comparedProducts');
            var indexOfComparedProductToRemove = -1;
            $.each(comparedProductsFromStorage, function (index, product) {
                if (product.productId === productIdString) {
                    indexOfComparedProductToRemove = index;
                    return;
                }
            });
            if (indexOfComparedProductToRemove !== -1) {
                comparedProductsFromStorage.splice(indexOfComparedProductToRemove, 1);
                global.Utils.StorageManager.CreateStorageValue('comparedProducts', comparedProductsFromStorage);
                return true;
            }
            return false;
        }
    });
})(window, jQuery);
;
(function (global, $) {
    'use strict';

    global.PDP = global.Page.extend({
        init: function (listBlocks, params, model) {
            this._super(listBlocks, params, model);

            // Private properties
            var me = this;
            var model = me.Model;
            var tracking = me.Tracking;
            var article = model.article;
            var currentVendor = {};
            var isOtherVendorButton = false;
            var lockATB = false;
            var productId = model.productId;
            var wa_data = global.wa_data;
            var localStorageImageSelected = 'productImageFromPLP';
            var imageFromPLP = localStorage.getItem(localStorageImageSelected);
            var serviceEvent = global.globalServiceEvent;
            var trackingTagSent = false;

            me.switchBuyBox = false;

            if (model.isMonoColor || model.isMonoSize) {
                if (
                    me.countryCode === 'fr-FR' &&
                    $('#vendorsListHeading').attr('data-vendors') !== '1'
                ) {
                    me.switchBuyBox = true;
                } else {
                    $('#purchaseDetailsTabs').hide();
                }
            } else {
                $('#purchaseDetailsTabs').hide();
            }

            // DOM picks
            var $ATBSuccess = $('#ATBSuccess_' + productId);
            var $businessSeeMore = $('.business-push-button');
            var $layerAtb = $('#layerAtb');
            var $openDeliveryInfo = $('#openPdpDeliveryInfo_' + productId);
            var $seeProduct = $('#seeProduct_' + productId);
            me.$searchField = $('#header_search_field');

            if (!model.isChildProduct) {
                var $sizeGuide = $('#sizeGuide');
            }

            // DOM building element
            var $tooltipContainer, $clickedBtn;

            // Private methods
            var LoadMyRedoute = function () {
                //-- Get Vanilla Javascript Instance --//
                var placeholder = $('#divMyRedoutePlaceholder');
                if (!placeholder.length) return;

                var args = {
                    request: {
                        ProductId: productId,
                        IsMobile: me.isMobileDevice
                    }
                };

                $.ajax({
                    url: '/serviceproductnosession/loadmyredoute',
                    data: JSON.stringify(args),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST'
                }).done(function (data, textStatus, jqXHR) {
                    //-- .NET 4 Compatibility --//
                    if (data.d != null) data = data.d;

                    if (data.IsSuccess) {
                        //-- Replace Placeholder HTML --//
                        if (data.Media.length > 0) {
                            placeholder.html(data.Html);
                            placeholder.show();
                            if (me.isSiteFR()) {
                                placeholder.find('.my-redoute-image').hide();
                            }

                            tC.event.loadSocialCarousel(this, {
                                css_selector: '#olapicCarousel',
                                product_id: productId
                            });
                        }

                        //-- Initialise --//
                        // me.Blocs.MyRedoute = new UiMyRedoute(me, "UiMyRedoute", data.Media);
                    }
                });
            };

            var SendATBOmnitureTag = function (ATBOmnitureInformation) {
                // -- OmnitureIntegration already passed? do not resend tag --//
                // if (ATBOmnitureInformation && ATBOmnitureInformation.OmnitureIntegration && $('#layerAtb .omnitureIntegration').children().length > 0)
                if (
                    ATBOmnitureInformation &&
                    ATBOmnitureInformation.OmnitureIntegration &&
                    trackingTagSent
                )
                    return;

                if (model.isFromCompleteLook) {
                    global.Utils.CookieManager.CreateCookie(
                        'mainshoppingtool',
                        'associatedlookpdp'
                    );
                }
            };

            var UpdateBasket = function (id) {
                var params = me.GetArticleInfo();

                if (params.articleIsSelected) {
                    var datas = {
                        request: {
                            quant: params.quantity,
                            basketSize: params.basketSize,
                            presCode: params.presCode,
                            itemOfferId: params.itemOfferId,
                            CartLineId: model.idCartLine,
                            personalisation: params.personalisation
                        }
                    };
                    if (model.isEGiftCard || model.isGiftCard)
                        datas.request.giftCardInfo = me.Blocs.GiftCardInfos.GetInfo();

                    $.ajax({
                        async: false,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        url: '/shoppingbasket/UpdateItemOfCart',
                        data: JSON.stringify(datas),

                        success: function () {
                            if (model.isEGiftCard || model.isGiftCard)
                                global.Utils.CookieManager.EraseCookie(
                                    'giftCard-article-modify'
                                );

                            me.AddToBasketSuccessEvent(id);
                        },
                        error: function (xhr) {
                            global.console.error(
                                'AJAX on: ' +
                                    this.url +
                                    ' --- method: ' +
                                    this.type +
                                    ' --- status: ' +
                                    xhr.status +
                                    ' --- statusText: ' +
                                    xhr.statusText
                            );
                        }
                    });
                }
            };

            var addFeedbackOnCta = function (success, itemOfferId) {
                if (itemOfferId === model.article.ItemOfferId) {
                    $clickedBtn = model.$button;
                } else {
                    $clickedBtn = $(
                        '.button-container[data-itemid=' + itemOfferId + ']'
                    ).find('.lr-button');
                }
                if (typeof success === varType.bool) {
                    if (success) {
                        $clickedBtn.addClass('lr-button-success');
                        if (
                            $clickedBtn.data('text-add-success') !== undefined
                        ) {
                            $clickedBtn.text(
                                $clickedBtn.data('text-add-success')
                            );
                        }
                    } else {
                        $clickedBtn.addClass('lr-button-error');
                    }
                    if (model.isChildProduct) {
                        global.setTimeout(removeFeedbackOnCta, 2000);
                    }
                } else {
                    console.error('pdp : success is not a boolean');
                }
            };

            var addItemToCart = function (data) {
                if (model.isMultiPDP || model.isFromCompleteLook) {
                    setProductOriginForShopTheLook();
                }

                var providerArgs = {
                    itemOfferId: data.itemOfferId,
                    componant: 'pdp',
                    hasLoyalty: data.loyalty
                };
                if (
                    _page.pageType === 'ProductPage' &&
                    $ATBSuccess.length === 0
                ) {
                    providerArgs.hasATBlayer = true;
                }

                model.$eventContainer.trigger(serviceEvent.addToCartRequested, [
                    data,
                    providerArgs
                ]);
            };

            var disableATB = function () {
                if (lockATB) {
                    $('#quantitySelect_' + productId).addDisabled();
                    handleDisabledATBMessages();
                }
            };

            var enableATB = function () {
                if (
                    !model.isEGiftCard ||
                    (model.isEGiftCard && me.Blocs.GiftCardInfos.IsValid())
                ) {
                    $('#quantitySelect_' + productId).removeDisabled();
                    me.HideErrorMessage(model.$buttonsContainer);
                }
            };

            var enableEcoPartPopin = function () {
                if ($('.ecopart-link').length > 0) {
                    $('.ecopart-link').on('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('#ecopartPopin').popin({
                            method: 'open',
                            trigger: $(this)
                        });
                    });
                }
            };

            var handleDisabledATBMessages = function () {
                var messageError = '',
                    labels = global.labels.MobileV3_PDP,
                    isCustomNotValid =
                        me.Blocs.Selector !== undefined &&
                        me.Blocs.Selector.hasCustomizable() &&
                        me.Blocs.Selector.customizableBV.isValid() === false;

                // Set message
                if (model.isEGiftCard && !me.Blocs.GiftCardInfos.IsValid()) {
                    messageError =
                        'Veuillez choisir un montant et remplir les informations carte cadeau';
                } else if (
                    model.isGiftCard &&
                    !me.Blocs.GiftCardInfos.IsValid()
                ) {
                    messageError =
                        'Veuillez choisir un montant pour la carte cadeau';
                } else if (me.GetVariant2() === null) {
                    messageError = labels.NoSizeError;
                    if (isCustomNotValid) {
                        messageError = labels.NoSizeAndCustomTextError;
                    }
                } else if (isCustomNotValid) {
                    messageError = labels.NoCustomTextError;
                }

                if (hasAtbTooltip()) {
                    $tooltipContainer
                        .children('#atbTooltipMessage_' + productId)
                        .text(messageError);
                }
            };

            var hasAtbTooltip = function () {
                if (
                    $tooltipContainer !== undefined &&
                    $tooltipContainer.length > 0
                ) {
                    return true;
                }
                return false;
            };

            var openPopinAtb = function () {
                var listImg =
                    me.GetVariant1() != null
                        ? me.GetVariant1().VariantMedia
                        : [];
                var $detailsArticleAtb = {
                    image: $('.article-atb-image'),
                    title: $('.article-atb-details-title'),
                    ref: $('.article-atb-details-ref'),
                    size: $('.article-atb-details-size'),
                    color: $('.article-atb-details-color'),
                    qty: $('.article-atb-details-qty'),
                    price: $('.article-atb-price'),
                    vendor: $('.article-atb-details-vendor')
                };
                var $imgContainerAtb = $detailsArticleAtb.image;

                /*add img on popin pdp atb*/
                $imgContainerAtb.empty();
                if (listImg[0].FileName !== undefined) {
                    var $addImgAtb = $('<img>', {
                        class: 'additional-img',
                        src: listImg[0].FileName.replace(
                            '|Dimension|',
                            'products/100by100'
                        )
                    });
                    $imgContainerAtb.append($addImgAtb);
                }

                var $infoPrice = $(
                    '#product-' + productId + ' .info-price-total'
                )
                    .clone(false)
                    .find('*')
                    .removeAttr('id');
                /*add details product on popin pdp atb*/
                $detailsArticleAtb.title.text(
                    $('#product-' + productId + ' .pdp-title').text()
                );
                if (me.refProduct !== 0) {
                    $detailsArticleAtb.ref.text(me.refProduct);
                    $detailsArticleAtb.ref.parent().show();
                } else {
                    $detailsArticleAtb.ref.parent().hide();
                }
                $detailsArticleAtb.size.text(
                    $('#filterSizeLabel_' + productId).text()
                );
                $detailsArticleAtb.color.text(
                    $('#filterColorLabel_' + productId).text()
                );
                $detailsArticleAtb.qty.text(me.Blocs.Selector.qty);
                var $vendor = $detailsArticleAtb.vendor;

                if ($vendor.length > 0) {
                    $vendor.html(currentVendor.name);
                    if (!$vendor.text()) {
                        $vendor.text($('.pdp-brand').text());
                    }
                    if (currentVendor.url !== undefined) {
                        $vendor
                            .attr('data-vendor-url', currentVendor.url)
                            .click(function () {
                                global.location.href = currentVendor.url;
                            });
                    } else {
                        $vendor.removeAttr('data-vendor-url').off('click');
                    }
                }
                if (me.$currentPrice !== undefined) {
                    $detailsArticleAtb.price.html(
                        $('<span>', {
                            html: me.$currentPrice,
                            style: 'font-size: 32px;'
                        })
                    );
                } else {
                    $detailsArticleAtb.price.html($infoPrice);
                }

                $layerAtb.popin('open');
            };

            var showMobileAtb = function () {
                $('.mask').addClass('atb-mask');
                $('body').prepend($layerAtb);
                $layerAtb.addClass('layer-atb').show();
            };

            var removeFeedbackOnCta = function () {
                if ($clickedBtn !== undefined) {
                    $clickedBtn.removeClass(
                        'lr-button-success lr-button-error'
                    );
                    if ($clickedBtn.data('text-add') !== undefined) {
                        $clickedBtn.text($clickedBtn.data('text-add'));
                    }
                }
            };

            var setProductOriginForShopTheLook = function () {
                tracking.set_productOrigin({
                    type: 'RECO',
                    subType: 'Manual',
                    extraData: [
                        1,
                        model.isMultiPDP ? 'productrange' : 'shopthelook'
                    ]
                });
            };

            var updateATB = function () {
                model.ATB_isActive ? enableATB() : disableATB();
            };

            var findKeyword = function (hashValue) {
                var keyword = '';
                var values = hashValue.split('&');

                values.forEach(function (val) {
                    if (val.indexOf('searchkeyword') !== -1) {
                        var current = val.split('=');
                        keyword = current[1];
                        return;
                    }
                });

                return decodeURI(keyword);
            };

            // Public methods
            me.AddToBasket = function (obj) {
                var finalize = function () {
                    var params = me.GetArticleInfo();
                    isOtherVendorButton = false;

                    var $vendorName = model.$deliveryInfo.find('.name-vendor');
                    currentVendor = {
                        name: $vendorName.text()
                    };
                    if ($vendorName.find('a').length > 0) {
                        currentVendor.url = $vendorName.find('a').attr('href');
                    }
                    if (obj !== undefined) {
                        params.itemOfferId = obj.itemOfferId;
                        params.presCode = obj.prescode;
                        currentVendor = obj.vendor;
                        me.$currentPrice = obj.$price;
                        isOtherVendorButton = true;
                    } else {
                        delete me.$currentPrice;
                    }

                    me.refProduct = params.presCode;

                    model.$button.feedback('add');

                    var shouldAddLoyalty =
                        typeof me.Blocs.Loyalty != 'undefined'
                            ? me.Blocs.Loyalty.shouldAddLoyalty
                            : false;

                    var data = {
                        quant: params.quantity,
                        basketSize: params.basketSize,
                        presCode: params.presCode,
                        itemOfferId: params.itemOfferId,
                        personalisation: params.personalisation,
                        contextCategoryId: params.contextCategoryId,
                        productId: params.ProductId,
                        loyaltySource: 'pdp',
                        loyalty: shouldAddLoyalty
                    };

                    if (model.isEGiftCard || model.isGiftCard)
                        data.giftCardInfo = me.Blocs.GiftCardInfos.GetInfo();
                    if (model.isFromCompleteLook) {
                        data.origin = 'associatedlookpdp';
                    } else if (model.isMultiPDP === true) {
                        data.origin = 'multipdp';
                    } else if (
                        typeof model.shoppingTool !== 'undefined' &&
                        model.shoppingTool !== 'undefined'
                    ) {
                        data.origin = model.shoppingTool;
                    }

                    addItemToCart(data);
                };

                if (me.GetArticleInfo().articleIsSelected) {
                    finalize();
                } else {
                    me.requestSizeBefore(finalize);
                }
            };
            me.AddToBasketSuccessEvent = function () {
                if (!global.Utils.Common.isCFAO()) {
                    SendATBOmnitureTag(me.ATBOmnitureInformation);
                }

                global._LaRedoute.updateBasketCountItem();

                if ($ATBSuccess.length > 0) {
                    $ATBSuccess.tooltip('open');
                    setTimeout(function () {
                        $ATBSuccess.tooltip('close');
                    }, 2000);
                } else {
                    me.showAtb();
                }
            };
            me.CloseLayerAtb = function () {
                if (me.isMobileDevice) {
                    $('.mask').removeClass('atb-mask');
                    $layerAtb.hide();
                    $layerAtb.trigger('popin.close');
                } else {
                    $layerAtb.popin('close');
                }
            };
            me.GetArticle = function () {
                model.article = null;

                if (
                    me.GetVariant1() == null ||
                    (me.GetVariant1().Article == null &&
                        (me.GetVariant2() == null ||
                            me.GetVariant2().Article == null))
                ) {
                    model.article = null;
                } else {
                    model.article = me.GetVariant2().Article;
                }
                return model.article;
            };
            me.GetArticleInfo = function () {
                var article = model.article,
                    itemOfferId = null,
                    quantity = null,
                    BasketSize = null,
                    PresCode = null,
                    Personalisation = null;

                var ret = {};

                if (article !== null) {
                    if (!itemOfferId) itemOfferId = article.ItemOfferId;

                    if (quantity == null)
                        quantity = me.Blocs.Selector.GetQuantity();

                    if (Personalisation == null)
                        Personalisation = me.Blocs.Selector.GetPersonalisation();

                    ret.basketSize = article.BasketSize;
                    ret.presCode = article.PresCode;

                    ret.contextCategoryId = null;
                    if (contextInfo && contextInfo.CategoryId) {
                        ret.contextCategoryId = contextInfo.CategoryId;
                    }

                    // properties used for wish list feature
                    ret.ProductId = article.ProductId;
                    ret.DocumentId = article.DocumentId;
                    ret.Dimension1 = article.Dimension1;
                    ret.Dimension2 = article.Dimension2;
                }

                ret.articleIsSelected = article != null;
                ret.quantity = quantity;
                ret.personalisation = Personalisation;
                ret.itemOfferId = itemOfferId;
                return ret;
            };
            me.GetVariant1 = function () {
                var variant = null;
                var idvariant1 = me.Blocs.Selector.GetIdVariant1();

                if (model.listVariant.length == 1) {
                    return model.listVariant[0];
                } else {
                    variant = $.grep(model.listVariant, function (element) {
                        return idvariant1 == element.VariantId;
                    });

                    if (variant != null && variant.length == 1) {
                        return variant[0];
                    } else
                        global.console.error(
                            "PDP - CurrentVariant.GetVariant1 : Can't select color variant (id : " +
                                idvariant1 +
                                ') in variant list ' +
                                model.listVariant
                        );
                }
            };
            me.GetVariant2 = function () {
                var variant2 = null;
                var idvariant2 = me.Blocs.Selector.GetIdVariant2();

                if (idvariant2 != null) {
                    variant2 = $.grep(me.GetVariant1().Variants, function (e) {
                        return idvariant2 == e.VariantId;
                    });
                    if (variant2 != null && variant2.length == 1) {
                        return variant2[0];
                    }
                }

                return variant2;
            };
            me.LoadDefaultArticle = function () {
                var wishlistItem = global.Utils.CookieManager.ReadCookie(
                    'wishList_ItemToAdd'
                );
                var dim1, dim2;
                if (wishlistItem !== null) {
                    wishlistItem = JSON.parse(wishlistItem);

                    // current product IS the product added to wishlist
                    if (
                        parseInt(wishlistItem.productAdded) ===
                        parseInt(productId)
                    ) {
                        // Display message
                        $('#divAddedToWishList').show();
                        global.setTimeout(function () {
                            $('#divAddedToWishList').addClass('fade');
                        }, '5000');

                        dim1 = wishlistItem.Dimension1;
                        dim2 = wishlistItem.Dimension2;
                        global.Utils.CookieManager.EraseCookie(
                            'wishList_ItemToAdd'
                        );
                    }
                }

                // no dim1 already selected (by code/URL, etc...)
                if (
                    dim1 === undefined &&
                    model.$filterColor.find('button.selected').length > 0
                ) {
                    // set it from select
                    dim1 = model.$filterColor.find('button.selected').val();
                }
                // same for dim2
                if (
                    dim2 === undefined &&
                    model.$filterSize.find('button.selected').length > 0
                ) {
                    // set it from select
                    dim2 = model.$filterSize.find('button.selected').val();
                }

                // if image selected not match with image from PLP, we change dim1 #52939
                // /!\ PATCH because we don't have the id of color in PLP (before loadColors success)
                if (imageFromPLP != undefined && imageFromPLP != null) {
                    if (
                        imageFromPLP !=
                        global.Utils.UrlManager.getLastElementFromUrl(
                            model.$filterColor
                                .find('button.selected')
                                .find('img')
                                .attr('src')
                        )
                    ) {
                        $.each(model.$filterColor.find('button'), function () {
                            if (
                                imageFromPLP ==
                                global.Utils.UrlManager.getLastElementFromUrl(
                                    $(this).find('img').attr('src')
                                )
                            ) {
                                dim1 = $(this).val();
                                var newUrl = new URL(window.location.href);
                                if (newUrl.searchParams.has('dim1')) {
                                    newUrl.searchParams.set('dim1', dim1);
                                } else {
                                    newUrl.searchParams.append('dim1', dim1);
                                }
                                history.replaceState(null, null, newUrl);
                                // We found the correspondence and we are on the iteration corresponding to the URL we can clean the storage
                                if (
                                    window.location.href.indexOf(productId) > -1
                                ) {
                                    localStorage.removeItem(
                                        localStorageImageSelected
                                    );
                                }
                                return;
                            }
                        });
                    }
                }

                // select article
                if (dim1 !== undefined) {
                    me.Blocs.Selector.SelectVariant1(dim1, false);
                }
                if (dim2 !== undefined) {
                    me.Blocs.Selector.SelectVariant2(dim2, false);
                }

                me.Blocs.Selector.UpdateATBButtonStatus(false);
            };
            me.requestSizeBefore = function (fn) {
                var selectorComponent = me.Blocs.Selector;
                if (!me.isMobileDevice && !model.isChildProduct)
                    selectorComponent.switchSize('popin');
                model.$filterSize.popin('open');
                model.$filterSize.one(popinEvent.close, function () {
                    setTimeout(function () {
                        if (me.GetArticleInfo().articleIsSelected) fn();
                        if (!me.isMobileDevice && !model.isChildProduct)
                            selectorComponent.switchSize('popin');
                    }, 100);
                });
            };
            me.showAtb = function () {
                if (me.isMobileDevice) showMobileAtb();
                else openPopinAtb();
                global.$eventContainer.trigger(pdpEvent.atbOpen);
            };
            me.toggleBuyBox = function () {
                me.switchBuyBox = true;
                var $globalPDPDetailsContainer = $(
                    '#globalPDPDetailsContainer'
                );
                $globalPDPDetailsContainer.addClass(
                    'purchase-details-container'
                );

                var $mainVendorTab = $('#purchaseDetailsTabsMainVendor');
                var $mainVendorContent = $('#mainProductDetailsContainer');
                var $otherVendorTab = $('#purchaseDetailsTabsOtherVendors');
                var $otherVendorContent = $('#otherVendorsDetailsContainer');

                $mainVendorTab.on('click', function() {
                    $mainVendorTab.attr('aria-expanded', true);
                    $otherVendorTab.attr('aria-expanded', false);

                    $mainVendorContent.attr('data-expanded', true);
                    $otherVendorContent.attr('data-expanded', false);
                });

                $otherVendorTab.on('click', function() {
                    $otherVendorTab.attr('aria-expanded', true);
                    $mainVendorTab.attr('aria-expanded', false);

                    $otherVendorContent.attr('data-expanded', true);
                    $mainVendorContent.attr('data-expanded', false);
                });
            };

            // Events
            if (
                contextInfo.Configuration.ConfigFlags.EnableUIRTA &&
                !model.isChildProduct
            ) {
                model.$eventContainer.trigger(
                    global.pdpServiceEvent.realTimePriceRequested
                );
            }
            if (model.switchBuyBox === true) me.toggleBuyBox();

            if ($businessSeeMore.length > 0) {
                $businessSeeMore.on('click', function () {
                    $('html, body').animate(
                        {
                            scrollTop: $('#businessInfo').offset().top
                        },
                        0
                    );
                });
            }
            model.$button.on('click', function () {
                if (model.Mode === 'MOD_WISHLIST') {
                    me.Blocs.WishListAdd.HandleWishListEvent();
                } else if (article != null && article.IsBackOrdered === true) {
                    me.Blocs.backOrdered.show();
                } else if (model.Mode === 'MOD_BASKET') {
                    if (
                        !(
                            me.Blocs.Selector !== undefined &&
                            me.Blocs.Selector.hasCustomizable() &&
                            me.Blocs.Selector.customizableBV
                                .validate()
                                .isValid() === false
                        )
                    ) {
                        UpdateBasket();
                    }
                } else {
                    if (
                        !(
                            me.Blocs.Selector !== undefined &&
                            me.Blocs.Selector.hasCustomizable() &&
                            !me.Blocs.Selector.customizableBV
                                .validate()
                                .isValid()
                        ) &&
                        (!model.isEGiftCard || me.Blocs.GiftCardInfos.IsValid())
                    ) {
                        me.AddToBasket();
                    }
                }
            });
            $('#productRatingTitle').on('click', function () {
                if ($('#productRating').is(':visible') === false) {
                    $('#productRatingHeading').trigger('click');
                }
                $('html, body').animate(
                    {
                        scrollTop:
                            $('.product-rating').offset().top -
                            $('#header').height()
                    },
                    200
                );
            });
            if ($seeProduct.length > 0) {
                $seeProduct.on('click', function () {
                    var hash = '';
                    if (me.Blocs.Selector.currentVariant1 !== undefined) {
                        hash +=
                            (hash === '' ? '#' : '&') +
                            'variant1=' +
                            me.Blocs.Selector.currentVariant1;
                    }
                    if (me.Blocs.Selector.currentVariant2 !== undefined) {
                        hash +=
                            (hash === '' ? '#' : '&') +
                            'variant2=' +
                            me.Blocs.Selector.currentVariant2;
                    }
                    global.location = $(this).data('url') + hash;
                });
            }
            if ($openDeliveryInfo.length > 0) {
                // Binding on link to display delivery information
                $openDeliveryInfo.on('click', function () {
                    model.$deliveryInfo.stop().slideToggle(300);
                    $(this)
                        .find('.lr-arrow')
                        .toggleClass('lr-arrow-down lr-arrow-up');
                });
            }
            $('#closeLayerAtb')
                .off('click')
                .on('click', function () {
                    me.CloseLayerAtb();
                });
            if (me.isMobileDevice) {
                $('.mobileLayerAtb_closeCross').on('click', function () {
                    me.CloseLayerAtb();
                });
            }
            $('.mask')
                .off('click')
                .on('click', function () {
                    if ($(this).hasClass('atb-mask') === true)
                        me.CloseLayerAtb();
                });
            $('#seeCompleteLookLayerATB')
                .off('click')
                .on('click', function () {
                    me.CloseLayerAtb();
                });
            if (!model.isChildProduct) {
                $('#sizeGuideLink')
                    .off('click')
                    .parent()
                    .on('click', function (e) {
                        $sizeGuide.data('popin').open();
                        $("[data-name='sizeGuide']").css('z-index', '1000');
                    });
                $('#backPdp').on('click', function () {
                    if (document.referrer.indexOf('.laredoute.') !== -1) {
                        global.history.back();
                    } else {
                        global.location.href = $('.breadcrumb .active a').attr(
                            'href'
                        );
                    }
                });
            }
            $layerAtb.on('popin.open', function () {
                var fromAtbLayerClassName = 'fromAtbLayer';
                $(this)
                    .on('click', '.ecopart-link', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('#ecopartPopin')
                            .addClass(fromAtbLayerClassName)
                            .popin({
                                method: 'open',
                                trigger: $(this)
                            });
                        me.CloseLayerAtb();
                    })
                    .on('click', '.colored-price-tag', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('#colorPricePopin')
                            .addClass(fromAtbLayerClassName)
                            .popin({
                                method: 'open',
                                trigger: $(this)
                            });
                        me.CloseLayerAtb();
                    });
                $('#ecopartPopin, #colorPricePopin').on(
                    'popin.close',
                    function () {
                        // Reopen the ATB Layer when closing the service popin
                        if ($(this).hasClass(fromAtbLayerClassName)) {
                            $(this).removeClass(fromAtbLayerClassName);
                            me.showAtb();
                        }
                    }
                );
            });
            model.$eventContainer.on(pdpEvent.ATBUpdate, function () {
                updateATB();
            });
            if (!model.isChildProduct) {
                $layerAtb.on('popin.close', function () {
                    global.setTimeout(removeFeedbackOnCta, 2000);
                });
            }

            model.$eventContainer.on(serviceEvent.addToCartSucceeded, function (
                e,
                ATBOmnitureInformation,
                providerArgs
            ) {
                me.ATBOmnitureInformation = ATBOmnitureInformation;

                var tagCommanderHTML = ATBOmnitureInformation.TagCommanderHTML;
                if (tagCommanderHTML != '' && tagCommanderHTML != null) {
                    $('#tc_vars').empty();
                    //$.ajaxSetup({ cache: true });
                    $('#tc_vars').html(tagCommanderHTML);
                }

                if (ATBOmnitureInformation.AnalyticsDataLayer !== undefined) {
                    trackingTagSent = true;
                }

                if (
                    ATBOmnitureInformation.ErrorMessage !== undefined &&
                    ATBOmnitureInformation.ErrorMessage !== null
                ) {
                    if (
                        model.$buttonsContainer
                            .find('.block-info.block-error')
                            .text()
                            .search(ATBOmnitureInformation.ErrorMessage) < 0
                    ) {
                        $('<div>', {
                            class: 'block-info block-error',
                            html: ATBOmnitureInformation.ErrorMessage,
                            'data-cerberus': 'basket_full_error'
                        }).prependTo(model.$buttonsContainer);
                    }
                    if (isOtherVendorButton) {
                        $('html, body').animate(
                            {
                                scrollTop:
                                    model.$buttonsContainer.offset().top - 30
                            },
                            1000
                        );
                    }
                } else {
                    addFeedbackOnCta(true, providerArgs.itemOfferId);
                    me.AddToBasketSuccessEvent();
                }

                if (
                    typeof tc_events_1 === 'function' &&
                    contextInfo.Breadcrumb !== null &&
                    contextInfo.Breadcrumb !== undefined
                ) {
                    tc_events_1(this, 'addToCart', {
                        add_product_id: productId,
                        add_breadcrumb_id: contextInfo.Breadcrumb,
                        add_quantity: ATBOmnitureInformation.Quantity
                    });
                }
            });
            model.$eventContainer.on(
                serviceEvent.addToCartAnswered,
                function () {
                    enableATB();
                    model.$button.feedback('remove');
                }
            );

            if (model.isMultiPDP || model.isFromCompleteLook) {
                global.Utils.Common.onCustomClick(
                    model.$productContainer.find('.product-img-container > a'),
                    setProductOriginForShopTheLook
                );
            }

            // Init
            var selectorComponent = me.Blocs.Selector;
            selectorComponent.switchSize('popin');

            if (
                global.Utils.CookieManager.ReadCookie('SaveForLaterReferrer') ==
                'true'
            ) {
                wa_data.eVar12 = 'wishlist';
                wa_data.prop12 = 'wishlist';
            }
            if (!model.isChildProduct) {
                global._OmnitureTracking.handleShoppingTool();
                $sizeGuide.popin();
            }
            me.LoadDefaultArticle();
            if (
                !model.isChildProduct &&
                $('#divMyRedoutePlaceholder').length > 0
            ) {
                LoadMyRedoute();
            }
            if (model.Mode === 'MOD_WISHLIST') {
                // Detect mode MODIFY wish list item
                model.$button.text(
                    global.labels.MobileV3_PDP.ModifyWishlistButton
                );
            }
            me.Blocs.Selector.UpdateDeliveryLinkStatus(); // Update display link to delivery information
            if (global.Utils.UrlManager.GetHashValue('variant1') !== null) {
                model.$filterColor
                    .find(
                        'button[value=' +
                            global.Utils.UrlManager.GetHashValue('variant1') +
                            ']'
                    )
                    .trigger('click');
            }
            if (global.Utils.UrlManager.GetHashValue('variant2') !== null) {
                model.$filterSize
                    .find(
                        'button[value=' +
                            global.Utils.UrlManager.GetHashValue('variant2') +
                            ']'
                    )
                    .trigger('click');
            }
            enableEcoPartPopin();
            if (model.isFromCompleteLook) {
                global.Utils.OmnitureManager.addShoppingToolHash(
                    model.$productContainer.find('a').first(),
                    'associatedlookpdp'
                );
            } else if (model.isMultiPDP === true) {
                global.Utils.OmnitureManager.addShoppingToolHash(
                    model.$productContainer.find('a').first(),
                    'multipdp'
                );
            }

            if (model.ATB_isActive !== undefined) updateATB();
            if (model.shouldAddToWishlist)
                me.Blocs.WishListAdd.$this.trigger('click');

            $('.fs-countdown').each(function () {
                var newFsCountDown = new UiFsCountDown(
                    me,
                    'UiFsCountDown',
                    null,
                    $(this)
                );
            });

            var hashValues = global.location.hash;
            if (hashValues != null && hashValues != '') {
                me.$searchField.val(findKeyword(hashValues));
                $('#eraseSearchButton').show();
            }
        }
    });
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.UiPrice = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);
            var me = this;
            var model = me.Model;
            var productId = model.productId;

            // Dom picks
            this.$colorPricePopin = $('#colorPricePopin');
            this.$redPrice = $('#showRedPrice_' + productId);
            this.$greenPrice = $('#showGreenPrice_' + productId);
            this.$miniPrice = $('#showMiniPrice_' + productId);
            this.$coloredPriceTag = $('.colored-price-tag');
            this.$3xcb = $('#3xcb_' + productId);

            // Private methods
            this.$coloredPriceTag.on('click', function () {
                me.$colorPricePopin.popin('open');
            });

            //
            var updateRealtimePrice = function (data) {
                if (!model.isChildProduct) {
                    // Mutate the existing data with the result returned from the service
                    data.Products.forEach(function (product) {
                        // Find the corresponding product from the data on the page
                        var curProduct;
                        $.each(model.productList, function (i, p) {
                            if (
                                p.ProductId === product.ProductId &&
                                p.DocumentId === product.DocumentId
                            ) {
                                curProduct = p;
                                return false;
                            }
                        });

                        if (curProduct) {
                            // Update the product-level data
                            curProduct.WebInfo.PriceDisplay =
                                product.PriceDisplay;

                            $.each(curProduct.Variants, function (j, lvl1) {
                                $.each(lvl1.Variants, function (k, lvl2) {
                                    // Find the corresponding article returned from the service
                                    var resArticle;
                                    $.each(product.Articles, function (i, a) {
                                        if (
                                            a.ItemOfferId ===
                                            lvl2.Article.ItemOfferId
                                        ) {
                                            resArticle = a;
                                        }
                                    });
                                    if (resArticle) {
                                        // Update the article-level data
                                        lvl2.Article.AvailabilityCode =
                                            resArticle.AvailabilityCode;
                                        lvl2.Article.AvailabilityPeriod =
                                            resArticle.AvailabilityPeriod;
                                        lvl2.Article.WebInfo.ArticlePriceDisplay =
                                            resArticle.ArticlePriceDisplay;
                                    }
                                });
                            });

                            model.productList[0] = curProduct;
                        }
                    });
                }
            };

            // Events
            if (!model.isChildProduct) {
                model.$eventContainer.on(pdpEvent.realTimePriceReady, function (
                    e,
                    data
                ) {
                    updateRealtimePrice(data);
                });
            }
        },
        Update: function (interactive) {
            var me = this;
            var model = me.Model;

            var interactive = interactive === undefined ? true : interactive;

            var $delivery = this.Model.$productContainer.find('.delivery');
            var $delay = this.Model.$productContainer.find('.delay');
            var $deliveryDelay = this.Model.$deliveryInfo.find(
                '.delivery-delay'
            );
            var $deliveryDelayPicto = this.Model.$productContainer.find(
                '.js-delivery-picto'
            );

            var $aPartirDePrice1 = this.Model.$productContainer.find(
                '.cost-from'
            );
            var $hrUnderDeliveryDelay = this.Model.$deliveryInfo.find(
                '#hrUnderDeliveryDelay'
            );
            var $shopAvailable = this.Model.$deliveryInfo.find(
                '.shop-available'
            );

            var productId = this.Model.productId;

            var $filterQuantity = this.Page.Blocs.Selector.$quantity.select;
            var $creditPriceInfo = $('#creditPriceInfo_' + productId);
            var $tagPriceLeftByArticle = $(
                '#tagPriceLeftByArticle_' + productId
            );
            var $tagPriceLeftByProd = $('#tagPriceLeftByProd_' + productId);
            var $tagPriceLeftA = $('#tagsPriceLeftA_' + productId);
            var $tagPriceLeftB = $('#tagsPriceLeftB_' + productId);
            var $tagPriceBottomA = $('#tagsPriceBottomA_' + productId);
            var $tagPriceBottomB = $('#tagsPriceBottomB_' + productId);
            var $tagDGCCRF = $('#tagDGCCRF_' + productId);

            var $showCreditPrice = $('#showCreditPrice_' + productId);
            var $CreditPriceDetail_Rate = $(
                '#CreditPriceDetail_Rate_' + productId
            );
            var $CreditPriceDetail_Price = $(
                '#CreditPriceDetail_Price_' + productId
            );
            var $panelchPayment = $('#panelchPayment_' + productId);
            var $creditPriceInfoCH = $('#creditPriceInfoCH_' + productId);

            var article = this.Page.GetArticle();

            var isLrfb = this.Model.siteName === siteName.LaRedouteForBusiness;

            /******** Inner function to handle display logic of each bloc ******/
            var me = this;

            var UpdateDelivery = function (article) {
                me.Model.$button.trigger('pdp.updateDelivery');

                if (
                    typeof article.IsBackOrdered != 'undefined' &&
                    article.IsBackOrdered
                ) {
                    article.WebInfo.DeliveryDelayMessage =
                        '<b>' +
                        labels.MobileV3_PDP.StockAlert_ComingSoon +
                        '</b>';
                    // display popup on user action
                    // don't display it when user modify his wishlist item
                    if (interactive && me.Model.Mode !== 'MOD_WISHLIST') {
                        me.Page.Blocs.backOrdered.show();
                    }
                }
                var hidePictoAndHr = true;
                if (article.WebInfo.StockMessage != undefined && article.WebInfo.StockMessage !== '') {
                    $delivery.html(article.WebInfo.StockMessage);
                    hidePictoAndHr = false;
                } else {
                    $delivery.html('');
                }
                // Add condition on backordered product don't display delay delivery
                if (
                    article.WebInfo.DeliveryDelayMessage != undefined &&
                    article.WebInfo.DeliveryDelayMessage !== '' &&
                    article.WebInfo.DeliveryDelayMessage.indexOf('0h') == -1 &&
                    !article.IsBackOrdered
                ) {
                    $delay.html(article.WebInfo.DeliveryDelayMessage);
                    hidePictoAndHr = false;
                } else {
                    $delay.html('');
                }

                if (hidePictoAndHr) {
                    $deliveryDelayPicto.hide();
                } else {
                    $deliveryDelayPicto.show();
                }

                $deliveryDelay.show();
                if ($shopAvailable.css('display') === 'none') {
                    $hrUnderDeliveryDelay.show();
                }
            };

            var HideDelivery = function () {
                $deliveryDelay.hide();
                $hrUnderDeliveryDelay.hide();
            };
            /******** END - Inner function to handle display logic of each bloc ******/
            if (article == null) {
                HideDelivery();
                $aPartirDePrice1.show();
                $creditPriceInfo.hide();
                $creditPriceInfoCH.hide();
                $panelchPayment.hide();
                $showCreditPrice.hide();
                $filterQuantity.addClass(Utils.Enum.Status.Disabled);

                // affect the variant as the current article
                article = this.Page.GetVariant1();

                var allSkuIsRedPrice = [];
                var allSkuIsMiniPrice = [];
                var allSkuIsGreenPrice = [];
                article.Variants.forEach(function (variant) {
                    allSkuIsRedPrice.push(variant.Article.IsRedPrice === true);
                    allSkuIsMiniPrice.push(
                        variant.Article.IsMiniPrice === true
                    );
                    allSkuIsGreenPrice.push(
                        variant.Article.IsGreenPrice === true
                    );
                });

                var togglePriceType = function (price, priceType) {
                    if ($.inArray(false, priceType) === -1) {
                        price.show();
                    } else {
                        price.hide();
                    }
                };

                togglePriceType(this.$redPrice, allSkuIsRedPrice);
                togglePriceType(this.$miniPrice, allSkuIsMiniPrice);
                togglePriceType(this.$greenPrice, allSkuIsGreenPrice);

                // NoSku selected
                // remove SKU tag
                $tagPriceLeftByArticle.empty().hide();
            } else {
                var isPriceTypeValid = function (priceType) {
                    if (
                        typeof priceType !== 'undefined' &&
                        priceType === true
                    ) {
                        return true;
                    }
                    return false;
                };
                UpdateDelivery(article);
                $aPartirDePrice1.hide();
                if (isPriceTypeValid(article.IsRedPage)) {
                    this.$redPrice.show();
                } else if (isPriceTypeValid(article.IsMiniPrice)) {
                    this.$miniPrice.show();
                } else if (isPriceTypeValid(article.IsGreenPage)) {
                    this.$greenPrice.show();
                } else {
                    this.$redPrice.hide();
                    this.$greenPrice.hide();
                    this.$miniPrice.hide();
                }

                $filterQuantity.removeClass(Utils.Enum.Status.Disabled);
                if (
                    article.MonthlyPayment &&
                    article.MonthlyPayment != 0 &&
                    $creditPriceInfoCH.length > 0
                ) {
                    $creditPriceInfoCH.html(
                        $creditPriceInfoCH
                            .data('text')
                            .replace('|PRICE|', article.MonthlyPayment)
                    );
                    $panelchPayment
                        .find('.panel-title')
                        .html($creditPriceInfoCH.html());
                    $creditPriceInfoCH.show();
                    $panelchPayment.show();
                }
                $tagPriceLeftByArticle.empty().hide();
                if (article.WebInfo.EventTagImage !== '') {
                    if (article.WebInfo.EventTagImage.slice(0, 4) === 'http') {
                        // img tag
                        var tag = $('<img>');
                        tag.attr('src', article.WebInfo.EventTagImage);
                        $tagPriceLeftByArticle.html(tag);
                    } else
                        $tagPriceLeftByArticle.html(
                            article.WebInfo.EventTagImage
                        );

                    $tagPriceLeftByArticle.show();

                    if (
                        typeof $tagPriceLeftByArticle.data('productindex') !==
                        'undefined'
                    )
                        $tagPriceLeftByArticle.attr(
                            'data-cerberus',
                            'txt_multiPdp_product' +
                                $tagPriceLeftByArticle.data('productindex') +
                                '_pictoCollection'
                        );
                }

                var _3xCB_isVisible = me.display3XCB();

                // var _3xCB_isVisible = me.$3xcb.length > 0 && me.Page.isSiteFR() && me.display3XCB();

                // HACK FOR giftcard
                if (
                    article.WebInfo.CreditPriceDisplay.ShowCreditPrice ===
                        true &&
                    !_3xCB_isVisible
                ) {
                    me.hide3XCB();
                    $creditPriceInfo.html(
                        labels.MobileV3_PDP[
                            'PayInTimes' +
                                article.WebInfo.CreditPriceDisplay
                                    .NumberOfInstallment
                        ]
                    );
                    $creditPriceInfo.show();

                    if (
                        article.WebInfo.CreditPriceDisplay.CreditRate !=
                        undefined
                    )
                        $CreditPriceDetail_Rate.text(
                            article.WebInfo.CreditPriceDisplay.CreditRate.toString() +
                                '%'
                        );
                    $CreditPriceDetail_Price.text(
                        article.WebInfo.CreditPriceDisplay
                            .FormattedCreditFinalPrice
                    );
                    $showCreditPrice.show();
                } else {
                    $creditPriceInfo.hide();
                    $showCreditPrice.hide();
                }
            }

            // update tag at level product
            $tagPriceLeftByProd.empty().hide();
            $tagPriceLeftA.empty().hide();
            $tagPriceLeftB.empty().hide();
            $tagPriceBottomA.empty().hide();
            $tagPriceBottomB.empty().hide();
            $tagDGCCRF.empty().hide();

            var tagPriceLeftProd = '';
            var tagPriceLeftA = '';
            var tagPriceLeftB = '';
            var tagPriceBottomA = '';
            var tagPriceBottomB = '';

            var listTags = $.parseJSON($('#hidTags_' + productId).val());
            var variantSpecificTags = me.GetTagsArray(
                listTags,
                this.Page.GetVariant1().Tags
            );

            var articleDim1 = article.VariantId;
            if (!articleDim1) articleDim1 = article.Dimension1;

            variantSpecificTags.forEach(function (e, i) {
                if (
                    (e.DocumentId === undefined ||
                        e.DocumentId === article.DocumentId) &&
                    (!e.Dimension1 ||
                        e.Dimension1 == '' ||
                        !articleDim1 ||
                        articleDim1 == '' ||
                        e.Dimension1 == articleDim1)
                ) {
                    var priceTagAdded = false;
                    e.Positions.forEach(function (pos, posi) {
                        if (
                            !priceTagAdded &&
                            ((!me.Model.displayTagFromPLP &&
                                (pos.Location === 'PDP' ||
                                    pos.Location === 'SHARED') &&
                                pos.Position === 'Sticker_New') ||
                                (me.Model.displayTagFromPLP &&
                                    ((pos.Location === 'PLP' &&
                                        pos.Position === 'ImageOuterBottom') ||
                                        (pos.Location === 'SHARED' &&
                                            pos.Position === 'Sticker_New'))))
                        ) {
                            //-- Check to avoid adding tag twice due to multiple positions --//
                            priceTagAdded = true;

                            if (e.TagType === 'Image') {
                                tagPriceLeftProd += $('<img>').attr(
                                    'src',
                                    e.TagContent
                                )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                tagPriceLeftProd += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>').attr('src', e.ImageUrl)
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                tagPriceLeftProd += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                tagPriceLeftProd += e.TagContent;
                            }

                            if (
                                typeof $tagPriceLeftByProd.data(
                                    'productindex'
                                ) !== 'undefined'
                            )
                                $tagPriceLeftByProd.attr(
                                    'data-cerberus',
                                    'txt_multiPdp_product' +
                                        $tagPriceLeftByProd.data(
                                            'productindex'
                                        ) +
                                        '_stickerNew'
                                );
                        }

                        if (
                            pos.Location === 'PDP' &&
                            pos.Position === 'PriceLeftA'
                        ) {
                            if (e.TagType === 'Image') {
                                tagPriceLeftA += $('<img>').attr(
                                    'src',
                                    e.TagContent
                                )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                tagPriceLeftA += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>').attr('src', e.ImageUrl)
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                tagPriceLeftA += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                tagPriceLeftA += e.TagContent;
                            }
                        }

                        if (
                            pos.Location === 'PDP' &&
                            pos.Position === 'PriceLeftB'
                        ) {
                            if (e.TagType === 'Image') {
                                tagPriceLeftB += $('<img>').attr(
                                    'src',
                                    e.TagContent
                                )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                tagPriceLeftB += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>').attr('src', e.ImageUrl)
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                tagPriceLeftB += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                tagPriceLeftB += e.TagContent;
                            }
                        }

                        if (
                            pos.Location === 'PDP' &&
                            pos.Position === 'PriceBottomA'
                        ) {
                            if (e.TagType === 'Image') {
                                tagPriceBottomA += $('<img>').attr(
                                    'src',
                                    e.TagContent
                                )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                tagPriceBottomA += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>').attr('src', e.ImageUrl)
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                tagPriceBottomA += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                tagPriceBottomA += e.TagContent;
                            }
                        }

                        if (
                            pos.Location === 'PDP' &&
                            pos.Position === 'PriceBottomB'
                        ) {
                            if (e.TagType === 'Image') {
                                tagPriceBottomB += $('<img>').attr(
                                    'src',
                                    e.TagContent
                                )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                tagPriceBottomB += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>').attr('src', e.ImageUrl)
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                tagPriceBottomB += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                tagPriceBottomB += e.TagContent;
                            }
                        }

                        if (
                            pos.Location === 'SHARED' &&
                            pos.Position === 'Sticker_DGCCRF'
                        ) {
                            if (e.TagType === 'Image') {
                                $tagDGCCRF += $('<img>')
                                    .attr('src', e.TagContent)
                                    .attr(
                                        'data-cerberus',
                                        'area_pdp_stickerDgccrf1'
                                    )[0].outerHTML;
                            } else if (e.TagType === 'ImageWithLink') {
                                $tagDGCCRF += $('<a>')
                                    .attr('href', e.Link)
                                    .append(
                                        $('<img>')
                                            .attr('src', e.ImageUrl)
                                            .attr(
                                                'data-cerberus',
                                                'area_pdp_stickerDgccrf1'
                                            )
                                    )[0].outerHTML;
                            } else if (e.TagType === 'TextWithLink') {
                                $tagDGCCRF += $('<a>')
                                    .attr('href', e.Link)
                                    .html(e.TagContent)[0].outerHTML;
                            } else {
                                $tagDGCCRF += e.TagContent;
                            }
                            if (
                                e.Tooltips !== undefined &&
                                e.Tooltips !== null &&
                                e.Tooltips.length > 0
                            ) {
                                $tagDGCCRF.append(
                                    $('<div>', {
                                        id: 'tagDGCCRF_trigger_' + e.ProductId,
                                        class:
                                            'pdp-detail-dgccrf icon icon-tooltip'
                                    })
                                );
                                $('<div>', {
                                    id: 'tagDGCCRF_tooltip_' + e.ProductId,
                                    class: 'tooltip',
                                    'data-style': 'small',
                                    'data-position': 'top',
                                    'data-show-close': 'false',
                                    'data-trigger':
                                        '#tagDGCCRF_trigger_' + e.ProductId,
                                    html: e.Tooltips[0].Text
                                })
                                    .appendTo($tagDGCCRF)
                                    .tooltip();
                            }

                            $tagDGCCRF.show();
                        }
                    });
                }
            });

            if (tagPriceLeftProd !== '')
                $tagPriceLeftByProd.html(tagPriceLeftProd).show();
            if (tagPriceLeftA !== '') $tagPriceLeftA.html(tagPriceLeftA).show();
            if (tagPriceLeftB !== '') $tagPriceLeftB.html(tagPriceLeftB).show();
            if (tagPriceBottomA !== '')
                $tagPriceBottomA.html(tagPriceBottomA).show();
            if (tagPriceBottomB !== '')
                $tagPriceBottomB.html(tagPriceBottomB).show();

            var $showSalePriceAfter = $(
                '#showSalePriceAfter_' + this.Model.productId
            );
            var $ecoPartArea = $('#ecoPartArea_' + this.Model.productId);
            var $showDiscount = $('#showDiscount_' + this.Model.productId);
            var $showSalePriceBefore = $(
                '#showSalePriceBefore_' + this.Model.productId
            );

            function formatPriceToFloat(price) {
                price = price.replace(',', '.');
                return parseFloat(price);
            }

            // if no article selected
            // use defaultProduct to get Price information
            if (article.WebInfo === undefined) {
                var littlePrice = 0;
                var littleVariant;
                var tab = this.Page.GetVariant1().Variants;
                $(tab).each(function () {
                    if (this.Article.AvailabilityCode !== 'E') {
                        var salePrice = parseInt(
                            this.Article.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceAfterWithChargesWithoutCurrency
                        );
                        if (littlePrice == 0) {
                            littlePrice = salePrice;
                            littleVariant = this.Article;
                        } else {
                            if (littlePrice > salePrice) {
                                littlePrice = salePrice;
                                littleVariant = this.Article;
                            }
                        }
                    }
                });

                if (littleVariant !== undefined) {
                    if (isLrfb) {
                        $showSalePriceAfter.html(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceAfterExVatWithCharges +
                                ' ' +
                                labels.MobileV3_PDP.WithoutTaxes
                        );
                        //me.display3XCB();
                        //me.display3XCB(littleVariant.WebInfo.ArticlePriceDisplay.FormattedSalePriceAfterExVatWithChargesWithoutCurrency);
                        $ecoPartArea.html(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedD3EFeeExVat +
                                ' ' +
                                labels.MobileV3_PDP.WithoutTaxes
                        );
                    } else {
                        $showSalePriceAfter.html(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceAfterWithCharges
                        );
                        //me.display3XCB();
                        // me.display3XCB(littleVariant.WebInfo.ArticlePriceDisplay.FormattedSalePriceAfterWithChargesWithoutCurrency);
                        $ecoPartArea.html(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedD3EFee
                        );
                    }

                    $showDiscount.html('').hide();

                    if (
                        formatPriceToFloat(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceBeforeWithChargesWithoutCurrency
                        ) >
                        formatPriceToFloat(
                            littleVariant.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceAfterWithChargesWithoutCurrency
                        )
                    ) {
                        if (isLrfb) {
                            $showSalePriceBefore.html(
                                littleVariant.WebInfo.ArticlePriceDisplay
                                    .FormattedSalePriceBeforeExVatWithCharges +
                                    ' ' +
                                    labels.MobileV3_PDP.WithoutTaxes
                            );
                        } else {
                            $showSalePriceBefore.html(
                                littleVariant.WebInfo.ArticlePriceDisplay
                                    .FormattedSalePriceBeforeWithCharges
                            );
                        }
                        if (littleVariant.DiscountPercentage != null) {
                            $showDiscount
                                .html(
                                    '-' +
                                        littleVariant.DiscountPercentage.toString() +
                                        '%'
                                )
                                .show();
                        }
                        $showSalePriceBefore.show();
                    } else {
                        $showSalePriceBefore.hide();
                    }
                }
            } else {
                if (isLrfb) {
                    $showSalePriceAfter.html(
                        article.WebInfo.ArticlePriceDisplay
                            .FormattedSalePriceAfterExVatWithCharges +
                            ' ' +
                            labels.MobileV3_PDP.WithoutTaxes
                    );
                    $ecoPartArea.html(
                        article.WebInfo.ArticlePriceDisplay
                            .FormattedD3EFeeExVat +
                            ' ' +
                            labels.MobileV3_PDP.WithoutTaxes
                    );
                } else {
                    $showSalePriceAfter.html(
                        article.WebInfo.ArticlePriceDisplay
                            .FormattedSalePriceAfterWithCharges
                    );
                    $ecoPartArea.html(
                        article.WebInfo.ArticlePriceDisplay.FormattedD3EFee
                    );
                }
                $showDiscount.html('').hide();

                if (
                    formatPriceToFloat(
                        article.WebInfo.ArticlePriceDisplay
                            .FormattedSalePriceBeforeWithChargesWithoutCurrency
                    ) >
                    formatPriceToFloat(
                        article.WebInfo.ArticlePriceDisplay
                            .FormattedSalePriceAfterWithChargesWithoutCurrency
                    )
                ) {
                    if (isLrfb) {
                        $showSalePriceBefore.html(
                            article.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceBeforeExVatWithCharges +
                                ' ' +
                                labels.MobileV3_PDP.WithoutTaxes
                        );
                    } else {
                        $showSalePriceBefore.html(
                            article.WebInfo.ArticlePriceDisplay
                                .FormattedSalePriceBeforeWithCharges
                        );
                    }
                    if (article.DiscountPercentage) {
                        $showDiscount
                            .html(
                                '-' +
                                    article.DiscountPercentage.toString() +
                                    '%'
                            )
                            .show();
                    }
                    $showSalePriceBefore.show();
                } else {
                    $showSalePriceBefore.hide();
                }
            }

            this.Model.$button.trigger(pdpEvent.priceUpdate);
        },
        GetTagsArray: function (tags, variantTags) {
            //-- Create new array to hold contents of tags and variantTags --//
            var newTagsArray = [];
            if (tags && tags.length) {
                $.each(tags, function () {
                    newTagsArray.push(this);
                });
            }
            if (variantTags && variantTags.length) {
                //-- Iterate over each variantTag --//
                $.each(variantTags, function () {
                    var variantTag = this;
                    var variantTagPositions = this.Positions;

                    //-- Check if a tag at product level already exists at same position as this variantTag - if so, remove it --//
                    //-- tags at variantLevel take precendence over tags at product level --//
                    $.each(newTagsArray, function () {
                        var newTagElement = this;

                        var newTagElementPositions;
                        $.each(variantTagPositions, function () {
                            var variantTagPosition = this;
                            newTagElementPositions = $.grep(
                                newTagElement.Positions,
                                function (e) {
                                    return (
                                        e.Location ==
                                            variantTagPosition.Location &&
                                        e.Position ==
                                            variantTagPosition.Position
                                    );
                                }
                            );
                        });

                        //-- Remove element if matched --//
                        if (
                            newTagElementPositions &&
                            newTagElementPositions.length
                        ) {
                            newTagsArray = $.grep(newTagsArray, function (e) {
                                return e.id != newTagElement.id;
                            });
                        }
                    });

                    //-- Add variantTag to the array --//
                    newTagsArray.push(variantTag);
                });
            }

            return newTagsArray;
        },
        display3XCB: function () {
            if (this.Model.article.WebInfo.Display3XBlock === true) {
                this.$3xcb.show();
            } else {
                this.$3xcb.hide();
            }
            return this.Model.article.WebInfo.Display3XBlock;
            // var
            //     minPrice = 90,
            //     maxPrice = 2000,
            //     price = parseFloat((amount || this.Model.article.WebInfo.ArticlePriceDisplay.FormattedSalePriceAfterWithChargesWithoutCurrency).replace(',', '.'));
            // if (price >= minPrice && price <= maxPr  ice) {
            //     this.$3xcb.show();
            //     return true;
            // }
            // return false;
        },
        hide3XCB: function () {
            this.$3xcb.hide();
        }
    });
})(window, window.jQuery);
;
(function (global) {
    'use strict';

    global.ProductComparison = global.Page.extend({
        init: function (listBlocks, params) {
            var me = this;
            me.listProduct = params.listProd;

            me.products = [];

            me.listProduct.forEach(function (productId) {
                me.products.push(new global.PDP(
                    {
                        Selector: 'UiSelector',
                        Price: 'UiPrice',
                        Informations: 'UiInformations'
                    },
                    {
                        HasVideo: false,
                        IsGiftCard: false,
                        IsEGiftCard: false,
                        ProductID: productId,
                        IsMultiPDP: true
                    }
                ));
            });

            me._super(listBlocks);
        }
    });

})(window);
;
// (function(global, $) {
//     'use strict';

//     var productId;

var UiSelector = UiBloc.extend({
    init: function (page, name) {
        this._super(page, name);

        // Private properties
        var me = this;
        var page = me.Page;
        var model = me.Model;
        var shouldApplyHoverOnColorThumb =
            !page.isMobileDevice && !model.isChildProduct;
        var productId = model.productId;
        var initialColorLabel;
        var initialColorThumbnail;
        me.fromSearch =
            document.referrer.indexOf('/psrch/psrch') > -1 ||
            model.isRedirectedFromSearch;
        me.lastSearch = window.Utils.StorageManager.readLocalStorageValue(
            window.Utils.Enum.StorageName.LAST_SEARCH_ID
        );

        // Public properties
        me.productId = productId;

        // DOM picks
        var $filterColor = model.$filterColor;
        var $filterColorNumber = $('#filterColorNumber_' + productId);
        var $colorThumb = $filterColor.find('.color-item');
        var $filterColorLabel = $('#filterColorLabel_' + productId);
        var $filterColorThumbnail = $('#filterColorThumb_' + productId);
        var $pdpCarouselContainer = $('#pdpCarouselContainer_' + productId);

        me.$filterSizeContainer = $('#filterSizeContainer_' + productId);

        // DOM building element
        var $previewImgContainer = $('<div>', {
            class: 'preview-img-container'
        });
        var $previewImg = $('<img>');

        // DOM adjustments

        // Private methods
        var applyHoverOnColorThumb = function ($colorThumb) {
            $colorThumb.on({
                mouseenter: function () {
                    var $this = $(this),
                        $img = $this.find('img');
                    // Update thumbnail
                    initialColorThumbnail = $filterColorThumbnail.attr('src');
                    $filterColorThumbnail.attr('src', $img.attr('src'));
                    // Update label
                    initialColorLabel = $filterColorLabel.text();
                    $filterColorLabel.text($this.attr('title'));
                    // Update main image
                    $previewImg.attr(
                        'src',
                        window.Utils.Common.formatImgUrl($img.attr('src'), 680)
                    );
                    $previewImgContainer.stop().fadeIn(100);
                },
                mouseleave: function () {
                    displayInitialColorSelectorInfo();
                }
            });
        };
        var displayInitialColorSelectorInfo = function () {
            $filterColorThumbnail.attr('src', initialColorThumbnail);
            $filterColorLabel.text(initialColorLabel);
            $previewImgContainer.stop().fadeOut(100);
        };

        // Public methods
        me.ReloadSelectVariant1 = function () {
            var currentColor = $filterColor
                    .find('button.selected')
                    .data('color'),
                colorIsPresent = false,
                $filterColorButton = $filterColor.find('button'),
                $filterColorLabel,
                $buttonTemplate = $('<button>', {
                    class: 'pdp-filter-item color-item'
                });

            $filterColorButton.remove();

            model.listVariant.forEach(function (e) {
                var i = 0;
                while (
                    me.Page.Blocs.ProductFilters.availableColors[i]
                        .DisplayName !== e.InternalName
                )
                    i++;
                var newColor = me.Page.Blocs.ProductFilters.availableColors[i];

                var $newButton = $buttonTemplate.clone();
                $newButton.attr('title', e.InternalName);
                $newButton.attr('value', e.VariantId);
                $newButton.attr('data-color', newColor.DisplayName);

                if (newColor.ThumbnailUrl !== '') {
                    $newButton.append($('<span>', { class: 'lr-tick' }));
                    $newButton.append(
                        $('<div>', { class: 'pdp-filter-thumbnail' }).append(
                            $('<img>', {
                                src: newColor.ThumbnailUrl,
                                alt: e.InternalName
                            })
                        )
                    );
                    $newButton.append(
                        $('<div>', {
                            class: 'pdp-filter-item-color'
                        }).append(newColor.DisplayName)
                    );
                } else {
                    $newButton.append(
                        $('<div>', { class: 'pdp-filter-color' })
                    );
                    if (newColor.CssClass !== '')
                        $newButton
                            .find('.pdp-filter-color')
                            .addClass(newColor.CssClass);
                    if (newColor.BackgroundColour !== '')
                        $newButton
                            .find('.pdp-filter-color')
                            .css('background', newColor.BackgroundColour);
                }

                if (newColor.isSelected === true) {
                    $newButton.addClass('selected');
                }
                $filterColor.append($newButton);
                colorIsPresent = currentColor === newColor.DisplayName;
            });

            me.isMonoColor = model.listVariant.length <= 1;
            me.isMonoColor
                ? me.$filterColorContainer.addDisabled()
                : me.$filterColorContainer.removeDisabled();

            if ($filterColor.find('button.selected').length === 0) {
                if (colorIsPresent === false) {
                    $filterColor.find('button').first().addClass('selected');
                } else {
                    $('[data-color="' + currentColor + '"]').trigger('click');
                }
            }
            if (shouldApplyHoverOnColorThumb) {
                $colorThumb = $filterColor.find('.color-item');
                applyHoverOnColorThumb($colorThumb);
            }
            $filterColorNumber.text(model.listVariant.length - 1);
            me.ReloadSelectVariant2();
        };
        me.SelectVariant1 = function (idVar, interactive) {
            /**
             * select variant 1 (color)
             * idVar : to be selected
             * interactive : true if user initiate the event, false otherwise
             **/
            interactive = interactive === undefined ? true : interactive;

            var $filterColorIdVar = $filterColor.find(
                'button[value=' + idVar + ']'
            );
            this.currentVariant1 = idVar;

            me.Model.Dim1 = idVar;

            $filterColor.find('button').removeClass('selected');

            if (idVar == -1) {
                this.setArticle();
                this.Page.Blocs.Price.Update();
            } else {
                $filterColorIdVar.addClass('selected');
                var enableButton = this.ReloadSelectVariant2();
                this.setArticle();
                this.sizeWasChoosen = false;
                if (this.Page.Blocs.Carousel !== undefined) {
                    this.Page.Blocs.Carousel.ReloadImg();
                }
                if (this.Page.Blocs.Thumbnail !== undefined && interactive) {
                    this.Page.Blocs.Thumbnail.Update();
                }

                this.Page.Blocs.Price.Update(interactive);
                if (enableButton == false) model.set_selector_status(false);
                else model.set_selector_status(true);
                this.UpdateATBButtonStatus();

                $filterColor.find('button').removeClass('selected');
                $filterColorIdVar.addClass('selected');

                initialColorThumbnail = $filterColorIdVar
                    .find('img')
                    .attr('src');
                initialColorLabel = $filterColorIdVar.attr('title');
                displayInitialColorSelectorInfo();
            }
            this.closeVariant1();
            model.$eventContainer.trigger(pdpEvent.selectVariant1);

            if($('#lr-hidden-syte-infos').length) {
                $('#lr-hidden-syte-infos').attr('data-colorid', idVar);
                if(this.Model.article != undefined) {
                    $('#lr-hidden-syte-infos').attr('data-colorname', this.Model.article.ColorName);
                    $('#lr-hidden-syte-infos').attr('data-itemofferid', this.Model.article.ItemOfferId);
                }
            }
        };

        // Events
        if (shouldApplyHoverOnColorThumb) {
            applyHoverOnColorThumb($colorThumb);
        }

        // Init
        if (!model.isChildProduct) {
            $previewImgContainer.appendTo($pdpCarouselContainer);
            $previewImg.appendTo($previewImgContainer);
        }

        // Properties
        var dataSelectorText = $('#dataSelector_' + me.productId).text();
        var dataComparatorText = $('#dataComparator').text();
        if (
            $('#dataSelector_' + me.productId).length > 0 &&
            dataSelectorText !== ''
        ) {
            $.extend(this, JSON.parse(dataSelectorText));
        }
        if ($('#dataComparator').length > 0 && dataComparatorText !== '') {
            $.extend(this, JSON.parse(dataComparatorText));
        }

        // Dom picks
        this.$customizableContainer = $('#customisable_' + me.productId);
        this.$filterColor = $('#filterColor_' + me.productId);
        this.$filterColorContainer = $('#filterColorContainer_' + me.productId);
        this.$filterQuantity = $('#filterQuantity_' + me.productId);
        this.$filterValue = $('.filter-value');
        this.$pdpFilterVariant = $('.pdp-filter-variant-' + me.productId);
        this.$pdpFilterVariantConatainer = $('.pdp-filter-variant-container');

        this.$quantity = {
            select: $('#quantitySelect_' + me.productId),
            selected: $('#quantitySelected_' + me.productId),
            button: this.$filterQuantity.find('.quantity-select-button'),
            buttonSelected: this.$filterQuantity.find(
                '.quantity-select-button-selected'
            )
        };

        // Functions
        var triggerAttributeOpen = function () {
            me.Model.$eventContainer.trigger('pdp.attr.open');
        };
        var handleQuantityButtonClick = function (clickedElement) {
            me.qty = model.quantity = $(clickedElement).val();
            me.$quantity.selected.text(me.qty);

            $(me.$quantity.buttonSelected).removeClass(
                'quantity-select-button-selected'
            );
            $(me.$quantity.buttonSelected).find('.lr-tick').remove();

            $(clickedElement).addClass('quantity-select-button-selected');
            $(clickedElement).prepend(
                $('<div>', {
                    class: 'lr-tick'
                })
            );
            me.$quantity.buttonSelected = $(clickedElement);
        };

        // Events
        this.$filterColor.popin();
        if (!this.isMonoColor)
            this.$filterColor
                .on(popinEvent.open, triggerAttributeOpen)
                .removeDisabled();
        else this.$filterColorContainer.addDisabled();
        this.Model.$filterSize
            .popin()
            .on(popinEvent.open, triggerAttributeOpen);
        this.$pdpFilterVariant
            .popin()
            .on(popinEvent.open, triggerAttributeOpen);

        //quantity selector
        this.$quantity.select.find('.popin').popin();

        if (this.$quantity.buttonSelected.length > 0) {
            this.UpdateQuantity(this.$quantity.buttonSelected.val());
        } else {
            this.qty = 1;
        }

        // Events
        this.$quantity.button.on('click', function () {
            handleQuantityButtonClick(this);
            $(this).closest('.popin').data('popin').close();
        });

        this.$filterColor.on('click', 'button', function () {
            me.SelectVariant1($(this).val());
        });

        this.Model.$filterSize.on('click', 'button', function () {
            me.selectVariant2Callback(this);
        });

        if (this.hasCustomizable()) {
            var personalisationInputSelector =
                '#Personalisation_' + this.productId;
            this.applyCustomizableValidator();
            this.customizableBV = this.$customizableContainer.data(
                'bootstrapValidator'
            );

            $(personalisationInputSelector).on('keyup blur', function () {
                me.Model.set_personalization_status(
                    me.customizableBV.isValid()
                );
            });

            var personalisationTextUrlParameter = Utils.UrlManager.getUrlParameter(
                'pText'
            );
            if (this.Model.personalisationText) {
                $(personalisationInputSelector).val(
                    this.Model.personalisationText
                );
            } else if (personalisationTextUrlParameter) {
                $(personalisationInputSelector).val(
                    personalisationTextUrlParameter
                );
            }
        }

        // Resize my redoute Iframe
        $('iframe.my-redoute').iFrameResize({
            enablePublicMethod: true,
            autoResize: false,
            heightCalculationMethod: 'max'
        });
    },
    GetIdVariant1: function () {
        return this.Model.$filterColor.find('button.selected').val();
    },
    GetIdVariant2: function () {
        return this.Model.$filterSize.find('button.selected').val();
    },
    GetQuantity: function () {
        return this.qty;
    },
    GetPersonalisation: function () {
        return $('#Personalisation_' + this.productId).val();
    },
    /****** refresh 2nd variant select ie : 'size' ******/
    ReloadSelectVariant2: function () {
        var me = this;
        var shouldCheckSearch = me.fromSearch && me.lastSearch;
        var sizeFound = false;
        var $filterSize = $('#filterSize_' + this.productId);
        var currentSize =
            $filterSize.find('button.selected').length > 0
                ? $filterSize.find('button.selected').val()
                : 'default';
        var currentSizeTitle = $filterSize
            .find('button.selected')
            .attr('title');
        var $filterSizeLabel = $('#filterSizeLabel_' + this.productId);

        $filterSize.find('button').remove();

        var hasSize = function (size) {
            // check if the chars before and after the size are '' or ' '
            var search = ('' + me.lastSearch).trim().toLowerCase();
            var valideChars = ['', ' '];
            var textToCheck = ' ' + size;
            if (search.indexOf(textToCheck) > -1) {
                return (
                    valideChars.indexOf(
                        search.charAt(
                            search.indexOf(textToCheck) + textToCheck.length
                        )
                    ) > -1
                );
            } else {
                return false;
            }
        };

        $.each(this.Page.GetVariant1().Variants, function (index, value) {
            var buttonTitle = value.DisplayName || value.InternalName;
            var $variant2Button = $('<button>', {
                class: 'pdp-filter-item size-item',
                'data-cerberus': 'pdpButtonSize_' + value.VariantId,
                title: buttonTitle.toLowerCase(),
                value: value.VariantId
            });

            var text = buttonTitle;
            var outOfStock = false;
            // Article Out Of Stock ?
            if (
                value.Article != null &&
                value.Article.AvailabilityCode == 'E'
            ) {
                // if dropdown for size -> add label in text
                if (
                    $filterSize.hasClass('fake-dropdown-choices') === true &&
                    $filterSize.hasClass('mpdp-filter-choices') === false
                ) {
                    text += ' - ' + labels.MobileV3_PDP.OutOfStock;
                }

                $variant2Button.addDisabled().attr('disabled', 'disabled');

                outOfStock = true;
            } else if (
                !me.Model.isChildProduct &&
                shouldCheckSearch &&
                !sizeFound &&
                hasSize($variant2Button.attr('title'))
            ) {
                sizeFound = true;
                setTimeout(function () {
                    me.SelectVariant2($variant2Button.attr('value'), false);
                }, 500);
            }

            var buttonContentClass = [
                'pdp-filter-size',
                'pdp-filter-item-content'
            ];
            if (me.Page.IsGiftCard || me.Page.IsEGiftCard) {
                buttonContentClass.push('pdp-filter-size-gift-card');
            }
            if (me.Page.isMobileDevice) {
                buttonContentClass.push('pdp-filter-size-priced');
            } else {
                /* buttonContentClass.push('hack-border-subpixel'); */
            }
            var buttonHtml =
                '<div class="' +
                buttonContentClass.join(' ') +
                '"><span class="lr-tick"></span>';

            var classOutOfStock = outOfStock ? 'pdp-filter-no-price' : '';
            buttonHtml += '<div class="' + classOutOfStock + '">';

            buttonHtml +=
                '<span class="pdp-filter-size-value">' + text + '</span>';
            // We add the price in the button only for Mobile #50696
            if (
                me.Page.isMobileDevice &&
                !me.Page.IsGiftCard &&
                !me.Page.IsEGiftCard
            ) {
                var articlePriceDisplay =
                    value.Article.WebInfo.ArticlePriceDisplay;

                var priceBeforeValue = parseFloat(
                    articlePriceDisplay[
                        'FormattedSalePriceBeforeWithChargesWithoutCurrency'
                    ]
                );
                var priceAfterValue = parseFloat(
                    articlePriceDisplay[
                        'FormattedSalePriceAfterWithChargesWithoutCurrency'
                    ]
                );

                var priceBeforeLabel =
                    articlePriceDisplay['FormattedSalePriceBeforeWithCharges'];
                var priceAfterLabel =
                    articlePriceDisplay['FormattedSalePriceAfterWithCharges'];

                if (virtualSite === 'laredouteforbusiness') {
                    var withoutTaxesLabel = labels.MobileV3_PDP.WithoutTaxes;

                    priceBeforeValue = parseFloat(
                        articlePriceDisplay[
                            'FormattedSalePriceBeforeExVatWithChargesWithoutCurrency'
                        ]
                    );
                    priceAfterValue = parseFloat(
                        articlePriceDisplay[
                            'FormattedSalePriceAfterExVatWithChargesWithoutCurrency'
                        ]
                    );

                    priceBeforeLabel =
                        articlePriceDisplay[
                            'FormattedSalePriceBeforeExVatWithCharges'
                        ] +
                        ' ' +
                        withoutTaxesLabel;
                    priceAfterLabel =
                        articlePriceDisplay[
                            'FormattedSalePriceAfterExVatWithCharges'
                        ] +
                        ' ' +
                        withoutTaxesLabel;
                }

                buttonHtml += '<span class="pdp-filter-price-value">';
                // value.Article.WebInfo.ArticlePriceDisplay.FormattedSalePriceBeforeWithChargesWithoutCurrency > value.Article.WebInfo.ArticlePriceDisplay.FormattedSalePriceAfterWithChargesWithoutCurrency
                if (outOfStock) {
                    buttonHtml += '&mdash;';
                } else {
                    if (priceBeforeValue > priceAfterValue) {
                        buttonHtml +=
                            '<del class="pdp-filter-price-delete-value">' +
                            priceBeforeLabel +
                            '</del>';
                    }
                    buttonHtml += priceAfterLabel;
                }
                buttonHtml += '</span>';
            }
            buttonHtml += '</div></div>';

            $variant2Button.append(buttonHtml);
            $filterSize.append($variant2Button);
        });

        // Show or hide size choice button
        if ($filterSize.find('button').length > 1) {
            this.isMonoSize = false;

            var maxWidth = 0;

            // Resize button on-the-fly
            /*
                if (!this.isPopin && !me.Page.isSiteCH()) {
                    $.each($filterSize.find('.pdp-filter-item.size-item'), function() {
                        if ($(this).width() > maxWidth) {
                            maxWidth = $(this).width();
                        }
                    });
                    maxWidth++;
                    if (maxWidth > 45 && maxWidth <= 75) {
                        $filterSize.find('.pdp-filter-item.size-item').addClass('medium-size');
                    } else if (maxWidth > 75 && maxWidth <= 100) {
                        $filterSize.find('.pdp-filter-item.size-item').addClass('large-size');
                    } else if (maxWidth > 100) {
                        $filterSize.find('.pdp-filter-item.size-item').addClass('extra-large-size');
                    }
                    $filterSize.find('.pdp-filter-item.size-item').css('width', maxWidth);
                }
                */
        } else {
            this.isMonoSize = true;
        }
        /**/
        if (this.Model.$filterSize.find('button').length === 1) {
            this.$filterSizeContainer
                .find('.pdp-filter-label')
                .find('.lr-arrow')
                .hide();
            this.$filterSizeContainer.addClass('disabled');
        } else {
            this.$filterSizeContainer
                .find('.pdp-filter-label')
                .find('.lr-arrow')
                .show();
            this.$filterSizeContainer.removeClass('disabled');
        }

        // Detect if a size is selected or it's the default one
        var sizeSelected = $filterSize.find(
            'button:not(.disabled)[value="' + currentSize + '"]'
        );
        if (sizeSelected.length != 0) {
            sizeSelected = sizeSelected.first();
            currentSize = 'OK';
            if (currentSizeTitle !== sizeSelected.attr('title')) {
                var realSizeSelected = $filterSize.find(
                    'button:not(.disabled)[title="' + currentSizeTitle + '"]'
                );
                realSizeSelected.addClass('selected');
                $filterSizeLabel.text(
                    realSizeSelected.find('.pdp-filter-size-value').text()
                );
            } else {
                sizeSelected.addClass('selected');
                $filterSizeLabel.text(
                    sizeSelected.find('.pdp-filter-size-value').text()
                );
            }
        } else {
            sizeSelected = $filterSize.find('button:not(.disabled)');
            if ($filterSize.find('button').length == 1) {
                sizeSelected.addClass('selected');
                currentSize = 'OK';
                $filterSizeLabel.text(
                    sizeSelected.find('.pdp-filter-size-value').text()
                );
            } else {
                currentSize = 'default';
                $filterSizeLabel.text('');
                this.Model.$eventContainer.trigger(pdpEvent.unselectVariant2);

                if (
                    this.sizeWasChoosen &&
                    labels.MobileV3_PDP.SizeUnavailableForThisColor !== ''
                ) {
                    if (this.$tooltipNoSize === undefined) {
                        this.$tooltipNoSize = $('<div>', {
                            class: 'tooltip tooltip-info',
                            html:
                                labels.MobileV3_PDP.SizeUnavailableForThisColor,
                            'data-style': 'small',
                            'data-position': 'top',
                            'data-show-close': 'false',
                            'data-temp': 'true',
                            'data-width-restriction': 'true'
                        }).appendTo(
                            this.Page.Blocs.Selector.$filterSizeContainer
                        );
                    }
                    this.$tooltipNoSize.tooltip('open');
                }
            }
        }

        // if different to default => size selected
        return currentSize !== 'default';
    },
    SelectVariant2: function (idVar, interactive) {
        this.sizeWasChoosen = true;
        interactive = interactive === undefined ? true : interactive;
        var $filterSize = $('#filterSize_' + this.productId);
        var $filterSizeLabel = $('#filterSizeLabel_' + this.productId);
        this.currentVariant2 = idVar;

        $filterSize.find('button').removeClass('selected');

        if (idVar == -1) {
            this.setArticle();
            this.Page.Blocs.Price.Update();
            this.UpdateATBButtonStatus();
        } else {
            $filterSize
                .find('button[value=' + idVar + ']')
                .addClass('selected');
            $filterSizeLabel.text(
                $filterSize
                    .find('button[value=' + idVar + ']')
                    .find('.pdp-filter-size-value')
                    .text()
            );

            this.$filterSizeContainer
                .find('.pdp-filter-label')
                .removeClass('warning');

            if (this.Model.isGiftCard || this.Model.isEGiftCard) {
                $filterSize
                .find('.pdp-filter-popin-title')
                .html(labels.MobileV3_PDP.ChooseAmount);
            } else {
                $filterSize
                .find('.pdp-filter-popin-title')
                .html(labels.MobileV3_PDP.ChooseSize);
            }

            this.setArticle();
            this.UpdateATBButtonStatus();
            this.UpdateDeliveryLinkStatus();
            this.Page.Blocs.Price.Update(interactive);
        }
        this.closeVariant2();

        if($('#lr-hidden-syte-infos').length) {
            $('#lr-hidden-syte-infos').attr('data-colorid', idVar);
            if(this.Model.article != undefined) {
                $('#lr-hidden-syte-infos').attr('data-colorname', this.Model.article.ColorName);
                $('#lr-hidden-syte-infos').attr('data-itemofferid', this.Model.article.ItemOfferId);
            }
        }
    },
    selectVariant2Callback: function (context) {
        this.SelectVariant2($(context).val());
    },
    UpdateATBButtonStatus: function (noError) {
        this.Model.$button.trigger('pdp.updateATB');
        if (this.hasCustomizable()) {
            this.Model.set_personalization_status(
                this.customizableBV.isValid()
            );
        }
        if (
            this.GetIdVariant1() == undefined ||
            this.GetIdVariant2() == undefined
        ) {
            this.Model.set_selector_status(false);
        } else if (
            this.Model.article !== null &&
            this.Model.article.IsBackOrdered &&
            this.Model.Mode !== 'MOD_WISHLIST'
        ) {
            this.Model.set_selector_status(false);
            this.Page.Blocs.backOrdered.show();
        } else {
            this.Model.set_selector_status(true);
        }
    },
    UpdateDeliveryLinkStatus: function (noError) {
        var page = this.Page;
        var $openDeliveryDetails = this.Model.$productContainer.find(
            '.open-delivery-details'
        );
        var isMultiPDP = this.Model.isMultiPDP;
        if (
            page.GetVariant1() != undefined &&
            page.GetVariant2() != undefined
        ) {
            if (isMultiPDP) $openDeliveryDetails.show();
            if (page.isSiteUK() || page.isSiteRU()) {
                if (isMultiPDP) $openDeliveryDetails.show().addClass('opened');
                this.Model.$deliveryInfo.show();
            }
        } else {
            if (isMultiPDP) $openDeliveryDetails.hide();
        }
    },
    UpdateQuantity: function (quantity) {
        this.qty = this.Model.quantity = quantity;
        this.$quantity.selected.text(this.qty);
    },
    closeVariant1: function () {
        if (!this.isMonoColor) {
            this.$filterColor.data('popin').close();
        }
    },
    closeVariant2: function () {
        if (!this.isMonoSize) {
            this.Model.$filterSize.data('popin').close();
        }
        this.Model.$productContainer.trigger('pdp.closeVariant2');
    },
    applyCustomizableValidator: function () {
        this.$customizableContainer.bootstrapValidator({
            trigger: 'blur keyup',
            fields: {
                Personalisation: {
                    message: labels.MobileV3_PDP.NoCustomTextError,
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            max: 25,
                            message:
                                labels.MobileV3_PDP.CustomFieldMaxLengthError
                        }
                    }
                }
            },
            feedbackIcons: {}
        });
    },
    hasCustomizable: function () {
        if (this.$customizableContainer.length > 0) {
            return true;
        }
        return false;
    },
    switchSize: function (mode) {
        var me = this,
            isDropdown = me.$filterSizeContainer.hasClass('custom-dropdown');

        if ((isDropdown && mode === 'popin') || model.isChildProduct) {
            me.$filterSizeContainer.removeClass('custom-dropdown');
            me.$filterSizeContainer
                .find('.pdp-filter-label')
                .removeClass('custom-dropdown-header');
            me.Model.$filterSize
                .removeClass('custom-dropdown-content')
                .addClass('popin pdp-filter-popin');
            me.$filterSizeContainer.dropdown('destroy');
            me.Model.$filterSize.prepend(
                $('<div>', {
                    class: 'pdp-filter-popin-title',
                    text: labels.MobileV3_PDP.ChooseSize
                })
            );

            me.Model.$filterSize.popin({ position: 'undefined' });
        } else if (mode === 'dropdown') {
            me.$filterSizeContainer.addClass('custom-dropdown');
            me.$filterSizeContainer
                .find('.pdp-filter-label')
                .addClass('custom-dropdown-header');
            me.Model.$filterSize
                .addClass('custom-dropdown-content')
                .removeClass('popin pdp-filter-popin')
                .attr('style', '');
            me.Model.$filterSize.popin('destroy');
            me.Model.$filterSize.find('.pdp-filter-popin-title').remove();
            me.$filterSizeContainer
                .find('.lr-arrow-right')
                .removeClass('lr-arrow-right');
            me.$filterSizeContainer.dropdown();
        }
    },
    setArticle: function () {
        this.Model.article = this.Page.GetArticle();
        if (this.Model.article !== null) {
            this.Model.$eventContainer.trigger(pdpEvent.articleSelected);
            return true;
        } else {
            this.Model.$button.trigger(pdpEvent.articleUnselected);
            return false;
        }
    }
});

// })(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.pdpServiceEvent = {
        otherVendorsRequested: 'service.otherVendors.requested',
        otherVendorsAnswered: 'service.otherVendors.answered',
        otherVendorsSucceeded: 'service.otherVendors.succeeded',
        otherVendorsFailed: 'service.otherVendors.failed',
        realTimePriceRequested: 'service.realTimePrice.requested',
        realTimePriceAnswered: 'service.realTimePrice.answered',
        realTimePriceSucceeded: 'service.realTimePrice.succeeded',
        realTimePriceFailed: 'service.realTimePrice.failed',
        reviewsRequested: 'service.reviews.requested',
        reviewsAnswered: 'service.reviews.answered',
        reviewsSucceeded: 'service.reviews.succeeded',
        reviewsFailed: 'service.reviews.failed',
        reviewUsefullnessVoteRequested: 'service.reviewUsefullnessVote.requested',
        reviewUsefullnessVoteAnswered: 'service.reviewUsefullnessVote.answered',
        reviewUsefullnessVoteSucceeded: 'service.reviewUsefullnessVote.succeeded',
        reviewUsefullnessVoteFailed: 'service.reviewUsefullnessVote.failed',
        reviewInappropriateVoteRequested: 'service.reviewInappropriateVote.requested',
        reviewInappropriateVoteAnswered: 'service.reviewInappropriateVote.answered',
        reviewInappropriateVoteSucceeded: 'service.reviewInappropriateVote.succeeded',
        reviewInappropriateVoteFailed: 'service.reviewInappropriateVote.failed',
    };

    global.ServicesPDP = global.Services.extend({
        init: function (name, page) {
            this._super(name, page);

            // Private properties
            var me = this;
            var model = page.Model;

            // Public properties

            // DOM picks

            // DOM building element

            // DOM adjustments

            // Private methods
            var getOtherVendors = function (args) {
                if (model.article !== undefined) {
                    return $.ajax({
                        async: true,
                        cache: false,
                        url:
                            '/productdetails/vendorslist.aspx?prodid=' +
                            model.productId +
                            '&docid=' +
                            (model.article.DocumentId || args.documentId),
                        type: 'GET',
                        data: {
                            dim1: model.article.Dimension1,
                            dim2: model.article.Dimension2,
                            prescode: model.article.PresCode,
                            quantity: model.quantity
                        }
                    });
                } else {
                    return false;
                }
            };

            var getRealTimePrice = function () {
                var mainProduct = model.productList[0];
                var data = {
                    request: {
                        Products: [
                            {
                                ProductId: mainProduct.ProductId,
                                DocumentId: mainProduct.DocumentId,
                                Articles: mainProduct.Variants.map(function (
                                    v1
                                ) {
                                    return v1.Variants.map(function (v2) {
                                        return {
                                            ItemOfferId: v2.Article.ItemOfferId
                                        };
                                    });
                                })
                            }
                        ]
                    }
                };

                return $.ajax({
                    async: true,
                    cache: false,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: '/ServiceProductNoSession/GetProductAvailability',
                    data: JSON.stringify(data)
                });
            };

            var getReviews = function() {
                var serviceUrl = '/serviceproductnosession/GetProductReviews.aspx?loadLocaleFilterOnly=1&productId=' + page.Model.ProductID;

                if (model.selectedSortField) {
                    serviceUrl = serviceUrl + '&sortField=' + model.selectedSortField + '&sortDir=' + model.selectedSortDir;
                }

                if (model.selectedRatingFilter && model.selectedRatingFilter !== 'all') {
                    serviceUrl = serviceUrl + '&ratingFilter=' + model.selectedRatingFilter;
                }

                if (model.selectedLanguageFilter && model.selectedLanguageFilter !== 'all') {
                    serviceUrl = serviceUrl + '&localeFilter=' + model.selectedLanguageFilter + '*';
                }

                return $.ajax({
                    url:
                    serviceUrl + '&offset=' + model.offset,
                    cache: false,
                    type: 'GET',
                });
            };

            var sendUsefullnessVote = function(args) {
                var serviceUrl = '/ServiceProductNoSession/SubmitReviewFeedbackHelpful.aspx';

                var data = {
                    FeedbackType: 'helpfulness',
                    ContentId: args.reviewId,
                    ContentType: 'review',
                    VoteType: args.voteType,
                };

                return $.ajax({
                    url: serviceUrl,
                    cache: false,
                    type: 'POST',
                    data: data,
                });
            };

            var sendInappropriateVote = function(args) {
                var serviceUrl = '/ServiceProductNoSession/SubmitReviewFeedbackInappropriate.aspx';

                var data = {
                    ContentId: args.reviewId,
                    ContentType: 'review',
                };

                return $.ajax({
                    url: serviceUrl,
                    cache: false,
                    type: 'POST',
                    data: data,
                });
            };

            // Public methods

            // Events

            // Init
            me.initiateEvents(
                [
                    ['otherVendors', getOtherVendors],
                    ['realTimePrice', getRealTimePrice],
                    ['reviews', getReviews],
                    ['reviewUsefullnessVote', sendUsefullnessVote],
                    ['reviewInappropriateVote', sendInappropriateVote],
                ],
                global.pdpServiceEvent
            );
        }
    });
})(window, window.jQuery);
;
var thumbnailContainer = UiBloc.extend({
    init: function (page, name) {
        this._super(page, name);
        this.$thumbnail = this.Model.$productContainer.find('.product-img');
    },
    Update : function(){
        var variant1 = this.Page.GetVariant1();
        var listImg = variant1 != null ? variant1.VariantMedia : [];
        if (listImg[0] && listImg[0].FileName) {
            this.$thumbnail.attr("src", listImg[0].FileName.replace("|Dimension|", 'products/302by302'));
        }
    }
});
;
(function (global, $) {
    'use strict';

    global.trackingRule.PDP = {
        SIZEGUIDE_OPEN: 'DC_PDP_SizeGuide_Open'
    };

    global.TrackingPDP = global.Tracking.extend({
        init: function (name, page) {
            this._super(name, page);

            // Private properties
            var me = this;
            var model = page.Model;
            var _track = me._track;
            var storage_ = me.storage_;
            var trackingRule = global.trackingRule.PDP;
            var PRODUCT_ORIGIN = me.storageName.PRODUCT_ORIGIN;
            var productOrigin;

            // Public properties

            // DOM picks

            // DOM building element

            // DOM adjustments

            // Private methods
            var EB_getProductId = function () {
                return {
                    original_id: model.productId.toString(),
                    verb: 'view'
                };
            };

            var EB_ProductAddBasket = function (id, amount) {
                var EB_amount = 0;
                var isPointSeparator = amount.indexOf('.') !== -1;
                var isCommaSeparator = amount.indexOf(',') !== -1;
                var hasSeparator = isPointSeparator || isCommaSeparator;
                if (!hasSeparator) {
                    EB_amount = parseInt(amount) * 100;
                } else {
                    var separator = isPointSeparator ? '.' : ',';
                    if (amount.length - amount.indexOf(separator) === 2) {
                        EB_amount =
                            parseInt(amount.replace(separator, '')) * 10;
                    } else {
                        EB_amount = parseInt(amount.replace(separator, ''));
                    }
                }

                return {
                    original_id: id,
                    price: EB_amount,
                    verb: 'add-to-cart'
                };
            };

            // Public methods

            // Events
            model.$eventContainer.on(
                global.globalServiceEvent.addToCartSucceeded,
                function (e, serviceArgs, providerArgs) {
                    global.Utils.Common.onEarlyBirdsLoad(function () {
                        global._ebq.push([
                            'trackActivity',
                            EB_ProductAddBasket(
                                serviceArgs.ProductId,
                                model.article.WebInfo.ArticlePriceDisplay
                                    .FormattedSalePriceAfterWithChargesWithoutCurrency
                            )
                        ]);
                    });
                }
            );
            if (!model.isChildProduct && !model.isPdpComparator) {
                model.$sizeGuide.on(popinEvent.open, function () {
                    me.launchDirectCall(trackingRule.SIZEGUIDE_OPEN, {
                        pageName:
                            global.Utils.Common.getCountry().toUpperCase() +
                            ':RE:SIZE GUIDE:' +
                            model.$sizeGuide
                                .find('.sizeguide-subtitle')
                                .text()
                                .toLowerCase()
                                .trim(),
                        channel: 'Size Guide'
                    });
                });
            }

            // Init
            // [ Temp for WEB-2538
            me.update_dataLayer({ eVar80: 'null' });
            // ]

            // SHOPPING TOOL
            // 1. from a tool which always directly display a product (like reco)
            productOrigin = storage_.readLocalStorageValue(PRODUCT_ORIGIN);

            if (productOrigin === null) {
                // 2. OR from a tool which sometimes directly display a product (like search)
                if (model.isRedirectedFromSearch) {
                    productOrigin =
                        'SEARCH_Internal_MOTEURDERECHERCHE_0_redirect';
                }
                // 3. OR from the last SHOPPING_TOOL
                else {
                    productOrigin =
                        me.productOrigin ||
                        storage_.readLocalStorageValue(
                            me.storageName.SHOPPING_TOOL
                        );
                }
            }
            if (productOrigin !== null) {
                me.update_dataLayer({
                    eVar80: productOrigin
                });
                var fromReco = productOrigin.indexOf('RECO') === 0;
                var fromWishList = productOrigin.indexOf('WISHLIST') === 0;
                var fromExternal = productOrigin.indexOf('EXTERNAL') === 0;
                if (
                    fromReco ||
                    fromWishList ||
                    fromExternal ||
                    model.isRedirectedFromSearch
                ) {
                    me.update_dataLayer({
                        prop60: productOrigin
                    });
                }
                storage_.eraseLocalStorageValue(PRODUCT_ORIGIN);
            }
            // END SHOPPING TOOL

            // channel of child product is needed to determine eVar80
            if (
                model.isChildProduct &&
                !model.isPdpComparator &&
                global.wa_data
            ) {
                me.update_dataLayer({ channel: global.wa_data.channel });
            }

            if (!model.isChildProduct && !model.isPdpComparator) {
                me.update_dataLayer({ prop14: model.ProductID });
                global.Utils.Common.onEarlyBirdsLoad(function () {
                    global._ebq.push(['trackActivity', EB_getProductId()]);
                });
            }

            if (!model.isChildProduct) {
                var isLoyaltyProposed = model.proposeLoyalty
                    ? 'pdp:proposed'
                    : 'pdp:notproposed';

                var pdpType = 'PDP';
                if (model.hasMultiPdp) {
                    pdpType = 'Multi PDP';
                }
                if (model.hasCompleteLook) {
                    pdpType = 'ShopTheLook';
                }
                if (model.isFilterablePdp) {
                    pdpType = 'PDP Couch';
                }

                me.update_dataLayer({
                    eVar73: pdpType,
                    eVar95: isLoyaltyProposed,
                    prop44: isLoyaltyProposed
                });
            }
        }
    });
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.UiBeforeZoom = global.UiBloc.extend({
        init: function (page, name) {
            var me = this;
            me._super(page, name);
            var page = me.Page;

            // DOM
            me.$container = $('#largeZoomContainer');
            me.$content = $('#largeZoomContent');
            me.$thumbnailsBlock = $('#largeZoomThumbnails_' + this.Model.productId);
            me.$thumbnailsContent = $('#largeZoomThumbnailsContent');
            me.$carouselThumbnails = $('#thumbnails_' + this.Model.productId);
            me.glass = $('#largeZoomGlass');
            me.containers = [me.$content, me.$thumbnailsContent];
            me.$imgContainer = $('.prod-img-container');
            var $carouselHelpMessage = $('#carouselHelpMessage');
            var zoomHelpCookie = 'LR-PDP-zoom-help';

            // Events
            me.trigger = 'click';
            me.thumbnailSelectionTriggerEvent = 'mouseenter';
            me.glassTriggerEvent = 'click';

            // Params
            me.openPopinDelay = 0;
            me.openPopinDelayThreshold = 200;

            me.allowZoom = JSON.parse($('#dataSelector_' + this.Model.productId).text()).allowZoom;
            if (me.allowZoom) {
                var carousel = this.Page.Blocs.Carousel;
                carousel.$productCarousel.on(carousel.createdEvent, function () {
                    if (!me.Page.isMobileDevice) {
                        me.enable(this);
                    }
                });

                if (!me.Page.isMobileDevice) {
                    me.enableThumbnailSelection(me.thumbnailSelectionTriggerEvent);
                    me.enableGlass();
                }

                me.$container.popin().on('popin.close', function () {
                    me.Page.Blocs.WishListAdd.$this.show();
                });
            } else me.$imgContainer.addClass('no-zoom');


            if (model.hasVideo === false && me.allowZoom) {
                if (global.Utils.CookieManager.ReadCookie(zoomHelpCookie) === null && page.isMobileDevice) {
                    $carouselHelpMessage.show().addClass('in');
                    setTimeout(function () {
                        $carouselHelpMessage.removeClass('in');
                        setTimeout(function () {
                            $carouselHelpMessage.hide();
                        }, 150);
                    }, 2000);
                    global.Utils.CookieManager.CreateCookie(zoomHelpCookie, '', 1);
                }
            }
        },
        changeImageResolutionToHigh: function (index, srcAttrValue) {
            var imageResolutions = [global.imageSizeSmall, global.imageSizeMediumSmall, global.imageSizeMedium];
            return srcAttrValue.replace(new RegExp(imageResolutions.join('|')), global.imageSizeHiRes);
        },
        enable: function (context) {
            if (this.allowZoom) {
                var me = this;
                var $self = $(context);
                var utilsEnum = global.Utils.Enum;
                if ($self.hasClass(utilsEnum.Status.Loading) === false) {
                    $self.find('.item img').on(me.trigger, function () {
                        var $currentImage = $(this);
                        // The zoomed image is different than the previous
                        if ($currentImage.attr('src') !== me.$content.children('img').attr('src')) {
                            me.doZoom($currentImage);
                        }
                        // Enable the custom scroll bar plugin
                        if (!me.Page.isMobileDevice) {
                            me.$thumbnailsBlock.mCustomScrollbar($.extend({}, utilsEnum.CustomScrollBar.DefaultParams, {
                                horizontalScroll: false
                            }));
                        }
                        me.openPopin();
                    });
                }
            }
        },
        enableGlass: function () {
            var me = this;
            me.glass.removeClass(global.Utils.Enum.Status.Hidden).on(me.glassTriggerEvent, function () {
                me.Page.Blocs.Carousel.$productCarousel.find('.item img').each(function (index, image) {
                    var $image = $(image);
                    if ($image.attr('src') === me.$carouselThumbnails.find('.item.active').attr('src')) {
                        $image.trigger(me.trigger);
                        return;
                    }
                });
            });
        },
        enableThumbnailSelection: function (event) {
            var me = this;
            this.$thumbnailsContent.on(event, 'img', function () {
                me.selectThumbnail(this);
            });
        },
        selectThumbnail: function (context) {
            var $thumbnail = context instanceof $ ? context : $(context);
            this.$thumbnailsContent.children().removeActive();
            $thumbnail.closest('.item').addActive();
            this.$content.empty().append($thumbnail.clone());
        },
        emptyContainers: function () {
            return $.each(this.containers, function (i, container) {
                container.empty();
            });
        },
        doZoom: function () {
            var me = this;
            me.emptyContainers();

            var $carouselThumbnailsContent = me.$carouselThumbnails.find('.thumbnails-content');
            me.injectThumbnailsInPopin($carouselThumbnailsContent);

            var activeThumbnailIndex = $carouselThumbnailsContent.find('.active').index();
            // Activate the current thumbnail before opening popin
            var $potentialCurrentThumbnail = me.$thumbnailsContent.children().eq(me.getCarouselActiveThumbnailIndex(activeThumbnailIndex));
            // Sometimes, the thumbnail does not exist.
            if ($potentialCurrentThumbnail.length > 0) {
                // If it does, we select
                me.selectThumbnail($potentialCurrentThumbnail);
            } else {
                // If it does not, we select the first thumbnail by default
                me.selectThumbnail(me.$thumbnailsContent.children().first());
            }
        },
        getCarouselActiveThumbnailIndex: function (index) {
            if (index < 0) {
                index = 0;
            }
            return index;
        },
        injectThumbnailsInPopin: function ($carouselThumbnailsContent) {
            var me = this;
            var $thumbnails = $carouselThumbnailsContent.children().clone();
            $thumbnails.each(function (index, thumbnail) {
                if (!$(thumbnail).hasClass('icon-play')) {
                    $(thumbnail).removeAttr('style').attr('src', me.changeImageResolutionToHigh);
                }
            });
            me.$thumbnailsContent.append($thumbnails);
        },
        isOpenPopinDelayEnough: function () {
            return this.openPopinDelay > this.openPopinDelayThreshold;
        },
        openPopin: function () {
            var me = this;
            var deferred = $.Deferred();
            var carousel = me.Page.Blocs.Carousel;
            var isOpenPopinDelayEnough = me.isOpenPopinDelayEnough();
            if (isOpenPopinDelayEnough) {
                carousel.$productCarousel.addLoading();
            }

            setTimeout(function () {
                me.$container.popin('open');
                if (isOpenPopinDelayEnough) {
                    carousel.$productCarousel.removeLoading();
                }
                return deferred.resolve(me.$container);
            }, me.openPopinDelay);

            return deferred.promise();
        }
    });
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.UiChildProducts = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            var me = this,
                model = me.Model;

            // Dom picks
            this.$container = $('#childProductBlock');

            // Functions
            if (this.Model.multiProducts !== undefined) {
                this.loadMultiPDP();
            } else {
                model.$eventContainer.on(pdpEvent.selectVariant1, function () {
                    me.loadCompleteLook();
                });
            }
        },
        loadMultiPDP: function () {
            var me = this;

            // Remove first product which is the main product
            var productList = this.Model.productList.slice(1);

            this.Page.childProducts = new MultiPDP(
                {},
                {
                    listProd: this.Model.multiProducts,
                    products: productList,
                    carousel: false,
                    displayTagFromPLP: true,
                    isChildProduct: true
                }
            );
            this.$container.find('.popin').popin();
            this.$container.find('.carousel').carousel();

            me.$container.trigger('multiPDP.loaded');
        },
        loadCompleteLook: function () {
            var me = this;
            $.ajax({
                url: '/productHelper/LoadCompleteLook',
                data: JSON.stringify({
                    request: {
                        ProductId: me.Model.productId,
                        Breadcrumb: contextInfo.Breadcrumb,
                        Dim1: me.Model.Dim1
                    }
                }),
                contentType: 'application/json; charset=utf-8',
                type: 'POST',
                success: function (datas) {
                    if (datas !== '' && datas !== null) {
                        me.$container.show();

                        me.$container.html(datas);
                        me.$container.find('.pdp-brand').show();

                        me.Page.childProducts = new MultiPDP(
                            {},
                            {
                                listProd: JSON.parse(
                                    $('#dataCompleteLook').html()
                                ).listProd,
                                carousel: false,
                                isFromCompleteLook: true,
                                displayTagFromPLP: true,
                                isChildProduct: true
                            }
                        );
                        me.$container.find('.carousel').carousel();
                        me.$container.parent().parent('.child-product-container').show();

                        me.$container.trigger('completeLook.loaded');

                        $('#childProductBlock .mpdp-link').on(
                            'click',
                            function () {
                                Utils.CookieManager.CreateCookie(
                                    'mainshoppingtool',
                                    'associatedlookpdp'
                                );
                                global.wa_data.prop12 = 'associatedlookpdp';
                                global.wa_data.eVar12 = 'associatedlookpdp';
                            }
                        );
                        me.$container.find('.popin').popin();
                    } else {
                        me.$container.parent('.child-product-container').hide();
                    }
                },
                error: function (xhr, status, error) {
                    console.error(
                        'AJAX on: ' +
                            this.url +
                            ' --- method: ' +
                            this.type +
                            ' --- status: ' +
                            xhr.status +
                            ' --- statusText: ' +
                            xhr.statusText
                    );
                }
            });
        }
    });
})(window, jQuery);
;
(function(global, $) {
    'use strict';

    global.UiDescription = global.UiBloc.extend({
        init: function(page, name) {
            this._super(page, name);

            // Private properties
            var me = this;
            var model = me.Model;
            var productId = model.productId;
            var conceptNumber = (model.productList.filter(function(product) {
                return parseInt(product.ProductId) === productId;
            })[0] || {}).MainProductCode;

            var _in_ = 'in';
            var _show_more_ = 'show-more';

            // Public properties

            // DOM picks
            var $description = $('#productDescription_' + productId);
            var $descriptionContainer = $description.closest('.pdp-description-container');
            var $flixmediaZone = $('#pdpFlixmediaZone');
            var $productRef = $('#productReference_' + productId);
            var $showMoreContainer = $description.find('.productDescriptionShowMore-container');

            // DOM building element

            // DOM adjustments

            // Private methods
            var adjustDescription = function() {
                $showMoreContainer.addClass('in');
                if ($description.length > 0 && $descriptionContainer.length > 0) {
                    if ($description.height() > $descriptionContainer.height()) {
                        $showMoreContainer.addClass(_in_);
                        $descriptionContainer.removeClass(_show_more_);
                    } else {
                        $descriptionContainer.addClass(_show_more_);
                        $showMoreContainer.removeClass(_in_);
                    }
                }
            };
            var updateDescriptionImg = function() {
                var $addImgContainer = $('.additional-img-container');
                var listImg = model.listImg || [];
                
                if (listImg.length >= 1) {
                    var imgId = 1;
                    if (listImg.length == 1) {
                        imgId = 0;
                    }
                    var imgSrc = listImg[imgId].FileName !== undefined ? listImg[imgId].FileName.replace("|Dimension|", imageSizeRegular) : '/images/PDP/placeholder_680.png';
                    var $addImg = $('<img>', {
                        class: 'additional-img',
                        src: imgSrc
                    });
                    $addImgContainer.removeClass(_in_).html($addImg);
                    $addImg.on('load', function () {
                        $addImgContainer.addClass(_in_);
                    });
                } else {
                    $addImgContainer.empty();
                }
            };
            var updateProductReference = function() {
                var productRef = (model.article || page.GetVariant1().Variants[0].Article).PresCode;
                
                $productRef.html($productRef.data('label') + ' <strong>' + productRef + (conceptNumber ? ' / ' + conceptNumber : '') + '</strong>');

                // If the product is from Market Place
                if (productRef === '0') {
                    return $productRef.hide();
                } else {
                    return $productRef.show();
                }
            };
            var FlixMedia_init = function() {
                var $container = $flixmediaZone.find('.flixmedia');
                var $seeMore = $flixmediaZone.find('.flixmedia_expandBtn--more');
                var $seeLess = $flixmediaZone.find('.flixmedia_expandBtn--less');

                if (typeof tC === 'undefined' || typeof tC.event === 'undefined' || typeof tC.event.loadManufacturerProductInfos === 'undefined') {
                    $container.hide();
                } else {
                    tC.event.loadManufacturerProductInfos(this, {container_id:'flix-inpage'});
                }

                var _flixmedia_expanded_ = 'flixmedia--expanded';

                $seeMore.on('click', function() {
                    $container.addClass(_flixmedia_expanded_);
                    $seeMore.hide();
                    $seeLess.show();
                });
                $seeLess.on('click', function() {
                    $('html, body').animate({
                        scrollTop: $flixmediaZone.offset().top
                    }, {
                        duration: 1000,
                        complete: function() {
                            $container.animate({
                                height: '530px'
                            }, {
                                duration: 100,
                                complete: function() {
                                    $container.removeClass(_flixmedia_expanded_).css('height', '');
                                    $seeLess.hide();
                                    $seeMore.show();
                                }
                            })
                        }
                    });
                });

                var timer;
                var observer = new MutationObserver(function(mutations, observer) {
                    if (Utils.Common.hasSomethingToDisplay(document.getElementById('flix-inpage'))) {
                        $flixmediaZone.show();
                        clearTimeout(timer);
                        observer.disconnect();
                    }
                });
                observer.observe(document.getElementById('flix-inpage'), {
                    childList: true,
                    subtree: true
                });
                timer = setTimeout(function() {observer.disconnect();}, 30000);
            };

            // Public methods

            // Events
            model.$eventContainer
                .on(global.pdpEvent.selectVariant1, function() {
                    updateDescriptionImg();
                    updateProductReference();
                })
                .on(global.pdpEvent.productReloaded, function(e, product) {
                    conceptNumber = product.MainProductCode;
                    $('#mainProductDescription').html(product.LongDescription);
                    $description.find('.pdp-description-title').html(product.Title);
                    adjustDescription();
                });

            $('#productDescriptionShowMore_' + productId).on('click', function () {
                $descriptionContainer.addClass(_show_more_);
                $showMoreContainer.removeClass(_in_);
            });

            // Init
            if ($flixmediaZone.length > 0) {
                FlixMedia_init();
            }

            adjustDescription();
        }
    });
})(window, window.jQuery);
;
(function (global) {
    'use strict';

    global.UiLargeZoom = global.UiBeforeZoom.extend({
        init: function (page, name) {
            this._super(page, name);
        }
    });
})(window);
;
(function (global, $) {
    'use strict';

    global.UiProductComparison = global.UiBloc.extend({
        init: function (page, name) {
            var me = this;
            me._super(page, name);

            // Properties
            me.productNumber = me.Page.listProduct.length;

            // Dom adjustments
            me.displayClose();

            me.Page.listProduct.forEach(function (productId) {
                /* change size auto */
                $('#filterSize_' + productId).on('click', 'button', function (event, isTriggered) {
                    var product = productId;
                    me.btnSizeSelected = $(this);
                    me.btnSizeSelectedText = $(this).text();

                    $('#sizeLabel_' + productId).addClass('hidden');
                    if (isTriggered !== true) {
                        me.Page.listProduct.forEach(function (elementId) {
                            if (elementId !== product) {
                                $('#filterSize_' + elementId + ' button').each(function () {
                                    if ($(this).text() === me.btnSizeSelectedText) {
                                        $(this).trigger('click', true);
                                        return false;
                                    }
                                });

                            }
                        });
                    }
                });

                $('#filterColor_' + productId + ' button img').on('click', function () {
                    var newImg = $(this).attr('src').replace('72by72', '302by302');
                    $('#product-' + productId + ' .plp-product-picture img').attr('src', newImg);
                });
            });

            $('.close-comparator').on('click', function () {
                var id = $(this).data('productid');
                $('li#product-' + id).detach();
                $('.comparison-content-' + id).detach();
                me.Page.removeProduct(id);
                me.productNumber--;
                me.displayClose();
            });
        },
        displayClose: function () {
            if (this.productNumber > 2) {
                $('.close-comparator').show();
            } else {
                $('.close-comparator').hide();
            }
        }
    });
})(window, jQuery);
;
var UiProductFilters = UiBloc.extend({
    init: function (page, name) {
        this._super(page, name);

        var me = this;

        me.productId = this.Model.productId;

        this.availableColors = $.parseJSON($('#hidColourVariants_' + this.Model.productId).val());
        this.$filterContainer = $('#filtersContainer');
        this.$filters = $('.pdp-filter');
        // Avoid conflict with recommendations
        this.$filtersVariant = $('.pdp-filter-variant-' + me.productId);
        this.$filterAttribute = $('.filter-attribute');

        this.filtersCombinations = [];
        this.Model.productList.forEach(function(e) {
            var combination = {};
            e.Attributes.forEach(function(el) {
                combination[el.AttributeNameCode] = el.AttributeValueCode;
            });
            me.filtersCombinations.push(combination);
        });
        this.currentId = this.Model.productId;
        this.productPosition = this.getPosition();
        this.currentCombination = this.getCurrentCombination();
        this.unavailableCombinations = this.findUnavailableCombinations(this.filtersCombinations);
        this.updateFilterAvailability();

        this.$filterAttribute.on('click', function() {
            var idVariant = $(this).data('idfiltervariant');
            var $currentFilterVariant = $(this).closest(me.$filtersVariant);
            if ($(this).hasClass('disabled') === false) {
                var $filter = $(this).closest('.pdp-filter');
                $(this).closest(me.$filtersVariant).data('popin').close();
                $('#filerVariantContainer_' + idVariant).find('.product-filter-current').html($(this).text());

                if ($(this).hasClass('selected') === false) {
                    $currentFilterVariant.find('.selected').removeClass('selected');

                    $(this).addClass('selected');
                    me.currentCombination = me.getCurrentCombination(idVariant, $currentFilterVariant);
                    me.currentId = me.getCurrentId(idVariant, $currentFilterVariant);
                    me.updateFilterAvailability(idVariant, $currentFilterVariant);
                    me.ReloadProduct(me.Model.productList[me.productPosition]);
                }
            }
        });
    },
    findUnavailableCombinations: function(filtersCombinations) {
        // Return all product possibilities from an array of objects
        var getPossibilities = function(array) {
            if (array.length > 2) {
                var newArray = [];
                    newArray[0] = array.shift();
                    newArray[1] = getPossibilities(array);
                return getPossibilities(newArray);
            }
            else if (array.length == 2) {
                var possibilities = [];
                var array1 = array[0];
                var array2 = array[1];
                array1.forEach(function(e1) {
                    array2.forEach(function(e2) {
                        var obj = {};
                        $.each(e1, function(key1, value1) {
                            obj[key1] = value1;
                        });
                        $.each(e2, function(key2, value2) {
                            obj[key2] = value2;
                        });
                        possibilities.push(obj);
                    });
                });
                return possibilities;
            }
            else return array;
        };

        // Make a list of unexisting product
        var unavailableCombinations = function(products, possibilities) {
            var unexistingProducts = [];
            var isExisting;
            possibilities.forEach(function(e) {
                isExisting = false;
                products.forEach(function(product) {
                    isMatch = true;
                    $.each(product, function(key, value) {
                        if (value !== e[key]) isMatch = false;
                    });
                    if (isMatch) isExisting = true;
                });
                if (!isExisting) unexistingProducts.push(e);
            });
            return unexistingProducts;
        };

        // Set an object with all filters and their values
        var productFilters = {}, isAlreadyIn;
        filtersCombinations.forEach(function(e) {
            $.each(e, function(key, value) {
                if (productFilters[key] === undefined) productFilters[key] = [value];
                else {
                    isAlreadyIn = false;
                    productFilters[key].forEach(function(el) {
                        if (el === value) isAlreadyIn = true;
                    });
                    if (!isAlreadyIn) productFilters[key].push(value);
                }
            });
        });
        // Convert the object to an array of objects with all key/value possibilities
        var productFiltersArray = [];
        $.each(productFilters, function(key, value) {
            var array = [];
            value.forEach(function(e) {
                var obj = {};
                    obj[key] = e;
                array.push(obj);
            });
            productFiltersArray.push(array);
        });

        return unavailableCombinations(filtersCombinations, getPossibilities(productFiltersArray));
    },
    getCurrentCombination: function(idVariant) {
        var me = this;
        var combination = {};
        me.$filtersVariant.each(function() {
            var key = $(this).data('filtertype');
            var value = $(this).find('.selected').data('filtervalue');
            combination[key] = '' + value;
        });
        return combination;
    },
    getCurrentLabelizedCombination: function() {
        var me = this;
        var labelizedCombination = {};
        $.each(me.currentCombination, function(key, value) {
            var labelizedValue = me.$filterContainer.find('.filter-attribute[data-filtervalue="' + value + '"]').text();
            labelizedCombination[key] = labelizedValue;
        });
        return labelizedCombination;
    },
    getCurrentId: function() {
        var me = this;
        var productId, isThisProduct;
        me.Model.productList.forEach(function(e, i) {
            isThisProduct = true;
            e.Attributes.forEach(function(el) {
                if (el.AttributeValueCode !== me.currentCombination[el.AttributeNameCode]) isThisProduct = false;
            });
            if (isThisProduct) {
                productId = parseInt(e.ProductId);
                me.productPosition = i;
            }
        });
        return productId;
    },
    getPosition: function() {
        var me = this;
        var position = 0;
        me.Model.productList.forEach(function(e, i) {
            if (parseInt(e.ProductId) === me.currentId) position = i;
        });
        return position;
    },
    updateFilterAvailability: function() {
        var me = this;
        var valuesToDisabled = [];
        me.unavailableCombinations.forEach(function(product) {
            var oneDifference = manyDifferences = false;
            var disabledValue;
            $.each(me.currentCombination, function(attribute, value) {
                if (value !== product[attribute]) {
                    if (oneDifference) manyDifferences = true;
                    else {
                        oneDifference = true;
                        disabledValue = [attribute, product[attribute]]
                    }
                }
            });
            if (oneDifference && !manyDifferences) {
                valuesToDisabled.push(disabledValue);
            }
        });
        $('.filter-attribute').removeClass('disabled');
        valuesToDisabled.forEach(function(e) {
            /* Vdeflandre disable for filter attribute comment the 14/02 */
            $('#filterVariant_' + e[0]).find('.filter-value-' + e[1]).addClass('disabled');

        });
    },
    ReloadProduct: function(product) {
        // Update title
        $('.pdp-title').html(product.Title);

        this.Model.$eventContainer.trigger(pdpEvent.productReloaded, [product]);

        this.Model.listVariant = product.Variants;

        this.Page.Blocs.Selector.ReloadSelectVariant1();
        this.Page.LoadDefaultArticle();
        this.Page.Blocs.Carousel.ReloadImg();

        var newPathname = window.location.pathname;
        newPathname = newPathname.split('-');
        newPathname[1] = product.ProductId;
        newPathname = newPathname.join('-');
        var newUrl = window.location.origin + newPathname + this.Page.urlSuffixe + window.location.search + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }
});
;
(function (global, $) {
    'use strict';

    global.UiReviews = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            // Private properties
            var me = this;
            var model = me.Model;

            var cancelUsefullnessVoteTimer = 3000;

            var voteRequests = {};

            var $reviewFade = $('<span>', {
                class: 'product-rating-review-fade'
            });

            // DOM Picks
            var $ctaLoadMoreReviews = $('.product-rating-review-see-more'),
                $productRatingContent = $('.product-rating-content'),
                $ctaLoadMoreReviewsButton = $(
                    '.product-rating-review-see-more-btn'
                ),
                $ctaLoadAllReviewsButton = $(
                    '.product-rating-review-see-all-btn'
                ),
                $productRatingSorting = $('#productRatingSorting'),
                $productRatingFilterByNote = $('#productRatingFilterByNote'),
                $productRatingFilterByLanguage = $(
                    '#productRatingFilterByLanguage'
                ),
                $sortReviewsPopin = $('#sortReviewsPopin'),
                $filterByNotePopin = $('#filterReviewsByNotePopin'),
                $filterByLanguagePopin = $('#filterReviewsByLanguagePopin'),
                $productRatingOpenFilterByNotePopinBtn = $(
                    '.product-rating-open-rating-filter-popin'
                ),
                $productRatingOpenFilterByLanguagePopinBtn = $(
                    '.product-rating-open-language-filter-popin'
                ),
                $productRatingOpenSortingPopinBtn = $(
                    '.product-rating-open-sorting-popin'
                ),
                $noReviewsMessage = $('.product-rating-review-no-review-message'),
                $selectors = [
                    $productRatingSorting,
                    $productRatingFilterByNote,
                    $productRatingFilterByLanguage,
                    $productRatingOpenSortingPopinBtn,
                    $productRatingOpenFilterByNotePopinBtn,
                    $productRatingOpenFilterByLanguagePopinBtn
                ];

            var $dataReviews = $('#dataReviews');
            if ($dataReviews.length > 0) {
                $dataReviews = JSON.parse($dataReviews.text());
            }

            // Events
            model.$eventContainer.on(
                global.pdpServiceEvent.reviewsRequested,
                function () {
                    toggleSelectors(false);
                    hideNoReviewsErrorMessage();
                    hideLoadMoreReviewsBtn();
                    hideLoadAllReviewsBtn();
                    showLoader();
                }
            );

            model.$eventContainer.on(
                global.pdpServiceEvent.reviewsSucceeded,
                function (e, data) {
                    buildReviews(data);
                    hideLoader();
                    toggleSelectors(true);
                    // Find already rated reviews, and hide them
                    model.alreadyRatedReviews.forEach(function (review) {
                        model.filterAvailableVoteOptions(review);
                    });
                }
            );

            model.$eventContainer.on(
                global.pdpServiceEvent.reviewUsefullnessVoteSucceeded,
                function (e, data, providerArgs) {
                    if (
                        providerArgs &&
                        providerArgs.reviewId &&
                        providerArgs.voteType
                    ) {
                        handleVoteSuccess(
                            providerArgs.reviewId,
                            providerArgs.voteType,
                            data
                        );
                    }
                }
            );

            model.$eventContainer.on(
                global.pdpServiceEvent.reviewInappropriateVoteSucceeded,
                function (e, data, providerArgs) {
                    if (providerArgs && providerArgs.reviewId) {
                        handleVoteSuccess(
                            providerArgs.reviewId,
                            model.voteTypes.inappropriate,
                            data
                        );
                    }
                }
            );

            model.$eventContainer.on(
                global.pdpServiceEvent.reviewUsefullnessVoteFailed,
                function (e, providerArgs) {
                    if (providerArgs && providerArgs.reviewId) {
                        handleVoteFail(providerArgs.reviewId);
                    }
                }
            );

            model.$eventContainer.on(
                global.pdpServiceEvent.reviewInappropriateVoteFailed,
                function (e, providerArgs) {
                    if (providerArgs && providerArgs.reviewId) {
                        handleVoteFail(providerArgs.reviewId);
                    }
                }
            );

            $ctaLoadMoreReviewsButton.on('click', function () {
                model.$eventContainer.trigger(
                    global.pdpServiceEvent.reviewsRequested
                );
            });

            $productRatingSorting.on('change', function () {
                var selectedOption = $(this).find(':selected');
                model.selectedSortField =
                    model.sortFields[selectedOption.data('sort-field')];
                model.selectedSortDir =
                    model.sortDirections[selectedOption.data('sort-dir')];

                model.$eventContainer.trigger(
                    global.pdpEvent.reviewsFilterAndSortUpdated
                );
            });

            $productRatingFilterByNote.on('change', function () {
                var selectedOption = $(this).find(':selected');
                model.selectedRatingFilter = selectedOption.val();

                model.$eventContainer.trigger(
                    global.pdpEvent.reviewsFilterAndSortUpdated
                );
            });

            $productRatingFilterByLanguage.on('change', function () {
                var selectedOption = $(this).find(':selected');
                model.selectedLanguageFilter = selectedOption.val();

                model.$eventContainer.trigger(
                    global.pdpEvent.reviewsFilterAndSortUpdated
                );
            });

            $productRatingOpenSortingPopinBtn.on('click', function () {
                openPopin($sortReviewsPopin);
            });

            $productRatingOpenFilterByNotePopinBtn.on('click', function () {
                openPopin($filterByNotePopin);
            });

            $productRatingOpenFilterByLanguagePopinBtn.on('click', function () {
                openPopin($filterByLanguagePopin);
            });

            $sortReviewsPopin.on(
                'click',
                '.product-rating-popin-field',
                function () {
                    $productRatingOpenSortingPopinBtn
                        .find('span:first-of-type')
                        .text(
                            $(this)
                                .find('.product-rating-popin-field-text')
                                .text()
                        );
                    model.selectedSortField =
                        model.sortFields[$(this).data('sort-field')];
                    model.selectedSortDir =
                        model.sortDirections[$(this).data('sort-dir')];
                    model.$eventContainer.trigger(
                        global.pdpEvent.reviewsFilterAndSortUpdated
                    );
                    highlightSelectedOptionOnPopinAndClose(
                        $sortReviewsPopin,
                        $(this)
                    );
                }
            );

            $filterByNotePopin.on(
                'click',
                '.product-rating-popin-field',
                function () {
                    $productRatingOpenFilterByNotePopinBtn
                        .find('span:first-of-type')
                        .text(
                            $(this)
                                .find('.product-rating-popin-field-text')
                                .text()
                        );
                    model.selectedRatingFilter = $(this).data('value');
                    model.$eventContainer.trigger(
                        global.pdpEvent.reviewsFilterAndSortUpdated
                    );
                    highlightSelectedOptionOnPopinAndClose(
                        $filterByNotePopin,
                        $(this)
                    );
                }
            );

            $filterByLanguagePopin.on(
                'click',
                '.product-rating-popin-field',
                function () {
                    $productRatingOpenFilterByLanguagePopinBtn
                        .find('span:first-of-type')
                        .text(
                            $(this)
                                .find('.product-rating-popin-field-text')
                                .text()
                        );
                    model.selectedLanguageFilter = $(this).data('value');
                    model.$eventContainer.trigger(
                        global.pdpEvent.reviewsFilterAndSortUpdated
                    );
                    highlightSelectedOptionOnPopinAndClose(
                        $filterByLanguagePopin,
                        $(this)
                    );
                }
            );

            $productRatingContent.on(
                'click',
                '.product-rating-review-vote-btn button',
                function () {
                    var voteType = $(this).val();
                    var reviewId = $(this)
                        .closest('.product-rating-review-vote')
                        .data('review-id');
                    var feedbackText = $dataReviews.helpfulnessVoteFeedback;

                    if (voteType === model.voteTypes.inappropriate) {
                        feedbackText = $dataReviews.inappropriateVoteFeedback;
                    }

                    hideVoteBtn(reviewId);
                    hideUsefullnessVoteError(reviewId);
                    console.log(feedbackText);
                    showUsefullnessVoteFeedBack(reviewId, feedbackText);

                    voteRequests[reviewId] = window.setTimeout(function () {
                        if (voteType === model.voteTypes.inappropriate) {
                            model.$eventContainer.trigger(
                                global.pdpServiceEvent
                                    .reviewInappropriateVoteRequested,
                                [{ reviewId: reviewId }, { reviewId: reviewId }]
                            );
                        } else {
                            model.$eventContainer.trigger(
                                global.pdpServiceEvent
                                    .reviewUsefullnessVoteRequested,
                                [
                                    { reviewId: reviewId, voteType: voteType },
                                    { reviewId: reviewId, voteType: voteType }
                                ]
                            );
                        }
                    }, cancelUsefullnessVoteTimer);
                }
            );

            $productRatingContent.on(
                'click',
                '.product-rating-review-cancel-vote',
                function () {
                    var reviewId = $(this)
                        .closest('.product-rating-review-vote')
                        .data('review-id');

                    clearTimeout(voteRequests[reviewId]);

                    showVoteBtn(reviewId);
                    hideUsefullnessVoteFeedBack(reviewId);
                }
            );

            // DOM building element
            var $reviewsListItem = $('<li>', {
                class: 'product-rating-review'
            });

            var $successTick = $('<span>', {
                class: 'lr-tick lr-tick-light-success'
            });

            // Private methods
            var buildReviews = function (data) {
                var $lastItemBefore = model.$reviewsList.find(
                    '.product-rating-review:last-of-type'
                );
                model.$reviewsList.find('.product-rating-review-fade').remove();
                model.reviews = data.HtmlReviews;
                model.totalNbOfReviews = data.Summary.TotalNumberOfReviews;

                $('.product-rating-review-see-all-btn-total').text(
                    '(' + model.totalNbOfReviews + ')'
                );

                if (model.reviews.length > 0) {
                    hideNoReviewsErrorMessage();
                    model.reviews.forEach(function (review) {
                        model.$reviewsList.append(
                            $reviewsListItem.clone().html(review)
                        );
                        model.offset++;
                    });

                    if (data.Summary.SeeMoreReviewsButtonIsVisible) {
                        showLoadMoreReviewsBtn();
                        showLoadAllReviewsBtn();
                        model.$reviewsList.append($reviewFade.clone());
                    }
                } else if (data.HtmlReviews.length === 0) {
                    showNoReviewsErrorMessage();
                }

                if ($lastItemBefore && $lastItemBefore[0]) {
                    $lastItemBefore[0].scrollIntoView();
                }
            };

            var toggleSelectors = function (status) {
                $selectors.forEach(function ($selector) {
                    $selector.attr('disabled', !status);
                });
            };

            var openPopin = function ($popin) {
                $popin.popin();
                $popin.data('popin').open();
            };

            var highlightSelectedOptionOnPopinAndClose = function (
                $popin,
                $selectedOption
            ) {
                // Delete lr-tick on previously selected elements and put one on newly selected option
                $popin.find('.lr-tick').remove();
                $selectedOption.append($successTick.clone());
                // Remove bold class on previously selected elements and put it on newly selected option
                $popin.find('.bold').removeClass('bold');
                $selectedOption.addClass('bold');
                $popin.data('popin').close();
            };

            var handleVoteSuccess = function (reviewId, voteType, data) {
                if (data.IsSuccess) {
                    var vote = {
                        reviewId: reviewId,
                        voteType: voteType
                    };

                    model.alreadyRatedReviews.push(vote);

                    // Add reviewId to localStorage
                    Utils.CookieManager.CreateCookie(
                        'ratedReviews',
                        JSON.stringify(model.alreadyRatedReviews)
                    );

                    hideUsefullnessVoteFeedBack(reviewId);
                    showVoteBtn(reviewId);
                    model.filterAvailableVoteOptions(vote);

                } else {
                    if (voteType === model.voteTypes.inappropriate) {
                        model.$eventContainer.trigger(
                            global.pdpServiceEvent
                                .reviewInappropriateVoteFailed,
                            [{ reviewId: reviewId }]
                        );
                    } else {
                        model.$eventContainer.trigger(
                            global.pdpServiceEvent.reviewUsefullnessVoteFailed,
                            [{ reviewId: reviewId }]
                        );
                    }
                }
            };

            var handleVoteFail = function (reviewId) {
                hideUsefullnessVoteFeedBack(reviewId);
                showVoteBtn(reviewId);
                showUsefullnessVoteError(reviewId);
            };

            var showLoader = function () {
                if ($ctaLoadMoreReviews.find('.loading').length === 0) {
                    $ctaLoadMoreReviews.append(
                        $('<div>', { class: 'loading' })
                    );
                }
            };
            var hideLoader = function () {
                $ctaLoadMoreReviews.find('.loading').remove();
            };
            var showLoadMoreReviewsBtn = function () {
                $ctaLoadMoreReviewsButton.removeClass('hideField');
            };
            var hideLoadMoreReviewsBtn = function () {
                $ctaLoadMoreReviewsButton.addClass('hideField');
            };
            var showLoadAllReviewsBtn = function () {
                $ctaLoadAllReviewsButton.show();
            };
            var hideLoadAllReviewsBtn = function () {
                $ctaLoadAllReviewsButton.hide();
            };
            var showVoteBtn = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-vote-btn')
                    .show();
            };
            var hideVoteBtn = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-vote-btn')
                    .hide();
            };
            var showUsefullnessVoteFeedBack = function (reviewId, text) {
                var $reviewBlock = findReviewBlock(reviewId);
                var $feedbackBlock = $reviewBlock.find('.product-rating-review-vote-feedback');
                var $feedbackText = $feedbackBlock.find('.product-rating-review-vote-feedback-text').text(text);

                $feedbackText.text(text);
                $feedbackBlock.show();
            };
            var hideUsefullnessVoteFeedBack = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-vote-feedback')
                    .hide();
            };
            var hideUsefullnessCancelVote = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-cancel-vote')
                    .hide();
            };
            var showUsefullnessVoteError = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-vote-error')
                    .show();
            };
            var hideUsefullnessVoteError = function (reviewId) {
                findReviewBlock(reviewId)
                    .find('.product-rating-review-vote-error')
                    .hide();
            };
            var showNoReviewsErrorMessage = function () {
                $noReviewsMessage.removeClass('hideField');
            };
            var hideNoReviewsErrorMessage = function () {
                $noReviewsMessage.addClass('hideField');
            };

            var findReviewBlock = function (reviewId) {
                return $('[data-review-id=' + reviewId + ']');
            };

            // Init
        }
    });
})(window, jQuery);
;
(function(global, $) {
    'use strict';

    global.UiServices = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            // Private properties
            var
                me = this,
                $container = $('#services'),
                isSpecificContainer = true;

            // Events
            this.Model.$eventContainer.on(pdpEvent.articleSelected, function() {
                updateServices();
            });
            this.Model.$eventContainer.on(pdpEvent.articleUnselected, function() {
                removeServices();
            });

            // DOM building element
            var $tick = $('<span>', {
                    class: 'lr-tick lr-tick-success'
                }),
                $serviceLi = $('<li>', {
                    class: 'delivery-info-item delivery-info-service cursor-pointer'
                }),
                $serviceSpan = $('<span>', {
                    class: 'cursor-pointer'
                }),
                $servicePopin = $('<div>', {
                    class: 'popin'
                });

            // Private methods
            var
                updateServices = function() {
                    removeServices();
                    var article = me.Model.article;
                    if (article !== null) {
                        $container.addClass('fix-display-services');
                        if (article.RelatedServices.length > 0) {
                            article.RelatedServices.forEach(function (el, i) {
                                createService(el.Name, el.DescriptionUrl, i + 1);
                            });
                            if (isSpecificContainer) $container.show();
                        } else if (article.ProductClassification !== artType.mktReg) {
                            createDefaultServices();
                        }
                    }
                },
                removeServices = function() {
                    if (isSpecificContainer) $container.hide();
                    $container.trigger(pdpEvent.servicesRemoved);
                },
                createService = function(name, url, index) {
                    var $service = $serviceLi.clone().addClass('product-service-' + index),
                        $popin = $servicePopin.clone();

                    $service.append($tick.clone());
                    $service.append($serviceSpan.clone().html(name));
                    $service.append($popin);

                    $service.one('click', function() {
                        $popin.popin({
                            url: url,
                            block: '.staticContent',
                            preload: false,
                            method: 'open',
                            trigger: $service,
                            onLoad: serviceOnLoad
                        });
                    });

                    $container.append($service);
                    $container.on(pdpEvent.servicesRemoved, function() {
                        if ($popin.data('popin') !== undefined) $popin.data('popin').destroy();
                        $service.remove();
                    });
                },
                createDefaultServices = function() {
                    for (var i = 1; i <= 4; i++) {
                        var serviceLabel = labels.MobileV3_PDP['Service' + i + 'Label'];
                        var serviceUrl = labels.MobileV3_PDP['Service' + i + 'Url'];
                        if (serviceLabel !== '' && serviceUrl !== '') {
                            createService(serviceLabel, serviceUrl, i);
                        }
                    }
                    if (isSpecificContainer) $container.show();
                };

            // fix for services popin
            var serviceOnLoad = function($element) {
                $element.find('.container').css('width', 'auto');
                $element.find('#ct_services').css('width', 'auto');
                $element.find('#ct_services').find('h2').first().hide();
                $element.find('#ct_ctn').css('width', 'auto');
                $element.find('#ct_menu').hide();
                $element.find('#ct_main').css('width', 'auto');
                $element.find('#contenu_service .encadre').css('width', 'auto');
                $element.find('#contenu_service .encadre .right').css({'width': 'auto', 'float': 'none', 'padding-left': '45px'});
                $element.find('.lienback').hide();
                $element.find('#contenu_service .right').css({'width': 'auto', 'float': 'none'});
                $element.find('#popup').css('width', 'auto');
                $element.find('#popup p').css('width', 'auto');
                $element.find('.popup').css('width', 'auto!important');
                $element.find('#evo-content').css('width', 'auto!important');
                $element.find('.ctn').css('width', 'auto');
            };
        }
    });
})(window, jQuery);;
(function(global, $) {
    'use strict';

    global.UiShopsList = UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);
            
            // Public properties
            
            // Private properties
            var
                me = this,
                containerShopsList = '#availableShopsList',
                classContainerShopSchedule = '.container-shop-schedule',
                linkGoToShopsList = '#goToShopsList a',
                shopList = '.shops-list',
                shopDetails = '.shop-details',
                infoAvailableShop = '.shop-available',
                stepUpPosition = 30;

            // DOM picks
            var
                $containerShopsList = $(containerShopsList),
                $linkGoToShopsList = $(linkGoToShopsList),
                $infoAvailableShop = $(infoAvailableShop),
                $hrUnderDeliveryDelay = $('#hrUnderDeliveryDelay'),
                $deliveryDetlay = $('.delivery-delay');

            // DOM building element

            // DOM adjustments

            // Public methods

            // Private methods
            var
                toggleSchedule = function(el) {
                    $(el).parent().toggleClass('opened').find(classContainerShopSchedule).slideToggle();
                },
                getShopsList = function() {
                    $.ajax({
                        url: '/serviceproductnosession/GetStoresAvailability',
                        type: 'GET',
                        data: {
                            prodid: me.Model.productId.toString(),
                            docid: me.Model.article.DocumentId.toString(),
                            dim1: me.Model.article.Dimension1.toString(),
                            dim2: me.Model.article.Dimension2.toString(),
                            prescode: me.Model.article.PresCode.toString()
                        }
                    })
                    .done(function(data) {
                        $containerShopsList.find(shopList).html(data);
                        if ($containerShopsList.find(shopDetails).length > 0) {
                            $infoAvailableShop.show();
                            $hrUnderDeliveryDelay.hide();
                            $containerShopsList.show();
                            bindEventToggleSchedule();
                        } else {
                            hideAndCleanShopsList();
                        }
                    })
                    .error(function(xhr) {
                        global.console.error('AJAX on: ' + this.url + ' --- method: ' + this.type + ' --- status: ' + xhr.status + ' --- statusText: ' + xhr.statusText);
                        hideAndCleanShopsList();
                    });
                },
                bindEventToggleSchedule = function() {
                    $('.container-shop-contact, .shop-img').off().on('click', $containerShopsList, function() {
                        toggleSchedule(this);
                    });
                },
                hideAndCleanShopsList = function() {
                    $infoAvailableShop.hide();
                    if ($deliveryDetlay.css('display') !== 'none') {
                        $hrUnderDeliveryDelay.show();
                    }
                    $containerShopsList.hide().find(shopList).empty();
                }

            // Events
            $infoAvailableShop.on('click', function(e) {
                e.preventDefault();
                var upPositionScrollTop = (me.Page.isMobileDevice) ? $('#header').innerHeight()+stepUpPosition : stepUpPosition;
                $('html, body').animate({
                    scrollTop: $containerShopsList.offset().top - upPositionScrollTop
                }, 1000);
            });
            this.Model.$eventContainer.on(pdpEvent.articleSelected, function() {
                getShopsList();
            });
            this.Model.$eventContainer.on(pdpEvent.articleUnselected, function() {
                hideAndCleanShopsList();
            });

            // Init
            bindEventToggleSchedule();
            $linkGoToShopsList.attr('rel', 'nofollow');
        }
    });
})(window, jQuery);;
(function (global, $) {
    'use strict';

    global.UiVendors = global.UiBloc.extend({
        init: function (page, name) {
            this._super(page, name);

            // Private properties
            var me = this;
            var model = me.Model;
            var vendorsDisplayed = 2;
            var productId = model.productId;
            var otherVendors = [];
            var vendorsLength = 0;
            var mainVendorTabTitle;
            var otherVendorsTabTitle;

            // Public properties

            // DOM picks
            var $showMoreVendors = $('#showmoreVendors');
            var $vendorsList = $('#vendorsList');
            var $vendorsListContainer = $('#vendorsListContainer');
            var $vendorsListHeading = $('#vendorsListHeading');
            var $vendorName = $('#vendorName_' + productId);

            // Switch buybox display if multiple vendors
            var $purchaseDetailsTabs = $('#purchaseDetailsTabs');
            var $purchaseDetailsTabsMainVendor = $(
                '#purchaseDetailsTabsMainVendor'
            );
            var $purchaseDetailsTabsOtherVendors = $(
                '#purchaseDetailsTabsOtherVendors'
            );

            // DOM building elements

            // DOM adjustments

            // Private methods

            // Public methods
            var loadOtherVendors = function () {
                $vendorsListContainer.addLoading();

                model.$eventContainer.trigger(
                    global.pdpServiceEvent.otherVendorsRequested,
                    [{ documentId: $vendorsList.data('docid') }]
                );

                page.toggleBuyBox();
                showTabs();
                $purchaseDetailsTabs.addLoading();
            };

            var showTabs = function () {
                $purchaseDetailsTabs.show();
                $purchaseDetailsTabs.removeClass('hidden');
            };

            var hideTabs = function () {
                $purchaseDetailsTabs.hide();
            };

            var showOtherVendorsTabInfo = function () {
                var cheapestVendor = otherVendors[0];

                otherVendors.forEach(vendor => {
                    if (vendor.price < cheapestVendor.price) {
                        cheapestVendor = vendor
                    }
                })

                $('#purchaseDetailsTabsOtherVendors span').text('Dès ' + cheapestVendor.priceText + ' chez ' + vendorsLength + ' autres vendeurs');
            };

            var resetTabExpandAttributes = function () {
                $('#mainProductDetailsContainer').attr(
                    'aria-expanded',
                    'true'
                );
                $('#mainProductDetailsContainer').attr(
                    'data-expanded',
                    'true'
                );
                $('#purchaseDetailsTabsMainVendor').attr(
                    'aria-expanded',
                    'true'
                );
                $('#purchaseDetailsTabsOtherVendors').attr(
                    'aria-expanded',
                    'false'
                );
                $('#purchaseDetailsTabsMainVendor').attr(
                    'data-expanded',
                    'true'
                );
                $('#purchaseDetailsTabsOtherVendors').attr(
                    'data-expanded',
                    'false'
                );
                $('#otherVendorsDetailsContainer').attr(
                    'data-expanded',
                    'false'
                );
            };

            // Events
            if ($vendorsList.length > 0 && !model.isChildProduct) {
                model.$eventContainer
                    .on(global.pdpEvent.articleSelected, loadOtherVendors)
                    .on(global.pdpEvent.articleUnselected, function () {
                        $vendorsListContainer.hide();
                    })
                    .on(global.pdpServiceEvent.otherVendorsSucceeded, function (
                        e,
                        dataHTML
                    ) {
                        var $content = $(dataHTML);
                        var $vendors = $content.find('.vendor');
                        otherVendors = [];

                        $vendors.each(function(i, vendor) {
                            var priceText = $(vendor).find('.vendor-list-price').text().replace(',', '.');
                            var price = parseFloat(priceText);

                            otherVendors.push({ price: price, priceText: priceText });
                        });

                        vendorsLength = $vendors.length;
                        if (vendorsLength > 0 && vendorsLength !== 1) {
                            mainVendorTabTitle = '<span>' +
                                $vendorName
                                .data('text')
                                .replaceAll('et expédié ', '')
                                .replaceAll(':', '') +
                                page.Model.article.Vendor.Name +
                                '</span>'

                            $purchaseDetailsTabsMainVendor.html(mainVendorTabTitle);
                            showTabs();

                            var $otherVendors = $vendors
                                .filter(function (index) {
                                    if (index > vendorsDisplayed - 1) {
                                        return true;
                                    }
                                    return false;
                                })
                                .addHidden();

                            $vendors.dropdown();
                            $vendors.first().dropdown('open');

                            if (vendorsLength <= vendorsDisplayed) {
                                $showMoreVendors.addHidden();
                            } else {
                                $showMoreVendors.removeHidden();
                            }

                            $purchaseDetailsTabsOtherVendors.html(
                                '<span>' +
                                    labels.MobileV3_PDP.MultipleVendors.replace(
                                        '[ProductTitle]',
                                        vendorsLength
                                    ).replace('aussi ', '') +
                                    '</span>'
                            );

                            $purchaseDetailsTabs.removeLoading();

                            otherVendorsTabTitle = labels.MobileV3_PDP.MultipleVendors.replace(
                                '[ProductTitle]',
                                vendorsLength
                            )

                            $vendorsListHeading.text(otherVendorsTabTitle);
                            $vendorsList.html($content);
                            $vendorsListContainer.show();
                            $vendorsListContainer.removeLoading();

                            $content
                                .find('.infoPrice')
                                .on('click', function () {
                                    $('#colorPricePopin').popin('open');
                                });

                            $content
                                .find('.lr-button')
                                .on('click', function () {
                                    var $this = $(this);
                                    var $vendor = $this.closest('.vendor');
                                    me.Page.AddToBasket({
                                        itemOfferId: $this.data('itemid'),
                                        prescode: $this.data('itemcode'),
                                        vendor: {
                                            name: $vendor
                                                .find('.vendor-name')
                                                .text(),
                                            url: $vendor
                                                .find('.detailsContainer a')
                                                .attr('href')
                                        },
                                        $price: $vendor
                                            .find('.vendor-list-price')
                                            .html()
                                    });
                                });

                            resetTabExpandAttributes();
                            showOtherVendorsTabInfo();
                        } else {
                            resetTabExpandAttributes();
                            hideTabs();
                            $vendorsListContainer.hide();
                        }
                    });

                $showMoreVendors.on('click', function () {
                    $showMoreVendors.addHidden();
                    $vendorsList.find('.vendor.hidden').removeHidden();
                });

                $('#purchaseDetailsTabsMainVendor').on('click', function() {
                    $(this).html(mainVendorTabTitle);
                    $('#purchaseDetailsTabsMainVendor').attr('data-expanded', true);
                    $('#purchaseDetailsTabsOtherVendors').attr('data-expanded', false);
                    showOtherVendorsTabInfo();
                });

                $('#purchaseDetailsTabsOtherVendors').on('click', function() {
                    $(this).find('span').text(otherVendorsTabTitle);
                    $('#purchaseDetailsTabsMainVendor').attr('data-expanded', false);
                    $('#purchaseDetailsTabsOtherVendors').attr('data-expanded', true);
                    $('#purchaseDetailsTabsMainVendor span').text(page.Model.article.WebInfo.ArticlePriceDisplay.FormattedSalePriceAfterWithCharges + ' chez ' + page.Model.article.Vendor.Name);
                });
            }

            // Init
            hideTabs();
            if (
                page.productClassification !== 'RedouteRegular' &&
                page.countryCode === 'fr-FR' &&
                page.Model.vendors
            ) {
                page.switchBuyBox = true;
                showTabs();
            }
    }});
})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.UiZoom = global.UiBeforeZoom.extend({
        init: function (page, name) {
            var me = this;
            me._super(page, name);
            me.$thumbnailsBlock.remove();
            me.$content.removeClass('col-xs-10 col-md-11').addClass('col-xs-12');
            // Indicate whether the zoom is initializing or not
            me.initializing = false;
        },
        doZoom: function ($image) {
            var me = this;
            // Size from High resolution
            var originalSize = 1200;
            me.$content.empty();
            $image.clone().css('maxWidth', 'none').attr('src', me.changeImageResolutionToHigh).appendTo(me.$content);
            me.$container.on('popin.open', function () {
                me.initializing = true;
                var $el = $(this).closest('.popin-container');
                if ($el.scrollLeft() === 0) {
                    $el.delay(100).animate(
                        {
                            scrollLeft: originalSize * 0.35,
                            scrollTop: originalSize * 0.15
                        },
                        {
                            complete: function () {
                                me.initializing = false;
                            }
                        }
                    );
                } else {
                    me.initializing = false;
                }
            }).on('popin.close', function () {
                delete me.Page.Blocs.Zoom;
            }).on("touchstart", '#' + me.$content.attr('id') + ' img', function (event) {
                // Disable pinch for Apple Device
                if (global.Utils.Common.isAppleDevice() && event.originalEvent.touches.length > 1) {
                    event.preventDefault();
                    return false;
                }
                // We lock the event while the zoom is initializing
                return !me.initializing;
            });
        },
        enable: function (context) {
            if (this.allowZoom) {
                var me = this;
                var $currentImage = $(context);
                // The zoomed image is different than the previous
                if ($currentImage.attr('src') !== me.$content.children('img').attr('src')) {
                    me.doZoom($currentImage);
                }
                me.openPopin();
            }
        }
    });

})(window, window.jQuery);
;
(function (global, $) {
    'use strict';

    global.UiZoomMain = global.UiBloc.extend({
        init: function (page, name) {
            var me = this;
            me._super(page, name);

            // Private properties
            var     
                currentIndexImage = 0,
                imageIndex = 0,
                nbImage = 0,
                imgAlreadyCreated = {},
                $imageToDisplay = {},
                hasVideo = $('.pdp').hasClass('hasVideo');

            // Public properties
             
            // DOM Picks
            var $zoomContainer = $('#zoomContainer');
            var $pdpZoomPrev = $('.pdp-zoom-prev');
            var $pdpZoomNext = $('.pdp-zoom-next');
            var $productCarousel = $('#prodCarousel_' + me.Model.productId);

            // DOM building elements
             
            // DOM adjustments
             
            // Private methods
            var displayImage = function(imageIndex) {
                $imageToDisplay = imgAlreadyCreated['img'+imageIndex];
                var $imageActive = imgAlreadyCreated['img'+currentIndexImage];

                if($imageActive !== undefined) { 
                    $imageActive.removeActive().hide();
                }
                if($imageToDisplay === undefined) {
                    $imageToDisplay = imgAlreadyCreated['img'+imageIndex] = $('<img>',{
                        src:global.Utils.Common.formatImgUrl(me.Model.listImg[imageIndex].FileName, 1200),
                        class:'pdp-zoom-image'
                    });
                    $zoomContainer.append($imageToDisplay);
                }
                $imageToDisplay.fadeIn().addActive();
                
                currentIndexImage = imageIndex;

                if(hasVideo) {
                    // Apply if current element IS NOT the last one, ie. the video
                    if(imageIndex != nbImage) {
                        $zoomContainer.popin('open');
                    }
                } else {
                    $zoomContainer.popin('open');
                }
            }

            var goToPrevious = function() {
                if(imageIndex === 0) {
                    imageIndex = nbImage - 1;
                } else {
                    imageIndex--;
                }
                displayImage(imageIndex);
            }

            var goToNext = function() {
                if(imageIndex === nbImage - 1) {
                    imageIndex = 0;
                } else {
                    imageIndex++;
                }
                displayImage(imageIndex);
            }

            // Public methods
             
            // Events
            me.allowZoom = JSON.parse($('#dataSelector_' + this.Model.productId).text()).allowZoom;

            if (me.allowZoom) {
                me.Model.$eventContainer.on(global.pdpEvent.carouselUpdated,function() {
                    var numberOfImages = me.Model.listImg.length;
                    imgAlreadyCreated = {};
                    $zoomContainer.find('img.pdp-zoom-image').remove();
                    if(hasVideo) {
                        nbImage = numberOfImages - 1;
                    } else {
                        nbImage = numberOfImages;
                    }
                    if(numberOfImages === 1) {
                        $pdpZoomPrev.hide();
                        $pdpZoomNext.hide();
                    }
                    $productCarousel.find('.item').on('click', function() {
                        displayImage($(this).data('index'));
                        imageIndex = currentIndexImage;
                    });
                    $productCarousel.find('.item').on('click', function() {
                        displayImage($(this).data('index'));
                        imageIndex = currentIndexImage;
                    });
                })
            } else {
                $productCarousel.addClass('no-zoom');
            }

            $(window).keydown(function(e){
                if ($zoomContainer.parent().parent().hasClass('in')) { // if the zoomContainer popin is open
                    if(e.which === 37){
                        goToPrevious();
                    }
                    if(e.which === 39){
                        goToNext();
                    }
                }
            });

            $pdpZoomPrev.on('click', function() {
                goToPrevious();
            });

            $pdpZoomNext.on('click', function() {
                goToNext();
            });

            // Init

        }
    });
})(window, window.jQuery);;
var WISHLIST_MODE = {
    MODE_REDIRECT: 0,
    MODE_POPOVER: 1
}

var UiWishListAdd = UiBloc.extend({

    init: function (page, name) {
        this._super(page, name);

        var me = this;

        this.$this = $(this.getProductIdSelector('#btnAddToWishList_'));
        this.$popin = $('#addToWishlistPopin');
        this.getCountTries = 0;
        this.wishlistMode = WISHLIST_MODE.MODE_REDIRECT;
        this.wishlistUrl = "/myaccount/wishlist" + me.Page.urlSuffixe;
        this.wishlistPopinUrlParameter = 'addtowishlistpopin';
        this.wishlistPopinUrlValue = '1';

        if (this.Model.enableIsProductInWishList) {
            this.initDisplay();
        }

        this.$this.removeClass("hide").click(function () {
            me.HandleWishListEvent(null, true);
        });

        this.tooltipOptions = {
            closeDelay: 2000
        };

        this.tooltips = {
            $noSizeErrorTooltip: $(this.getProductIdSelector('#addToWishlistNoSizeError_')),
            $customTextError: $(this.getProductIdSelector('#addToWishlistCustomTextError_'))
        };

        $.each(this.tooltips, function (index, $tooltipBlock) {
            if ($tooltipBlock instanceof $) {
                $tooltipBlock.tooltip(me.tooltipOptions);
            }
        });

        if (this.isOpenPopinUrl()) {
            this.Model.shouldAddToWishlist = true;
            // this.$this.trigger('click');
        }
    },
    initDisplay: function () {
        var me = this;

        $.ajax({
            async: true,
            cache: false,
            url: '/servicewishlistnosession/isproductinwishlist',
            data: {
                ProductId : me.Model.productId
            },
            success: function (data) {
                if (data !== null && data.IsSuccess === true && data.IsInWishList === true) {
                    me.$this.toggleClass("lr-icon-wishlist-border lr-icon-wishlist-primary");
                }
            },
            error: function (xhr, status, error) {
                this.getCountTries += 1;

                if (this.getCountTries > 3) {
                    console.error("AJAX on " + this.url + " method " + this.type + " status " + xhr.status + " statusText " + xhr.statusText + " error " + error + " response " + xhr.responseText);
                }
                else {
                    setTimeout(this.getCountTries, 500);
                }
            }
        });
    },
    HandleWishListEvent: function (pArticle, force) {
        var article = null;
        force = force || false;

        if (pArticle === undefined || pArticle === null) {
            article = this.saveProductInfo();
        }
        else {
            article = pArticle;
        }

        article.forceAddToWishlist = force;
        this.redirectToWishlistNextStep(article);
    },
    updateWishListLine: function (article) {
        var me = this;
        $.ajax(
            {
                async: false,
                cache: false,
                url: '/ServiceWishList/UpdateWishListLine',
                type: "POST",
                data: {
                    ProductId : article.ProductId,
                    DocumentId : article.DocumentId,
                    Dimension1 : article.Dimension1,
                    Dimension2 : article.Dimension2,
                    PersonalisationText : article.Perso,
                    LineId : article.wishListLineId
                },
                success: function (data) {
                    if (data.IsSuccess === true) {
                        window.location.href = me.wishlistUrl;
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX on " + this.url + " method " + this.type + " status " + xhr.status + " statusText " + xhr.statusText + " error " + error + " response " + xhr.responseText);
                }
            }
        );
    },
    saveProductInfo: function () {
        var article = this.Model.article;
        var args = {};
        if (article == null) {
            var variant1 = this.Page.GetVariant1();
            if(variant1 == null){
                console.error("PDP - ERROR : Can't add to wishlist article without color variant selected");
            }
            else {
                args = {
                    ProductId: variant1.ProductId,
                    DocumentId: variant1.DocumentId,
                    Dimension1: variant1.VariantId
                }
            }
        }
        else {
            args = {
                ProductId: article.ProductId,
                DocumentId: article.DocumentId,
                Dimension1: article.Dimension1,
                Dimension2: article.Dimension2
            }
        }

        args.Perso = this.Page.Blocs.Selector.GetPersonalisation();
        args.wishListLineId = Utils.UrlManager.getUrlParameter("wishListLineId");

        Utils.CookieManager.CreateCookie(
            "wishList_ItemToAdd",
            JSON.stringify(args),
            7
        );

        return args;
    },
    redirectToWishlistNextStep: function(article) {
        if (article === null) return;
        var me = this;
        if (article.Dimension2 !== undefined && (article.Perso == undefined || article.Perso != "")) {

            // Article is selected & mode = modify
            if (article.wishListLineId !== undefined && article.forceAddToWishlist == false) {
                // call AJAX
                this.updateWishListLine(article);
            }
            else {
                this.gotoWishlistPage(article);
            }
        }
        else {
            if (this.wishlistMode === undefined || this.wishlistMode === WISHLIST_MODE.MODE_REDIRECT) { // A - Redirect to a specific page to select informations missing

                // generate URL based on article missing property
                // colors & text personalisation
                var queryStringParam = (article.forceAddToWishlist === true || article.wishListLineId === undefined) ? ("AddToWishList=" + article.ProductId) : ("wishListLineId=" + article.wishListLineId + "&wishListCode=" + Utils.UrlManager.getUrlParameter("wishListCode"));

                var variant1 = this.Page.GetVariant1();
                if (variant1 !== null) {
                    var variant2 = this.Page.GetVariant2();
                    var pdpWishlistUrlPrefix = "/ppdp/prod-" + variant1.ProductId + this.Page.urlSuffixe;
                    // color selected
                    if (variant2 !== null && variant2.length != 0) {
                        window.location.href = pdpWishlistUrlPrefix + "?ToWishList=1&docid=" + variant1.DocumentId + "&dim1=" + variant1.VariantId + "&dim2=" + variant2.VariantId + "&" + queryStringParam;
                    }
                        // missing perso test
                    else if (article.Perso !== undefined && article.Perso !== "") {
                        this.tooltips.$customTextError.tooltip('open');
                    }
                    else {
                        // default state must choose at least color property
                        var selectorComponent = me.Page.Blocs.Selector;
                        if (!selectorComponent.isPopin) {
                            this.Page.requestSizeBefore(function() {me.redirectToWishlistNextStep(me.Page.GetArticle());});
                        } else {
                            me.Model.$filterSize
                                .popin('open')
                                .one('popin.close', function () {
                                    me.redirectToWishlistNextStep(me.Page.GetArticle());
                                });
                        }
                    }
                }
            } else if (this.wishlistMode == WISHLIST_MODE.MODE_POPOVER) { // B - Display a pink pop-over next to the AddToWishlist button to show information missing
                var messageError = "";
                if ($('#Personalisation').length != 0 && $('#Personalisation').val().length == 0) {
                    messageError = labels['MobileV3_PDP']['NoCustomTextError'];
                    $('#PersonalisationForm').addClass('has-error');
                    $('#customisable a').removeClass('collapsed');
                }
                if (_page.GetVariant2() == undefined) {
                    messageError = labels['MobileV3_PDP']['NoSizeError'];
                    if ($('#Personalisation').length != 0 && $('#Personalisation').val().length == 0)
                        messageError = labels['MobileV3_PDP']['NoSizeAndCustomTextError'];
                }
                if (messageError != "")
                    _page.DisplayPopOverMessage('#btnAddToWishList', messageError, 4000, "left");
            }
        }
    },

    openAddToWishlistPopin: function (article) {
        var locationSearch = document.location.search;
        locationSearch += document.location.search === '' ? '?': '&';
        locationSearch += this.wishlistPopinUrlParameter + '=1&dim1=' + article.Dimension1 + '&dim2=' + article.Dimension2;
        var loginUrl = "/login/login" + this.Page.urlSuffixe + "?returnurl=" + encodeURIComponent(document.location.pathname + locationSearch);
        if (!contextInfo || !contextInfo.Customer || !contextInfo.Customer.UserId) {
            window.location.href = loginUrl;
            return;
        }

        var me = this;

        return $.ajax({
            url: '/ServiceWishList/LoadAddToWishListLayer?productid=' + article.ProductId + '&dimension1=' + article.Dimension1 + '&dimension2=' + article.Dimension2,
            type: 'GET',
            cache: false,
            beforeSend: function () {
                me.$popin
                    // Sometimes the AJAX call can be long
                    .addLoading()
                    // Then we open the popin
                    .popin('open');
            },
            success: function (data) {
                 if (data.IsSuccess) {
                    me.$popin
                        // We empty each time the content
                        .empty()
                        // To reload the new data to be up to date
                        .append(data.Html)
                        .data('article', article);
                 }
                 else if (data.LoginRedirect) {
                    window.location.href = loginUrl;
                 }
            },
            complete: function () {
                me.$popin.removeLoading();
            }
        });
    },
    gotoWishlistPage: function (article) {
        if (this.Page.isMobileDevice === true) {
            window.location.href = this.wishlistUrl + "?AddToWishList=" + article.ProductId + "&dim1=" + article.Dimension1 + "&dim2=" + article.Dimension2 + "&documentid=" + article.DocumentId + "&personalisationText=" + article.Perso;
        } else {
            this.openAddToWishlistPopin(article);
        }
    },
    isOpenPopinUrl: function () {
        if (
            Utils.UrlManager.getUrlParameter(this.wishlistPopinUrlParameter) == this.wishlistPopinUrlValue &&
            Utils.UrlManager.getUrlParameter('dim1') !== undefined &&
            Utils.UrlManager.getUrlParameter('dim2') !== undefined
        ) {
            return true;
        }
        return false;
    },
    getProductIdSelector: function (selector) {
        return selector + this.Model.productId;
    }
});
;
(function(global, $) {
    'use strict';

    var formatDateElement = function (dateElement) {
        return ('0' + dateElement).slice(-2);
    };

    global.FlashSales = global.Page.extend({
        init: function(listBlocks, params) {
            this._super(listBlocks, params);

            var me = this;
            var model = me.Model;

            $('.countdown-container').each(function() {
                var newCountDown = new UiCountDown(me, 'UiCountDown', null, $(this));
            });
            $('.fs-countdown').each(function() {
                var newFsCountDown = new UiFsCountDown(me, 'UiFsCountDown', null, $(this));
            });
            $('.start-date').each(function() {
                var newComingSoonDate = new UiFSComingSoon(me, 'UiFSComingSoon', null, $(this));
            });

            Utils.Common.onCustomClick($('.fs-link'), function(el) {
                model.$eventContainer.trigger(global.fsTrackingEvent.FLASHSALE_REQUESTED, [$(el).data('position'), $(el).data('flashsaleid')]);

                model.$eventContainer.trigger(global.globalTrackingEvent.SHOPPING_TOOL_USED, [{
                    type: 'INTERNAL',
                    subType: 'VentesFlash',
                    extraData: 'hub'
                }]);
            });
        }
    });

    global.UiCountDown = global.UiBloc.extend({
        init: function (page, name, parent, $countDown) {
            var me = this;
            me._super(page, name);

            // Private properties
            var countdownContext = 'countdown',
                remainingTime,
                firstCall = true;

            // DOM Picks
            var $hoursSpan = $countDown.find('.hours'),
                $minutesSpan = $countDown.find('.minutes'),
                $secondsSpan = $countDown.find('.seconds'),
                $countdownWrapper = $countDown.find('.' + countdownContext + '-wrapper'),
                $countdownMessage = $countDown.find('.' + countdownContext + '-message');

            // Private methods
            var getTimeRemaining = function () {
                //var deadline = new Date($countDown.data('time') * 1000);
                var deadline = new Date(new Date($countDown.data('time') * 1000).setHours(0,0,0,0));

                remainingTime = Date.parse(deadline) - Date.parse(new Date());

                var 
                    seconds = Math.floor((remainingTime / 1000) % 60),
                    minutes = Math.floor((remainingTime / 1000 / 60) % 60),
                    hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
                    days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

                return {
                    'total': remainingTime,
                    'days': days + 1,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
                };
            };
            
            var hideCountDown = function () {
                return $countdownWrapper.addClass('hide');
            };

            var showCountDown = function () {
                return $countdownWrapper.removeClass('hide');
            };

            var isDisplayable = function () {
                if (!remainingTime) {
                    remainingTime = getTimeRemaining();
                }
                return remainingTime.days < 2 && remainingTime.days >= 0 && remainingTime.seconds >= 0;
            };

            // When remaining day > 1, display "X days remaining"
            var showButton = function () {
                remainingTime = getTimeRemaining();
                var $button = $('<div>', {
                    class: 'btn btn-secondary fl-btn'
                });
                $button.text(Math.abs(remainingTime.days) + ' ' + global.labels.MobileV3_FlashSalesList.FlashSalesDaysLeft);
                $countdownMessage.html($button);
            };

            var updateHours = function () {
                var displayHours = formatDateElement(remainingTime.hours);
                displayHours = '<span class="number">' + displayHours.charAt(0) + '</span><span class="number">' + displayHours.charAt(1) + '</span>';
                return $hoursSpan.html(displayHours);
            };
            var updateMinutes = function () {
                var displayMinutes = formatDateElement(remainingTime.minutes);
                displayMinutes = '<span class="number">' + displayMinutes.charAt(0) + '</span><span class="number">' + displayMinutes.charAt(1) + '</span>';
                return $minutesSpan.html(displayMinutes);
            };
            var updateSeconds = function () {     
                var displaySeconds = formatDateElement(remainingTime.seconds);
                displaySeconds = '<span class="number">' + displaySeconds.charAt(0) + '</span><span class="number">' + displaySeconds.charAt(1) + '</span>';               
                $secondsSpan.html(displaySeconds);
            };

            // Only for the CountDown (=>setInterval)
            var doCountDown = function () {
                remainingTime = getTimeRemaining();

                if (firstCall) {
                    showCountDown();
                    updateHours();
                    updateMinutes();

                    firstCall = false;
                } else {
                    if (remainingTime.minutes === 59) {
                        updateHours();
                    }
                    if (remainingTime.seconds === 59) {
                        updateMinutes();
                    }
                }
                updateSeconds();

                if (!isDisplayable()) {
                    clearInterval(interval);
                    hideCountDown();
                }
            };

            // Init
            if (isDisplayable()) {
                var interval = setInterval(function () {
                    doCountDown();
                }, 1000); 
            } else {
                hideCountDown();
                showButton();
            }
        }
    });
    global.UiFsCountDown = global.UiBloc.extend({
        init: function (page, name, parent, $countDown) {
            var me = this;
            me._super(page, name);

            // Private properties
            var firstCall = true,
                remainingTime;

            // DOM Picks
            var $daysSpan = $countDown.find('.days'),
                $hoursSpan = $countDown.find('.hours'),
                $minutesSpan = $countDown.find('.minutes'),
                $secondsParent,
                $secondsSpan = $countDown.find('.seconds');

            // Private methods
            var getRemainingTime = function () {
                var deadline = new Date(new Date($countDown.data('time') * 1000).setHours(0,0,0,0));
                var totalTime = Date.parse(deadline) - Date.parse(new Date());

                return {
                    'total': totalTime,
                    'days': Math.floor(totalTime / (1000 * 60 * 60 * 24)),
                    'hours': Math.floor((totalTime / (1000 * 60 * 60)) % 24),
                    'minutes': Math.floor((totalTime / 1000 / 60) % 60),
                    'seconds': Math.floor((totalTime / 1000) % 60)
                };
            };            
            var removeCountDown = function () {
                $countDown.remove();
                if (page.name === pageName.plp) {
                    $('.pl-title').removeClass('hide');
                }
            };
            var showCountDown = function () {
                $countDown.removeClass('hide');
                if (page.name === pageName.plp) {
                    $('.pl-title').addClass('hide');
                }
            };
            var isDisplayable = function () {
                if (!remainingTime) {
                    remainingTime = getRemainingTime();
                }
                return remainingTime.seconds >= 0;
            };
            var updateDays = function () {
                if (remainingTime.days >= 2) {
                    var displayDays = formatDateElement(remainingTime.days);
                    displayDays = '<span class="number">' + displayDays.charAt(0) + '</span><span class="number">' + displayDays.charAt(1) + '</span>';
                    return $daysSpan.html(displayDays);
                } else {
                    $daysSpan.parent().remove();
                }
            };
            var updateHours = function () {

                var displayHours;
                if (remainingTime.days === 1) {
                    displayHours = formatDateElement(remainingTime.hours + 24);
                } else {
                    displayHours = formatDateElement(remainingTime.hours);
                }
                displayHours = '<span class="number">' + displayHours.charAt(0) + '</span><span class="number">' + displayHours.charAt(1) + '</span>';

                if (remainingTime.hours < 2) {
                    $hoursSpan.parent().find('.multi').addClass('hide');
                    $hoursSpan.parent().find('.single').removeClass('hide');
                } else {
                    $hoursSpan.parent().find('.single').addClass('hide');
                    $hoursSpan.parent().find('.multi').removeClass('hide');
                }

                return $hoursSpan.html(displayHours);
            };
            var updateMinutes = function () {
                var displayMinutes = formatDateElement(remainingTime.minutes);
                displayMinutes = '<span class="number">' + displayMinutes.charAt(0) + '</span><span class="number">' + displayMinutes.charAt(1) + '</span>';
                return $minutesSpan.html(displayMinutes);
            };
            var updateSeconds = function () {
                if (remainingTime.days < 2) {
                    if ($secondsParent !== undefined) {
                        $countDown.find('.fs-countdown-timezone').append($secondsParent.clone());
                        $secondsParent = undefined;
                        $secondsSpan = $countDown.find('.seconds');
                    } else if (firstCall) {
                        $secondsSpan.parent().removeClass('hide');
                    }
                    var displaySeconds = formatDateElement(remainingTime.seconds);
                    displaySeconds = '<span class="number">' + displaySeconds.charAt(0) + '</span><span class="number">' + displaySeconds.charAt(1) + '</span>';
                    $secondsSpan.html(displaySeconds);
                } else if (firstCall) {
                    $secondsParent = $secondsSpan.parent().clone().removeClass('hide');
                    $secondsSpan.parent().remove();
                }
            };
            var doCountDown = function () { // Only for the CountDown (=>setInterval)
                remainingTime = getRemainingTime();

                if (firstCall) {
                    showCountDown();
                    updateDays();
                    updateHours();
                    updateMinutes();
                    updateSeconds();

                    firstCall = false;
                } else {
                    if (remainingTime.seconds === 59) {
                        if (remainingTime.minutes === 59) {
                            if (remainingTime.hours === 23) {
                                updateDays();
                            }
                            updateHours();
                        }
                        updateMinutes();
                    }
                    updateSeconds();
                }

                if (!isDisplayable()) {
                    clearInterval(interval);
                    removeCountDown();
                }
            };

            // Init
            if (isDisplayable()) {
                var interval = setInterval(function () {
                    doCountDown();
                }, 1000); 
            } else {
                removeCountDown();
            }
        }
    });
    global.UiFSComingSoon = global.UiBloc.extend({
        init: function (page, name, parent, $comingSoon) {
            var me = this;
            me._super(page, name);
 
            // Private methods
            var getStartDate = function () {
                var timestamp = $comingSoon.data('time');

                var date = new Date(timestamp*1000),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1,
                    day = date.getDate();

                return {
                    'year': year,
                    'month': month,
                    'day': day
                };
            };

            var displayComingSoonDate = function () {
                var startDate = getStartDate();
                var pushDate = formatDateElement(startDate.day) + '/' + formatDateElement(startDate.month) + '/' + startDate.year;
                
                $comingSoon.html(global.labels.MobileV3_FlashSalesList.FlashSalesStartingOn + ' ' + pushDate);
            };

            // Init
            displayComingSoonDate();
        }
    });
})(window, jQuery);;
