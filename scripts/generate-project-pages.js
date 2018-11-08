var Mustache = require('mustache');
var GitHub = require('github-api');
var fs = require('fs');

var org = 'eclipse-ee4j';
var projectNames = ['jta-api'];

var gh = new GitHub({
    token: ''
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

async function getProjectData() {
    var projects = [];

    await asyncForEach(projectNames, async (projectName) => {
        var repo = gh.getRepo(org, projectName);
    
        var project = {};
        project.contributors = [];
    
        var values = await Promise.all([repo.getContributors(), repo.getDetails(), repo.getContents('master', 'README.md', true)]);
        
        values[0].data.forEach(contributor => {
            var contrib = {};
            contrib['login'] = contributor.login;
            contrib['avatar'] = contributor.avatar_url;
            project.contributors.push(contrib);
        });
    
        project.name = values[1].data.name;
        project.description = values[1].data.description;
        project.text = values[2].data;
        projects.push(project);
    });
    
    return projects;
}

const start = async () => {
    var projects = await getProjectData();
    projects.forEach(project => {
        fs.readFile( __dirname + '/../templates/project.mustache', function (err, data) {
            if (err) {
                throw err; 
            }
    
            var rendered = Mustache.render(data.toString(), project);
    
            fs.writeFile( __dirname + '/../content/projects/' + project.name + '.md', rendered, (err) => {
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