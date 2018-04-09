jQuery.noConflict();
jQuery(document).foundation();
jQuery(document).ready(function(jQuery){
	"use strict";
	/*Layer slider trigger*/
	jQuery("#layerslider").layerSlider({
		responsive: false,
		responsiveUnder: 1280,
		layersContainer: 1280,
		skin: 'noskin',
		hoverPrevNext: false,
		skinsPath: '../layerslider/skins/'
	});
	//login register click
	jQuery(".loginReg").on("click", function(e){
		e.preventDefault();
		jQuery(this).next().slideToggle();
		jQuery(this).toggleClass("active");
	});

	//search bar
	jQuery(".search").on("click", function(){
		if(jQuery(this).children().hasClass("fa-search")){
			jQuery(this).children().removeClass("fa-search");
			jQuery(this).children().addClass("fa-times");
		}else{
			jQuery(this).children().removeClass("fa-times");
			jQuery(this).children().addClass("fa-search");
		}
		jQuery(this).toggleClass("search-active");
		jQuery("#search-bar").slideToggle();
        if(jQuery(this).hasClass("search-active")){
            jQuery('#popup-search-input').focus();
        }
	});

	//grid system
	jQuery(document).on("click", ".grid-system > a", function(event){
		event.preventDefault();

        // replace previous class
        jQuery('#' + jQuery(this).parent().data('id')).find('div.item')
            .removeClass(jQuery(this).parent().find('a.current').data('class'))
            .addClass(jQuery(this).data('class'))
            .find('[data-mh]').matchHeight();

        // mark the current grid system
		jQuery(this).parent().children('a').removeClass("current");
		jQuery(this).addClass("current");
		formatVideoSections();
	});

	//back to top
	var backtotop = '#back-to-top';
	if (jQuery(backtotop).length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = jQuery(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					jQuery(backtotop).addClass('show');
				} else {
					jQuery(backtotop).removeClass('show');
				}
			};
		backToTop();
		jQuery(window).on('scroll', function () {
			backToTop();
		});
		jQuery('#back-to-top').on('click', function (e) {
			e.preventDefault();
			jQuery('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
	//newsTicker
	jQuery('#newsBar').inewsticker({
		speed	   : 2500,
		effect	  : 'fade',
		dir		 : 'ltr',
		font_size   : 13,
		color	   : '#fff',
		font_family : 'arial',
		delay_after : 1000
	});

	//show more and less
	jQuery('.showmore_one').showMore({
		speedDown: 300,
		speedUp: 300,
		height: '165px',
		showText: 'Show more',
		hideText: 'Show less'
	});

	jQuery(".reply").each(function(){
		if(jQuery(this).parent().next().length > 0){
			jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
		}
	});
	//comments reply hide show
	jQuery(".reply").on('click', function(){
	   if(jQuery(this).parent().next().length > 0){
		   jQuery(this).parent().nextAll().slideToggle();
		   //jQuery(this).html(jQuery(this).text() === 'Hide replies' ? 'Show replies' : 'Hide replies');
		   if(jQuery(this).hasClass('hide-reply')){
			   jQuery(this).removeClass('hide-reply');
			   jQuery(this).html('show replies <i class="fa fa-angle-down"></i>');
		   }else {
			   jQuery(this).addClass('hide-reply');
			   jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
		   }
	   }
	});

	//register form
	jQuery( "div.social-login" ).mouseenter(function() {
		jQuery("i.arrow-left").addClass("active");
	})
	.mouseleave(function() {
		jQuery("i.arrow-left").removeClass("active");
	});
	jQuery( "div.register-form" ).mouseenter(function() {
			jQuery("i.arrow-right").addClass("active");
		})
		.mouseleave(function() {
			jQuery("i.arrow-right").removeClass("active");
		});

	//vertical thumb slider
	var thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
	jQuery(thumb).on('click', function(){
		var id = jQuery(this).attr('id');
		jQuery('.image').eq(0).show();
		jQuery('.image').hide();
		jQuery('.'+id).fadeIn();
	});
	var $par = jQuery('.thumb-slider .thumbs .thumbnails').scrollTop(0);
	jQuery('.thumb-slider .thumbs a').click(function( e ) {
		e.preventDefault();					  // Prevent defautl Anchors behavior
		var n = jQuery(this).hasClass("down") ? "+=200" : "-=200"; // Direction
		$par.animate({scrollTop: n});
	});

	//tab panel
	jQuery('[data-tab]').on('click', function (e) {
		jQuery(this).addClass('active').siblings('[data-tab]').removeClass('active');
		jQuery(this).siblings('[data-content=' + jQuery(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active');
		e.preventDefault();
	});

});

function getDate(videoDate){
	var formatedStartDate = moment(videoDate);
	var currentTimeZone = new Date(formatedStartDate).toString().match(/\(([A-Za-z\s].*)\)/)[1];
	return formatedStartDate.format('lll')+" "+currentTimeZone;
}

var renderEventItemLiveText = function(isLive){
    return `<div class="tag-live ${isLive ? '' : 'hide'}">
            <figcaption>
                <p class="live-text">Live</p>
            </figcaption>
        </div>`;
}

var renderEventItemDates = function(startDate, endDate){
    return `<span>
            <i class="fa fa-clock-o icon-start-time"></i> Start time: <span class='start-time'>${getDate(startDate)}</span>
        </span>
        <br/>
        <span>
            <i class="fa fa-clock-o icon-end-time"></i> End time: <span class='end-time'>${getDate(endDate)}</span>
        </span> `;
}

var renderEventItem = function(video, videoBaseUrl, parentId, itemGridClass='grid-medium'){
    var url = videoBaseUrl + video.id,
        liveText = renderEventItemLiveText(video.liveNow),
        eventDates = renderEventItemDates(video.startDate_dt, video.endDate_dt);

	return `<div id="video-${video.id}" data-video-id="${video.id}" class="item large-4 medium-6 columns ${itemGridClass}">
			<div class="post thumb-border" data-mh="${parentId}">
				<div class="post-thumb">
                    ${liveText}
					<img src="${video.thumbnail}">
					<a href="${url}" id="hover-circle" class="hover-posts">
						<span><i class="fa fa-play-circle icon-circle"></i></span>
					</a>
				</div>
			<div class="post-des">
				<h6 class="video-title"><a href="${url}">${video.title_s}</a></h6>
				<div class="post-stats clearfix">
				    <p>${eventDates}</p>
    				<div class="clearfix content-popular-icons">
    					<p class="pull-left">
    						<i class="fa fa-eye"></i>
    						<span class="view-count">${video.viewCount}</span>
    					</p>
    					<p class="pull-left">
    						<i class="fa fa-thumbs-o-up"></i>
    						<span class="like-count">${video.likeCount}</span>
    					</p>
    					<p class="pull-left">
    						<i class="fa fa-thumbs-o-down"></i>
    						<span class="dislike-count">${video.dislikeCount}</span>
    					</p>
    				</div>
			     </div>
    			<div class="post-summary">
    				<p>${video.summary_s}</p>
    			</div>
            </div>
		</div>
	</div>`;
}

var loadVideos = function(refreshUrl, retrieveLimit, parentId, videoBaseUrl, itemGridClass) {
	let url_video = refreshUrl + "?limit=" + retrieveLimit;
    video_selector = '#' + parentId + '-videos';
    jQuery.ajax({
        url: url_video,
        dataType: "json",
        success: function(data) {
        	if(data.length===0) {
               jQuery('#' + parentId + '-section').addClass('hide');
            } else {
                jQuery('#' + parentId + '-section').removeClass('hide');
                jQuery.each(data, function(index, element) {
                    var domElement = document.getElementById("video-"+element.id);
                    if(domElement) {
                        //update existing
                        domElement.querySelector('.video-title').querySelector('a').innerHTML = element.title_s;
                        domElement.querySelector('.post-summary').querySelector('p').innerHTML = element.summary_s;
                        domElement.querySelector('.like-count').innerHTML = element.likeCount;
                        domElement.querySelector('.dislike-count').innerHTML = element.dislikeCount;
                        domElement.querySelector('.view-count').innerHTML = element.viewCount;
                        if(element.type === 'stream') {
                          domElement.querySelector('.start-time').innerHTML = getDate(element.startDate_dt);
                          domElement.querySelector('.end-time').innerHTML = getDate(element.endDate_dt);
                        }
                        var liveText = jQuery('#video-'+element.id+' > div > div > .tag-live');
                        if(element.liveNow) {
                            liveText.removeClass('hide');
                        } else {
                            liveText.addClass('hide');
                        }
                    } else {
                        //append new
                        jQuery(video_selector).append(renderEventItem(element, videoBaseUrl, parentId, itemGridClass));
                    }
                });

                dataIds = jQuery.map(data, function(e) {
                    return e.id;
                });
                jQuery('div[data-video-id]').each(function(i, element) {
                    videoId = jQuery(this).data('video-id');
                    if(dataIds.indexOf(videoId) < 0) {
                        //remove completed
                        document.getElementById(element.id).remove();
                    }
                })

                formatVideoSections();
        	}
        }
    });
};

function renderDates(){
	jQuery('[data-format-date]').each(function(index, el) {
		var $el = jQuery(el);
		var date = $el.attr('data-format-date');
		$el.text(getDate(date));
	});
}

function formatVideoSections(){
	['most-viewed-videos-section', 'newest-videos-section', 'streams-section', 'results'].forEach(function(id) {
        className = 'medium-offset-3';
		items = jQuery('#' + id).find('div.item');

        items.removeClass(className);

		if(items.length % 2 == 1) {
			var item = items.last();
			if(item.hasClass('grid-medium') && !item.hasClass(className)) {
                item.addClass(className);
		    }
		}
	});
}

jQuery(document).ready(function(){
    // recompute size for cross browse compatibility
    setTimeout(function() {
        sidebarBackground = jQuery('.sidebarBg');
        sidebarBackground.css('width', '100%');
    }, 250);
});