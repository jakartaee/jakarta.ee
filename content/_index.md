---
title: "Home"
seo_title: "Jakarta EE"
seo_title_suffix: " | Cloud Native Enterprise Java | Java EE | The Eclipse Foundation"
headline: |
  <span aria-hidden="true">Jakarta EE powers the future of<br><span class="text-primary-orange rotating-text"><span>cloud native</span><span>vendor neutral</span><span>scalable</span></span>enterprise Java</span>
  <span class="sr-only">Jakarta EE powers the future of cloud native, vendor neutral, scalable enterprise Java</span>
subtitle:
  Develop, run, and scale enterprise Java apps anywhere,<br/> with the flexibility of open source technology
jumbotron_btn_class: btn btn-secondary
jumbotron_class: text-center
custom_jumbotron_class: col-sm-18 col-sm-offset-3 margin-top-60
jumbotron_layout_style: full-height
custom_jumbotron_partial: jumbotron_home.html
links:
  [
    [
      href: "/release/11/",
      text: "Latest release",
      class: "btn btn-outline-primary",
      icon: "fa fa-download",
    ],
    [
      href: "/membership/",
      text: "Join us",
      class: "btn btn-primary",
      icon: "fa fa-chevron-right",
    ],
  ]
links_position: "before_custom_jumbotron"
description:
  "Jakarta Enterprise Edition (EE) is the open source future of cloud native
  enterprise Java. Protect your investments in Java EE and modernize your
  enterprise applications."
hide_page_title: true
hide_sidebar: true
hide_breadcrumb: true
container: "container-fluid"
---

{{< pages/home/why-choose-jakarta-ee >}}
{{< pages/home/community-powered-innovation >}}

{{< pages/home/latest-release-banner >}}
{{< platform-diagram src="jakartaee_11_platform_diagram" >}}
{{< /pages/home/latest-release-banner >}}

{{< pages/home/news-and-announcements >}}

{{< newsroom/news id="announcements_news_lists"
  publishTarget="jakarta_ee" type="announcements,community_news"
  count="8" class="news-list" templateId="custom-announcement-template"
  templatePath="/js/v2/templates/news-home.mustache"
>}}

{{< /pages/home/news-and-announcements >}}

{{< pages/home/events >}}

{{< newsroom/events id="events_lists" upcoming="1"
  publishTarget="jakarta_ee" templateId="custom-events-template"
  templatePath="/js/v2/templates/events-home.mustache" count="2"
>}}

{{< /pages/home/events >}}

{{< pages/home/youtube >}}

{{< pages/home/join-us >}}

{{< pages/home/testimonials >}}

{{< /pages/home/join-us >}}

{{< pages/home/members >}}
