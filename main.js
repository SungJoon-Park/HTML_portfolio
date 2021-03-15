fetch('assets/data.json')
    .then(resp => resp.json())
    .then(d => {
        data = d;

        let params = new URLSearchParams(window.location.search);
        if (params.get('project') == null) {
            renderMainPage(data);
        } else {
            let project = data.projects.find(d => d.id === params.get('project'));
            renderProjectPage(project);
        }


    });
function renderMainPage(data) {

    document.querySelector('.container').innerHTML = `
        ${renderNavbar('main', Object.keys(data))}
        ${renderAbout(data.about)}
        ${renderNews(data.news)}
        ${renderProjects(data.projects)}
    `
}
function renderNavbar(page, items) {
    return `
    <nav>
        <ul>
           ${page==='project'? (
                `<li>
                    <a href=".">Go Back</a>
                </li>`
           ):(
                items.map(d=>
                `<li>
                    <a href="#${d}">${d.toUpperCase()}</a>
                </li>
                `).join('')
            )}
        </ul>
    </nav>`
}



function renderAbout(about) {
    return `
    <section id="about">
        <h1 class="title animated infinite bounce delay-1s">${about.name}</h1>
        <div class="row">
            <div class="col-6">
                <img class="profile" src="${about.photo}"/>
                <p>
                    <strong>${about.major}</strong><br>
                    ${about.email} <br>
                    ${about.address}<br>
                    <a href="${about.resume}" target="_blank"><i class="far fa-file-alt"></i> Resume</a> |
                    <a href="${about.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a> | 
                    <a href="${about.github}" target="_blank"><i class="fab fa-github"></i></a><br>
                </p>
            </div>
            <div class="col-6">
                <p>
                ${about.desc}
                </p>
            </div>
            
        </div >    
    </section>`
}

function renderMaterialIcon(type) {
    switch (type) {
        case 'Link':
            return '<i class="fas fa-home"></i>';
        case 'Paper':
            return '<i class="far fa-file-alt"></i>';
        case 'Video':
            return '<i class="fas fa-video"></i>';

    }
}

function renderNews(news) {
    return `
    <section id="news">
        <h1 class="title">News</h1>
        <div class="news-list">
            ${renderNewsItems(news)}
        </div>
    </section>
    `
}

function renderNewsItems(news) {
    return news.slice(0, 6).map(d => `
        <div class="row">
            <div class="col-8">
                ${d.title}
            </div>
            <div class="col-4">
                ${d.date}
            </div>
        </div>
    `).join('');
}

function renderProjects(projects) {
    return `
    <section id="projects">
        <h1 class="title">Projects</h1>
        <div class="project-list">
            ${renderProjectItems(projects)}
        </div>
    </section>`;
}

function renderProjectItems(projects) {
    return projects.map(d => `
        <div class="row">
            <div class="col-6">
                <div class="project-title">
                    <a href="?project=${d.id}"><strong>${d.title}</strong></a>
                </div>
                <div class="project-authors">
                    ${d.authors}<br>
                </div>
                <div class="project-source">
                    <em>${d.source}</em>
                </div>
                <div class="project-tags">
                    ${d.tags.map(tag=>`
                        <span class="tag ${tag.toLowerCase()}">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
                <div class="project-materials">
                    ${d.materials.map(m=>`
                        <span>
                            <a href="${m.path}" target="_blank">${renderMaterialIcon(m.label)} 
                            ${m.label}
                            </a>
                        </span>
                    `).join('')}
                    
                </div>
            </div> 
            <div class="col-6">
                <img src="${d.teaser}" width="100%">
            </div>
        </div>
    `).join('');
}




function renderProjectPage(project) {
    document.querySelector('.container').innerHTML = `
        ${renderNavbar('project')}
        ${renderProjectDetail(project)}
    `
}

function renderProjectDetail(d) {
    return `
    <section>
        <h1 class="title">${d.title}</h1>
        <img class="project-teaser" src="${d.teaser}" width="100%">
        <div class="project-authors">
            ${d.authors}
        </div>
        <div class="project-source">
            <em>${d.source}</em>
        </div>
        <div class="project-tags">
            ${d.tags.map(tag=>`
                <span class="tag ${tag.toLowerCase()}">
                    ${tag}
                </span>
            `).join('')}
        </div>
        <div class="project-desc">
            <p>
                ${d.desc}
            </p>
        </div>
        <div class="project-materials">
            ${d.materials.map(m=>`
                <span>
                    <a href="${m.path}" target="_blank">${renderMaterialIcon(m.label)} 
                    ${m.label}
                    </a>
                </span>
            `).join('')}
        </div>
    </section>
    `
}