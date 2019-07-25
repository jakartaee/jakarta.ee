var Mustache = require('mustache');
const Octokit = require('@octokit/rest')
var fs = require('fs');

var org = 'eclipse-ee4j';

const octokit = Octokit({
    auth: ''
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

async function getProjectData() {
    var projects = [];

    var repositories = (await octokit.repos.listForOrg({
        org: org,
        per_page: 100 // TODO: handle multipage
    })).data;

    await asyncForEach(repositories, async (repository) => {
        var project = {};
        project.contributors = [];

        var values = await Promise.all([
            octokit.repos.getContributorsStats({ owner: org, repo: repository.name }),
            octokit.repos.getReadme({ owner: org, repo: repository.name }).catch(p =>'No README'),
            octokit.licenses.getForRepo({ owner: org, repo: repository.name }).catch(p => 'No license')]);
       
        var contributors = values[0].data;

        var readme = '';
        var readmeExtension = '';
        if(values[1].data) {
            readme = new Buffer(values[1].data.content, 'base64').toString('utf8');
            var readmeName = values[1].data.name;
            readmeExtension = readmeName.substr(readmeName.lastIndexOf(".") + 1 , readmeName.length);
        }
        var license = values[2].data ? values[2].data.license.name : '';

        if(contributors) {
            if(Array.isArray(contributors)) {
                contributors.forEach(contributor => {
                    var contrib = {};
                    contrib['login'] = contributor.login;
                    contrib['avatar'] = contributor.avatar_url;
                    project.contributors.push(contrib);
                });
            } else {
                var contrib = {};
                contrib['login'] = contributors.login;
                contrib['avatar'] = contributors.avatar_url;
                project.contributors.push(contrib);
            }
        }

        project.name = repository.name;
        project.description = repository.description;
        project.text = readme;
        project.textFormat = readmeExtension;
        project.license = license;
        projects.push(project);
    });
    
    return projects;
}

const start = async () => {
    var projectsDirectory = __dirname + '/../content/projects';
    fs.mkdirSync(projectsDirectory, { recursive: true }, (err) => {
        if (err) throw err;
    });

    var projects = await getProjectData();
    projects.forEach(project => {
        fs.readFile( __dirname + '/../templates/project.mustache', function (err, data) {
            if (err) {
                throw err; 
            }
   
            var rendered = Mustache.render(data.toString(), project);

            var projectDirectory = projectsDirectory + '/' + project.name;
            fs.mkdirSync(projectDirectory, { recursive: true }, (err) => {
                if (err) throw err;
            });
            fs.writeFile( projectDirectory + '/index.' + project.textFormat, rendered, (err) => {
                if (err) throw err;
            });
        });
    });

    // TODO: this should be handled in the theme
    // fs.readFile( __dirname + '/../templates/projects.mustache', function (err, data) {
    //     if (err) {
    //         throw err; 
    //     }

    //     var rendered = Mustache.render(data.toString(), projects);

    //     fs.writeFile( __dirname + '/../content/projects/index.md', rendered, (err) => {
    //         if (err) throw err;
    //     });
    // });
}

start()
