import { BlogArticle, ProductFave, MakeupLook, MakeupTip, GRWMStep } from '../types/blog';

// Generated Images
export const IMG_HERO_VANITY = '/src/assets/images/y2k_vanity_hero_1791176765275.jpg';
export const IMG_LIP_GLOSS = '/src/assets/images/y2k_lip_gloss_1791176778493.jpg';
export const IMG_MAKEUP_FLATLAY = '/src/assets/images/y2k_makeup_flatlay_1791176791733.jpg';
export const IMG_GLITTER_EYE = '/src/assets/images/y2k_glitter_eye_1791176804067.jpg';
export const IMG_PINK_BLUSH = '/src/assets/images/pink_blush_bottle_1791179954427.jpg';
export const IMG_PINK_SKINCARE = '/src/assets/images/pink_skincare_bottles_1791180066669.jpg';
export const IMG_COLLEGE_BAG = '/src/assets/images/college_bag_makeup_1791186997915.jpg';
export const IMG_BROWN_LIP_LINERS = '/src/assets/images/brown_lip_liners_1791188585216.jpg';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'top-5-glossy-lip-oils',
    slug: 'top-5-glossy-lip-oils',
    title: 'My Top 5 Glossy Lip Oils That Actually Aren’t Sticky (Under $15!) 💋',
    tagline: 'Because your hair should NEVER get glued to your mouth when the wind blows.',
    category: 'Lip Gossip',
    mood: 'Happy',
    readTime: '4 min read',
    publishedAt: 'October 4, 2026',
    image: IMG_LIP_GLOSS,
    imageAlt: 'Allie testing non-sticky glossy strawberry lip oils with giant doe foot wand on vanity desk',
    vibeTag: 'Juicy Lips Only ✨',
    likesCount: 842,
    worthTheHype: '100% YES! 💖',
    allieRating: '10/10 Holy Grail',
    quickTakeaway: 'Look for jojoba and squalane formulas with a giant doe-foot wand. Avoid heavy mineral oils!',
    seoTitle: 'Top 5 Non-Sticky Lip Oils Under $15 Reviewed | Allie’s Diary',
    metaDescription: 'Looking for juicy high-shine lip oils that aren’t sticky? Discover Allie’s top 5 drugstore lip oils under $15 tested for wind, hair, and all-day hydration.',
    mainKeyword: 'non-sticky lip oil',
    relatedKeywords: ['affordable lip oil', 'best glossy lip oils under 15', 'hydrating lip oil dupe', 'glossy lip makeup'],
    sections: [
      {
        questionH2: 'Why do traditional lip glosses feel so uncomfortably sticky?',
        directAnswer: 'Traditional lip glosses rely on heavy polybutene and mineral oil polymers to produce high surface shine, which creates a tacky film that glues hair strands across your face. Modern lip oils instead blend lightweight plant squalane, jojoba oil, and peptide moisture cushions that soften dry lips without tackiness.',
        details: [
          'If you know me at all, you know I have approximately 37 lip oils rolling around in the bottom of my tote bag right now. My mom literally told me I could fund a small vacation if I stopped buying lip products, but hydration is essential self-care.',
          'When you step outside for two seconds and a breeze hits, nobody wants their haircut stuck to their lips like spider silk. We are leaving gluey gloss formulas behind in 2026.'
        ]
      },
      {
        questionH2: 'What ingredients make a lip oil lightweight and nourishing?',
        directAnswer: 'Look for formulations where jojoba seed oil, squalane, camellia seed oil, and raspberry fruit extract lead the ingredient list. These biomimetic plant lipids absorb into parched skin layers while leaving a crystal-clear mirror glaze on top.',
        details: [
          'A genuine lip oil should feel like a silky water cushion on your lips. It should melt in, soften those dry crusty cracks from sleeping with your mouth open, and give you that blinding glass-mirror shine that makes people ask if you got lip filler (spoiler: you didn’t, it’s just a $9 wand).'
        ]
      },
      {
        questionH2: 'Which drugstore lip oil wand gives the juiciest glass shine?',
        directAnswer: 'The Berry Glaze Oil by GlowDrop ($11) features an oversized plush doe-foot applicator that coats the entire bottom lip in one swipe, delivering juicy sheer strawberry pigment that lasts through snacking.',
        details: [
          'It smells like pink Starbursts and leaves the prettiest sheer strawberry wash that lasts even after eating french fries. This one SLAYS.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'The Cutest Lip Combo: Brown Liner + Baby Pink Gloss',
        slug: 'cutest-lip-combo-brown-liner-pink-gloss',
        blurb: 'Layer your favorite non-sticky lip oil over this 90s contour trick for instant 3D pout volume.'
      },
      {
        title: 'Everything Inside My Everyday Makeup Bag',
        slug: 'inside-my-everyday-makeup-bag',
        blurb: 'See why three distinct lip products earn permanent rent in my everyday school pouch.'
      }
    ],
    paragraphs: [
      'Okay girls, let’s get into it 💄! If you know me at all, you know I have approximately 37 lip oils rolling around in the bottom of my tote bag right now. My mom literally told me I could fund a small vacation if I stopped buying lip products, but whatever, hydration is essential self-care.',
      'For the longest time, "lip oil" just meant thick sticky lip gloss in disguise. You step outside for two seconds, a tiny breeze happens, and BOOM: your entire haircut is glued across your mouth like spider silk. We are NOT doing that in 2026.',
      'A real lip oil should feel like a silky water cushion on your lips. It should melt in, soften those dry crusty cracks from sleeping with your mouth open, and give you that blinding glass-mirror shine that makes people ask if you got lip filler (spoiler: you didn’t, it’s just a $9 wand).',
      'My current absolute ride-or-die is the Berry Glaze Oil by GlowDrop ($11). The doe-foot applicator is the size of my thumb and covers your entire bottom lip in one swipe. It smells like pink Starbursts and leaves the prettiest sheer strawberry wash that lasts even after eating french fries. This one SLAYS.'
    ],
    productMentions: [
      { name: 'Berry Glaze Nourishing Lip Oil', brand: 'GlowDrop', verdict: 'Literally my holy grail, non-sticky and smells like candy', price: '$11.00' },
      { name: 'Hydra-Bounce Peptide Oil', brand: 'Pink Candy Cosmetics', verdict: 'Best giant applicator ever, mega glossy mirror shine', price: '$9.50' },
      { name: 'Cloud Jelly Tinted Balm', brand: 'Sweet Cheeks Co', verdict: 'Great for layering over 90s brown lip liner', price: '$13.00' }
    ],
    comments: [
      { id: 'c1', author: 'Lilly 🎀', date: '2 hours ago', text: 'OMG YES the wind test is so real!! Buying the GlowDrop one right now bestie 💖', likes: 24, avatarEmoji: '🎀' },
      { id: 'c2', author: 'Ashley ✨', date: '5 hours ago', text: 'Does it taste sweet or weirdly chemical? I hate artificial perfume taste', likes: 11, avatarEmoji: '🍬' },
      { id: 'c3', author: 'Allie (Author) 💄', date: '4 hours ago', text: '@Ashley it actually tastes faintly like vanilla and berries, no weird chemical aftertaste at all promise! 💕', likes: 19, avatarEmoji: '👑' }
    ]
  },
  {
    id: 'viral-strawberry-girl-blush',
    slug: 'viral-strawberry-girl-blush',
    title: 'How I Do The Viral Strawberry Girl Blush Without Looking Sunburned 🍓',
    tagline: 'The secret is blending across the bridge of your nose like you spent 20 minutes in Tuscany.',
    category: 'Cheek Tint',
    mood: 'Dreamy',
    readTime: '5 min read',
    publishedAt: 'October 2, 2026',
    image: IMG_PINK_BLUSH,
    imageAlt: 'Allie applying dewy strawberry girl cream blush across cheekbones and bridge of nose',
    vibeTag: 'Sun-Kissed Cutie ☀️',
    likesCount: 654,
    worthTheHype: '100% YES! 💖',
    allieRating: '9.5/10 OBSESSED',
    quickTakeaway: 'Use cream blush FIRST, blend with fingers, and connect across the nose in a soft "W" shape.',
    seoTitle: 'How to Do Strawberry Girl Blush Step-by-Step | Allie’s Guide',
    metaDescription: 'Learn the viral strawberry girl blush technique without looking sunburned! Allie explains the nose bridge "W" placement, best cream formulas, and blending tips.',
    mainKeyword: 'strawberry girl blush',
    relatedKeywords: ['cream blush technique', 'sun-kissed blush placement', 'viral TikTok blush', 'dewy cheek tint'],
    sections: [
      {
        questionH2: 'What is the viral strawberry girl blush aesthetic?',
        directAnswer: 'The strawberry girl blush aesthetic is a radiant, youthful makeup technique featuring sheer raspberry cream cheek tint placed high on the cheekbones and swept continuously across the nose bridge to mimic a natural sun-kissed flush.',
        details: [
          'Stop scrolling and listen to me: powder blush alone is OUT, the dewy strawberry cream blush is forever IN! 🍓 There is nothing cuter than looking like you just ran through a wildflower field or spent the afternoon drinking iced matcha in the sun.'
        ]
      },
      {
        questionH2: 'How do you apply cream blush across the nose without looking sunburned?',
        directAnswer: 'Avoid stamping dark clown circles on the center apple of your cheeks while smiling. Instead, apply two dots high near your temples and one gentle dot on the nose bridge, blending outwards in a soft "W" pattern with warm fingertips.',
        details: [
          'The nose bridge connection is the whole secret! It tricks the eye into seeing outdoor vitality rather than makeup sitting atop skin in third-period chemistry class.'
        ]
      },
      {
        questionH2: 'Should cream blush be applied before or after setting powder?',
        directAnswer: 'Always apply cream and liquid cheek tints directly on damp skin tint or foundation BEFORE any powder touches your face. Layering cream products over powder clumps pigment and disrupts your base.',
        details: [
          'Finish by tapping a tiny dot of clear lip balm or squalane on the apex of your cheekbone for a glazed fruit skin reflection.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'Dewy Base 101: How to Get Glazed Donut Skin',
        slug: 'dewy-base-glazed-donut-glow',
        blurb: 'Prepare the ultimate glassy canvas so your strawberry cream blush melts in with zero patchiness.'
      },
      {
        title: 'Is The Viral $38 Luxury Blush Really Worth It or Drugstore Dupe Better?',
        slug: 'viral-luxury-blush-vs-drugstore-dupe',
        blurb: 'Check out the $7 liquid blush that outperformed the designer viral favorite in our 10-hour test.'
      }
    ],
    paragraphs: [
      'Stop scrolling and listen to me: powder blush alone is OUT, the dewy strawberry cream blush is forever IN! 🍓 There is nothing cuter than looking like you just ran through a wildflower field or spent the afternoon drinking iced matcha in the sun.',
      'The big mistake everyone makes is putting two bright clown circles right on the apples of their cheeks while smiling. When your face relaxes, the circles drop down and make you look like a Victorian orphan with a fever. Please stop doing that bestie 😭!',
      'Instead, grab a dewy, juicy cream blush stick in a bright raspberry or punchy pink. Place two dots high on your cheekbone near the temple, and ONE tiny dot right on the top bridge of your nose. Then take your warm fingers (yes, wash your hands first!) and tap them together in a "W" shape.',
      'The nose bridge connection is the whole secret! It tricks the brain into thinking you got natural sunshine instead of sitting in 3rd period chemistry under fluorescent lights. Tap a little clear balm on top of the cheekbones for that juicy glazed strawberry finish.'
    ],
    productMentions: [
      { name: 'Dewy Cheek Jelly in Wild Strawberry', brand: 'Juicy Club', verdict: 'Melts into skin like butter and stays dewy all day', price: '$14.00' },
      { name: 'Sunbeam Cream Stick', brand: 'Petal Pop', verdict: 'So easy to swipe when running late for school', price: '$10.00' }
    ],
    comments: [
      { id: 'c4', author: 'Chloe 💕', date: '1 day ago', text: 'The nose dot changed my life!! People at school asked if I went on vacation over the weekend lol', likes: 38, avatarEmoji: '🍓' }
    ]
  },
  {
    id: 'frosted-blue-eyeshadow-modern',
    slug: 'frosted-blue-eyeshadow-modern',
    title: 'Frosted Baby Blue Eyeshadow: How to Wear Pastel Shimmer Without Looking Chalky ✨',
    tagline: 'Retro pop divas walked so we could rock pastel shimmer without 2000s chalkiness.',
    category: 'Viral Trends',
    mood: 'Dreamy',
    readTime: '6 min read',
    publishedAt: 'September 29, 2026',
    image: IMG_GLITTER_EYE,
    imageAlt: 'Y2K cyber pop starlight makeup with frosted pastel baby blue eyeshadow shimmer and star gems',
    vibeTag: 'Cyber Fairy 🦋',
    likesCount: 912,
    worthTheHype: '100% YES! 💖',
    allieRating: '10/10 PURE FUN',
    quickTakeaway: 'Keep skin modern and fresh with lots of gloss; do not pair blue shadow with dusty matte foundation!',
    seoTitle: 'How to Wear Frosted Baby Blue Eyeshadow | Modern Y2K Makeup',
    metaDescription: 'Master modern frosted baby blue eyeshadow with zero chalkiness. Allie shares wet-brush shimmer hacks, dewy skin pairing, and cyber pop princess styling.',
    mainKeyword: 'frosted blue eyeshadow',
    relatedKeywords: ['Y2K blue eyeshadow', 'pastel shimmer eye makeup', 'modern 2000s makeup', 'cyber pop starlight glam'],
    sections: [
      {
        questionH2: 'How do you wear pastel blue eyeshadow without looking like a retro costume?',
        directAnswer: 'The secret is high contrast: combine icy periwinkle or baby blue shimmer on the inner lid with super dewy glass skin, fluffy soap brows, and warm 90s brown-nude lips instead of pairing it with heavy matte foundation.',
        details: [
          'Do not panic! Modern shimmer formulas have refined micro-pearls that reflect light like silk rather than the dry chalky dust pigments of the early 2000s.'
        ]
      },
      {
        questionH2: 'Where should you place frosted eyeshadow for the most flattering dimension?',
        directAnswer: 'Press frosted shimmer ONLY onto the inner two-thirds of the mobile eyelid and at the inner tear duct. Leave the upper crease bare or softly warmed with a skin-tone bronzer so your eyes retain depth in photos.',
        details: [
          'Dab a wet flat synthetic brush into your periwinkle shadow pan, then stamp onto lids to lock glitter in place without fallout.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'Doll Lashes With Just Curler + Tubing Mascara',
        slug: 'doll-lashes-without-fake-strips',
        blurb: 'Pair icy pastel eyelids with clean fluttery doll lashes for that anime cyber fairy gaze.'
      },
      {
        title: 'The Cutest Lip Combo: Brown Liner + Baby Pink Gloss',
        slug: 'cutest-lip-combo-brown-liner-pink-gloss',
        blurb: 'Warm brownie lip liner provides the essential balance to frosted cool eye makeup.'
      }
    ],
    paragraphs: [
      'Okay, do not panic! I know when people hear "frosted blue eyeshadow," they picture dusty makeup with chalky unblended lines. But modern formulas have evolved, and icy blue is the ultimate fun girl statement for parties and concerts! 🦋✨',
      'The secret to making it look expensive and cool instead of costume-y is CONTRAST. We pair frosted shimmer eyes with super dewy, glazed skin, fluffy brushed-up soap brows, and a warm juicy lip gloss.',
      'Here is my step-by-step trick: pat a clear eye primer on your lid, then take a wet flat brush and press icy periwinkle or baby blue shimmer ONLY on the inner two-thirds of your mobile lid. Do NOT blend it all the way up to your eyebrows! Leave the crease naked.',
      'Finish with dark brown mascara and a tiny dot of silver glitter right at your tear duct. It catches the party strobe lights like crazy and looks insane in flash photos!'
    ],
    productMentions: [
      { name: 'Cyber Ice Duo Eyeshadow Chrome', brand: 'Allie’s Glam Lab', verdict: 'Blinding periwinkle shimmer with zero fallout', price: '$12.00' },
      { name: 'Silver Star Face Gems Pack', brand: 'Glam Cling', verdict: 'So sticky, danced for 4 hours and none fell off', price: '$5.00' }
    ],
    comments: [
      { id: 'c5', author: 'Bree 🦋', date: '3 days ago', text: 'Wore this to the concert and got SO many compliments!! Best blog tutorial ever', likes: 45, avatarEmoji: '⭐' }
    ]
  },
  {
    id: 'inside-my-everyday-makeup-bag',
    slug: 'inside-my-everyday-makeup-bag',
    title: 'Everything Inside My Everyday Makeup Bag (A Messy Confession) 👛',
    tagline: 'No gatekeeping! Exactly what lives in my pink fluffy pouch right now.',
    category: 'Makeup Bag',
    mood: 'Chill',
    readTime: '5 min read',
    publishedAt: 'September 26, 2026',
    image: IMG_COLLEGE_BAG,
    imageAlt: 'Allie dumping out pink fluffy heart makeup bag with lip oils, lash curler, and blotting paper',
    vibeTag: 'What’s In My Bag 🎀',
    likesCount: 520,
    worthTheHype: '100% YES! 💖',
    allieRating: 'My Daily Essentials',
    quickTakeaway: 'Always carry a mini eyelash curler, 3 lip options (non-negotiable), and blotting papers.',
    seoTitle: 'What’s in My Everyday Makeup Bag: Real Essentials | Allie',
    metaDescription: 'Peek inside Allie’s real, messy Y2K makeup bag! No aesthetic gatekeeping: mini lash curlers, 3 lip essentials, blotting papers, and drugstore staples.',
    mainKeyword: 'everyday makeup bag essentials',
    relatedKeywords: ['what is in my makeup bag', 'teen makeup pouch essentials', 'school purse makeup', 'everyday beauty checklist'],
    sections: [
      {
        questionH2: 'What makeup essentials should every student carry in their daily bag?',
        directAnswer: 'The core daily essentials are a pinch-free mini eyelash curler, abaca leaf blotting sheets to absorb oil without caking, and three versatile lip products (a defining brown pencil, a nourishing lip oil, and a sheer sparkle gloss).',
        details: [
          'Those aesthetic TikToks with five immaculate products lined up in a sterile beige pouch are pure fiction. My real pouch is a fluffy pink heart case with powder residue, but it keeps me looking alive from 8:00 AM lectures to evening boba runs.'
        ]
      },
      {
        questionH2: 'Why are blotting sheets better than reapplying pressed powder all afternoon?',
        directAnswer: 'Re-powdering over natural sebum continuously deposits powder binders and talc, turning into heavy chalk by 3:00 PM. Blotting sheets lift sebum directly while leaving your original dewy base fresh and weightless.',
        details: [
          'Press blotting paper along the forehead and nostrils, then refresh cheeks with a quick mist rather than cakey powder.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'My 10-Minute School Morning Routine When I Slept Through 3 Alarms',
        slug: '10-minute-school-morning-routine',
        blurb: 'Put these pouch essentials to work during late-morning school rushes.'
      },
      {
        title: 'Why You NEED To Wash Your Beauty Blenders',
        slug: 'wash-your-beauty-blenders-mold-warning',
        blurb: 'Ensure your daily tools and makeup pouch remain hygienic and acne-free.'
      }
    ],
    paragraphs: [
      'Let’s be honest: those aesthetic TikToks where someone has five perfectly pristine products lined up in a clean beige linen pouch? That is fiction. My real makeup bag is a fluffy pink heart-printed zip pouch covered in stray powder dust and broken hair ties. And I love it.',
      'Today I dumped the entire thing out onto my desk to show you what actually earns permanent rent in my bag for school, coffee runs, and weekend hangouts. Here is the unfiltered breakdown:',
      '1. My holy grail mini lash curler: If I was stranded on a desert island and could only take one beauty item, it would be my eyelash curler. Uncurled lashes make me look like I haven’t slept since 2024.',
      '2. Three different lip products: One nude brown liner (for definition), one hydrating lip oil (for general existence), and one sheer pink glitter gloss (in case we end up at boba or taking selfies). This is the holy trinity.',
      '3. Abaca leaf blotting sheets: Powders can get cakey when you reapply at 3:00 PM. Blotting papers soak up forehead shine instantly without ruining your base.'
    ],
    productMentions: [
      { name: 'Fluffy Heart Vanity Pouch', brand: 'Sweet Candy Co', verdict: 'Fits way more than it looks and washes easily', price: '$8.00' },
      { name: 'Precision Rose Gold Lash Curler', brand: 'Lash Babe', verdict: 'Never pinches my eyelid skin', price: '$7.00' }
    ],
    comments: [
      { id: 'c6', author: 'Hannah 💖', date: '4 days ago', text: 'The 3 lip products rule is SO TRUE. I literally have 5 in my backpack right now 😂', likes: 29, avatarEmoji: '💄' }
    ]
  },
  {
    id: 'dewy-base-glazed-donut-glow',
    slug: 'dewy-base-glazed-donut-glow',
    title: 'Dewy Base 101: How to Get That Glazed Donut Glow for High School & College 🍩',
    tagline: 'Look like you drink 3 gallons of water a day even when you survived on iced latte and 4 hours of sleep.',
    category: 'Base & Glow',
    mood: 'Chill',
    readTime: '6 min read',
    publishedAt: 'September 22, 2026',
    image: IMG_PINK_SKINCARE,
    imageAlt: 'Pastel pink skincare bottles and glowing skin prep illuminator drops on glass tray',
    vibeTag: 'Glowy Skin Goal 💖',
    likesCount: 780,
    worthTheHype: '100% YES! 💖',
    allieRating: '10/10 Routine',
    quickTakeaway: 'Mix one drop of squalane or face serum into your skin tint before applying with your hands!',
    seoTitle: 'Dewy Base 101: How to Get Glazed Donut Skin | Allie’s Guide',
    metaDescription: 'Learn how to get radiant glazed donut skin for school and college. Master the Skin Drench hack, oil-tint cocktails, and strategic spot-powdering.',
    mainKeyword: 'dewy base glazed donut glow',
    relatedKeywords: ['glass skin routine', 'hydrated skin tint makeup', 'glowy foundation hacks', 'glazed skin tutorial'],
    sections: [
      {
        questionH2: 'How do you get glazed donut skin without looking greasy or oily?',
        directAnswer: 'Glazed skin stems from deep water hydration rather than heavy sebum. Use a double layer of milky hydrating toner on damp skin, follow with lightweight gel moisturizer, mix one drop of face serum into skin tint, and selectively powder only the nose nostrils and center of eyebrows.',
        details: [
          'Piling on thick full-coverage foundation emphasizes flaky spots and settles into fine lines. Letting your natural freckles show through a glassy skin veil is modern, youthful, and fresh.'
        ]
      },
      {
        questionH2: 'What is the Skin Drench method for makeup application?',
        directAnswer: 'The Skin Drench method involves applying your morning skin tint or BB cream immediately while skin is still juicy and damp from hydrating mist, blending with warm palm heat so the base fuses with your skincare barrier.',
        details: [
          'Pump skin tint onto the back of your hand, add one drop of liquid pearl illuminator, mix together, and smooth across cheeks like lotion.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'How I Do The Viral Strawberry Girl Blush Without Looking Sunburned',
        slug: 'viral-strawberry-girl-blush',
        blurb: 'Layer fresh dewy cheek tint directly on top of this glazed canvas.'
      },
      {
        title: 'Why You NEED To Wash Your Beauty Blenders',
        slug: 'wash-your-beauty-blenders-mold-warning',
        blurb: 'Avoid breakouts so your dewy base looks smooth and glassy every morning.'
      }
    ],
    paragraphs: [
      'We’ve all had those mornings where you wake up, look in the mirror, and your skin looks dull, dry, and exhausted. But with the right base cocktail, you can fake eight hours of uninterrupted beauty sleep in four minutes flat.',
      'The trick isn’t piling on thick foundation; thick foundation actually emphasizes dryness and settles into smile lines. The secret is the "Skin Drench" technique:',
      'First, wash your face with cool water and pat a hydrating milky toner into your skin twice. While skin is still damp, apply your moisturizer. Now here is the magic hack: pump your skin tint onto the back of your hand, and add ONE TINY DROP of face oil or liquid highlighter right into it. Mix it with your finger.',
      'Warm it between your palms and smooth it on like moisturizer. Your natural skin texture shows through, but you have this insane, glassy radiance that catches every light. Powder ONLY the sides of your nose and between your eyebrows with a tiny brush—leave your forehead and cheeks alone!'
    ],
    productMentions: [
      { name: 'Glaze Drops Dewy Serum Illuminator', brand: 'Pink Candy Cosmetics', verdict: 'Liquid light in a bottle, zero glitter chunks', price: '$12.00' },
      { name: 'Milky Oat Hydrating Toner', brand: 'Skin Bestie', verdict: 'Saves flaking skin in winter weather', price: '$11.00' }
    ],
    comments: [
      { id: 'c7', author: 'Maya 🌸', date: '1 week ago', text: 'Mixing the highlighter into the tint made my base look so expensive!! Thank you Allie 💕', likes: 33, avatarEmoji: '🍩' }
    ]
  },
  {
    id: 'doll-lashes-without-fake-strips',
    slug: 'doll-lashes-without-fake-strips',
    title: 'Fake Lash Strips Scare Me: Here’s How I Get Doll Lashes With Just Curler + Tubing Mascara 👁️',
    tagline: 'No sticky glue in your eyeball, no lash corners peeling off halfway through the night.',
    category: 'Viral Trends',
    mood: 'Happy',
    readTime: '4 min read',
    publishedAt: 'September 19, 2026',
    image: IMG_GLITTER_EYE,
    imageAlt: 'Close-up of Allie’s eyes showing lifted fluttery doll lashes achieved with tubing mascara and lash curler',
    vibeTag: 'Doll Eyes 🎀',
    likesCount: 670,
    worthTheHype: '100% YES! 💖',
    allieRating: 'Lifesaver Hack',
    quickTakeaway: 'Pump your curler at the roots, mid-lash, and tips for a C-curl, then use tubing mascara.',
    seoTitle: 'How to Get Doll Lashes Without Fake Strips | Curler Hack',
    metaDescription: 'Hate false eyelashes? Learn the Triple-Pump curler method and tubing mascara trick for lifted, fluttery doll lashes that hold curl all day without glue.',
    mainKeyword: 'doll lashes without false eyelashes',
    relatedKeywords: ['how to curl eyelashes doll look', 'tubing mascara benefits', 'fluttery lash routine', 'curler triple pump method'],
    sections: [
      {
        questionH2: 'How does the Triple-Pump eyelash curler method work?',
        directAnswer: 'Instead of squeezing once at the lash root—which bends hair into an awkward 90-degree kink—pump three times at the root, three times midway along the lash length, and twice at the tips. This curves lashes into a round "C" arch that stays lifted.',
        details: [
          'Can I admit something embarrassing? Every single time I have ever attempted to put on false eyelashes, I end up with glue stuck to my pupil, one corner peeling off, and the whole strip crooked like a spider wing. The Triple-Pump method saved my life.'
        ]
      },
      {
        questionH2: 'Why is tubing mascara better than traditional waterproof mascara for holding a curl?',
        directAnswer: 'Traditional mascaras weigh down curled lashes with heavy petrolatum waxes. Tubing formulas contain lightweight film-forming polymers that wrap each lash in a 360-degree tubular sleeve, locking in curl structure with zero flaking or dark under-eye smudging.',
        details: [
          'Best of all, tubing mascaras slide off effortlessly in the shower with warm water and light fingertip pressure—no harsh eye makeup remover needed.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'Frosted Baby Blue Eyeshadow: Modern Pastel Tutorial',
        slug: 'frosted-blue-eyeshadow-modern',
        blurb: 'Fluttery doll lashes provide the perfect frame for pastel shimmer lids.'
      },
      {
        title: 'Everything Inside My Everyday Makeup Bag',
        slug: 'inside-my-everyday-makeup-bag',
        blurb: 'Check out the rose-gold precision curler that never pinches eyelid skin.'
      }
    ],
    paragraphs: [
      'Can I admit something embarrassing? Every single time I have ever attempted to put on false eyelashes, I end up with glue stuck to my pupil, one corner poking my tear duct, and the whole strip crooked like a spider wing. I finally gave up and perfected the natural doll lash routine instead!',
      'Most people only squeeze their eyelash curler once right at the root. That creates an awkward 90-degree right angle that looks bent, not curled. To get that anime doll curl, you have to do the Triple-Pump method:',
      'Pump 3 times at the root of the lashes. Release slightly, slide the curler to the middle of the lashes, and pump 3 times. Slide to the tips, and pump twice. This creates a rounded curve that holds its lift all day long.',
      'Then, switch to a TUBING mascara. Regular mascaras weigh lashes down with heavy waxes. Tubing formulas coat each lash in a lightweight polymer cylinder. They hold the curl like hairspray, never smudge under bottom lashes, and slide off with warm water in the shower. No raccoon eyes!'
    ],
    productMentions: [
      { name: 'Doll Lash Polymer Tubing Mascara', brand: 'Blink Babe', verdict: 'Zero flakes even after crying during sad movies', price: '$12.50' }
    ],
    comments: [
      { id: 'c8', author: 'Jessica 🌟', date: '1 week ago', text: 'TRIPLE PUMP METHOD YES!! I thought my lashes were just stubborn but this actually worked', likes: 21, avatarEmoji: '👁️' }
    ]
  },
  {
    id: 'viral-luxury-blush-vs-drugstore-dupe',
    slug: 'viral-luxury-blush-vs-drugstore-dupe',
    title: 'Is The Viral $38 Luxury Blush Really Worth It or Is The Drugstore Dupe Better? (Honest Review) 💸',
    tagline: 'I tested the high-end designer blush on my left cheek and the $7 dupe on my right cheek for 10 hours.',
    category: 'Cheek Tint',
    mood: 'Happy',
    readTime: '6 min read',
    publishedAt: 'September 15, 2026',
    image: IMG_MAKEUP_FLATLAY,
    imageAlt: 'Split comparison flatlay of $38 luxury designer pink blush bottle beside $7 drugstore liquid blush dupe',
    vibeTag: 'Dupe Alert 🚨',
    likesCount: 940,
    worthTheHype: 'Cute but overpriced 💸',
    allieRating: 'Dupe Wins 🏆',
    quickTakeaway: 'The $7 dupe has better pigment payoff and doesn’t lift your foundation underneath!',
    seoTitle: 'Viral $38 Luxury Blush vs. $7 Drugstore Dupe Review | Allie',
    metaDescription: 'Split-face test! Allie reviews the viral $38 designer pink liquid blush against a $7.49 drugstore dupe over 10 hours. Find out which cheek tint wins.',
    mainKeyword: 'liquid blush dupe vs luxury',
    relatedKeywords: ['affordable drugstore blush dupe', 'designer pink blush comparison', 'budget beauty reviews', 'best cheap liquid blush'],
    sections: [
      {
        questionH2: 'How does the $7 drugstore blush compare to the $38 luxury blush in wear time?',
        directAnswer: 'In our 10-hour split-face test, the $7.49 drugstore blush stayed vibrant and dewy without fading or clinging to dry texture, whereas the $38 luxury blush dried too rapidly during initial application and caused foundation underneath to lift.',
        details: [
          'Everyone on social media has been screaming about this famous designer pink liquid blush. But $38 is literally four boba drinks and a cute thrifted top. On my left cheek went luxury; on my right cheek went the $7.49 viral drugstore find.'
        ]
      },
      {
        questionH2: 'Why do some expensive liquid blushes lift foundation?',
        directAnswer: 'Formulas containing high levels of fast-evaporating volatile alcohols dry within seconds. If blended with a sponge, the tackifying pigment pulls at wet foundation. The drugstore dupe uses a hydrating glycerin and water-gel suspension that blends smoothly without peeling.',
        details: [
          'By 6:00 PM, both cheeks looked virtually identical. Save your hard-earned money, girlies!'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'How I Do The Viral Strawberry Girl Blush Without Looking Sunburned',
        slug: 'viral-strawberry-girl-blush',
        blurb: 'Use your budget dupe blush to create the viral sun-kissed nose bridge look.'
      },
      {
        title: 'Top 5 Glossy Lip Oils That Actually Aren’t Sticky (Under $15!)',
        slug: 'top-5-glossy-lip-oils',
        blurb: 'Explore more affordable holy grail dupes tested and approved by Allie.'
      }
    ],
    paragraphs: [
      'Everyone on social media has been screaming about this famous $38 designer pink liquid blush. The packaging is gorgeous, the influencer ads are everywhere, but $38 is literally four boba drinks and a cute top. As your resident beauty detective, I had to put it to the ultimate split-face test.',
      'On my left cheek: the $38 luxury liquid blush in candy pink. On my right cheek: the $7.49 drugstore dupe that went viral on beauty reddit. I applied both with the exact same damp sponge over identical skin tint.',
      'The luxury blush looks pretty initially, but drying time is almost zero. If you don’t blend it within 4 seconds, it sets into a hard pink stain and actually lifted my foundation off my cheekbones! Meanwhile, the $7 dupe stayed blendable for 30 seconds, gave a sheer buildable watercolor flush, and gave that hydrated juicy finish.',
      'By 6:00 PM, both cheeks looked virtually identical. Save your money girls! Put that $30 toward something fun or cute thrift store finds.'
    ],
    productMentions: [
      { name: 'Petal Pop Liquid Blush in Bubblegum', brand: 'Petal Pop', verdict: 'The $7 dupe that outperformed the luxury designer', price: '$7.49' },
      { name: 'Designer Soft Pinch Pink', brand: 'Luxe Beauty Brand', verdict: 'Pretty packaging, but dries too fast and easily stains', price: '$38.00' }
    ],
    comments: [
      { id: 'c9', author: 'Emma 👛', date: '2 weeks ago', text: 'You just saved my paycheck thank you Allie!! Going to Target right now', likes: 52, avatarEmoji: '💸' }
    ]
  },
  {
    id: '10-minute-school-morning-routine',
    slug: '10-minute-school-morning-routine',
    title: 'My 10-Minute School Morning Routine When I Slept Through 3 Alarms ⏰',
    tagline: 'How to look like a functioning human being when your bus arrives in 12 minutes.',
    category: 'Base & Glow',
    mood: 'Chill',
    readTime: '4 min read',
    publishedAt: 'September 11, 2026',
    image: IMG_HERO_VANITY,
    imageAlt: 'Allie’s bedroom vanity setup ready for a fast 10-minute morning school makeup routine',
    vibeTag: 'Speedy Glam ⚡',
    likesCount: 810,
    worthTheHype: '100% YES! 💖',
    allieRating: 'Emergency Routine',
    quickTakeaway: 'Stick to multi-use sticks and finger warmth: no time to wash or find brushes!',
    seoTitle: '10-Minute School Morning Makeup Routine | Glowy & Fast',
    metaDescription: 'Overslept? Here is Allie’s emergency 10-minute school morning routine using multi-sticks and tinted SPF so you arrive looking radiant and awake.',
    mainKeyword: '10 minute school morning makeup',
    relatedKeywords: ['fast morning makeup for school', 'quick glowy teen makeup', 'multi stick routine', 'overslept beauty routine'],
    sections: [
      {
        questionH2: 'How can you do your makeup in under 10 minutes when running late for school?',
        directAnswer: 'Eliminate tools and simplify to four multi-functional products: tinted SPF applied with hands for protection and even tone, one monochromatic tint stick dabbed onto eyelids, cheeks, and lips, tinted brow gel brushed upward, and quick lip oil.',
        details: [
          'We’ve all had that panic when you set your alarm for 6:15 AM, blink, and suddenly your phone clock reads 7:02 AM. Do not grab complex liquid foundations or eyeshadow palettes; simplicity wins every time.'
        ]
      },
      {
        questionH2: 'Why are monochromatic multi-use tint sticks the best emergency product?',
        directAnswer: 'Applying a single creamy peachy-pink tint across cheeks, eyelids, and lips guarantees color harmony across your features in 30 seconds with zero risk of clashing tones.',
        details: [
          'Finger warmth melts the product directly into skin, so you don’t waste precious minutes washing blending sponges.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'Dewy Base 101: How to Get Glazed Donut Skin',
        slug: 'dewy-base-glazed-donut-glow',
        blurb: 'Learn the full skin prep routine on days when you have extra time to pamper yourself.'
      },
      {
        title: 'Everything Inside My Everyday Makeup Bag',
        slug: 'inside-my-everyday-makeup-bag',
        blurb: 'Check out the emergency touch-up products kept inside my school backpack.'
      }
    ],
    paragraphs: [
      'We’ve all been there: you set your alarm for 6:15 AM with grand plans of curling your hair and doing winged liner. Then suddenly you blink, your phone says 7:02 AM, and you have exactly 10 minutes before you need to sprint out the door.',
      'Do not panic. You do NOT have to show up looking washed out. Here is the emergency speed protocol:',
      'Minute 1-2: Tinted SPF. Do not reach for foundation. Slap on a tinted SPF that gives light coverage and sun protection in one swipe.',
      'Minute 3-4: The Multi-Stick Savior. Take one creamy rose-nude stick. Swipe on cheekbones, dab on eyelids, and pat onto lips. Monochromatic makeup takes zero skill and looks intentionally chic in 30 seconds.',
      'Minute 5-7: Fast Brows & Lash Curl. Brush a tinted fiber brow gel upward through your brows (instant fullness), squeeze lashes with curler, and swipe brown mascara.',
      'Minute 8-10: Lip Gloss & Out The Door. Add your favorite glossy oil while running down the stairs. You look fresh, glowy, and awake, and nobody will ever know you woke up 15 minutes ago!'
    ],
    productMentions: [
      { name: 'Speedy Multi-Use Tint Stick in Peachy Keen', brand: 'Sweet Cheeks Co', verdict: 'Eyes, lips, and cheeks in 20 seconds flat', price: '$10.00' },
      { name: 'Fiber Boost Brow Mascara', brand: 'Blink Babe', verdict: 'Fills sparse spots with zero brow pencil needed', price: '$8.50' }
    ],
    comments: [
      { id: 'c10', author: 'Zoe ⏰', date: '2 weeks ago', text: 'Doing this routine today because my alarm did not go off haha wish me luck!', likes: 19, avatarEmoji: '🏃‍♀️' }
    ]
  },
  {
    id: 'cutest-lip-combo-brown-liner-pink-gloss',
    slug: 'cutest-lip-combo-brown-liner-pink-gloss',
    title: 'The Cutest Lip Combo of All Time: Brown Liner + Baby Pink Gloss 🎀',
    tagline: 'The iconic 90s supermodel lip that looks good on literally every skin tone.',
    category: 'Lip Gossip',
    mood: 'Bold',
    readTime: '5 min read',
    publishedAt: 'September 07, 2026',
    image: IMG_LIP_GLOSS,
    imageAlt: 'Swatches of warm brown lip liner and milky baby pink lip gloss for the iconic 90s plump lip combo',
    vibeTag: 'Iconic Lip Combo 💋',
    likesCount: 1120,
    worthTheHype: '100% YES! 💖',
    allieRating: '11/10 MY SIGNATURE',
    quickTakeaway: 'Overline ONLY the center cupid’s bow and center bottom lip, blend inwards, then flood with baby pink gloss.',
    seoTitle: 'Brown Lip Liner + Baby Pink Gloss: Cutest Lip Combo | Allie',
    metaDescription: 'How to master the iconic 90s lip combo: warm brown lip liner paired with milky baby pink gloss. Allie reveals the contour illusion for natural 3D pout.',
    mainKeyword: 'brown lip liner baby pink gloss combo',
    relatedKeywords: ['90s lip combo tutorial', 'brown liner pink gloss', 'plump lip contour technique', 'Britney Spears lip gloss look'],
    sections: [
      {
        questionH2: 'Why does brown lip liner with baby pink gloss look universally flattering?',
        directAnswer: 'The brown lip pencil creates natural shadow and depth along the outer perimeter of your mouth, while high-shine milky pink gloss in the center reflects incoming light, creating an optical 3D volume boost without surgical filler.',
        details: [
          'If you look at my photos for the past year, I am wearing this exact lip combo in 98% of them. It is the greatest makeup invention known to humanity.'
        ]
      },
      {
        questionH2: 'How do you overline lips naturally without obvious dark outline rings?',
        directAnswer: 'Overline only the central peak of the cupid’s bow and the center third of the bottom lip. At the mouth corners, hug your true natural contour, then use your pinky finger to smudge the pencil pigment inward before applying gloss.',
        details: [
          'Flood the center with a milky baby pink or iridescent gloss, smack your lips together twice, and enjoy an effortless pouty finish.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'My Top 5 Glossy Lip Oils That Actually Aren’t Sticky (Under $15!)',
        slug: 'top-5-glossy-lip-oils',
        blurb: 'Find the juiciest non-sticky sheer lip oils to layer on top of this pencil contour.'
      },
      {
        title: 'Frosted Baby Blue Eyeshadow: Modern Pastel Tutorial',
        slug: 'frosted-blue-eyeshadow-modern',
        blurb: 'Pair this warm nude-pink lip with pastel frosted eyes for iconic cyber pop aesthetic.'
      }
    ],
    paragraphs: [
      'If you look at my photos for the past year, I am wearing this exact lip combo in 98% of them. It is the greatest makeup invention known to humanity. It gives your lips that plump, juicy, 3D look without ever looking fake or chalky.',
      'The contrast between a warm coffee/chocolate brown lip liner and a milky baby pink gloss creates an optical illusion of depth and shadow. It makes your lips look double their size!',
      'Here is the technique for maximum cuteness: do NOT line your whole mouth with thick dark pencil like a cartoon. Only overline slightly at the very peak of the cupid’s bow and the center of the bottom lip. Keep the corners hugging your natural lip line.',
      'Then take your finger and softly smudge the liner inward toward the center of your mouth so there is no harsh line. Now, flood the center with a milky baby pink or iridescent glitter lip gloss. Smack your lips together twice. Gorgeous, pouty, nostalgic heaven!'
    ],
    productMentions: [
      { name: 'Velvet Glide Lip Pencil in Cinnamon Toast', brand: 'Allie’s Glam Lab', verdict: 'Creamy brown that doesn’t tug or dry out lips', price: '$6.00' },
      { name: 'Baby Doll Milky Pink Lip Glaze', brand: 'Pink Candy Cosmetics', verdict: 'The exact shade of iconic Britney pop lip gloss', price: '$10.00' }
    ],
    comments: [
      { id: 'c11', author: 'Talia 🎀', date: '3 weeks ago', text: 'I tried this for prom and it was the best lip look I have ever done in my life!!', likes: 62, avatarEmoji: '👑' }
    ]
  },
  {
    id: 'wash-your-beauty-blenders-mold-warning',
    slug: 'wash-your-beauty-blenders-mold-warning',
    title: 'Why You NEED To Wash Your Beauty Blenders (I Found Mold Once, Don’t Be Me 😭)',
    tagline: 'A gentle public service announcement from your internet big sis.',
    category: 'Disasters & Care',
    mood: 'Bold',
    readTime: '4 min read',
    publishedAt: 'September 03, 2026',
    image: IMG_MAKEUP_FLATLAY,
    imageAlt: 'Pink makeup sponge sitting on aerated wire drying stand beside gentle cleansing soap',
    vibeTag: 'Big Sis Advice 🧼',
    likesCount: 730,
    worthTheHype: '100% YES! 💖',
    allieRating: 'Essential Hygiene',
    quickTakeaway: 'Wash your sponge with regular solid bar soap every 3 days and let it dry in open air!',
    seoTitle: 'How to Clean Beauty Blenders & Prevent Mold | Beauty PSA',
    metaDescription: 'Did you know damp makeup sponges can grow hidden mold? Allie explains how to deep clean beauty blenders in 60 seconds with bar soap and proper drying.',
    mainKeyword: 'how to clean beauty blender mold',
    relatedKeywords: ['wash makeup sponge properly', 'mold inside beauty blender', 'prevent makeup breakouts', 'beauty sponge drying stand'],
    sections: [
      {
        questionH2: 'Can mold and bacteria actually grow inside makeup sponges?',
        directAnswer: 'Yes. The porous cellular foam of makeup sponges retains water, facial sebum, and liquid foundation nutrients. Storing a damp sponge in an enclosed drawer or zippered bag creates a humid incubator for bacterial colonies and mildew that can trigger persistent acne flare-ups.',
        details: [
          'Last year I had stubborn clusters of breakouts on my left cheek that refused to clear with salicylic acid. When I cut open my sponge after seeing a viral video, I discovered dark mildew specks inside the foam core.'
        ]
      },
      {
        questionH2: 'What is the fastest 60-second method to deep clean makeup sponges?',
        directAnswer: 'Rub the saturated sponge against a solid bar of gentle fragrance-free soap until thick lather permeates the core, massage with thumb pads under warm running water, and squeeze repeatedly until rinse water runs 100% clear.',
        details: [
          'Solid bar soap breaks down waterproof silicone emulsifiers significantly faster than expensive liquid brush shampoos.'
        ]
      },
      {
        questionH2: 'How should you dry a beauty blender to prevent mildew?',
        directAnswer: 'Place your clean damp sponge on an elevated wire drying stand or well-ventilated ceramic holder in open air with circulating oxygen. Never toss damp tools back into dark plastic bags or closed cosmetic drawers.',
        details: [
          'Ventilation ensures the core dries completely within hours, keeping your skin safe from breakouts.'
        ]
      }
    ],
    internalLinks: [
      {
        title: 'Dewy Base 101: How to Get That Glazed Donut Glow',
        slug: 'dewy-base-glazed-donut-glow',
        blurb: 'A clean makeup sponge is mandatory to achieve flawless glazed skin texture.'
      },
      {
        title: 'Everything Inside My Everyday Makeup Bag',
        slug: 'inside-my-everyday-makeup-bag',
        blurb: 'How to keep your everyday makeup pouch fresh, sanitized, and organized.'
      }
    ],
    paragraphs: [
      'Okay, confession time, and please do not judge me because I am traumatized enough. Last year I had this stubborn cluster of tiny breakouts on my left cheek that would NOT go away no matter what skincare I used. I was spending all my money on pimple patches and salicylic acid.',
      'One day I decided to finally cut open my old pink makeup sponge because I saw someone do it on TikTok. Girls... inside the core of the sponge was a dark green speckle of literal MILDEW. I was bouncing mold onto my face every morning before school. I wanted to cry and evaporate into the floor.',
      'Makeup sponges are damp, warm, and full of skin oils—it is literally a luxury resort for bacteria. Here is how to keep them clean in 60 seconds:',
      'Get a $1 bar of gentle unscented soap. Wet your sponge, rub it against the bar until it foams up, and squeeze repeatedly under warm water until the water runs 100% clear. And NEVER throw a damp sponge into a closed drawer or makeup bag! Leave it sitting out on a cute little wire stand to dry in fresh air.'
    ],
    productMentions: [
      { name: 'Rose Gold Wire Sponge Drying Throne', brand: 'Vanity Bestie', verdict: 'Keeps your sponges aerated and looks cute on your desk', price: '$4.50' },
      { name: 'Gentle Botanical Sponge Cleansing Bar', brand: 'Skin Bestie', verdict: 'Removes waterproof foundation stains like magic', price: '$5.00' }
    ],
    comments: [
      { id: 'c12', author: 'Sammy 😱', date: '3 weeks ago', text: 'RUNNING TO WASH MY SPONGE RIGHT NOW OH MY GOD', likes: 78, avatarEmoji: '🧼' }
    ]
  }
];

export const MY_FAVES: ProductFave[] = [
  {
    id: 'fav-1',
    name: 'Berry Glaze Nourishing Lip Oil',
    brand: 'GlowDrop',
    category: 'Lips',
    rating: 5,
    badge: 'OBSESSED 💖',
    price: '$11.00',
    description: 'The juiciest strawberry glass shine without any sticky hair glue drama.',
    whyILoveIt: 'The giant doe-foot applicator feels like a cloud and it keeps my lips hydrated even through 6 hours of classes.',
    dupeAlert: 'Dupe for that famous $40 French designer lip oil!',
    image: IMG_LIP_GLOSS
  },
  {
    id: 'fav-2',
    name: 'Dewy Cheek Jelly in Wild Strawberry',
    brand: 'Juicy Club',
    category: 'Cheeks',
    rating: 5,
    badge: 'Holy Grail! ✨',
    price: '$14.00',
    description: 'Bouncy water-gel blush that melts into cheekbones like natural sunshine.',
    whyILoveIt: 'Gives that flushed post-workout or winter cheeks look that powder blush could never fake.',
    image: IMG_PINK_BLUSH
  },
  {
    id: 'fav-3',
    name: 'Cyber Ice Duo Eyeshadow Chrome',
    brand: 'Allie’s Glam Lab',
    category: 'Eyes',
    rating: 5,
    badge: 'OBSESSED 💖',
    price: '$12.00',
    description: 'Blinding periwinkle and silver shimmer with holographic micro-reflects.',
    whyILoveIt: 'Instant retro pop princess in one swipe on the center of the lid. Catches flash photos like crazy!',
    image: IMG_GLITTER_EYE
  },
  {
    id: 'fav-4',
    name: 'Velvet Glide Lip Pencil in Cinnamon Toast',
    brand: 'Allie’s Glam Lab',
    category: 'Lips',
    rating: 5,
    badge: '10/10 Repurchase',
    price: '$6.00',
    description: 'The ultimate warm brownie nude lip pencil for the 90s contour lip.',
    whyILoveIt: 'Literally six dollars and glides on creamy without dragging or drying out lips.',
    dupeAlert: 'Exact color match for the $24 luxury brand liner!',
    image: IMG_BROWN_LIP_LINERS
  },
  {
    id: 'fav-5',
    name: 'Glaze Drops Dewy Serum Illuminator',
    brand: 'Pink Candy Cosmetics',
    category: 'Base',
    rating: 4,
    badge: 'Budget Queen 💸',
    price: '$12.00',
    description: 'Pure liquid glow drops that turn any matte foundation into glazed donut skin.',
    whyILoveIt: 'Mix one drop into your moisturizer or skin tint and your skin instantly looks awake.',
    image: IMG_PINK_SKINCARE
  },
  {
    id: 'fav-6',
    name: 'Doll Lash Polymer Tubing Mascara',
    brand: 'Blink Babe',
    category: 'Eyes',
    rating: 5,
    badge: '10/10 Repurchase',
    price: '$12.50',
    description: 'Wraps lashes in smudge-proof tubes that wash off with warm water.',
    whyILoveIt: 'Never leaves dark rings under my eyes even during 90-degree humidity or gym class.',
    image: IMG_GLITTER_EYE
  }
];

export const MAKEUP_LOOKS: MakeupLook[] = [
  {
    id: 'look-cyber-glam',
    title: 'Cyber Pop Starlight Glam 🦋',
    vibe: 'Pop Princess Meets Euphoria Shimmer',
    tag: 'Trending ✨',
    difficulty: 'Party Mode ✨',
    time: '20 mins',
    description: 'Frosted periwinkle eyelids, glossy nude-brown lips, tiny star face gems, and brushed-up brows.',
    productsUsed: ['Cyber Ice Duo Eyeshadow', 'Cinnamon Toast Lip Pencil', 'Baby Doll Pink Gloss', 'Silver Star Gems'],
    image: IMG_GLITTER_EYE,
    stepGuide: [
      'Pat clear eye primer onto eyelids.',
      'Press frosted blue shimmer onto inner 2/3 of lid with wet finger.',
      'Stamp a sharp baby wing with dark brown liquid liner.',
      'Place 2 tiny star face gems right on high cheekbone.',
      'Line lips with brown pencil and flood with milky pink gloss!'
    ]
  },
  {
    id: 'look-strawberry-girl',
    title: 'Strawberry Dewy Girl 🍓',
    vibe: 'Freshly Picked Wild Berries & Sunlit Skin',
    tag: 'Allie’s Daily Fave 💕',
    difficulty: 'Super Easy 🍰',
    time: '10 mins',
    description: 'Bouncy pink cheek tint across cheekbones and nose bridge, faux freckles, and strawberry lip oil.',
    productsUsed: ['Dewy Cheek Jelly in Wild Strawberry', 'Berry Glaze Lip Oil', 'Brown Brow Pen (for freckles)'],
    image: IMG_PINK_BLUSH,
    stepGuide: [
      'Apply sheer dewy skin tint with fingers.',
      'Dot cream strawberry blush high on cheeks and across nose bridge.',
      'Tap 4-5 tiny faux freckles over nose with brow pen and soften with finger.',
      'Swipe berry lip oil over bare lips.'
    ]
  },
  {
    id: 'look-frosted-90s-lip',
    title: '90s Frosted Brown Lip & Soft Shimmer 🎀',
    vibe: 'Iconic Supermodel Glam with High Gloss Finish',
    tag: 'Everyday Classic ☕',
    difficulty: 'Super Easy 🍰',
    time: '12 mins',
    description: 'Defined chocolate lip contour with milky pink center gloss, paired with neutral satin lids and fluffy lashes.',
    productsUsed: ['Cinnamon Toast Lip Liner', 'Glaze Drops Dewy Serum', 'Doll Lash Tubing Mascara'],
    image: IMG_LIP_GLOSS,
    stepGuide: [
      'Gently outline lips with warm brown liner, overlining cupid’s bow.',
      'Blend liner edges inward with finger tip.',
      'Coat lips in baby pink or champagne glitter lip gloss.',
      'Curl lashes 3 times and add 2 coats of tubing mascara!'
    ]
  },
  {
    id: 'look-party-glitter',
    title: 'Pink Glitter Starlight Babe 💖',
    vibe: 'Concert, Birthday, or Friday Night Energy',
    tag: 'Major Compliments 🌟',
    difficulty: 'Medium 🎀',
    time: '25 mins',
    description: 'Hot pink glitter wings, high-beam liquid highlighter, and bold juicy hot pink lip lacquer.',
    productsUsed: ['Hot Pink Glitter Gel', 'Liquid Black Liner', 'Glaze Drops', 'Berry Glaze Oil'],
    image: IMG_HERO_VANITY,
    stepGuide: [
      'Create a classic winged liner first with black pen.',
      'Trace a line of pink glitter gel right on top of the black wing.',
      'Layer liquid highlighter on tip of nose and cheekbones.',
      'Finish with bold pink glossy lip!'
    ]
  }
];

export const MAKEUP_TIPS: MakeupTip[] = [
  {
    id: 'tip-base-1',
    category: 'Base',
    title: 'The 2-Minute Damp Skin Secret',
    emoji: '🍩',
    quickHack: 'Never apply tinted moisturizer to dry face!',
    fullTip: 'Pat your face with hydrating toner or mist and apply your tint while your face is still slightly damp. The product locks onto the moisture and will NEVER cling to dry nose patches.',
    commonMistake: 'Slapping matte foundation on thirsty skin and wondering why it separates by noon.'
  },
  {
    id: 'tip-blush-1',
    category: 'Blush',
    title: 'The "W" Nose Bridge Placement',
    emoji: '🍓',
    quickHack: 'Connect your blush across the bridge of your nose!',
    fullTip: 'Instead of two isolated circles, blend your cream blush from your left cheekbone, across the bridge of your nose, over to your right cheekbone. It mimics real sun flush and takes 5 years off your look.',
    commonMistake: 'Smiling while putting on blush; when you stop smiling, your blush hangs down near your jaw.'
  },
  {
    id: 'tip-eyes-1',
    category: 'Eyes',
    title: 'Inner Corner Champagne Sparkle',
    emoji: '✨',
    quickHack: 'The instant 8-hours-of-sleep cheat code.',
    fullTip: 'Dab a bright champagne or white-gold shimmer shadow right on your inner tear duct using your pinky finger. It instantly brightens tired eyes and makes any eye color pop in selfies!',
    commonMistake: 'Using dark heavy eyeliner all the way into the inner corner, which closes the eye in.'
  },
  {
    id: 'tip-lips-1',
    category: 'Lips',
    title: 'The Single Tissue Powder Blot',
    emoji: '💋',
    quickHack: 'Make any creamy lipstick stay on through lunch.',
    fullTip: 'Apply your lipstick, take a 2-ply facial tissue and split it so you have one thin sheet. Press it to your lips and dust translucent powder over the tissue. It sets the wax without changing the color!',
    commonMistake: 'Applying 5 coats of thick liquid lipstick that dries crusty and cracks when you smile.'
  }
];

export const GRWM_STEPS: GRWMStep[] = [
  {
    stepNumber: 1,
    title: 'Skin Drench & Lip Mask 💧',
    time: '2 mins',
    product: 'Milky Oat Toner + Berry Lip Balm',
    instructions: 'Pat hydrating toner twice onto face. Put a thick layer of lip mask on so your lips are soft by the time you reach lip liner.',
    allieComment: 'Do NOT skip the lip prep or your liner will catch on dry flakes!',
    icon: '💧'
  },
  {
    stepNumber: 2,
    title: 'The Glazed Skin Tint 🍩',
    time: '2 mins',
    product: 'Sheer Tint + 1 drop Glaze Illuminator',
    instructions: 'Mix on back of hand, warm between palms, and smooth over face like moisturizer.',
    allieComment: 'Fingers work way better than sponges here because body heat melts the product in.',
    icon: '✨'
  },
  {
    stepNumber: 3,
    title: 'Pinpoint Concealer 🎯',
    time: '1 min',
    product: 'Creamy Hydrating Concealer',
    instructions: 'Two tiny dots only: inner tear duct and corner of the nose. Tap out with ring finger.',
    allieComment: 'We are not painting triangle war paint under our eyes in 2026 girls.',
    icon: '🌸'
  },
  {
    stepNumber: 4,
    title: 'The Strawberry "W" Blush 🍓',
    time: '2 mins',
    product: 'Dewy Cheek Jelly in Wild Strawberry',
    instructions: 'Dot high on cheekbones and bridge of nose. Tap out until you look fresh and sun-kissed.',
    allieComment: 'My favorite step! You instantly look alive and happy.',
    icon: '🍓'
  },
  {
    stepNumber: 5,
    title: 'Fluffy Brow Sweep 🪄',
    time: '1 min',
    product: 'Fiber Tinted Brow Gel',
    instructions: 'Brush hairs upward and slightly outward at the tail.',
    allieComment: 'Brows should be fluffy and full of air, not drawn-on sharpie blocks.',
    icon: '🪄'
  },
  {
    stepNumber: 6,
    title: 'Triple-Pump Lash Curl & Tubing Mascara 👁️',
    time: '2 mins',
    product: 'Lash Curler + Doll Lash Mascara',
    instructions: 'Pump root, mid, and tips. Swipe 2 quick coats of brown tubing mascara.',
    allieComment: 'Brown mascara looks so soft and natural for school!',
    icon: '👁️'
  },
  {
    stepNumber: 7,
    title: 'The 90s Brown Liner + Baby Pink Gloss 🎀',
    time: '2 mins',
    product: 'Cinnamon Toast Liner + Baby Doll Lip Glaze',
    instructions: 'Line cupid’s bow and center bottom lip. Soften edges, flood with juicy gloss!',
    allieComment: 'Boom! You are officially glam and ready to conquer the day 💕',
    icon: '💋'
  }
];

export const LIP_COMBOS = [
  { name: 'The Glazed Pop Princess 👑', liner: 'Warm Chocolate Brown', gloss: 'Milky Baby Pink Shimmer', vibe: 'Pouty & Glazed' },
  { name: 'The Strawberry Shortcake 🍓', liner: 'Rosewood Berry', gloss: 'Translucent Red Berry Oil', vibe: 'Juicy & Fresh' },
  { name: 'The Nostalgic Cyber Model 🕶️', liner: 'Cool Deep Taupe', gloss: 'Icy Clear Diamond Shimmer', vibe: 'Chic & Edgy' },
  { name: 'The Peachy Clean Girl 🍑', liner: 'Warm Terracotta Bisque', gloss: 'Warm Apricot Glaze', vibe: 'Natural Sunshine' },
  { name: 'The Glazed Cherry Bomb 🍒', liner: 'Blackened Plum', gloss: 'Sheer Crimson Jelly', vibe: 'Dramatic & Moody' }
];
