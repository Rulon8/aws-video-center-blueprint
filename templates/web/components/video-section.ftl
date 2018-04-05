<#import "/templates/web/lib/video-list-macros.ftl" as resultsMacros />

<#assign videoSectionId = contentModel["file-name"]?keep_before(".xml") />
<#assign refreshes = contentModel.refreshUrl?? && contentModel.refreshUrl != "">
<#assign videoBaseUrl = "${contentModel.videoLandingUrl}?id=" />

<section class="content content-with-sidebar" id="${videoSectionId}-section">
	<@resultsMacros.heading id="${videoSectionId}" title="${contentModel.title_s}" />

	<div class="row">
		<div class="large-12 columns">
			<div id="${videoSectionId}" class="tabs-content" data-tabs-content="${videoSectionId}">
				<div class="tabs-panel is-active" id="new-all">
					<div class="row list-group" id="${videoSectionId}-videos">
						<#if !refreshes>
							<#list videos as video>
								<@resultsMacros.video id=video.id thumbnail=video.thumbnail title=video.title_s summary=video.summary_s date=video.date_dt?date("MM/dd/yyyy")?string.short viewCount=video.viewCount likeCount=video.likeCount dislikeCount=video.dislikeCount parentId="${videoSectionId}" baseUrl="${videoBaseUrl}" />
							</#list>
						</#if>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<#if refreshes>
<script type="text/javascript">
	jQuery(document).ready(function() { 
    	loadVideos("${contentModel.refreshUrl}", ${contentModel.maxVideosToDisplay}, "${videoSectionId}", "${videoBaseUrl}");

	    window.setInterval(function() {
	    		loadVideos("${contentModel.refreshUrl}", ${contentModel.maxVideosToDisplay}, "${videoSectionId}", "${videoBaseUrl}")
	    	}, 5000);
	});
</script>
</#if>