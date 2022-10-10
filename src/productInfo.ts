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
    types: [
      {
        name: 'jackets',
        image: jackets
      },
      {
        name: 'pants',
        image: pants
      },
      {
        name: 'coveralls',
        image: coveralls
      },
      {
        name: 'overalls',
        image: overalls
      },
      {
        name: 't-shirts',
        image: tshirts
      },
      {
        name: 'high_visibility_clothing',
        image: highVis
      },
    ]
  },
  {
    name: 'shoes',
    types: [
      {
        name: 'low_shoes',
        image: lowShoes
      },
      {
        name: 'boots',
        image: boots
      },
      {
        name: 'high_boots',
        image: highBoots
      },
      {
        name: 'sandals',
        image: sandals
      }
    ]
  },
  {
    name: 'ppe',
    types: [
      {
        name: 'head_and_face_protection',
        image: headProtection
      },
      {
        name: 'respiratory_protection',
        image: respiratoryProtection
      },
      {
        name: 'visual_protection',
        image: visualProtection
      },
      {
        name: 'hearing_protection',
        image: hearingProtection
      },
      {
        name: 'hand_protection',
        image: handProtection
      },
      {
        name: 'high-altitude_work_equipment',
        image: highAltitude
      },
    ]
  }, 
  {
    name: 'sale',
    types: []
  }, 
  {
    name: 'custom_clothing',
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
    value: 'Black'
  },
  {
    hex: '#ffffff',
    value: 'White'
  },
  {
    hex: '#bf0909',
    value: 'Red'
  },
  {
    hex: '#0000e5',
    value: 'Blue'
  },
  {
    hex: '#00006a',
    value: 'Dark Blue'
  },
  {
    hex: '#573313',
    value: 'Brown'
  },
  {
    hex: '#dbdbb3',
    value: 'Beige'
  },
  {
    hex: '#faecbe',
    value: 'Sand'
  },
  {
    hex: '#808080',
    value: 'Gray'
  },
  {
    hex: '#575757',
    value: 'Dark Gray'
  },
  {
    hex: '#bdbdbd',
    value: 'Light Gray'
  },
  {
    hex: '#1e6f1e',
    value: 'Green'
  },
  {
    hex: '#1c571c',
    value: 'Dark Green'
  },
  {
    hex: '#253b11',
    value: 'Khaki'
  },
  {
    hex: '#7bff00',
    value: 'Neon Green'
  },
  {
    hex: '#ff4600',
    value: 'Neon Orange'
  }
]
