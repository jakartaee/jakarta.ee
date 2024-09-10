import Mustache from 'mustache';

const render = async () => {
  const element = document.querySelector('.eclipsefdn-specification-badges');
  if (!element) return;
  
  const options = { ...element.dataset };
  if (!options.projectId) {
    console.error('Missing the project id data attribute for eclipsefdn-specification-badges');
    return;
  }
  
  try {
    const response = await fetch(`https://projects.eclipse.org/api/projects/${options.projectId}`);
    const project = (await response.json()).at(0);
  
    element.innerHTML = Mustache.render(`
      <span class="badge">
        <a href="{{url}}">
          <i class="fa fa-archive" aria-hidden="true"></i>
          Project
        </a>
      </span>
      {{#website_url}}
        <span class="badge">
          <a href="{{website_url}}">
            <i class="fa fa-globe" aria-hidden="true"></i>
            Website
          </a>
        </span>
      {{/website_url}}
    `, project);
  } catch (error) {
    element.innerHTML = Mustache.render('<span class="badge badge-error">Could not load project</span>');
  }
};

export default { render };
