document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del post de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Primero obtener los datos del JSON
    fetch('./data.json')
        .then(response => response.json())
        .then(posts => {
            // Encontrar el post que coincida con el ID
            const post = posts.find(post => post.id === parseInt(postId));

            if (!post) throw new Error('Post no encontrado');

            // Actualizar el título con los datos del JSON
            document.getElementsByTagName('title')[0].innerHTML = `@aloide - ${post.title}`;

            // Renderizar posts relacionados si existen
            if (post.see_more && post.see_more.length > 0) {
                const relatedPosts = posts.filter(p => post.see_more.includes(p.id));
                renderRelatedPosts(relatedPosts);
            } else {
                document.getElementById('related-posts').style.display = 'none';
            }

            // Luego cargar el contenido del markdown
            return fetch(`./posts/${postId}.md`);
        })
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            document.getElementById('post-content').innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error cargando el post:', error);
            document.getElementById('post-content').innerHTML = '<p>Parece que estas intentando a acceder a un sitio al que no debes... 🤨</p>';
        });

    // Actualizar el año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function renderRelatedPosts(relatedPosts) {
    const container = document.getElementById('related-posts-container');
    container.innerHTML = relatedPosts.map(post => `
        <article class="related-post-card">
            <h4><a href="post.html?id=${post.id}">${post.title}</a></h4>
            <p>${post.description}</p>
            <small><i>${post.date}</i></small>
        </article>
    `).join('');
} 