---
title: Events
seo_title: "イベント | Jakarta EEコミュニティとの出会い"
headline: "イベント"
description: "次のイベントでJakarta EEコミュニティに会いましょう。"
date: 2019-02-21
publishdate: 2019-02-21
hide_page_title: true
section: "events"
---

{{< newsroom/events
      id="events_upcoming"
      title="今後開催されるこれらのイベントで<br>Jakarta EEコミュニティに会いに来てください！"
      publishTarget="jakarta_ee"
      class="events-page"
      titleClass="big-text-secondary margin-bottom-50"
      count="10"
      sortOrder="custom"
      paginate="true"
      upcoming="true"
      templateId="custom-events-template"
      templatePath="/js/templates/events-page.mustache" >}}

{{< newsroom/events
      id="events_archive"
      title="過去のイベント"
      publishTarget="jakarta_ee"
      class="events-page"
      titleClass="big-text-secondary margin-bottom-50"
      count="10"
      sortOrder="custom"
      archive="true"
      past_event="true"
      upcoming="false"
      paginate="true"
      templateId="custom-events-template"
      templatePath="/js/templates/events-page.mustache" >}}
