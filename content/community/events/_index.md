---
title: Events
seo_title: "Events | Meet with the Jakarta EE Community"
headline: "Events"
description: "Meet with the Jakarta EE community at an upcoming event."
date: 2019-02-21
publishdate: 2019-02-21
hide_page_title: true
section: "events"
---

{{< newsroom/events
      id="events_upcoming"
      title="Come meet the Jakarta EE community <br>at these upcoming events!"
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
      title="Past Events"
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
