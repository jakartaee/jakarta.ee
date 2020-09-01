---
title: "Home"
seo_title: "Jakarta® EE 软件 | 云原生"
headline: "Jakarta<sup>®</sup> EE"
subtitle: "开源的云原生Java"
description: "Jakarta Enterprise Edition (EE) 是云原生Java的未来. Jakarta EE 开源软件驱动了云原生的创新与企业应用的现代化，并且保护了Java EE的现有投资."
tagline: "以参与为动力, Jakarta EE 致力于使能社区驱动的协作与云时代的开放创新."
links: [[href: "about/", text: "关于Jakarta EE"], [href: "specifications/", text: "规范"], [href: "membership/", text: "加入我们"]]
date: 2018-04-05T15:50:25-04:00
hide_page_title: true
hide_sidebar: true
hide_breadcrumb: true
show_featured_story: true
---


{{< grid/section-container >}}
  {{< grid/div class="col-xs-24" isMarkdown="false" >}}
    {{< events >}}    
      {{< newsroom/events
          id="events_lists" 
          containerClass="news-items text-center clearfix"
          publishTarget="jakarta_ee"
          upcoming="1"
          count="4" >}}
    {{</ events >}}
  {{</ grid/div >}}

  {{< grid/div class="col-sm-12" isMarkdown="false" >}}
    {{< newsroom/news
          title="公告"
          titleClass="heading-line text-center"
          id="announcements_news_lists" 
          publishTarget="jakarta_ee"
          type="announcements"
          count="5"
          includeList="true" >}}
  {{</ grid/div >}}
  {{< grid/div class="col-sm-12" isMarkdown="false" >}} 
    {{< newsroom/news
          title="社区新闻"
          titleClass="heading-line text-center"
          id="community_news_lists" 
          publishTarget="jakarta_ee"
          type="community_news"
          count="5"
          includeList="true" >}}
  {{</ grid/div >}}
{{</ grid/section-container >}}
