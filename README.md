# jakarta.ee
test
The [jakarta.ee](https://jakarta.ee) website is generated with [Hugo](https://gohugo.io/documentation/) 0.76.5.

Jakarta EE is the future of cloud native Java. Jakarta EE open source software drives cloud native innovation, modernizes enterprise applications and protects investments in Java EE.

[![Netlify Status](https://api.netlify.com/api/v1/badges/8d42015f-09c7-46b1-9f9c-419404d01f6d/deploy-status)](https://app.netlify.com/sites/jakartaee/deploys)

## Getting Started

Install dependencies, build assets and start a web server:

```bash
yarn && yarn run production
hugo server
```

### Specification Section (Optional)

Fetch and copy pages for the Specification section:

```bash
yarn run specifications
```

### Contributors list (Optional)

Contributors list json file (_used on release page_) can be generate via:

```bash
yarn run generate_contributor_list
```

P.S. Script also needs GH_TOKEN env variable to work, to run with env variable inline:

```bash
GH_TOKEN=<gh token here> yarn run generate_contributor_list
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

* Create a new folder under `jakarta.ee/content/news`, the folder's name will become part of the final URL for the new entry.
* Create a file named `_index.md`. This will hold the main entry content for the URL defined in the previous step.
* Add an image `banner.png` to be used as the main card for the new entry defined in the file from previous step.

Final structure for a new News entry should look like this:
```
├── content
│   ├── news
│   │   ├── new-entry-name
│   │   │   ├── _index.md
│   │   │   └── banner.png
```

`_index.md` has two main sections: `Header` and `Content`
The `header` provide metadata needed for the new entry to be published in the list from https://jakarta.ee/news/

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

- `publishDate` is needed for the new entry to appear in the `https://jakarta.ee/news/` list if the `date` is set in the future.
- For the correct list of `type` and `news/tags`, review previous entries before creating a new one.
- `authors` section receive a list of Github Handles and names, this is used to populate images and authors name automatically in the entry.

The rest of the `_index.md` needs general markdown format to populate the new entry content.

Eclipse Foundation Marketing Manager is responsible for approving the new entry (via pull request) for the `https://jakarta.ee/news/` section.


### How to include a new entry in https://jakarta.ee/blogs section

* Create a new folder under `jakarta.ee/content/blogs`, the folder's name will become part of the final URL for the new entry.
* Create a file named `index.md`. This will hold the main entry content for the URL defined in the previous step.
* Add images to be used in the content of the new entry.

Final structure for a new blog entry should look like this:
```
├── content
│   ├── blogs
│   │   ├── new-entry-name
│   │   │   ├── images
│   │   │   │   └── image.jpg
│   │   │   ├── index.md
│   │   │   └── banner.png
```

`index.md` has two main sections: `Header` and `Content`
The `header` provide metadata needed for the new entry to be published in the list from https://jakarta.ee/blogs/

```
---
title: "New entry title"
date: "2021-06-30"
summary: "Summary text to be presented in the blogs index page"
---
```

The rest of the `index.md` needs general markdown format to populate the new entry content.

Eclipse Foundation Marketing Manager is responsible for approving the new entry (via pull request) for the `https://jakarta.ee/blogs/` section.

**External blog posts**

The blog section currently supports the addition of blog posts coming from an external source.

If you wish to add you blog to the list of external source, please file an issue on the [JakartaBlogs repo](https://github.com/jakartaee/jakartablogs.ee/issues/new?assignees=&labels=&template=add_blog.md).


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

### How to add a compatible product in Jakarta EE compatible products section

Create a new item with the same structure as existing ones in /data/compatible_products.yml-sets-items-items and fill the information.
```
- name: [product name]
  vendor: [member/company name]
  image: '/images/compatible_products/[product logo]'
  image_width: [width number]
  download: '[product download URL]'
  versions:
  - version: [version number]
    compatibility: '[TCK result URL]'
    download_url: '[product download URL]'
```

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

Copyright 2019-2022 the [Eclipse Foundation, Inc.](https://www.eclipse.org) and the [jakarta.ee authors](https://github.com/jakartaee/jakarta.ee/graphs/contributors). Code released under the [Eclipse Public License Version 2.0 (EPL-2.0)](https://github.com/jakartaee/jakarta.ee/blob/src/LICENSE).
