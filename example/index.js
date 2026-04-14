// npm install axios node-cron fs path
// node index.js

// karotter Bot code
// 利用・コピペは禁止しています。
// 参考程度にしてください。

const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

let accessToken = 'eyJ...';
let apiKey = 'kar_live_...';

let baseURL = 'https://api.karotter.com/api';
let apiURL = 'https://api.karotter.com/api/developer';

const GEMINI_API_KEY = 'AI...'; 

const ADMIN_ID = 480;

const api = axios.create({
  baseURL: `${apiURL}`,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Cookie': `karotter_csrf=...;`,
    'Content-Type': 'application/json',
    'User-Agent': 'KarotterBot/1.0',
    'Referer': 'https://karotter.com',
    'X-Csrf-Token': '...',
    'X-Device-Id': '...',
    'X-Client-Type': 'web'
  }
});

const numbers = '0123456789０１２３４５６７８９';
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんゃゅょっぁぃぅぇぉー';
const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンャュョッァィゥェォｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｬｭｮｯｧｨｩｪｫ';
const kanji = '一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和愛案以衣位囲胃印英栄塩億加果貨課芽改械害街各覚完官管関観願希季紀喜旗器機議求泣救給挙漁共協鏡競極訓軍郡径型景芸欠結建健験固功好候航康告差菜最材昨札刷殺察参産散残士氏史司試児治辞失借種周祝順初松笑唱焼象照賞臣信成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲貯兆腸低底停的典伝徒努灯堂働特得毒熱念敗梅博飯飛費必票標不夫付府副粉兵別辺変便包法望牧末満未脈民無約勇要養浴利陸良料量輪類令冷例歴連老労録圧移因永営衛易益液演応往桜恩可仮価河過賀快解格確額刊幹慣眼基寄規技義逆久旧居許境均禁句群経潔件券険検限現減故個護効厚耕鉱構興講混査再災妻採際在財罪雑酸賛支志枝師資飼示似識質舎謝授修述術準序招承証条状常情織職制性政勢精製税責績接設舌絶銭祖素総造像増則測属率損退貸態団断築張提程適敵統銅導徳独任燃能破犯判版比肥非備俵評貧布婦富武復複仏編弁保墓報豊防貿暴務夢迷綿輸余預容略留領異遺域宇映延沿我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除将傷障城蒸針仁垂推寸盛聖誠宣専泉洗染善奏窓創装層操蔵臓存尊宅担探誕段暖値宙忠著庁頂潮賃痛展討党糖届難乳認納脳派拝背肺俳班晩否批秘腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優幼欲翌乱卵覧裏律臨朗論';

const allCharacters = hiragana + katakana + kanji + numbers + alphabet;

function generateRandomString() {
  let str = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    str += allCharacters[randomIndex];
  }
  return str;
}

process.on('uncaughtException', (error) => { console.error(error); });
process.on('unhandledRejection', (error) => { console.error(error); });

async function refreshToken() {
  try {
    const res = await api.post('/auth/login', {
      identifier: "bot",
      password: "...",
      gender: "OTHER"
    });
    accessToken = res.data.accessToken;
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    if (res.data.deviceId) api.defaults.headers['X-Device-Id'] = res.data.deviceId;
    console.log('トークンを再取得しました');
    return true;
  } catch (e) {
    console.log('ログインに失敗しました', e.response?.data || e.message);
    return false;
  }
}

async function replyToPost(content, parentId) {
  try {
    await api.post('/posts', {
      content,
      parentId,
      isAiGenerated: true,
      isPromotional: false,
      visibility: "PUBLIC",
      replyRestriction: "EVERYONE",
      mediaAlts: [], mediaSpoilerFlags: [], mediaR18Flags: []
    });
  } catch (e) { console.log(`Reply: ${e}`); }
}

async function markAllAsRead() {
  try { await api.patch('/notifications/read-all'); } catch (e) { console.log(`All Read: ${e}`); }
}

async function getUser(idOrName) {
  try {
    const r = await api.get(`/users/${idOrName}`);
    return r.data.user || r.data;
  } catch (e) { return null; }
}

async function getReplyPost(id) {
  try {
    const r = await api.get(`/posts/${id}`);
    return r.data.post?.parentId || r.data.post?.id;
  } catch (e) { return null; }
}

async function getPostContent(id) {
  try {
    const r = await api.get(`/posts/${id}`);
    return r.data.post?.content || 'なし';
  } catch (e) { return null; }
}

async function actionPost(postId, action, emoji = null, method = 'POST') {
  const url = `/posts/${postId}/${action}`;
  try {
    if (method === 'DELETE') {
      await api.delete(emoji ? `${url}/${encodeURIComponent(emoji)}` : url);
    } else if (emoji) {
      await api.post(url, { emoji });
    } else {
      await api.post(url);
    }
    return true;
  } catch (e) {
    console.log(`⚠️ ${action}失敗`, e.response?.status);
    return false;
  }
}

async function postRandomString() {
  try {
    const randomContent = generateRandomString();
    const content = `${randomContent} #bot`;
    await api.post('/posts', {
      content,
      isAiGenerated: true,
      isPromotional: false,
      visibility: "PUBLIC",
      replyRestriction: "EVERYONE",
      mediaAlts: [], mediaSpoilerFlags: [], mediaR18Flags: []
    });
  } catch (e) {
    console.log(`Random post: ${e}`);
    if (e.response?.status === 401) await refreshToken();
  }
}

async function handleReport(reason, postId, amount, triggerPostId) {
  let replyText = '';
  try {
    for (let i = 0; i < amount; i++) {
      await api.post('/reports', {
        type: "POST",
        reason: reason, 
        postId: postId
      });
      if (i < amount - 1) await new Promise(r => setTimeout(r, 800));
    }
    replyText = `✅ 通報しました！\n理由: ${reason}\n対象投稿ID: ${postId}\n回数: ${amount}回`;
  } catch (e) {
    console.error(`Report error:`, e.response?.data || e.message);
    if (e.response?.status === 401) {
      await refreshToken();
      replyText = '❌ 認証エラー もう一度試してください。';
    } else if (e.response?.status === 429) {
      replyText = '❌ レート制限に引っかかりました。少し待ってから再試行してください。';
    } else {
      replyText = `❌ 通報に失敗しました。\n${e.response?.data?.message || e.message || '不明なエラー'}`;
    }
  }
  if (replyText) {
    await replyToPost(replyText, triggerPostId);
    await markAllAsRead();
  }
}

const MONEY_DIR = './money';
if (!fs.existsSync(MONEY_DIR)) fs.mkdirSync(MONEY_DIR);

const STOCKS_FILE = './stocks.json';
const SHOP_FILE = './shop.json';

function getMoney(userId) {
  const file = path.join(MONEY_DIR, `${userId}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data.holdings) data.holdings = {};
    return data;
  }
  const data = { balance: 100, lastWork: 0, holdings: {} };
  fs.writeFileSync(file, JSON.stringify(data));
  return data;
}

function saveMoney(userId, data) {
  const file = path.join(MONEY_DIR, `${userId}.json`);
  if (!data.holdings) data.holdings = {};
  fs.writeFileSync(file, JSON.stringify(data));
}

function loadStocks() {
  if (fs.existsSync(STOCKS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STOCKS_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveStocks(stocks) {
  fs.writeFileSync(STOCKS_FILE, JSON.stringify(stocks));
}

function loadShop() {
  if (fs.existsSync(SHOP_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SHOP_FILE, 'utf8'));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveShop(shopItems) {
  fs.writeFileSync(SHOP_FILE, JSON.stringify(shopItems));
}

async function handleEconomy(commandParts, senderId, triggerPostId) {
  const cmd = commandParts[0];
  let arg1 = commandParts[1] || '';
  let arg2 = commandParts[2] || '';

  if (arg1.startsWith('@')) arg1 = arg1.slice(1);
  if (arg2.startsWith('@')) arg2 = arg2.slice(1);

  let money = getMoney(senderId);
  let replyText = '';

  async function resolveUser(targetStr) {
    if (!targetStr) return null;
    if (targetStr.startsWith('@')) {
      return await getUser(targetStr.slice(1));
    } else if (/^\d+$/.test(targetStr)) {
      return await getUser(targetStr);
    } else {
      return await getUser(targetStr);
    }
  }

  if (cmd === 'work') {
    const now = Date.now();
    if (now - money.lastWork < 3600000) {
      replyText = `⏳ 1時間に1回だけです！ あと${Math.ceil((3600000 - (now - money.lastWork)) / 60000)}分 #bot`;
    } else {
      const earn = Math.floor(Math.random() * 50) + 30;
      money.balance += earn;
      money.lastWork = now;
      saveMoney(senderId, money);
      replyText = `💰 お仕事完了！ +${earn}円（残高: ${money.balance}円） #bot`;
    }
  }
  else if (cmd === 'stole' && arg1 && arg2) {
    const amount = parseInt(arg2);
    if (!amount || amount <= 0) {
      replyText = '⚠️ 金額が不正です #bot';
    } else {
      const targetUser = await resolveUser(arg1);
      if (!targetUser) {
        replyText = '❌ ユーザーが見つかりません #bot';
      } else {
        const targetMoney = getMoney(targetUser.id);
        if (targetMoney.balance < amount) {
          replyText = `❌ @${targetUser.username} は${amount}円持ってません #bot`;
        } else {
          const success = Math.random() < 0.6;
          if (success) {
            targetMoney.balance -= amount;
            money.balance += amount;
            saveMoney(targetUser.id, targetMoney);
            saveMoney(senderId, money);
            replyText = `🪝 盗み成功！ +${amount}円（残高: ${money.balance}円） #bot`;
          } else {
            money.balance = Math.max(0, money.balance - amount);
            saveMoney(senderId, money);
            replyText = `💥 盗み失敗… -${amount}円（残高: ${money.balance}円） #bot`;
          }
        }
      }
    }
  }
  else if (cmd === 'cf' && arg1) {
    const bet = parseInt(arg1);
    if (!bet || bet <= 0 || bet > money.balance) {
      replyText = '⚠️ 金額が不正または足りません #bot';
    } else {
      const win = Math.random() < 0.5;
      if (win) {
        money.balance += bet;
        replyText = `🎉 コインフリップ勝利！ +${bet}円（残高: ${money.balance}円） #bot`;
      } else {
        money.balance -= bet;
        replyText = `😢 負け… -${bet}円（残高: ${money.balance}円） #bot`;
      }
      saveMoney(senderId, money);
    }
  }
  else if (cmd === 'bj' && arg1) {
    const bet = parseInt(arg1);
    if (!bet || bet <= 0 || bet > money.balance) {
      replyText = '⚠️ 金額が不正または足りません #bot';
    } else {
      const getCard = () => Math.floor(Math.random() * 13) + 1;
      let player = getCard() + getCard();
      let dealer = getCard() + getCard();

      while (player < 17) player += getCard();
      if (player > 21) player = 0;

      if (dealer < 17) dealer += getCard();
      if (dealer > 21) dealer = 0;

      let result = '';
      if (player > dealer) {
        money.balance += bet;
        result = `🎲 勝利！（あなた${player} vs ディーラー${dealer}） +${bet}円`;
      } else if (player < dealer) {
        money.balance -= bet;
        result = `😢 負け…（あなた${player} vs ディーラー${dealer}） -${bet}円`;
      } else {
        result = `🤝 引き分け（${player}） 返金`;
      }
      saveMoney(senderId, money);
      replyText = result + `（残高: ${money.balance}円） #bot`;
    }
  }
  else if (cmd === 'transfer' && arg1 && arg2) {
    const amount = parseInt(arg2);
    if (!amount || amount <= 0) {
      replyText = '❌ 金額が不正です #bot';
    } else if (amount > money.balance) {
      replyText = '❌ 残高が不足しています #bot';
    } else {
      const targetUser = await resolveUser(arg1);
      if (!targetUser) {
        replyText = '❌ ユーザーが見つかりません #bot';
      } else if (targetUser.id === senderId) {
        replyText = '❌ 自分自身には譲渡できません #bot';
      } else {
        const targetMoney = getMoney(targetUser.id);
        money.balance -= amount;
        targetMoney.balance += amount;
        saveMoney(senderId, money);
        saveMoney(targetUser.id, targetMoney);
        replyText = `✅ @${targetUser.username} に ${amount}円 譲渡しました（残高: ${money.balance}円） #bot`;
      }
    }
  }
  else if (cmd === 'bal') {
    const targetStr = arg1 || senderId.toString();
    const targetUser = await resolveUser(targetStr);
    if (targetUser) {
      const targetMoney = getMoney(targetUser.id);
      replyText = `💰 @${targetUser.username} の残高: ${targetMoney.balance}円 #bot`;
    } else {
      replyText = '❌ ユーザーが見つかりません #bot';
    }
  }

  else if (cmd === 'kk') {
    const sub = commandParts[1] ? commandParts[1].toLowerCase() : '';
    let stocks = loadStocks();

    if (sub === 'add' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const price = parseInt(commandParts[3]);
      if (name.length > 15 || !price || price <= 0) {
        replyText = '⚠️ 会社名は15文字以内、金額は正の整数で指定してください #bot';
      } else if (stocks.some(s => s.name === name)) {
        replyText = '❌ その会社名はすでに存在します #bot';
      } else {
        stocks.push({ name, ownerId: senderId, price });
        saveStocks(stocks);
        replyText = `✅ 会社「${name}」を株価${price}円で追加しました #bot`;
      }
    }
    else if (sub === 'edit' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const newPrice = parseInt(commandParts[3]);
      const stockIndex = stocks.findIndex(s => s.name === name && s.ownerId === senderId);
      if (stockIndex === -1) {
        replyText = '❌ あなたが所有するその会社名は見つかりません #bot';
      } else if (!newPrice || newPrice <= 0) {
        replyText = '⚠️ 金額は正の整数で指定してください #bot';
      } else {
        stocks[stockIndex].price = newPrice;
        saveStocks(stocks);
        replyText = `✅ 会社「${name}」の株価を${newPrice}円に変更しました #bot`;
      }
    }
    else if (sub === 'remove' && commandParts[2]) {
      let name = commandParts[2];
      const stockIndex = stocks.findIndex(s => s.name === name && s.ownerId === senderId);
      if (stockIndex === -1) {
        replyText = '❌ あなたが所有するその会社名は見つかりません #bot';
      } else {
        stocks.splice(stockIndex, 1);
        saveStocks(stocks);
        replyText = `✅ 会社「${name}」を削除しました #bot`;
      }
    }
    else if (sub === 'buy' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const num = parseInt(commandParts[3]);
      const stock = stocks.find(s => s.name === name);
        if (!stock || !num || num <= 0) {
          replyText = '❌ 会社名または数が不正です #bot';
        } else if (stock.ownerId === senderId) {
          replyText = '❌ 自分の発行した株式は購入できません #bot';
        } else {
          let buyerMoney = getMoney(senderId);
          const cost = stock.price * num;

          if (buyerMoney.balance < cost) {
            replyText = `❌ 残高が足りません（${cost}円必要） #bot`;
          } else {
            buyerMoney.balance -= cost;

            let ownerMoney = getMoney(stock.ownerId);
            ownerMoney.balance += cost;

            if (!buyerMoney.holdings) buyerMoney.holdings = {};
            buyerMoney.holdings[name] = (buyerMoney.holdings[name] || 0) + num;

            saveMoney(senderId, buyerMoney);
            saveMoney(stock.ownerId, ownerMoney); 

          replyText = `✅ 「${name}」株を${num}株購入しました！\n-${cost}円（残高: ${buyerMoney.balance}円） #bot`;
        }
      }
    }
    else if (sub === 'sell' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const num = parseInt(commandParts[3]);
      let sellerMoney = getMoney(senderId);
      const holdings = sellerMoney.holdings?.[name] || 0;
        if (!num || num <= 0 || holdings < num) {
          replyText = '❌ 所持株数が不足しているか、数が不正です #bot';
        } else {
          const stock = stocks.find(s => s.name === name);
          if (!stock) {
            replyText = '❌ その会社は存在しません #bot';
          } else {
            const proceeds = stock.price * num;

            sellerMoney.balance += proceeds; 
            sellerMoney.holdings[name] -= num;
            if (sellerMoney.holdings[name] <= 0) {
              delete sellerMoney.holdings[name];
            }

            let ownerMoney = getMoney(stock.ownerId);
            if (ownerMoney.balance < proceeds) {
              replyText = `❌ 発行者の残高が不足しています（現在${ownerMoney.balance}円） #bot`;
            } else {
              ownerMoney.balance -= proceeds;

              saveMoney(senderId, sellerMoney);
              saveMoney(stock.ownerId, ownerMoney);

            replyText = `✅ 「${name}」株を${num}株売却しました！\n+${proceeds}円（残高: ${sellerMoney.balance}円） #bot`;
          }
        }
      }
    }
    else if (sub === 'list') {
      if (stocks.length === 0) {
        replyText = '📋 現在登録されている株はありません #bot';
      } else {
        let listText = '📋 株一覧:\n';
        stocks.slice(0, 10).forEach(s => {
          listText += `・${s.name} : ${s.price}円 (所有者ID:${s.ownerId})\n`;
        });
        replyText = listText + '#bot';
      }
    }
    else if (sub === 'search' && commandParts[2]) {
      let searchTerm = commandParts[2];
      const filtered = stocks.filter(s => s.name.includes(searchTerm));
      if (filtered.length === 0) {
        replyText = `❌ 「${searchTerm}」に一致する株はありません #bot`;
      } else {
        let listText = `📋 「${searchTerm}」の検索結果:\n`;
        filtered.slice(0, 10).forEach(s => {
          listText += `・${s.name} : ${s.price}円 (所有者ID:${s.ownerId})\n`;
        });
        replyText = listText + '#bot';
      }
    }
    else {
      replyText = `❓ kkコマンドの使い方が正しくありません。\n例: @bot kk add 会社名 金額\n#bot`;
    }
  }

  else if (cmd === 'shop') {
    const sub = commandParts[1] ? commandParts[1].toLowerCase() : '';
    let shopItems = loadShop();

    if (sub === 'add' && commandParts[2] && commandParts[3] && commandParts[4]) {
      let name = commandParts[2];
      const price = parseInt(commandParts[3]);
      const qty = parseInt(commandParts[4]);
      if (name.length > 15 || !price || price <= 0 || !qty || qty <= 0) {
        replyText = '⚠️ 商品名は15文字以内、金額・個数は正の整数で指定してください #bot';
      } else if (shopItems.some(item => item.sellerId === senderId && item.name === name)) {
        replyText = '❌ 同じ商品名はすでに販売中です #bot';
      } else {
        shopItems.push({ name, sellerId: senderId, price, quantity: qty });
        saveShop(shopItems);
        replyText = `✅ 商品「${name}」を${price}円 ×${qty}個で出品しました #bot`;
      }
    }
    else if (sub === 'edit' && commandParts[2] && commandParts[3] && commandParts[4]) {
      let name = commandParts[2];
      const newPrice = parseInt(commandParts[3]);
      const newQty = parseInt(commandParts[4]);
      const itemIndex = shopItems.findIndex(item => item.sellerId === senderId && item.name === name);
      if (itemIndex === -1) {
        replyText = '❌ あなたが出品したその商品は見つかりません #bot';
      } else if (!newPrice || newPrice <= 0 || !newQty || newQty <= 0) {
        replyText = '⚠️ 金額・個数は正の整数で指定してください #bot';
      } else {
        shopItems[itemIndex].price = newPrice;
        shopItems[itemIndex].quantity = newQty;
        saveShop(shopItems);
        replyText = `✅ 商品「${name}」を${newPrice}円 ×${newQty}個に編集しました #bot`;
      }
    }
    else if (sub === 'remove' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const reduceQty = parseInt(commandParts[3]);
      const itemIndex = shopItems.findIndex(item => item.sellerId === senderId && item.name === name);
      if (itemIndex === -1) {
        replyText = '❌ あなたが出品したその商品は見つかりません #bot';
      } else if (!reduceQty || reduceQty <= 0) {
        replyText = '⚠️ 個数は正の整数で指定してください #bot';
      } else {
        shopItems[itemIndex].quantity -= reduceQty;
        if (shopItems[itemIndex].quantity <= 0) {
          shopItems.splice(itemIndex, 1);
        }
        saveShop(shopItems);
        replyText = `✅ 商品「${name}」から${reduceQty}個削除しました #bot`;
      }
    }
    else if (sub === 'buy' && commandParts[2] && commandParts[3]) {
      let name = commandParts[2];
      const num = parseInt(commandParts[3]);
      let shopItems = loadShop();
      const itemIndex = shopItems.findIndex(item => item.name === name);

      if (itemIndex === -1 || !num || num <= 0) {
        replyText = '❌ 商品名または個数が不正です #bot';
      } else {
        const item = shopItems[itemIndex];
        if (item.quantity < num) {
          replyText = `❌ 在庫が不足しています（残り${item.quantity}個） #bot`;
        } else {
          let buyerMoney = getMoney(senderId);
          const cost = item.price * num;
          if (buyerMoney.balance < cost) {
            replyText = `❌ 残高が足りません（${cost}円必要） #bot`;
          } else {
            buyerMoney.balance -= cost;

            let sellerMoney = getMoney(item.sellerId);
            sellerMoney.balance += cost;

            shopItems[itemIndex].quantity -= num;
            if (shopItems[itemIndex].quantity <= 0) {
              shopItems.splice(itemIndex, 1);
            }
            saveShop(shopItems);

            saveMoney(senderId, buyerMoney);
            if (item.sellerId !== senderId) saveMoney(item.sellerId, sellerMoney);

            replyText = `✅ 「${name}」を${num}個購入しました！\n-${cost}円（残高: ${buyerMoney.balance}円） #bot`;
          }
        }
      }
    }
    else if (sub === 'list') {
      if (shopItems.length === 0) {
        replyText = '🛒 現在出品中の商品はありません #bot';
      } else {
        let listText = '🛒 商品一覧:\n';
        shopItems.slice(0, 10).forEach(item => {
          listText += `・${item.name} : ${item.price}円 ×${item.quantity}個 (出品者ID:${item.sellerId})\n`;
        });
        replyText = listText + '#bot';
      }
    }
    else if (sub === 'search' && commandParts[2]) {
      let searchTerm = commandParts[2];
      const filtered = shopItems.filter(item => item.name.includes(searchTerm));
      if (filtered.length === 0) {
        replyText = `❌ 「${searchTerm}」に一致する商品はありません #bot`;
      } else {
        let listText = `🛒 「${searchTerm}」の検索結果:\n`;
        filtered.slice(0, 10).forEach(item => {
          listText += `・${item.name} : ${item.price}円 ×${item.quantity}個 (出品者ID:${item.sellerId})\n`;
        });
        replyText = listText + '#bot';
      }
    }
    else {
      replyText = `❓ shopコマンドの使い方が正しくありません。\n#bot`;
    }
  }

  else if (cmd === 'money') {
    const sub = commandParts[1] ? commandParts[1].toLowerCase() : '';

    if (senderId !== ADMIN_ID) {
      replyText = '❌ このコマンドは管理者専用です #bot';
    }
    else if ((sub === 'add' || sub === 'remove') && commandParts[2] && commandParts[3]) {
      let targetStr = commandParts[2];
      const amount = parseInt(commandParts[3]);
      if (!amount || amount <= 0) {
        replyText = '⚠️ 金額は正の整数で指定してください #bot';
      } else {
        const targetUser = await resolveUser(targetStr);
        if (!targetUser) {
          replyText = '❌ ユーザーが見つかりません #bot';
        } else {
          let targetMoney = getMoney(targetUser.id);
          if (sub === 'add') {
            targetMoney.balance += amount;
            replyText = `✅ @${targetUser.username} に ${amount}円を追加しました（残高: ${targetMoney.balance}円） #bot`;
          } else if (sub === 'remove') {
            targetMoney.balance = Math.max(0, targetMoney.balance - amount);
            replyText = `✅ @${targetUser.username} から ${amount}円を削除しました（残高: ${targetMoney.balance}円） #bot`;
          }
          saveMoney(targetUser.id, targetMoney);
        }
      }
    }
    else {
      replyText = `❓ moneyコマンドの使い方が正しくありません。\n例: @bot money add @user 1000\n#bot`;
    }
  }

  if (replyText) {
    await replyToPost(replyText, triggerPostId);
    await markAllAsRead();
  }
}

async function handleMultiplePost(content, amount, triggerPostId) {
  let successCount = 0;
  let replyText = '';
  if (amount > 10) {
    amount = 10;
    replyText = '⚠️ 回数は最大10回までに制限しました #bot';
  }
  try {
    for (let i = 0; i < amount; i++) {
      await api.post('/posts', {
        content: content,
        isAiGenerated: true,
        isPromotional: false,
        visibility: "PUBLIC",
        replyRestriction: "EVERYONE",
        mediaAlts: [],
        mediaSpoilerFlags: [],
        mediaR18Flags: []
      });
      successCount++;
      if (i < amount - 1) {
        await new Promise(resolve => setTimeout(resolve, 5000)); 
      }
    }
    replyText += `✅ ${amount}件の投稿を完了しました！\n内容: ${content}\n成功: ${successCount}/${amount} #bot`;
  } catch (e) {
    console.error('Multiple post error:', e.response?.data || e.message);
    if (e.response?.status === 429) {
      replyText += `⚠️ レート制限に引っかかりました。\n${successCount}件投稿済み\n少し時間を空けてから試してください。 #bot`;
    } else if (e.response?.status === 401) {
      await refreshToken();
      replyText += '❌ 認証エラー（トークン再取得済） #bot';
    } else {
      replyText += `❌ エラーが発生しました。\n${successCount}件投稿済み #bot`;
    }
  }
  if (replyText) {
    await replyToPost(replyText, triggerPostId);
    await markAllAsRead();
  }
}

async function checkNotificationsAndReply() {
  try {
    if (!accessToken) await refreshToken();

    const res = await api.get('/notifications?page=1&limit=15');
    const notifications = res.data.notifications || [];

    for (const n of notifications) {
      if (n.isRead || n.type !== 'FOLLOW') continue;
      const actors = n.actors || (n.actor ? [n.actor] : []);
      for (const actor of actors) {
        if (!actor?.id) continue;
        try {
          await api.post(`/users/${actor.id}/follow`);
        } catch (e) { console.log(`Follow; ${e}`); }
      }
      await markAllAsRead();
    }

    for (const n of notifications) {
      if (n.isRead || n.type !== 'MENTION') continue;

      const postContent = (n.post?.content || n.posts?.[0]?.content || '');
      if (!postContent.includes('@bot')) continue;

      const afterBot = postContent.split('@bot ')[1]?.trim() || '';
      const commandParts = afterBot.split(/\s+/).filter(Boolean);
      let command = commandParts[0] ? commandParts[0].toLowerCase() : '';

      if (!command) continue;
      
      let arg1 = commandParts[1] || '';
      let arg2 = commandParts[2] || '';

      const triggerPostId = n.post?.id || (n.posts && n.posts[0]?.id);
      if (!triggerPostId) continue;

      const sender = n.actor || {};
      const senderId = sender.id || n.actorId;
      const senderUsername = sender.username || '';

      let replyText = '';

      async function resolveUser(targetStr) {
        if (!targetStr) return null;
        if (targetStr.startsWith('@')) {
          return await getUser(targetStr.slice(1));
        } else if (/^\d+$/.test(targetStr)) {
          return await getUser(targetStr);
        } else {
          return await getUser(targetStr);
        }
      }

      if (command === 'follow' || command === 'unfollow') {
        const targetStr = arg1 || (command === 'follow' ? senderUsername : null);
        if (!targetStr) {
          replyText = `❌ ${command} するには対象を指定してください #bot`;
        } else {
          const user = await resolveUser(targetStr);
          if (user) {
            try {
              if (command === 'follow') {
                await api.post(`/users/${user.id}/follow`);
                replyText = `✅ @${user.username} をフォローしました #bot`;
              } else if (command === 'unfollow') {
                await api.delete(`/users/${user.id}/follow`);
                replyText = `🗑 @${user.username} をアンフォローしました #bot`;
              } else { replyText = '❌ エラー #bot' }
            } catch (e) {
              replyText = `❌ ${command} に失敗しました #bot`;
            }
          } else {
            replyText = `❌ "${targetStr}" というユーザーは見つかりません #bot`;
          }
        }
      }
      else if (command === 'getuserinfo') {
        const targetStr = arg1 || senderUsername || senderId.toString();
        const user = await resolveUser(targetStr);
        if (user) {
          let badgeText = 'なし';
          const allBadges = [...(user.userBadges || []), ...(user.badges || [])];
          if (allBadges.length > 0) {
            badgeText = allBadges.map(b => b.name || b.type || '不明').join(', ');
          }

          let officialMarkText = 'なし';
          if (user.officialMark) {
            if (Array.isArray(user.officialMark)) {
              if (user.officialMark.length === 0) {
                officialMarkText = 'なし';
              } else {
                officialMarkText = user.officialMark
                  .map(mark => {
                    if (typeof mark === 'string') return mark;
                    if (typeof mark === 'object' && mark !== null) {
                      return mark.name || mark.type || mark.label || JSON.stringify(mark);
                    }
                    return String(mark);
                  })
                  .filter(Boolean)
                  .join(', ') || 'なし';
              }
            } else {
              officialMarkText = String(user.officialMark);
            }
          }

          const attributes = [];
          if (user.isBotAccount) attributes.push('🤖ボット');
          if (user.isParodyAccount) attributes.push('🙃パロディ');
          if (user.adminForceBot) attributes.push('⚠️強制ボット');
          if (user.adminForceParody) attributes.push('⚠️強制パロディ');
          if (user.hideProfileFromMinors) attributes.push('🔞成人向け');
          if (user.isPrivate) attributes.push('🔐非公開');
          if (user.isPremium) attributes.push('💴プレミアム');
          const attributeText = attributes.length > 0 ? attributes.join(', ') : 'なし';

          replyText = `📋 @${user.username} (${user.id}) の情報\n` +
                      `表示名：${user.displayName || '未設定'}\n` +
                      `ステータス：${user.onlineStatus || '不明'}\n` +
                      `属性：${attributeText}\n` +
                      `バッジ：${badgeText}\n` +
                      `公式マーク：${officialMarkText}\n` +
                      `フォロワー：${user.followersCount || 0}｜フォロー中：${user.followingCount || 0}\n` +
                      `投稿数：${user.postsCount || 0}\n` +
                      `#bot`;
        } else {
          replyText = `❌ "${targetStr}" というユーザーは見つかりません #bot`;
        }
      }
      else if (command === 'avatar') {
        const targetStr = arg1 || senderUsername || senderId.toString();
        const user = await resolveUser(targetStr);
        if (user) {
          if (user.avatarUrl) {
            replyText = `🖼 @${user.username} のアバター\n#bot\nhttps://karotter.com${user.avatarUrl}`;
          } else {
            replyText = `❌ @${user.username} はアバターを設定していません #bot`;
          }
        } else {
          replyText = `❌ "${targetStr}" というユーザーは見つかりません #bot`;
        }
      }
      else if (command === 'like' && arg1) {
        const targetPostId = /^\d+$/.test(arg1) ? parseInt(arg1) : triggerPostId;
        const ok = await actionPost(targetPostId, 'like');
        replyText = ok ? `✅ いいねしました (ID:${targetPostId}) #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'rekarot' && arg1) {
        const targetPostId = /^\d+$/.test(arg1) ? parseInt(arg1) : triggerPostId;
        const ok = await actionPost(targetPostId, 'rekarot');
        replyText = ok ? `✅ リカロートしました (ID:${targetPostId}) #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'bookmark' && arg1) {
        const targetPostId = /^\d+$/.test(arg1) ? parseInt(arg1) : triggerPostId;
        const ok = await actionPost(targetPostId, 'bookmark');
        replyText = ok ? `✅ ブックマークしました #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'r' && arg1) {
        const emoji = arg1;
        const ok = await actionPost(await getReplyPost(triggerPostId), 'react', emoji);
        replyText = ok ? `✅ リアクションを行いました #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'react' && arg1) {
        const emoji = arg2 || arg1;
        const targetPostId = /^\d+$/.test(arg1) && !arg2 ? parseInt(arg1) : triggerPostId;
        const ok = await actionPost(targetPostId, 'react', emoji);
        replyText = ok ? `✅ リアクションを行いました #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'delete-like' && arg1) {
        const ok = await actionPost(arg1, 'like', null, 'DELETE');
        replyText = ok ? `🗑 いいね解除 #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'delete-rekarot' && arg1) {
        const ok = await actionPost(arg1, 'rekarot', null, 'DELETE');
        replyText = ok ? `🗑 リカロート解除 #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'delete-bookmark' && arg1) {
        const ok = await actionPost(arg1, 'bookmark', null, 'DELETE');
        replyText = ok ? `🗑 ブックマーク解除 #bot` : `⚠️ 失敗 #bot`;
      }
      else if (command === 'delete-react' && arg1 && arg2) {
        const ok = await actionPost(arg2, 'react', arg1, 'DELETE');
        replyText = ok ? `🗑 ${arg1} リアクション解除 #bot` : `⚠️ 失敗 #bot`;
      }
      else if (/^\d+d\d+$/.test(command)) {
        const [dice, sides] = command.split('d').map(Number);
        const results = Array.from({length: dice}, () => Math.floor(Math.random() * sides) + 1);
        const sum = results.reduce((a,b)=>a+b,0);
        replyText = `🎲 ${command} → ${results.join('+')} = ${sum}\n#bot`;
      }
      else if (command === 'help') {
        replyText = `🛠 ヘルプサイト\n#bot\nhttps://www.shichitora.pro/karotterbot/help`;
      }
      else if (['work', 'stole', 'bj', 'cf', 'transfer', 'bal', 'kk', 'shop', 'money'].includes(command)) {
        await handleEconomy(commandParts, senderId, triggerPostId);
        continue;
      }
      else if (command === 'wiki' && commandParts[1]) {
        const searchWord = commandParts.slice(1).join(' ').trim();
        if (!searchWord) {
          replyText = '❌ 検索ワードを指定してください #bot';
        } else {
          const encodedWord = encodeURIComponent(searchWord);
          const wikiUrl = `https://karotter-wiki.vercel.app/index/index.html?q=${encodedWord}`;
          replyText = `📖 非公式カロッターWiki検索\n` +
                      `検索語: 「${searchWord}」\n\n` +
                      `🔗 検索結果ページ #bot\n${wikiUrl}`;
        }
      }
      else if (command === 'omikuji') {
        const fortunes = [
          { rank: '大吉', comment: '今日は最高の運勢！何か良いことが起きそう♪' },
          { rank: '中吉', comment: 'なかなか良い感じ。積極的に動いてみよう！' },
          { rank: '小吉', comment: 'まあまあ。細かいところでラッキーありそう。' },
          { rank: '吉',   comment: '普通より少し良い一日になりそう。' },
          { rank: '末吉', comment: '後半に運が向いてくるかも。' },
          { rank: '凶',   comment: '今日は少し慎重に…無理は禁物！' },
          { rank: '大凶', comment: '今日は家でゆっくり過ごすのが吉…？' }
        ];
        const result = fortunes[Math.floor(Math.random() * fortunes.length)];
        replyText = `🎴 おみくじ結果\n` +
                    `【${result.rank}】\n` +
                    `${result.comment}\n` +
                    `#bot`;
      }
      else if (command === 'compatibility') {
        let user1Str = commandParts[1] || '';
        let user2Str = commandParts[2] || '';

        if (!user1Str || !user2Str) {
          replyText = '❌ 2人のユーザーを指定してください\n例: @bot compatibility @user1 @user2 #bot';
        } else {
          const user1 = await resolveUser(user1Str);
          const user2 = await resolveUser(user2Str);

          if (!user1 || !user2) {
            replyText = '❌ ユーザーが見つかりませんでした #bot';
          } else if (user1.id === user2.id) {
            replyText = '❌ 同じユーザーは診断できません（自己相性100%だけど） #bot';
          } else {
            const compatibility = Math.floor(Math.random() * 41) + 60; // 60〜100%
            const comments = [
              '最高の相性！一緒にいると楽しいことばかり。',
              'なかなか良い感じ。少しずつ距離を縮めていこう。',
              '普通の相性。たまに意見が合わないかも？',
              '波長が合う時と合わない時があるタイプ。',
              '意外と良い相性！意外性あり。'
            ];
            const comment = comments[Math.floor(Math.random() * comments.length)];

            replyText = `💕 相性診断\n` +
                        `@${user1.username} × @${user2.username}\n\n` +
                        `相性度: ${compatibility}%\n` +
                        `${comment}\n#bot`;
          }
        }
      }
      else if (command === 'random') {
        try {
          const res = await api.get('/search?limit=50');
          const posts = res.data.posts || [];
          if (posts.length === 0) {
            replyText = '❌ 現在投稿が見つかりませんでした #bot';
          } else {
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            const p = randomPost;
            const created = new Date(p.createdAt).toLocaleString('ja-JP');
            replyText = `🎲 ランダムカロート\n` +
                  `♥${p.likesCount} ♻️${p.rekarotsCount} 💬${p.repliesCount} 👁️${p.viewsCount}\n` +
                  `投稿日時: ${created}\n#bot\n` +
                   `https://karotter.com/${p.author?.username || 'unknown'}/status/${p.id}`;
          }
        } catch (e) {
          console.error('Random command error:', e.response?.data || e.message);
          replyText = '❌ ランダム取得中にエラーが発生しました #bot';
          if (e.response?.status === 401) await refreshToken();
        }
      }
      else if (command === 'getkarotinfo') {
        let targetPostId = null;
        if (arg1 && /^\d+$/.test(arg1)) {
          targetPostId = parseInt(arg1);
        } 
        else {
          targetPostId = await getReplyPost(triggerPostId); 
          if (!targetPostId) targetPostId = triggerPostId;
        }
        if (!targetPostId) {
          replyText = '❌ 投稿IDが取得できませんでした #bot';
        } else {
          try {
            const res = await api.get(`/posts/${targetPostId}`);
            const p = res.data.post || res.data;
            const created = new Date(p.createdAt).toLocaleString('ja-JP');
            replyText = `📋 カロート情報 (ID: ${p.id})\n` +
                  `投稿日時：${created}\n` +
                  `作者：@${p.author?.username || 'unknown'} (ID: ${p.author?.id || '-1'})\n` +
                  `返信先ID：${p.parentId || なし}\n` +
                  `♥${p.likesCount || 0} ♻️${p.rekarotsCount || 0} 💬${p.repliesCount || 0} 👁️${p.viewsCount || 0}\n#bot`;
          } catch (e) {
            console.error('GetKarotInfo error:', e.response?.data || e.message);
            if (e.response?.status === 404) {
              replyText = `❌ 投稿ID ${targetPostId} は存在しません #bot`;
            } else if (e.response?.status === 401) {
              await refreshToken();
              replyText = '❌ 認証エラー（トークン再取得済み） #bot';
            } else {
              replyText = `❌ 情報取得に失敗しました #bot`;
            }
          }
        }
      }
      else if (command === 'ai' && commandParts.length > 1) {
        const query = commandParts.slice(1).join(' ').trim();
        if (!query) return;
        const question = `以下の内容に必ず180字以内で返信してください。\n${query}`;
        try {
          const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: question }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
          let aiReply = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI応答が空です';
          if (aiReply.length > 190) aiReply = aiReply.slice(0, 187) + '...';
          replyText = `🤖AIによる概要：\n${aiReply}\n#bot`;
        } catch (e) {
          replyText = '❌ エラーが起きました #bot';
          console.log('Gemini error:', e.response?.data || e.message);
        }
      }
      else if (command === 'senryu') {
        const post = arg1 || await getReplyPost(triggerPostId);
        const content = await getPostContent(post);
        if (!content) return;
        const question = `以下の内容から川柳っぽい 5･7･5 を抜き出して、その部分だけ返信してください。それっぽいのでいいので例えば「ざけんなや 呪力が練れん ドブカスが」みたいな川柳っぽいものでも音があってればOKです。それっぽいところがないなら「川柳はありません」と返信してください。\n川柳チェックしてほしい内容：${content}`;
        try {
          const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
              contents: [{ parts: [{ text: question }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
          );
          let aiReply = res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI応答が空です';
          if (aiReply.length > 190) aiReply = aiReply.slice(0, 187) + '...';
          replyText = `🤖AIによる川柳検出：\n${aiReply}\n#bot`;
        } catch (e) {
          replyText = '❌ エラーが起きました #bot';
          console.log('Gemini error:', e.response?.data || e.message);
        }
      }
      else {
        replyText = `❓「${command}」は存在しないか、コマンドの用法が正しくありません。\n@bot help でコマンドを確認できます\n#bot`;
      }
      if (replyText) {
        await replyToPost(replyText, triggerPostId);
      }
      await markAllAsRead();
    }
  } catch (e) {
    console.log(`Command Get: ${e}`);
    if (e.response?.status === 401) await refreshToken();
  }
}

async function postTimeSignal() {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour: 'numeric',
      hour12: false
    });

    const hour = parseInt(formatter.format(now), 10);

    let message = `🕒 ${hour}時をお知らせします！ #bot`;

    if (hour === 0) message = `🌙 深夜0時をお知らせします！さすがに寝てますよね？ #bot`;
    if (hour === 12) message = `☀️ 正午(12時)をお知らせします！お昼ごはんは食べましたか？ #bot`;
    if (hour === 15) message = `🍬 15時をお知らせします！おやつを食べてる人はいますか？ #bot`;
    if (hour === 18) message = `🌆 18時をお知らせします！今日もお疲れ様でした！ #bot`;

    await api.post('/posts', {
      content: message,
      isAiGenerated: true,
      isPromotional: false,
      visibility: "PUBLIC",
      replyRestriction: "EVERYONE",
      mediaAlts: [], 
      mediaSpoilerFlags: [], 
      mediaR18Flags: []
    });

  } catch (e) {
    console.error(`時報投稿エラー:`, e.response?.data || e.message);
    if (e.response?.status === 401) {
      await refreshToken();
    }
  }
}

const SPAM_HASHTAGS = [
  '#トゥントゥンサフールのスカトロアナルゲイセックスAV待ってます',
  '#鬼に金棒',
  '#鬼敬の陽キャ柱IDゲイゲーミング待ってます',
  '#おにさんがおー',
  '#100万回生きた鬼',
  '#100万回生きたおに',
  '#吾輩はおにである'
];

async function checkAndReportSpam() {
  try {
    const res = await api.get('/search/discover/latest?limit=30');
    const posts = res.data.posts || [];
    let reportedCount = 0;
    for (const post of posts) {
      const content = (post.content || '').toLowerCase();
      const isSpam = SPAM_HASHTAGS.some(tag => 
        content.includes(tag.toLowerCase())
      );
      if (isSpam) {
        try {
          await api.post('/reports', {
            type: "POST",
            reason: "スパム",
            postId: post.id
          });
          reportedCount++;
        } catch (reportErr) {
          if (reportErr.response?.status === 429) {
            console.log(`⚠️ レート制限 (ID:${post.id})`);
            await new Promise(r => setTimeout(r, 10000)); 
          } else if (reportErr.response?.status === 401) {
            await refreshToken();
          } else {
            console.error(`通報失敗 (ID:${post.id}):`, reportErr.response?.data || reportErr.message);
          }
        }
        await new Promise(r => setTimeout(r, 800));
      }
    }
    if (reportedCount > 0) {
      console.log(`✅ 今回の巡回で ${reportedCount}件 通報しました`);
    } else {}
  } catch (e) {
    console.error('Spam check エラー:', e.response?.data || e.message);
    if (e.response?.status === 401) {
      await refreshToken();
    }
  }
}

console.log('KarotterBot Active');

checkNotificationsAndReply();

cron.schedule('*/5 * * * * *', () => {
  checkNotificationsAndReply();
});

cron.schedule('0 */5 * * * *', () => {
  postRandomString();
});

cron.schedule('0 * * * *', () => {
  postTimeSignal();
});
