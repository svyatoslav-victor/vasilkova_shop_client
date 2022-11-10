import { ProductGroup, Color, Brand } from "./types";

import jackets from './shop_icons/product_types/jackets.png';
import pants from './shop_icons/product_types/pants.png';
import coveralls from './shop_icons/product_types/coveralls.png';
import overalls from './shop_icons/product_types/overalls.png';
import tshirts from './shop_icons/product_types/tshirts.png';
import highVis from './shop_icons/product_types/high_visibility.png'

import lowShoes from './shop_icons/product_types/low_shoes.png';
import boots from './shop_icons/product_types/boots.png';
import highBoots from './shop_icons/product_types/high_boots.png';
import sandals from './shop_icons/product_types/sandals.png';

import headProtection from './shop_icons/product_types/head_protection.png';
import respiratoryProtection from './shop_icons/product_types/respiratory_protection.png';
import visualProtection from './shop_icons/product_types/visual_protection.png';
import hearingProtection from './shop_icons/product_types/hearing_protection.png';
import handProtection from './shop_icons/product_types/hand_protection.png';
import highAltitude from './shop_icons/product_types/high_altitude.png';

export const productGroups: ProductGroup[] = [
  {
    name: 'clothing',
    nameUA: 'одяг',
    types: [
      {
        name: 'jackets',
        nameUA: 'куртки',
        image: jackets
      },
      {
        name: 'pants',
        nameUA: 'штани',
        image: pants
      },
      {
        name: 'coveralls',
        nameUA: 'комбінезони',
        image: coveralls
      },
      {
        name: 'overalls',
        nameUA: 'напівкомбінезони',
        image: overalls
      },
      {
        name: 't-shirts',
        nameUA: 'футболки',
        image: tshirts
      },
      {
        name: 'high_visibility_clothing',
        nameUA: 'сигнальний одяг',
        image: highVis
      },
    ]
  },
  {
    name: 'shoes',
    nameUA: 'взуття',
    types: [
      {
        name: 'low_shoes',
        nameUA: 'напівчеревики',
        image: lowShoes
      },
      {
        name: 'boots',
        nameUA: 'черевики',
        image: boots
      },
      {
        name: 'high_boots',
        nameUA: 'чоботи',
        image: highBoots
      },
      {
        name: 'sandals',
        nameUA: 'сандалі',
        image: sandals
      }
    ]
  },
  {
    name: 'ppe',
    nameUA: 'засоби індивідуального захисту',
    types: [
      {
        name: 'head_and_face_protection',
        nameUA: 'захист голови та обличчя',
        image: headProtection
      },
      {
        name: 'respiratory_protection',
        nameUA: 'захист органів дихання',
        image: respiratoryProtection
      },
      {
        name: 'visual_protection',
        nameUA: 'захист органів зору',
        image: visualProtection
      },
      {
        name: 'hearing_protection',
        nameUA: 'захист органів слуху',
        image: hearingProtection
      },
      {
        name: 'hand_protection',
        nameUA: 'захист рук',
        image: handProtection
      },
      {
        name: 'high-altitude_work_equipment',
        nameUA: 'обладнання для висотних робіт',
        image: highAltitude
      },
    ]
  }, 
  {
    name: 'sale',
    nameUA: 'розпродаж',
    types: []
  }, 
  {
    name: 'custom_clothing',
    nameUA: 'пошив на замовлення',
    types: []
  }
];

export const productBrands: Brand[] = [
  {
    value: 'Nitras'
  },
  {
    value: 'Uvex'
  }
];

export const productColors: Color[] = [
  {
    hex: '#000000',
    value: 'Black',
    valueUA: 'Чорний'
  },
  {
    hex: '#ffffff',
    value: 'White',
    valueUA: 'Білий'
  },
  {
    hex: '#bf0909',
    value: 'Red',
    valueUA: 'Червоний'
  },
  {
    hex: '#0000e5',
    value: 'Blue',
    valueUA: 'Синій'
  },
  {
    hex: '#00006a',
    value: 'Dark Blue',
    valueUA: 'Темно-синій'
  },
  {
    hex: '#573313',
    value: 'Brown',
    valueUA: 'Коричневий'
  },
  {
    hex: '#dbdbb3',
    value: 'Beige',
    valueUA: 'Бежевий'
  },
  {
    hex: '#faecbe',
    value: 'Sand',
    valueUA: 'Пісочний'
  },
  {
    hex: '#808080',
    value: 'Gray',
    valueUA: 'Сірий'
  },
  {
    hex: '#575757',
    value: 'Dark Gray',
    valueUA: 'Темно-сірий'
  },
  {
    hex: '#bdbdbd',
    value: 'Light Gray',
    valueUA: 'Світло-сірий'
  },
  {
    hex: '#1e6f1e',
    value: 'Green',
    valueUA: 'Зелений'
  },
  {
    hex: '#1c571c',
    value: 'Dark Green',
    valueUA: 'Темно-зелений'
  },
  {
    hex: '#253b11',
    value: 'Khaki',
    valueUA: 'Хакі'
  },
  {
    hex: '#7bff00',
    value: 'Neon Green',
    valueUA: 'Яскраво-зелений'
  },
  {
    hex: '#ff4600',
    value: 'Neon Orange',
    valueUA: 'Помаранчевий'
  }
]
