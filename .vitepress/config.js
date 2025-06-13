import { defineConfig } from 'vitepress';

export default defineConfig({
    title: '我的学习笔记',
    description: '记录学习历程，分享知识经验',
    // 基本配置
    base: '/', // 自定义域名时使用根路径
    lang: 'zh-CN',

    // 忽略死链接
    ignoreDeadLinks: true,

    // 主题配置
    themeConfig: {
        // 导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '编程学习', link: '/programming/' },
            { text: '技术笔记', link: '/tech/' },
            { text: '工具使用', link: '/tools/' },
            { text: '项目经验', link: '/projects/' },
            { text: '主页', link: 'https://alexander.xin', target: '_blank' },
        ],

        // 侧边栏
        sidebar: {
            '/programming/': [
                {
                    text: '编程学习',
                    items: [
                        { text: '开始学习', link: '/programming/' },
                        {
                            text: 'JavaScript 基础',
                            link: '/programming/javascript-basics',
                        },
                        {
                            text: 'Python 入门',
                            link: '/programming/python-intro',
                        },
                        {
                            text: '数据结构与算法',
                            link: '/programming/data-structures',
                        },
                    ],
                },
            ],
            '/tech/': [
                {
                    text: '技术笔记',
                    items: [
                        { text: '技术概览', link: '/tech/' },
                        { text: 'Web 开发', link: '/tech/web-development' },
                    ],
                },
            ],
            '/tools/': [
                {
                    text: '工具使用',
                    items: [
                        { text: '工具清单', link: '/tools/' },
                        { text: 'Git 使用指南', link: '/tools/git-guide' },
                        { text: 'VS Code 配置', link: '/tools/vscode-setup' },
                    ],
                },
            ],
            '/projects/': [
                {
                    text: '项目经验',
                    items: [
                        { text: '项目总览', link: '/projects/' },
                        { text: '第一个网站', link: '/projects/first-website' },
                        {
                            text: '学习管理系统',
                            link: '/projects/learning-system',
                        },
                    ],
                },
            ],
        }, // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/AlexanderJ-Carter' },
        ],

        // 页脚
        footer: {
            message: 'Released under the CC BY-NC-SA 4.0 License.',
            copyright:
                'Copyright © 2024-present | 本站内容仅供学习参考，转载请注明出处',
        },

        // 搜索
        search: {
            provider: 'local',
        }, // 编辑链接
        editLink: {
            pattern:
                'https://github.com/AlexanderJ-Carter/Note/edit/main/:path',
            text: '在 GitHub 上编辑此页',
        },

        // 最后更新时间
        lastUpdated: {
            text: '最后更新',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },
    },

    // Markdown 配置
    markdown: {
        lineNumbers: true,
        theme: 'github-dark',
    },
});
