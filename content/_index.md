---
title: "Home"
seo_title: "Jakarta® EE | Cloud Native Java for Enterprise"
headline: "Jakarta<sup>®</sup> EE"
subtitle: "Open Source Cloud Native Java"
description: "Jakarta Enterprise Edition (EE) is the open source future of cloud native Java. Protect your investments in Java EE and modernize your enterprise applications."
tagline: "Powered by participation, Jakarta EE is focused on enabling community-driven collaboration and open innovation for the cloud. Build modern and portable enterprise applications and protect your investments in Java EE."
links: [[href: "about/", text: "About Jakarta EE"], [href: "specifications/", text: "Specifications"], [href: "membership/", text: "Join Us"]]
date: 2018-04-05T15:50:25-04:00
hide_page_title: true
hide_sidebar: true
hide_breadcrumb: true
show_featured_story: true
container: "container-fluid"
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
          title="Announcements"
          titleClass="heading-line text-center"
          id="announcements_news_lists" 
          publishTarget="jakarta_ee"
          type="announcements"
          count="5"
          includeList="true" >}}
  {{</ grid/div >}}
  {{< grid/div class="col-sm-12" isMarkdown="false" >}} 
    {{< newsroom/news
          title="Community News"
          titleClass="heading-line text-center"
          id="community_news_lists" 
          publishTarget="jakarta_ee"
          type="community_news"
          count="5"
          includeList="true" >}}
  {{</ grid/div >}}
{{</ grid/section-container >}}
