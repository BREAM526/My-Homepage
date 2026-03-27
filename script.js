// ==================== 作业数据 ====================
const homeworks = [
    {
        title: 'HTML 基础页面',
        description: '使用纯 HTML 搭建的自我介绍页面，学习了基本的标签和结构。',
        date: '2026-03-15',
        tag: 'homework',
        tagLabel: '作业'
    },
    {
        title: 'CSS 样式练习',
        description: '练习 CSS 选择器、盒模型和布局，制作了一个卡片组件。',
        date: '2026-03-18',
        tag: 'homework',
        tagLabel: '作业'
    },
    {
        title: 'JavaScript 交互',
        description: '用 JS 做了一个简单的待办事项列表，学习事件处理和 DOM 操作。',
        date: '2026-03-22',
        tag: 'lab',
        tagLabel: '实验'
    },
    {
        title: '个人主页项目',
        description: '综合运用 HTML/CSS/JS 制作的个人学习主页，包含多个页面区块。',
        date: '2026-03-25',
        tag: 'project',
        tagLabel: '项目'
    }
];

// ==================== DOM 元素 ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const homeworkGrid = document.getElementById('homework-grid');

// ==================== 导航栏滚动效果 ====================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ==================== 导航高亮 ====================
function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ==================== 渲染作业卡片 ====================
function renderHomeworks() {
    homeworks.forEach((hw, index) => {
        const card = document.createElement('article');
        card.className = 'homework-card';
        card.style.transitionDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="card-header">
                <h3 class="card-title">${hw.title}</h3>
                <span class="card-date">${hw.date}</span>
            </div>
            <p class="card-desc">${hw.description}</p>
            <div class="card-tags">
                <span class="tag tag-${hw.tag}">${hw.tagLabel}</span>
            </div>
            <a href="#" class="card-link">查看详情 →</a>
        `;

        homeworkGrid.appendChild(card);
    });
}

renderHomeworks();

// ==================== 滚动入场动画 ====================
function handleScrollAnimation() {
    const cards = document.querySelectorAll('.homework-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

handleScrollAnimation();
