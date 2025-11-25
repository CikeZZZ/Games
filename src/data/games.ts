export interface DownloadLink {
    platform: 'Windows' | 'Android' | 'iOS' | 'Mac' | 'Linux';
    links: {
        name: string; // 新增：自定义链接名称，例如 "百度网盘", "夸克", "Steam"
        url: string;
    }[];
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
        description: `
### 🌃 关于这款游戏
**《赛博朋克 2077》** 是一款开放世界动作冒险 RPG 游戏。你将在夜之城扮演一名野心勃勃的雇佣兵 **V**。

### ✨ 核心特性
*   **无缝开放世界**：探索巨大的垂直城市。
*   **高度自由**：你的选择决定剧情走向。
*   **义体改造**：自定义你的身体武器。

> "醒醒吧武士，我们要把这座城市烧成灰。" —— 强尼·银手
    `,

        // 👇 支持 Markdown 的更新日志
        updates: `
#### v2.1 终极更新
*   ✅ **新增**：地铁系统正式开放
*   ✅ **新增**：可以邀请伴侣回家约会
*   🔧 **修复**：解决了光线追踪导致的闪退问题
*   ⚖️ **平衡**：调整了斯安威斯坦的冷却时间

---
#### v2.0 重大更新
1.  重做了警察系统
2.  重做了技能树
    `,
        preview: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80' }
        ],
        downloads: [
            {
                platform: 'Windows',
                links: [
                    { name: '高速网盘', url: 'https://pan.baidu.com/...' },
                    { name: '官方直链', url: 'https://example.com/game.zip' }
                ]
            },
            {
                platform: 'Android',
                links: [
                    { name: 'Google Play', url: '#' }
                ]
            }
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