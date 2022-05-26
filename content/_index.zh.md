---
title: "Home"
seo_title: "Jakarta® EE 软件 | 云原生"
headline: "<img class='jumbotron-title' src='/images/jakarta/jakarta-ee-text.svg' alt='Jakarta EE'>"
subtitle: "开源的云原生Java"
description: "Jakarta Enterprise Edition (EE) 是云原生Java的未来. Jakarta EE 开源软件驱动了云原生的创新与企业应用的现代化，并且保护了Java EE的现有投资."
tagline: "以参与为动力, Jakarta EE 致力于使能社区驱动的协作与云时代的开放创新."
date: 2018-04-05T15:50:25-04:00
hide_page_title: true
hide_sidebar: true
hide_breadcrumb: true
show_featured_story: false
jumbotron_tagline_class: "col-sm-18"
show_featured_footer: false
container: "container-fluid"
---

{{< home/featured-story >}}

{{< home/call-to-actions >}}

{{< home/members >}}

{{< home/whats-new >}}

{{< grid/section-container >}}

    {{< grid/div class="featured-section-news tab-content tab-content-home" isMarkdown="false" >}}

      {{< grid/div role="tabpanel" class="tab-pane active" id="whats-new-announcements" isMarkdown="false" >}}
        {{< newsroom/news
          id="announcements_news_lists"
          publishTarget="jakarta_ee"
          type="announcements"
          count="5"
          includeList="true"
          class="news-list"
          templateId="custom-announcement-template"
          templatePath="/js/templates/news-home.mustache" >}}
      {{</ grid/div >}}

      {{< grid/div role="tabpanel" class="tab-pane fade" id="whats-new-news" isMarkdown="false" >}}
          {{< newsroom/news
          id="community_news_lists"
          publishTarget="jakarta_ee"
          type="community_news"
          count="5"
          includeList="true"
          class="news-list"
          templateId="custom-news-template"
          templatePath="/js/templates/news-home.mustache" >}}
      {{</ grid/div >}}

      {{< grid/div role="tabpanel" class="tab-pane fade" id="whats-new-events" isMarkdown="false" >}}
        {{< events >}}
          {{< newsroom/events
              id="events_lists"
              containerClass="news-items clearfix"
              publishTarget="jakarta_ee"
              upcoming="1"
              templateId="custom-events-template"
              templatePath="/js/templates/events-home.mustache"
              count="4" >}}
        {{</ events >}}
      {{</ grid/div >}}

    {{</ grid/div >}}
{{</ grid/section-container >}}

{{< home/videos >}}

{{< home/testimonials >}}
