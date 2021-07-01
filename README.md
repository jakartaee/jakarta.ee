# jakarta.ee

The [jakarta.ee](https://jakarta.ee) website is generated with [Hugo](https://gohugo.io/documentation/) 0.76.5.

Jakarta EE is the future of cloud native Java. Jakarta EE open source software drives cloud native innovation, modernizes enterprise applications and protects investments in Java EE.

[![Build Status](https://travis-ci.org/jakartaee/jakarta.ee.svg?branch=src)](https://travis-ci.org/jakartaee/jakarta.ee) [![Netlify Status](https://api.netlify.com/api/v1/badges/8d42015f-09c7-46b1-9f9c-419404d01f6d/deploy-status)](https://app.netlify.com/sites/jakartaee/deploys)

## Getting Started

Install dependencies, build assets and start a web server:

```bash
npm install && npm run production
hugo server
```

### Specification Section (Optional)

Fetch and copy pages for the Specification section:

```bash
npm run specifications
```

### Contributors list (Optional)

Contributors list json file (_used on release page_) can be generate via:

```bash
npm run generate_contributor_list
```

P.S. Script also needs GH_TOKEN env variable to work, to run with env variable inline:

```bash
GH_TOKEN=<gh token here> npm run generate_contributor_list
```

## Contributing

:warning: **Warning:**  We need to commit the Hugo output on the `master` branch because this used to be an [organization website](https://help.github.com/en/github/working-with-github-pages/about-github-pages#publishing-sources-for-github-pages-sites). Please make sure to target the `src` branch when submitting a new pull request. A [travis-ci](https://github.com/jakartaee/jakarta.ee/blob/src/.travis.yml) job will take care of updating the master branch for us.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [jakartaee/jakarta.ee](https://github.com/jakartaee/jakarta.ee) repository
2. Clone repository: `git clone https://github.com/[your_github_username]/jakarta.ee.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -m 'Add some feature' -s`
5. Push feature branch: `git push origin my-new-feature`
6. Submit a pull request

Please refer to the [CONTRIBUTING.md](https://github.com/jakartaee/jakarta.ee/blob/src/CONTRIBUTING.md) file for additional information on how to contribute to this project!

### Declared Project Licenses

This program and the accompanying materials are made available under the terms
of the Eclipse Public License v. 2.0 which is available at
http://www.eclipse.org/legal/epl-2.0.

SPDX-License-Identifier: EPL-2.0

### How to include a new membership testimonials
* Website https://jakarta.ee/membership/ rotates a series of membership testimonials.
* Each testimonial is around 400 characters long.
* To add a new quote, a Github issue and Pull-Request can be sent to https://github.com/jakartaee/jakarta.ee repository.
* Pull-request should contains a new `.yml` file in the folder `data/membership/testimonials/` with the folling format:
    ```
    testimonial: "testimonial text no longer than 450 characters"
    title: "<Author of the testimonial> , <Organization>"
    ```
* Example of [PR](https://github.com/jakartaee/jakarta.ee/pull/1097/files )  


### How to include a new entry in https://jakarta.ee/news/ section

* Create a new folder under `jakarta.ee/content/news`, the folder name will become part of the final URL for the new entry.
* Create a file name `_index.md`. This will be hold the main entry content for the URL defined in the previous step.
* Add an image `banner.png` to be used as the main card for the new entry defined in the file from previous step.

Final structure for a new entry should look like this:
```
├── content
│   ├── news
│   │   ├── new-entry-name
│   │   │   ├── _index.md
│   │   │   └── banner.png
```

`_index.md` has two man sections: `Header` and `Content`
The `header` provide metadata need it for the new entry to be published in the list from https://jakarta.ee/news/

```
---
title: "New entry title"
date: "2021-06-30"
publishDate: "2021-04-01"
type: "announcement"
news/tags:
  - "Jakarta EE"
  - "Release"
authors: [{gh_handle: "shabnammayel", name: "Shabnam Mmayel"}, {gh_handle: "TanjaObradovic", name: "Tanja Obradovic"}]
image: "./banner.png"
summary: "Summary text to be presented in the news index page"
---
```

**Important**

-  `publishDate` is need it for the new entry to appear in the `https://jakarta.ee/news/` list if the `date` is set in the future.
- For the correct list of `type` and `news/tags`, review previous entries before creating a new one.
- `authors` section recive a list of Github Handles and names, this is used to populate images and authors names automatically in the entry.

The rest of the `_index.md` needs general markdown format to populate the new entry content. 

Eclipse Foundation Marketing Manager is responsible for approving the new entry (via pull request) for the `https://jakarta.ee/news/` section.


### How to add a reference in Jakarta EE Announcements section from one Jakarta EE Working Group post

Let's say we created a new post on jakarta.ee/news/ with the title "Jakarta EE 9.1 Released" and the url of https://jakarta.ee/news/jakartaee-91-released/

- Copy the https://jakarta.ee/news/jakartaee-91-released/ link to your clipboard
- On the front page of jakarta.ee under announcements, there's a "`Submit News`" link
- Click "Submit News"
- Once at https://newsroom.eclipse.org/node/add/news
    - paste the https://jakarta.ee/news/jakartaee-91-released/ url into the "URL" text box
    - type "Jakarta EE 9.1 Released" into the "Title" text box
    - leave "Announcements" selected
    - leave the body empty
    - check the "Jakarta EE" option under "Publishing Information"
    - click "Save"



## Related Projects

### [EclipseFdn/solstice-assets](https://github.com/EclipseFdn/solstice-assets)

Images, less and JavaScript files for the Eclipse Foundation look and feel.

### [EclipseFdn/hugo-solstice-theme](https://github.com/EclipseFdn/hugo-solstice-theme)

Hugo theme of the Eclipse Foundation look and feel.

## Bugs and Feature Requests

Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/jakartaee/jakarta.ee/issues/new).

## Author

**Christopher Guindon (Eclipse Foundation)**

- <https://twitter.com/chrisguindon>
- <https://github.com/chrisguindon>

## Trademarks

* Jakarta® is a Trademark of the Eclipse Foundation, Inc.
* Eclipse® is a Trademark of the Eclipse Foundation, Inc.

## Copyright and License

Copyright 2019 the [Eclipse Foundation, Inc.](https://www.eclipse.org) and the [jakarta.ee authors](https://github.com/jakartaee/jakarta.ee/graphs/contributors). Code released under the [Eclipse Public License Version 2.0 (EPL-2.0)](https://github.com/jakartaee/jakarta.ee/blob/src/LICENSE).
