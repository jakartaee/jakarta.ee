export default ({ name, login }) =>
  `<a class="contributor-card" href="//github.com/${login}" title="${name}">
		<div class="contributor-name">
			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 279 283"
				style="enable-background:new 0 0 279 283;" xml:space="preserve">
				<g>
					<path fill="#FDB940"
						d="M256.5,20.3L194,88.7c-0.8,34.7-9.2,86.9-46,134.7l54.4,13.6C293.1,151.6,256.5,20.3,256.5,20.3z" />
					<path fill="#FEB322"
						d="M194,88.7c0.5-24-2.6-39.6-2.6-39.6l-137.9,151l94.3,23.6c0.1-0.1,0.1-0.2,0.2-0.3l-62.7-15.7L194,88.7z" />
					<path fill="#F98200" d="M85.4,207.7l62.7,15.7c36.8-47.7,45.2-100,46-134.7L85.4,207.7z" />
					<path fill="#1B208B"
						d="M172.6,239.1c5.5,0,10.8,0.3,16.1,0.7L10.8,196c0,0,33.1,11,73.1,70.8C105,249.8,136.9,239.1,172.6,239.1z" />
				</g>
			</svg>
			<h4>${name}</h4></div>
		<div class="contributor-image">
			<img src="//github.com/${login}.png?size=160" />
    </div>
</a>`;
