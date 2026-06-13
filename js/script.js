const sections = document.querySelectorAll('.api-section[id], .api-group-title[id]')
const sidebarLinks = document.querySelectorAll('.api-sidebar a')

if (sections.length && sidebarLinks.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active')
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active')
                    }
                })
            }
        })
    }, { rootMargin: '-20% 0px -70% 0px' })

    sections.forEach(s => observer.observe(s))
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            e.preventDefault()
            const offset = 80
            const top = target.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    })
})

const keywords = ['local', 'function', 'return', 'if', 'then', 'else', 'elseif',
    'end', 'for', 'while', 'do', 'repeat', 'until', 'in', 'and', 'or', 'not',
    'true', 'false', 'nil', 'require', 'print', 'warn', 'task', 'game',
    'workspace', 'string', 'table', 'math', 'type']

document.querySelectorAll('pre code').forEach(block => {
    let html = block.innerHTML

    html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
        '<span style="color:#f1fa8c">$1</span>')

    html = html.replace(/(--[^\n]*)/g,
        '<span style="color:#6272a4;font-style:italic">$1</span>')

    html = html.replace(/\b(\d+\.?\d*)\b/g,
        '<span style="color:#bd93f9">$1</span>')

    keywords.forEach(kw => {
        html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'),
            '<span style="color:#ff79c6">$1</span>')
    })

    block.innerHTML = html
})