export interface DownloadLink {
    platform: 'Windows' | 'Android' | 'iOS' | 'Mac';
    links: string[];
}

export interface GameMedia {
    type: 'image' | 'video';
    url: string;
}

export interface Game {
    id: string;
    name: string;
    version: string;
    developer: string;
    categories: string[]; // 分类：RPG, 动作, 射击
    tags: string[];       // 标签：高画质, 剧情, 多人
    intro: string;        // 短介绍（首页显示）
    description: string;  // 详细介绍
    updates: string;      // 更新日志
    preview: GameMedia[]; // 预览图/视频
    downloads: DownloadLink[];
    contactEmail?: string;
}

// 模拟数据
export const gamesData: Game[] = [
    {
        id: 'game-001',
        name: '赛博纪元 2077',
        version: 'v1.5.2',
        developer: 'CD Projekt Red',
        categories: ['RPG', '开放世界'],
        tags: ['赛博朋克', '科幻', '剧情丰富'],
        intro: '在一个痴迷于力量、魅力和身体改造的特大城市中，体验一段关于不朽的动作冒险。',
        description: '这里是详细的游戏介绍内容，支持换行...',
        updates: 'v1.5.2: 修复了光线追踪bug，优化了帧率。',
        preview: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80' }
        ],
        downloads: [
            { platform: 'Windows', links: ['http://dl.example.com/win/1', 'http://dl.example.com/win/2'] },
            { platform: 'Android', links: ['http://dl.example.com/apk/1'] }
        ],
        contactEmail: 'support@cyber.com'
    },
    // 在这里复制粘贴添加更多游戏...
    {
        id: 'game-002',
        name: '幻境传说',
        version: 'v1.0',
        developer: 'Indie Studio',
        categories: ['冒险', '解谜'],
        tags: ['治愈', '独立游戏'],
        intro: '探索失落的古文明遗迹。',
        description: '一款画风唯美的解谜游戏。',
        updates: '首发版本',
        preview: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' }
        ],
        downloads: [
            { platform: 'Windows', links: ['#'] }
        ]
    }
];