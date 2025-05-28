import { phones as phoneImages, laptops as laptopImages, headphones as headphoneImages, smartwatches as smartwatchImages} from './imageProduct';
export const laptops = [
  // MacBook
  {
    id: 'mbp16',
    brand: 'MacBook',
    name: 'MacBook Pro 16 M3',
    image: laptopImages.macbookProM3,
    price: 2499,
    originalPrice: 2699,
    specs: {
      screen: '16" Liquid Retina XDR',
      processor: 'M3 Pro',
      ram: '18GB',
      storage: '512GB SSD',
      gpu: '14-core GPU'
    },
    rating: 4.9,
    reviews: 280
  },
  {
    id: 'mba15',
    brand: 'MacBook',
    name: 'MacBook Air 15 M3',
    image: laptopImages.macbookAirM3,
    price: 1299,
    originalPrice: 1499,
    specs: {
      screen: '15.3" Liquid Retina',
      processor: 'M3',
      ram: '16GB',
      storage: '512GB SSD',
      gpu: '10-core GPU'
    },
    rating: 4.8,
    reviews: 180
  },
  // Lenovo
  {
    id: 'thinkp1',
    brand: 'Lenovo',
    name: 'ThinkPad P1 Gen 7',
    image: laptopImages.thinkpadP1,
    price: 1899,
    originalPrice: 2099,
    specs: {
      screen: '16" QHD+ IPS',
      processor: 'Intel Core Ultra 9 185H',
      ram: '32GB',
      storage: '1TB SSD',
      gpu: 'NVIDIA RTX 4070'
    },
    rating: 4.7,
    reviews: 150
  },
  {
    id: 'legion7i',
    brand: 'Lenovo',
    name: 'Legion Pro 7i',
    image: laptopImages.legionPro7i,
    price: 2299,
    originalPrice: 2499,
    specs: {
      screen: '16" WQXGA IPS',
      processor: 'Intel Core i9-13900HX',
      ram: '32GB',
      storage: '1TB SSD',
      gpu: 'NVIDIA RTX 4080'
    },
    rating: 4.8,
    reviews: 160
  },
  // ASUS
  {
    id: 'rogz14',
    brand: 'ASUS',
    name: 'ROG Zephyrus G14',
    image: laptopImages.rogZephyrusG14,
    price: 1599,
    originalPrice: 1799,
    specs: {
      screen: '14" 2.8K OLED 120Hz',
      processor: 'AMD Ryzen 9',
      ram: '16GB',
      storage: '1TB SSD',
      gpu: 'NVIDIA RTX 4060'
    },
    rating: 4.8,
    reviews: 220
  },
  {
    id: 'rogg18',
    brand: 'ASUS',
    name: 'ROG Strix G18',
    image: laptopImages.rogStrixG18,
    price: 2299,
    originalPrice: 2499,
    specs: {
      screen: '18" QHD+ 240Hz',
      processor: 'Intel i9-14900HX',
      ram: '32GB',
      storage: '2TB SSD',
      gpu: 'NVIDIA RTX 4070'
    },
    rating: 4.7,
    reviews: 140
  }
];

export const headphones = [
  // JBL
  {
    id: 'quantum810',
    brand: 'JBL',
    name: 'Quantum 810 Wireless',
    image: headphoneImages.quantum810,
    price: 199,
    originalPrice: 249,
    specs: {
      type: 'Over-ear',
      battery: '43 hours',
      anc: 'Yes',
      driver: '50mm Dynamic',
      bluetooth: '5.2'
    },
    rating: 4.6,
    reviews: 180
  },
  {
    id: 'club950',
    brand: 'JBL',
    name: 'Club 950NC',
    image: headphoneImages.club950nc,
    price: 249,
    originalPrice: 299,
    specs: {
      type: 'Over-ear',
      battery: '55 hours',
      anc: 'Yes',
      driver: '40mm Dynamic',
      bluetooth: '5.0'
    },
    rating: 4.5,
    reviews: 150
  },
  // Sony
  {
    id: 'wh1000xm5',
    brand: 'Sony',
    name: 'WH-1000XM5',
    image: headphoneImages.wh1000xm5,
    price: 399,
    originalPrice: 449,
    specs: {
      type: 'Over-ear',
      battery: '40 hours',
      anc: 'Yes',
      driver: '30mm Dynamic',
      bluetooth: '5.2'
    },
    rating: 4.8,
    reviews: 320
  },
  {
    id: 'wh910n',
    brand: 'Sony',
    name: 'WH-H910N',
    image: headphoneImages.whH910N,
    price: 249,
    originalPrice: 299,
    specs: {
      type: 'Over-ear',
      battery: '35 hours',
      anc: 'Yes',
      driver: '25mm Dynamic',
      bluetooth: '5.0'
    },
    rating: 4.6,
    reviews: 180
  },
  // Marshall
  {
    id: 'monitor2',
    brand: 'Marshall',
    name: 'Monitor II ANC',
    image: headphoneImages.monitorII,
    price: 299,
    originalPrice: 349,
    specs: {
      type: 'Over-ear',
      battery: '45 hours',
      anc: 'Yes',
      driver: '40mm Dynamic',
      bluetooth: '5.0'
    },
    rating: 4.5,
    reviews: 150
  },
  {
    id: 'major4',
    brand: 'Marshall',
    name: 'Major IV Wireless',
    image: headphoneImages.majorIV,
    price: 199,
    originalPrice: 249,
    specs: {
      type: 'Over-ear',
      battery: '80 hours',
      anc: 'No',
      driver: '40mm Dynamic',
      bluetooth: '5.0'
    },
    rating: 4.4,
    reviews: 120
  }
];

export const smartwatches = [
  // Apple
  {
    id: 'awu2',
    brand: 'Apple',
    name: 'Watch Ultra 2',
    image: smartwatchImages.watchUltra2,
    price: 799,
    originalPrice: 899,
    specs: {
      display: '49mm OLED',
      battery: '36 hours',
      waterproof: '100m',
      sensors: 'Heart, ECG, Temperature',
      storage: '64GB'
    },
    rating: 4.9,
    reviews: 280
  },
  {
    id: 'aws9',
    brand: 'Apple',
    name: 'Watch Series 9',
    image: smartwatchImages.watchSeries9,
    price: 399,
    originalPrice: 449,
    specs: {
      display: '45mm OLED',
      battery: '18 hours',
      waterproof: '50m',
      sensors: 'Heart, ECG, Temperature',
      storage: '64GB'
    },
    rating: 4.8,
    reviews: 320
  },
  // Samsung
  {
    id: 'gw6pro',
    brand: 'Samsung',
    name: 'Galaxy Watch 6 Pro',
    image: smartwatchImages.galaxyWatch6Pro,
    price: 449,
    originalPrice: 499,
    specs: {
      display: '45mm AMOLED',
      battery: '48 hours',
      waterproof: '5ATM',
      sensors: 'Heart, ECG, BIA',
      storage: '16GB'
    },
    rating: 4.7,
    reviews: 220
  },
  {
    id: 'gw6c',
    brand: 'Samsung',
    name: 'Galaxy Watch 6 Classic',
    image: smartwatchImages.galaxyWatch6Classic,
    price: 399,
    originalPrice: 449,
    specs: {
      display: '43mm AMOLED',
      battery: '40 hours',
      waterproof: '5ATM',
      sensors: 'Heart, ECG, BIA',
      storage: '16GB'
    },
    rating: 4.6,
    reviews: 180
  },
  // Xiaomi
  {
    id: 'watch2pro',
    brand: 'Xiaomi',
    name: 'Watch S2 Pro',
    image: smartwatchImages.watchS2Pro,
    price: 299,
    originalPrice: 349,
    specs: {
      display: '46mm AMOLED',
      battery: '14 days',
      waterproof: '5ATM',
      sensors: 'Heart, SpO2, Sleep',
      storage: '4GB'
    },
    rating: 4.5,
    reviews: 180
  },
  {
    id: 'watch2',
    brand: 'Xiaomi',
    name: 'Watch 2',
    image: smartwatchImages.watch2,
    price: 199,
    originalPrice: 249,
    specs: {
      display: '44mm AMOLED',
      battery: '12 days',
      waterproof: '5ATM',
      sensors: 'Heart, SpO2, Sleep',
      storage: '4GB'
    },
    rating: 4.4,
    reviews: 150
  }
];

export const smartphones = [
  // iPhone
  {
    id: 'ip15pm',
    brand: 'iPhone',
    name: 'iPhone 15 Pro Max',
    image: phoneImages.iphone15ProMax,
    price: 1199,
    originalPrice: 1299,
    specs: {
      screen: '6.7" Super Retina XDR OLED',
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      camera: '48MP + 12MP + 12MP'
    },
    rating: 4.9,
    reviews: 380
  },
  {
    id: 'ip15',
    brand: 'iPhone',
    name: 'iPhone 15',
    image: phoneImages.iphone15,
    price: 799,
    originalPrice: 899,
    specs: {
      screen: '6.1" Super Retina XDR OLED',
      processor: 'A16 Bionic',
      ram: '6GB',
      storage: '128GB',
      camera: '48MP + 12MP'
    },
    rating: 4.7,
    reviews: 320
  },
  // Samsung
  {
    id: 's24u',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    image: phoneImages.galaxyS24Ultra,
    price: 1299,
    originalPrice: 1399,
    specs: {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '200MP + 50MP + 10MP + 12MP'
    },
    rating: 4.8,
    reviews: 450
  },
  {
    id: 's24p',
    brand: 'Samsung',
    name: 'Galaxy S24+',
    image: phoneImages.galaxyS24Plus,
    price: 999,
    originalPrice: 1099,
    specs: {
      screen: '6.7" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP + 12MP + 10MP'
    },
    rating: 4.7,
    reviews: 280
  },
  // Xiaomi
  {
    id: '14pro',
    brand: 'Xiaomi',
    name: 'Xiaomi 14 Pro',
    image: phoneImages.xiaomi14Pro,
    price: 999,
    originalPrice: 1099,
    specs: {
      screen: '6.73" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP + 50MP + 50MP'
    },
    rating: 4.6,
    reviews: 180
  },
  {
    id: '14',
    brand: 'Xiaomi',
    name: 'Xiaomi 14',
    image: phoneImages.xiaomi14,
    price: 699,
    originalPrice: 799,
    specs: {
      screen: '6.36" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP + 50MP + 32MP'
    },
    rating: 4.5,
    reviews: 150
  },
  // Vivo
  {
    id: 'x100pro',
    brand: 'Vivo',
    name: 'Vivo X100 Pro',
    image: phoneImages.vivoX100Pro,
    price: 999,
    originalPrice: 1099,
    specs: {
      screen: '6.78" AMOLED',
      processor: 'Dimensity 9300',
      ram: '16GB',
      storage: '512GB',
      camera: '50MP + 50MP + 50MP'
    },
    rating: 4.7,
    reviews: 160
  },
  {
    id: 'x100',
    brand: 'Vivo',
    name: 'Vivo X100',
    image: phoneImages.vivoX100,
    price: 799,
    originalPrice: 899,
    specs: {
      screen: '6.78" AMOLED',
      processor: 'Dimensity 9300',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP + 50MP + 12MP'
    },
    rating: 4.5,
    reviews: 120
  }
];