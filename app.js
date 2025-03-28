// Opción 1: Usando fetch
let posts = []

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        posts = data.map(post => ({
            id: post.id,
            title: post.title,
            content: post.description,
            author: "u/aloide", // Puedes ajustar esto según tus necesidades
            filename: post.filename,
            date: post.date,
            tags: post.tags
        }));
        renderPosts();
    })
    .catch(error => console.error('Error cargando los posts:', error));

function renderPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = posts.map(post => `
            
            <div class="post-card">
                <h3><a href="post.html?id=${post.filename.split('/').pop().replace('.md', '')}">${post.title}</a></h3>
                <p>${post.content}</p>
                <footer>
                    <small> <i> ${post.date} </i></small>
                    <div>
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
                    </div>
                </footer>
            </div>
        `).join('');
}

function showSection(sectionName) {
    // Hide all sections
    ['home', 'profile'].forEach(section => {
        document.getElementById(`${section}-section`).style.display = 'none';
    });

    // Show selected section
    document.getElementById(`${sectionName}-section`).style.display = 'block';


    renderPosts();
}

// Al inicio del archivo, después de la declaración de posts
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Initial render
renderPosts();
