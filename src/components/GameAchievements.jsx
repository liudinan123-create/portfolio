import { useEffect, useRef, useState } from 'react';

/**
 * 游戏成就展示页 - 模板
 *
 * 使用说明：
 * 1. 每个游戏在 GAMES_DATA 数组中添加一个对象
 * 2. achievements: 成就列表（名称、描述、获得时间、稀有度）
 * 3. experience: 个人经历和故事（支持多段，每段一个字符串）
 * 4. stats: 关键数据统计
 * 5. coverImage: 游戏封面图路径（放到 public/images/games/ 目录下）
 */

// ====== 📋 游戏数据 ======
const GAMES_DATA = [
  // ═══ 1. 英雄联盟 ═══
  {
    id: 'lol',
    name: '英雄联盟',
    englishName: 'League of Legends',
    platform: 'PC',
    category: 'MOBA',
    coverImage: '/images/games/lol.png',
    playHours: '11000+',
    level: 'Lv.500+',
    rank: '一区大师',
    tagline: '11年老玩家，从小学五年级到初中打到大师段位，见证十年版本迭代，全位置精通。',
    achievements: [
      { name: '一区（艾欧尼亚）大师', description: '在竞争最激烈的艾欧尼亚大区打到大师段位，非郊区选手。', date: '2020', rarity: 'legendary' },
      { name: '11年全版本见证者', description: '从S2赛季至今，历经地图重做、符文系统大改、神话装备时代等重大变革。', date: '2015-2026', rarity: 'legendary' },
      { name: '钻石段位保底', description: '高一期间稳定维持钻石段位，即使学业压力加大仍保持高竞技水平。', date: '2017-2019', rarity: 'epic' },
      { name: '全位置精通', description: '上单、打野、中单、ADC、辅助五个位置均可胜任，深度理解各位置职责。', date: '2015-2026', rarity: 'epic' },
    ],
    experience: [
      '小学五年级开始接触《英雄联盟》，被其深度的策略性和团队配合吸引，从此一发不可收拾。',
      '初中阶段是游戏水平的巅峰期，凭实力打上艾欧尼亚一区大师段位。一区作为国服竞争最激烈的服务器，能在此达到大师段位，是对游戏理解和操作能力的最大肯定。',
      '高一期间即使课业繁重，仍维持钻石段位水平。这段经历教会了我在有限时间内保持高水准输出的能力。',
      '11年间见证了游戏从S2到S15的完整变迁——旧版召唤师峡谷、符文页系统、天赋树、神话装备时代、再到如今的版本。这种长达十年的版本跟踪经验，让我深刻理解游戏系统的演变逻辑和玩家生态的变迁。',
    ],
    stats: [
      { label: '游戏年限', value: '11', unit: '年' },
      { label: '最高段位', value: '大师', unit: '一区' },
      { label: '稳定段位', value: '钻石', unit: 'I' },
      { label: '覆盖位置', value: '5', unit: '个' },
    ],
  },

  // ═══ 2. 金铲铲之战 ═══
  {
    id: 'jcc',
    name: '金铲铲之战',
    englishName: 'Teamfight Tactics Mobile',
    platform: '手游',
    category: '自走棋',
    coverImage: '/images/games/jcc.png',
    playHours: '800+',
    level: '璀璨钻石',
    rank: '全省500强',
    tagline: '深度体验S6-S15十个赛季，最高段位璀璨钻石，全国公开赛全省500强。',
    achievements: [
      { name: '璀璨钻石段位', description: '凭借对阵容构筑和运营节奏的精准把握，打到璀璨钻石段位。', date: '2024-2025', rarity: 'epic' },
      { name: '全国公开赛全省500强', description: '参加金铲铲之战全国公开赛，在省级赛区排名前500。', date: '2024', rarity: 'legendary' },
      { name: 'S6-S15 十个赛季全勤', description: '从S6开始持续游玩，对每个赛季的机制变更、羁绊调整、棋子数值变化都有深入理解。', date: '2022-2026', rarity: 'epic' },
    ],
    experience: [
      '从S6赛季开始接触金铲铲之战，被其"自走棋"玩法深深吸引——既有策略深度，又能在碎片时间体验竞技乐趣。',
      '每赛季更新是最让人兴奋的时刻——新羁绊、新棋子、新机制——像一场全新的棋局等待破解。通过长期追踪版本变化，对游戏经济系统、阵容梯度、节奏把控形成了系统化认知。',
    ],
    stats: [
      { label: '游戏年限', value: '4', unit: '年' },
      { label: '段位', value: '璀璨钻石', unit: '' },
      { label: '省排名', value: 'Top 500', unit: '' },
      { label: '经历赛季', value: '10', unit: '个' },
    ],
  },

  // ═══ 3. 瓦洛兰特 ═══
  {
    id: 'valorant',
    name: '瓦洛兰特',
    englishName: 'VALORANT',
    platform: 'PC',
    category: 'FPS',
    coverImage: '/images/games/valorant.png',
    playHours: '1200+',
    level: '铂金I',
    rank: '铂金I',
    tagline: '3年端游FPS经历，主打一图位和烟位战术角色，充值1000+枪皮，深度体验皮肤经济。',
    achievements: [
      { name: '铂金I段位', description: '在高度竞技的FPS环境中打到铂金段位，验证了枪法和战术理解。', date: '2025', rarity: 'rare' },
      { name: '烟位专精', description: '深耕烟位角色，擅长利用烟雾分割战场、封锁视野，为团队创造突破口。', date: '2024-2026', rarity: 'epic' },
      { name: '枪皮收藏家', description: '累计充值1000+元用于枪械皮肤，深度理解FPS游戏的皮肤商业化和消费心理学。', date: '2023-2026', rarity: 'common' },
    ],
    experience: [
      '《瓦洛兰特》吸引我的是其将传统FPS枪法与英雄技能相结合的独特设计。相比传统CS类游戏，VALORANT的英雄系统赋予了每局游戏更多战术可能性。',
      '选择烟位作为主攻方向，是因为烟位决定了整支队伍的进攻节奏和防守阵型。一个好的烟雾能改变整个回合的走向——这种战略性决策的快感，与我在数据分析中追求"关键洞察"的思维高度契合。',
      '充值1000+用于枪械皮肤，不仅是审美追求，更是出于对游戏商业化模式的职业敏感。通过亲身参与皮肤消费，我能从玩家视角理解皮肤定价、限时活动、捆绑套装的消费心理设计。',
    ],
    stats: [
      { label: '游戏年限', value: '3', unit: '年' },
      { label: '段位', value: '铂金I', unit: '' },
      { label: '擅长位置', value: '烟位', unit: '' },
      { label: '皮肤投入', value: '1000+', unit: '元' },
    ],
  },

  // ═══ 4. 穿越火线 ═══
  {
    id: 'cf',
    name: '穿越火线',
    englishName: 'CrossFire',
    platform: 'PC',
    category: 'FPS',
    coverImage: '/images/games/cf.png',
    playHours: '2000+',
    level: '老兵',
    rank: '个人战队队长',
    tagline: '6年端游FPS老兵，小学四年级入门，见证火麒麟时代英雄级武器诞生与价值膨胀。',
    achievements: [
      { name: '6年CF老兵', description: '从小学四年级开始玩CF，贯穿整个英雄级武器时代的完整变迁。', date: '2012-2018', rarity: 'legendary' },
      { name: '个人战队创建者', description: '组建并运营个人CF战队，负责人员招募、训练安排和团队管理。', date: '2015-2017', rarity: 'epic' },
      { name: 'CF小视频演出', description: '参与CF社区小视频的拍摄与演出，积累了游戏内容创作经验。', date: '2016', rarity: 'rare' },
      { name: '英雄级武器时代见证者', description: '亲历火麒麟等英雄级武器从诞生到在市场价值逐渐降低的全过程，深刻理解游戏数值膨胀与商业化节奏。', date: '2012-2018', rarity: 'epic' },
    ],
    experience: [
      '小学四年级第一次接触《穿越火线》，被其快节奏、高对抗的FPS体验深深吸引。在那个网吧还弥漫着CF枪声的年代，我从运输船打到沙漠灰，一步一个脚印成长为独当一面的枪手。',
      '火麒麟的诞生是CF历史上的里程碑事件——从普通M4到英雄级武器的性能跃迁，再到后续武器的持续迭代，我亲眼见证了"数值膨胀"在商业游戏中的完整演化。这段经历让现在做商业化系统拆解时，我能立刻识别出类似的模式。',
      '组建个人战队是我第一次体验"管理"——招募队员、安排训练、协调时间、上场指挥。虽然只是一支小战队，但这段经历培养了我的责任感和团队管理意识。',
      '参与CF小视频的演出让我首次接触到"游戏内容创作"的世界。从脚本设计到拍摄执行，再到社区传播，这段经历让我对游戏UGC生态有了直观理解。',
    ],
    stats: [
      { label: '游戏年限', value: '6', unit: '年' },
      { label: '入坑年龄', value: '四', unit: '年级' },
      { label: '战队角色', value: '队长', unit: '' },
      { label: '版本经历', value: '完整', unit: '英雄级' },
    ],
  },

  // ═══ 5. 王者荣耀 ═══
  {
    id: 'wzry',
    name: '王者荣耀',
    englishName: 'Honor of Kings',
    platform: '手游',
    category: 'MOBA',
    coverImage: '/images/games/wzry.png',
    playHours: '600+',
    level: '星耀',
    rank: '星耀段位',
    tagline: '4年MOBA手游经历，星耀段位，累计充值300元，熟悉腾讯系手游商业化体系。',
    achievements: [
      { name: '星耀段位', description: '在国民级MOBA手游中达到星耀段位。', date: '2022-2025', rarity: 'rare' },
      { name: '300元付费玩家', description: '累计充值300元购买皮肤和战令，体验腾讯手游付费体系。', date: '2022-2026', rarity: 'common' },
    ],
    experience: [
      '《王者荣耀》是我接触最久的MOBA手游，4年间见证了它的英雄池扩张、地图更新和商业化节奏变化。',
    ],
    stats: [
      { label: '年限', value: '4', unit: '年' },
      { label: '段位', value: '星耀', unit: '' },
      { label: '付费', value: '300', unit: '元' },
      { label: '品类', value: 'MOBA', unit: '' },
    ],
  },

  // ═══ 6. 和平精英 ═══
  {
    id: 'hpjy',
    name: '和平精英',
    englishName: 'Game for Peace',
    platform: '手游',
    category: 'FPS',
    coverImage: '/images/games/hpjy.png',
    playHours: '500+',
    level: '铂金',
    rank: '铂金段位',
    tagline: '4年战术竞技手游经历，铂金段位，充值500元，熟悉射击手游商业化策略。',
    achievements: [
      { name: '铂金段位', description: '在战术竞技品类中打到铂金段位。', date: '2022-2025', rarity: 'rare' },
      { name: '500元皮肤消费', description: '累计充值500元，体验FPS手游皮肤和通行证付费体系。', date: '2022-2026', rarity: 'common' },
    ],
    experience: [
      '《和平精英》是战术竞技品类在手机端的标杆之作，4年的游玩经历让我对这一品类的玩法设计和赛季运营有了完整认知。',
    ],
    stats: [
      { label: '年限', value: '4', unit: '年' },
      { label: '段位', value: '铂金', unit: '' },
      { label: '付费', value: '500', unit: '元' },
      { label: '品类', value: '战术竞技', unit: '' },
    ],
  },

  // ═══ 7. 开心消消乐 ═══
  {
    id: 'kxxl',
    name: '开心消消乐',
    englishName: 'Happy Match',
    platform: '手游',
    category: '休闲',
    coverImage: '/images/games/kxxl.png',
    playHours: '300+',
    level: '2400+关',
    rank: '资深玩家',
    tagline: '2年休闲消除经历，突破2400+关卡，深度体验三消品类核心玩法。',
    achievements: [
      { name: '2400+关卡', description: '2年时间突破2400+关卡，验证了长期坚持和消除策略。', date: '2024-2026', rarity: 'rare' },
    ],
    experience: [
      '休闲消除类是我的"放松时刻"。《开心消消乐》2年间陪我度过了无数碎片时光，2400+关卡的进度也让我对三消品类的关卡设计节奏有了切身感受。',
    ],
    stats: [
      { label: '年限', value: '2', unit: '年' },
      { label: '关卡', value: '2400+', unit: '关' },
      { label: '品类', value: '三消', unit: '' },
      { label: '体验', value: '休闲', unit: '' },
    ],
  },

  // ═══ 8. Bingo乐园 ═══
  {
    id: 'bingo',
    name: 'Bingo乐园',
    englishName: 'Bingo Paradise',
    platform: '手游',
    category: '休闲',
    coverImage: '/images/games/bingo.png',
    playHours: '200+',
    level: '40城市',
    rank: '深度玩家',
    tagline: '2年Bingo类玩法经历，解锁40个城市关卡，熟悉轻度休闲游戏关卡设计。',
    achievements: [
      { name: '解锁40个城市', description: '2年间解锁40个城市关卡，覆盖游戏大部分内容。', date: '2024-2026', rarity: 'common' },
    ],
    experience: ['Bingo类游戏是我研究轻度休闲用户群体的重要样本，2年间解锁40个城市，对这类游戏的留存设计和奖励机制形成了自己的判断。'],
    stats: [
      { label: '年限', value: '2', unit: '年' },
      { label: '城市', value: '40', unit: '个' },
      { label: '品类', value: 'Bingo', unit: '' },
      { label: '定位', value: '休闲', unit: '' },
    ],
  },

  // ═══ 9. Bravo Bingo ═══
  {
    id: 'bravo-bingo',
    name: 'Bravo Bingo',
    englishName: 'Bravo Bingo',
    platform: '手游',
    category: '休闲',
    coverImage: '/images/games/bravo-bingo.png',
    playHours: '100+',
    level: '30城市',
    rank: '活跃玩家',
    tagline: '1年Bingo类玩法经历，解锁30个城市，对比国内外Bingo游戏设计差异。',
    achievements: [
      { name: '解锁30个城市', description: '1年解锁30城市，体验海外Bingo品类的本地化策略。', date: '2025-2026', rarity: 'common' },
    ],
    experience: ['《Bravo Bingo》让我对比了国内外Bingo游戏的设计差异——从视觉风格到奖励节奏，从社交系统到付费点设计，同一品类在不同市场的呈现方式差异显著。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '城市', value: '30', unit: '个' },
      { label: '品类', value: 'Bingo', unit: '' },
      { label: '定位', value: '海外', unit: '' },
    ],
  },

  // ═══ 10. 元梦之星 ═══
  {
    id: 'ymzx',
    name: '元梦之星',
    englishName: 'DreamStar',
    platform: '手游',
    category: '派对',
    coverImage: '/images/games/ymzx.png',
    playHours: '200+',
    level: '联机200次',
    rank: '派对玩家',
    tagline: '2年派对游戏经历，联机200+次，熟悉腾讯派对赛道产品矩阵。',
    achievements: [
      { name: '联机200次', description: '2年间完成200+次联机对战，深度体验派对游戏社交玩法。', date: '2024-2026', rarity: 'common' },
    ],
    experience: ['《元梦之星》是腾讯在派对游戏赛道的重要布局。2年200+次联机经历让我从玩家视角理解了派对游戏的核心驱动力——社交、互动、轻竞技。'],
    stats: [
      { label: '年限', value: '2', unit: '年' },
      { label: '联机', value: '200+', unit: '次' },
      { label: '品类', value: '派对', unit: '' },
      { label: '定位', value: '社交', unit: '' },
    ],
  },

  // ═══ 11. 糖果国王消消乐 ═══
  {
    id: 'tgxkl',
    name: '糖果国王消消乐',
    englishName: 'Candy King Match',
    platform: '手游',
    category: '休闲',
    coverImage: '/images/games/tgxkl.png',
    playHours: '150+',
    level: '500+关',
    rank: '资深玩家',
    tagline: '1年消除类经历，突破500+关卡，扩展三消品类横向对比视野。',
    achievements: [
      { name: '500+关卡', description: '1年内突破500+关卡，快速上手并深入研究。', date: '2025-2026', rarity: 'common' },
    ],
    experience: ['《糖果国王消消乐》是我横向对比三消品类的补充样本。与《开心消消乐》形成对照，让我对不同三消游戏的关卡难度曲线和付费点设置有了更立体的认识。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '关卡', value: '500+', unit: '关' },
      { label: '品类', value: '三消', unit: '' },
      { label: '定位', value: '对比', unit: '' },
    ],
  },

  // ═══ 12. 蛋仔派对 ═══
  {
    id: 'dzpd',
    name: '蛋仔派对',
    englishName: 'Eggy Party',
    platform: '手游',
    category: '派对',
    coverImage: '/images/games/dzpd.png',
    playHours: '300+',
    level: '联机400+',
    rank: '派对达人',
    tagline: '2年派对游戏经历，联机400+次，对比元梦之星理解派对赛道差异化打法。',
    achievements: [
      { name: '联机400+次', description: '2年间完成400+次联机对战，是派对品类中投入度最高的游戏。', date: '2024-2026', rarity: 'rare' },
    ],
    experience: ['《蛋仔派对》和《元梦之星》的同赛道竞争是近年游戏行业最值得研究的案例之一。2年400+次联机，让我从玩家视角感受到了两款产品的差异化策略——一个主打UGC社交，一个主打竞技与IP。'],
    stats: [
      { label: '年限', value: '2', unit: '年' },
      { label: '联机', value: '400+', unit: '次' },
      { label: '品类', value: '派对', unit: '' },
      { label: '竞品', value: '元梦', unit: '' },
    ],
  },

  // ═══ 13. 洛克王国页游 ═══
  {
    id: 'lkwg-web',
    name: '洛克王国（页游）',
    englishName: 'Roco Kingdom',
    platform: '页游',
    category: '养成',
    coverImage: '/images/games/lkwg.png',
    playHours: '500+',
    level: '40只满级',
    rank: '资深玩家',
    tagline: '3年页游养成经历，拥有40只满级宠物，深度理解宠物收集与养成系统设计。',
    achievements: [
      { name: '40只满级宠物', description: '通过3年持续游玩，收集并培养了40只满级宠物。', date: '2013-2016', rarity: 'epic' },
    ],
    experience: [
      '《洛克王国》是我童年最珍贵的游戏记忆之一。3年间收集培养40只满级宠物，这段经历让我对宠物收集类游戏的养成循环、收集驱动力和社区氛围有了切身体会。',
      '如今在手游版中重新回到洛克王国的世界，看到经典精灵的新形态与新玩法，这种"IP传承"的体验让我对跨代际产品的用户情感连接有了更深的理解。',
    ],
    stats: [
      { label: '年限', value: '3', unit: '年' },
      { label: '满级宠物', value: '40', unit: '只' },
      { label: '品类', value: '养成', unit: '' },
      { label: '平台', value: '页游', unit: '' },
    ],
  },

  // ═══ 14. 洛克王国手游 ═══
  {
    id: 'lkwg-mobile',
    name: '洛克王国（手游）',
    englishName: 'Roco Kingdom Mobile',
    platform: '手游',
    category: '养成',
    coverImage: '/images/games/lkwg-mobile.png',
    playHours: '1200+',
    level: '200+精灵',
    rank: '重度核心玩家',
    tagline: '开服至今持续游玩，平均每周投入15小时，已拥有200+精灵宠物，IP死忠用户。',
    achievements: [
      { name: '200+精灵收藏', description: '开服至今持续收集，已拥有超过200个精灵宠物，覆盖绝大部分可获得精灵。', date: '2024-2026', rarity: 'legendary' },
      { name: '周均15小时高活跃', description: '平均每周投入15小时，属于游戏的高活核心用户群体。', date: '2024-2026', rarity: 'legendary' },
      { name: 'IP跨代际忠实用户', description: '从页游时代到手游时代，持续追随同一IP超过10年。', date: '2013-2026', rarity: 'legendary' },
    ],
    experience: [
      '从页游到手游，洛克王国陪伴了我超过十年的成长。作为手游开服第一批玩家，我见证了这款IP产品从零开始的完整历程——从初期Bug频出到逐步打磨，从玩家质疑到口碑逆转。',
      '平均每周15小时的投入，不仅是因为情怀，更是因为手游版的精灵养成系统在深度和广度上都达到了新高度。200+精灵的收集之路，让我对宠物收集类游戏的"玩家动机分层"有了切身体验——有些人追求全收集，有些人追求PVP，有些人只想养自己喜欢的宠物。',
      '这段经历对我的工作有直接价值——作为IP游戏的核心高活用户，我能准确理解什么样的运营活动和内容更新能真正打动用户。',
    ],
    stats: [
      { label: '精灵数', value: '200+', unit: '只' },
      { label: '周均时长', value: '15', unit: '小时' },
      { label: 'IP年限', value: '10+', unit: '年' },
      { label: '用户分层', value: '核心', unit: '' },
    ],
  },

  // ═══ 15. QQ飞车 ═══
  {
    id: 'qqfc',
    name: 'QQ飞车',
    englishName: 'QQ Speed',
    platform: '端游 + 手游',
    category: '竞速',
    coverImage: '/images/games/qqfc.png',
    playHours: '1500+',
    level: '区域TOP3',
    rank: '手游四星TOP3',
    tagline: '6年端游+手游双端经验，手游四星地图区域TOP3，端游三星地图区域TOP3。',
    achievements: [
      { name: '手游四星地图区域TOP3', description: '在上海/区域服务器四星地图排行榜上稳定前三。', date: '2020-2026', rarity: 'legendary' },
      { name: '端游三星地图区域TOP3', description: '在PC端QQ飞车三星难度的城市/区域地图排名前三。', date: '2018-2024', rarity: 'epic' },
      { name: '双端6年', description: '端游和手游累计6年竞速经验，对双端版本差异和运营节奏有深入理解。', date: '2018-2026', rarity: 'epic' },
    ],
    experience: [
      '《QQ飞车》是我持续投入时间最长的竞速游戏，端游和手游双端累计6年，在两个平台上都达到了区域顶尖水平。',
      '竞速游戏的排行榜竞争异常激烈，保持三星/四星地图TOP3需要持续练习和路线优化。这种追求极致的精神也延续到了我的工作中——数据分析和商业化拆解同样需要精益求精的态度。',
    ],
    stats: [
      { label: '年限', value: '6', unit: '年' },
      { label: '手游排名', value: 'TOP3', unit: '' },
      { label: '端游排名', value: 'TOP3', unit: '' },
      { label: '品类', value: '竞速', unit: '' },
    ],
  },

  // ═══ 16. 三角洲行动 ═══
  {
    id: 'sjz',
    name: '三角洲行动',
    englishName: 'Delta Force',
    platform: '手游+PC',
    category: 'FPS',
    coverImage: '/images/games/sjz.png',
    playHours: '200+',
    level: '白银',
    rank: '白银段位',
    tagline: '1年战术射击经历，白银段位，充值200元，研究腾讯射击新游运营策略。',
    achievements: [
      { name: '白银段位', description: '在战术射击品类中积累1年经验，达到白银段位。', date: '2025-2026', rarity: 'common' },
      { name: '200元付费', description: '充值200元购买赛季通行证与皮肤，体验新游的付费体系设计。', date: '2025-2026', rarity: 'common' },
    ],
    experience: [
      '《三角洲行动》是腾讯在战术射击赛道的重要新产品，作为数据运营从业者，我以"玩家+研究者"双重身份深度体验，关注其赛季运营节奏、付费点设计和玩家留存策略。',
    ],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '段位', value: '白银', unit: '' },
      { label: '付费', value: '200', unit: '元' },
      { label: '品类', value: '射击', unit: '' },
    ],
  },

  // ═══ 17. 绝区零 ═══
  {
    id: 'zzz',
    name: '绝区零',
    englishName: 'Zenless Zone Zero',
    platform: '手游+PC',
    category: '二次元',
    coverImage: '/images/games/zzz.png',
    playHours: '300+',
    level: '1年',
    rank: '竞品监控',
    tagline: '米哈游动作ACT，深度研究其潮玩IP化策略与美术风格，用于工作竞品监控。',
    achievements: [
      { name: '深度竞品研究', description: '1年持续游玩，研究其商业化系统、版本运营节奏和美术风格策略。', date: '2024-2025', rarity: 'epic' },
    ],
    experience: ['《绝区零》的潮玩IP化策略和独特美术风格是二次元赛道的重要创新案例，作为竞品监控样本之一，持续追踪其版本迭代和玩家反馈。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: 'ACT', unit: '' },
      { label: '厂商', value: '米哈游', unit: '' },
    ],
  },

  // ═══ 18. 鸣潮 ═══
  {
    id: 'mc',
    name: '鸣潮',
    englishName: 'Wuthering Waves',
    platform: '手游+PC',
    category: '二次元',
    coverImage: '/images/games/mc.png',
    playHours: '300+',
    level: '1年',
    rank: '竞品监控',
    tagline: '库洛游戏开放世界ARPG，深度研究其战斗系统创新与社区运营策略。',
    achievements: [
      { name: '战斗系统研究', description: '1年持续游玩，重点关注其高速战斗系统设计和社区运营策略。', date: '2024-2025', rarity: 'epic' },
    ],
    experience: ['《鸣潮》的战斗系统和开放世界设计代表了二次元赛道的重要探索方向，作为竞品样本深入跟踪其商业化节奏和用户运营手法。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: 'ARPG', unit: '' },
      { label: '厂商', value: '库洛', unit: '' },
    ],
  },

  // ═══ 19. 异环 ═══
  {
    id: 'yh',
    name: '异环',
    englishName: 'Abnormal Ring',
    platform: '手游',
    category: '二次元',
    coverImage: '/images/games/yh.png',
    playHours: '200+',
    level: '1年',
    rank: '竞品监控',
    tagline: '二次元新锐产品，约1年深度体验，拓展竞品监控视野。',
    achievements: [
      { name: '新锐产品跟踪', description: '1年持续游玩，追踪新兴二次元产品的玩法创新和市场表现。', date: '2025', rarity: 'rare' },
    ],
    experience: ['《异环》作为二次元赛道的新兴力量，为竞品分析提供了差异化视角。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: '二次元', unit: '' },
      { label: '状态', value: '跟踪中', unit: '' },
    ],
  },

  // ═══ 20. 原神 ═══
  {
    id: 'ys',
    name: '原神',
    englishName: 'Genshin Impact',
    platform: '手游+PC',
    category: '二次元',
    coverImage: '/images/games/ys.png',
    playHours: '400+',
    level: '1年',
    rank: '竞品监控',
    tagline: '米哈游开放世界ARPG标杆，深度研究其季度大版本运营节奏与全球商业化策略。',
    achievements: [
      { name: '标杆产品研究', description: '1年持续游玩，研究开放世界设计、季度版本节奏和全球化运营策略。', date: '2023-2024', rarity: 'epic' },
    ],
    experience: ['《原神》是二次元开放世界赛道的标杆产品，其45天版本周期、角色+武器的双卡池设计是全球游戏商业化的教科书级案例。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: 'ARPG', unit: '' },
      { label: '厂商', value: '米哈游', unit: '' },
    ],
  },

  // ═══ 21. 崩坏：星穹铁道 ═══
  {
    id: 'hksr',
    name: '崩坏：星穹铁道',
    englishName: 'Honkai: Star Rail',
    platform: '手游+PC',
    category: '二次元',
    coverImage: '/images/games/hksr.png',
    playHours: '350+',
    level: '1年',
    rank: '竞品监控',
    tagline: '米哈游回合制RPG，深度研究其精品化角色养成与回合制玩法创新。',
    achievements: [
      { name: '回合制研究', description: '1年持续游玩，研究回合制RPG的角色养成深度和版本内容运营策略。', date: '2023-2024', rarity: 'epic' },
    ],
    experience: ['《崩坏：星穹铁道》证明了回合制RPG在当下市场仍有巨大潜力，其精致的角色塑造和叙事方式是竞品研究的重要参考。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: '回合RPG', unit: '' },
      { label: '厂商', value: '米哈游', unit: '' },
    ],
  },

  // ═══ 22. 终末地 ═══
  {
    id: 'zmd',
    name: '终末地',
    englishName: 'Endfield',
    platform: '手游+PC',
    category: '二次元',
    coverImage: '/images/games/zmd.png',
    playHours: '200+',
    level: '1年',
    rank: '竞品监控',
    tagline: '二次元新锐产品，约1年深度体验，拓宽竞品分析样本。',
    achievements: [
      { name: '新兴产品研究', description: '1年持续游玩，追踪新兴二次元产品的玩法设计和市场表现。', date: '2025', rarity: 'rare' },
    ],
    experience: ['《终末地》为二次元赛道提供了又一个研究样本，丰富了竞品分析的广度和深度。'],
    stats: [
      { label: '年限', value: '1', unit: '年' },
      { label: '定位', value: '竞品', unit: '' },
      { label: '品类', value: '二次元', unit: '' },
      { label: '状态', value: '跟踪中', unit: '' },
    ],
  },
];

// ====== 类型颜色配置 ======
const CATEGORY_COLORS = {
  'MOBA':     { text: '#00D4FF', bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)' },
  'FPS':      { text: '#FF6B6B', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.2)' },
  '自走棋':   { text: '#FFB347', bg: 'rgba(255,179,71,0.08)', border: 'rgba(255,179,71,0.2)' },
  '竞速':     { text: '#7CFF6B', bg: 'rgba(124,255,107,0.08)', border: 'rgba(124,255,107,0.2)' },
  '二次元':   { text: '#E879F9', bg: 'rgba(232,121,249,0.08)', border: 'rgba(232,121,249,0.2)' },
  '派对':     { text: '#FBBF24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  '养成':     { text: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  '休闲':     { text: '#94A3B8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
};

// 按类型分组
const groupedGames = GAMES_DATA.reduce((acc, game) => {
  const cat = game.category || '其他';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(game);
  return acc;
}, {});
const CATEGORY_ORDER = ['MOBA', 'FPS', '自走棋', '竞速', '二次元', '派对', '养成', '休闲'];

// ====== 稀有度配置 ======
const RARITY_CONFIG = {
  legendary: {
    label: '传说',
    color: '#FF8000',
    bgGradient: 'linear-gradient(135deg, #FF6B00, #FFB800)',
    borderGlow: '0 0 15px rgba(255, 128, 0, 0.3)',
  },
  epic: {
    label: '史诗',
    color: '#A855F7',
    bgGradient: 'linear-gradient(135deg, #9333EA, #C084FC)',
    borderGlow: '0 0 12px rgba(168, 85, 247, 0.25)',
  },
  rare: {
    label: '稀有',
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, #2563EB, #60A5FA)',
    borderGlow: '0 0 10px rgba(59, 130, 246, 0.2)',
  },
  common: {
    label: '普通',
    color: '#8888A0',
    bgGradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)',
    borderGlow: 'none',
  },
};

// ====== 图标组件 ======
const GamepadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="4" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function GameAchievements() {
  const [visible, setVisible] = useState(false);
  const [expandedGame, setExpandedGame] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative min-h-screen py-32 bg-[var(--color-bg-primary)]/80"
    >
      {/* 背景装饰 */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="content-wrapper relative z-10">
        {/* ===== 标题区域 ===== */}
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="section-label mb-4">GAME ACHIEVEMENTS</p>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold text-white leading-tight mb-6">
            我的<span style={{ color: 'var(--color-accent)' }}> 游戏经历</span>
          </h2>
        </div>

        {/* ===== 总览统计条 ===== */}
        <div className="flex justify-center">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 w-full max-w-3xl transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {[
              { icon: <GamepadIcon />, value: '22', label: '款游戏' },
              { icon: <ClockIcon />, value: '70', label: '累计年限' },
              { icon: <TrophyIcon />, value: '45+', label: '个成就' },
              { icon: <StarIcon />, value: '一区大师', label: '最高段位' },
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 text-center hover:border-purple-500/30 transition-all duration-300">
                <div className="flex justify-center text-[var(--color-accent)] mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 游戏卡片列表（按类型分组） ===== */}
        <div className="flex justify-center">
          <div className="space-y-10 w-full max-w-6xl">
            {CATEGORY_ORDER.filter(cat => groupedGames[cat]).map((category) => {
              const games = groupedGames[category];
              return (
              <div key={category} className="flex gap-3 sm:gap-4">
                {/* 左侧：类型标签（固定宽度对齐，垂直居中） */}
                <div className="flex-shrink-0 w-14 sm:w-20 flex flex-col items-center justify-center gap-1">
                  <span
                    className="px-2.5 py-1.5 rounded text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap text-center leading-tight"
                    style={{
                      color: CATEGORY_COLORS[category]?.text || '#888',
                      background: CATEGORY_COLORS[category]?.bg || 'rgba(136,136,136,0.1)',
                      border: `1px solid ${CATEGORY_COLORS[category]?.border || 'rgba(136,136,136,0.2)'}`,
                    }}
                  >
                    {category}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-secondary)]/40">{games.length}款</span>
                </div>
                {/* 右侧：游戏卡片网格（一行5个） */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {games.map((game, idx) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      index={idx}
                      onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                      visible={visible}
                    />
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* ===== 展开详情弹窗 ===== */}
        {expandedGame && (
          <GameDetailModal
            game={GAMES_DATA.find(g => g.id === expandedGame)}
            onClose={() => setExpandedGame(null)}
          />
        )}

        {/* ===== 底部提示 ===== */}
        <div className={`text-center mt-20 text-[var(--color-text-secondary)]/40 text-sm transition-all duration-1000 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          更多游戏成就持续更新中...
        </div>
      </div>
    </section>
  );
}

// ====== 游戏卡片（左图标 + 右侧纵向信息） ======
function GameCard({ game, index, onClick, visible }) {
  const delay = Math.min(index * 80, 600);
  const topRarity = game.achievements.length > 0
    ? game.achievements.reduce((best, a) => {
        const order = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return (order[a.rarity] || 0) > (order[best.rarity] || 0) ? a : best;
      })
    : { rarity: 'common' };
  const rarityColor = RARITY_CONFIG[topRarity.rarity]?.color || RARITY_CONFIG.common.color;
  const rarityLabel = RARITY_CONFIG[topRarity.rarity]?.label || '';
  const yearsStat = game.stats?.find(s => s.label.includes('年限') || s.label.includes('IP') || s.label === '年限');

  return (
    <div
      className={`transition-all duration-500 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay + 300}ms` }}
      onClick={onClick}
    >
      <div
        className="group h-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 flex items-center gap-4 hover:border-[var(--color-accent)]/50 hover:-translate-y-1 transition-all duration-300"
      >
        {/* === 左侧图标区 === */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden"
          style={{ border: `2px dashed ${rarityColor}40` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={rarityColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
            <rect x="2" y="2" width="20" height="20" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
          </svg>
        </div>

        {/* === 右侧信息区（纵向） === */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* 1. 游戏名 */}
          <h3 className="text-base font-bold text-white truncate leading-tight">{game.name}</h3>

          {/* 2. 游玩时长 */}
          {yearsStat && (
            <p className="text-sm" style={{ color: rarityColor }}>⏱ {yearsStat.value}{yearsStat.unit}</p>
          )}

          {/* 3. 段位 */}
          <p className="text-sm text-[var(--color-text-secondary)] truncate">🏅 {game.rank}</p>

          {/* 4. 最高成就 */}
          <p className="text-sm truncate"
            style={{ color: rarityColor }}
          >
            ⭐ {topRarity.name}
            <span className="ml-1 px-1 py-0.5 rounded text-[9px] font-semibold"
              style={{ color: rarityColor, background: `${rarityColor}16` }}
            >{rarityLabel}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ====== 详情弹窗 ======
function GameDetailModal({ game, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 pb-16 px-4 overflow-y-auto" onClick={onClose}>
      {/* 遮罩 */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      {/* 弹窗 */}
      <div
        className="relative z-10 w-full max-w-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)]/50 transition-all duration-200 z-10 cursor-pointer">
          ✕
        </button>

        {/* 头部 */}
        <div className="p-8 pb-4 border-b border-[var(--color-border)]">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-medium mb-3 tracking-wider uppercase">
            {game.platform}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{game.name}</h2>
          <p className="text-[var(--color-text-secondary)] text-sm italic mb-2">{game.englishName}</p>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{game.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-sm text-purple-300 font-medium">
              <StarIcon /> {game.rank}
            </span>
            {game.playHours && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
                <ClockIcon /> {game.playHours} 小时
              </span>
            )}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* 数据概览 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--color-accent)] rounded-full"></span>
              数据概览
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {game.stats.map((stat, i) => (
                <div key={i} className="bg-[var(--color-bg-primary)] rounded-lg p-3 text-center border border-[var(--color-border)]/50">
                  <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{stat.value}<span className="text-xs ml-0.5 text-[var(--color-text-secondary)]">{stat.unit}</span></div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 成就清单 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-yellow-500 rounded-full"></span>
              成就清单
              <span className="ml-auto text-xs font-normal text-[var(--color-text-secondary)] normal-case tracking-normal">
                {game.achievements.length} 个成就
              </span>
            </h4>
            <div className="space-y-2">
              {game.achievements.map((ach, i) => {
                const config = RARITY_CONFIG[ach.rarity] || RARITY_CONFIG.common;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border)]/50 group/ach"
                    style={{ borderLeftColor: config.color, borderLeftWidth: '3px' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white text-xs">{ach.name}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider"
                          style={{ color: config.color, background: `${config.color}18`, border: `1px solid ${config.color}30` }}
                        >
                          {config.label}
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-[10px] mt-1 leading-relaxed">{ach.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-[10px] text-[var(--color-text-secondary)]/60 whitespace-nowrap pt-0.5 hidden sm:block">
                      {ach.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 经历故事 */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              我的经历
            </h4>
            <div className="space-y-3">
              {game.experience.map((paragraph, i) => (
                <p key={i} className="text-[var(--color-text-secondary)] text-sm leading-relaxed pl-3 border-l-2 border-emerald-500/20 py-0.5">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
