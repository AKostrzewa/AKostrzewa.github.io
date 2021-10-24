function _carouselPlugin(DOM_class, max_move_elements_count) {

    var obj = this;

    this.HTML_box = $("."+DOM_class);
    this.HTML_carousel_holder = $(obj.HTML_box).find(".carousel_holder");
    this.HTML_arr_left = $(obj.HTML_box).find(".carousel_arrow_left");
    this.HTML_arr_right = $(obj.HTML_box).find(".carousel_arrow_right");
    this.HTML_elements_parent = $(obj.HTML_box).find(".carousel_elements_parent");

    this.move_elements_count = max_move_elements_count;
    this.move_block = 0;

    this.move_on = true;

    this.init = function() {
        obj.prepareHtml();
        obj.checkCanBeMove();
        obj.arrayEvents();

        $(window).resize(function(){
            obj.checkCanBeMove();
        });
    }

    this.prepareHtml = function() {
        this.HTML_elements = $(obj.HTML_box).find(".carousel_elements");
    }

    this.checkCanBeMove = function() {
        obj.move_on = false;
        let visible_elements_count = 0;
        let width = 0;
        let box_width = $(obj.HTML_box).width();
        let right_padding = null;
        $(obj.HTML_elements).each(function(){
            if(right_padding===null) {
                right_padding = $(this).outerWidth() - $(this).width();
            }
            width += $(this).outerWidth();
            if((width-right_padding)<=box_width) {
                visible_elements_count++;
            }
            else {
                obj.move_on = true;
            }
        });

        if(obj.move_on) {
            $(obj.HTML_arr_left).show();
            $(obj.HTML_arr_right).show();
        }
        else {
            $(obj.HTML_arr_left).hide();
            $(obj.HTML_arr_right).hide();
        }

        if(visible_elements_count<max_move_elements_count) {
            obj.move_elements_count = visible_elements_count;
        }
        else {
            obj.move_elements_count = max_move_elements_count;
        }
    }

    this.arrayEvents = function() {
        $('.carousel_holder').swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                console.log("You swiped " + direction );
                $('.carousel_arrow_'+direction).click();
            }
        });
        $(obj.HTML_arr_left).click(obj.turnRight);
        $(obj.HTML_arr_right).click(obj.turnLeft);
    }

    this.turnLeft = function() {
        if(obj.move_block==0&&obj.move_on) {
            obj.move_block = 1;
            let width = 0;
            let tmp_obj = [];
            for(let k in obj.HTML_elements) {
                if(k<obj.move_elements_count) {
                    let el = obj.HTML_elements[k];
                    width += $(el).outerWidth();
                    $(obj.HTML_elements_parent).append(el);
                    let el_copy = $(el).clone();
                    tmp_obj.push(el_copy);
                }
            }
            tmp_obj.reverse();
            for(let k in tmp_obj) {
                $(obj.HTML_elements_parent).prepend(tmp_obj[k]);
            }
            $(obj.HTML_elements_parent).animate({'left':(-1*width)+"px"},500,function(){
                $(obj.HTML_elements_parent).css({'left':0});
                for(let k in tmp_obj) {
                    $(tmp_obj[k]).remove();
                }
                obj.prepareHtml();
                obj.move_block = 0;
            });
        }
    }

    this.turnRight = function() {
        if(obj.move_block==0&&obj.move_on) {
            obj.move_block = 1;
            let width = 0;
            let tmp_obj = [];
            let all_elements = obj.HTML_elements.length;
            for(let k in obj.HTML_elements) {
                if(k>=(all_elements-obj.move_elements_count)) {
                    let el = obj.HTML_elements[k];
                    width += $(el).outerWidth();
                    $(obj.HTML_elements_parent).prepend(el);
                    let el_copy = $(el).clone();
                    tmp_obj.push(el_copy);
                }
            }
            for(let k in tmp_obj) {
                $(obj.HTML_elements_parent).append(tmp_obj[k]);
            }

            $(obj.HTML_elements_parent).css({'left':(-1*width)+"px"});
            $(obj.HTML_elements_parent).animate({'left':0},500,function(){
                for(let k in tmp_obj) {
                    $(tmp_obj[k]).remove();
                }
                obj.prepareHtml();
                obj.move_block = 0;
            });
        }
    }

    obj.init();
}

// $(document).on('pageinit', function(event){
    // console.log('test');
    // $(function(){
    //     $( ".carousel_holder" ).on( "swiperight", swiperightHandler );
    //     function swiperightHandler( event ){
    //       $( event.target ).addClass( "swiperight" );
    //     //   $('.carousel_arrow_left').click();
    //       jQuery( ".carousel_arrow_left" ).on( "tap", function( event ) {
    //           console.log('right in');
    //         } )
    //     }
    //     console.log('right out');
    // });

    // $(function(){
    //     $( ".carousel_holder" ).on( "swipeleft", swiperightHandler );
    //     function swiperightHandler( event ){
    //         $( event.target ).addClass( "swipeleft" );
    //         // $('.carousel_arrow_right').click();
    //         jQuery( ".carousel_arrow_left" ).on( "tap", function( event ) {
    //             console.log('left in');
    //         } )
    //     }
    //     console.log('left out');
    //   });
//  });


// $(function() {
//     $(".carousel_holder").swipe( {
//       //Generic swipe handler for all directions
//       swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
//         // $(this).text("You swiped " + direction );
//         console.log("You swiped " + direction );
//         $('.carousel_arrow_'+direction).click();
//       }
//     });

//     //Set some options later
//     $("#test").swipe( {fingers:2} );
//   });


//   $(document).ready(function(){
//     $(".carousel_holder").on('click', function () {
//         console.log('click');
//     });

//     $('.carousel_holder').on('mousedown touchstart', function () {
//         console.log('click2');
//     });
// });
