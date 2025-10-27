import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Увлажняющая сыворотка с гиалуроновой кислотой', category: 'Уход за лицом', price: 1650, image: '💧', description: 'Глубокое увлажнение на 24 часа' },
  { id: 2, name: 'Питательный крем для сухой кожи', category: 'Уход за лицом', price: 1320, image: '🌸', description: 'Восстановление и питание' },
  { id: 3, name: 'Витаминная маска для лица', category: 'Уход за лицом', price: 990, image: '✨', description: 'С витамином C и E' },
  { id: 4, name: 'Восстанавливающий шампунь', category: 'Уход за волосами', price: 880, image: '🧴', description: 'Для поврежденных волос' },
  { id: 5, name: 'Маска для волос с кератином', category: 'Уход за волосами', price: 1100, image: '💆‍♀️', description: 'Интенсивное восстановление' },
  { id: 6, name: 'Термозащитный спрей', category: 'Уход за волосами', price: 770, image: '🌡️', description: 'Защита от высоких температур' },
  { id: 7, name: 'Набор бесшовных резинок (пастель)', category: 'Аксессуары', price: 220, image: '🎀', description: 'Нежные пастельные оттенки' },
  { id: 8, name: 'Набор бесшовных резинок (яркие)', category: 'Аксессуары', price: 220, image: '🌈', description: 'Яркие цвета для настроения' },
  { id: 9, name: 'Спонжи для макияжа (4 шт)', category: 'Аксессуары', price: 330, image: '🔮', description: 'Мягкие и упругие' },
  { id: 10, name: 'Мицеллярная вода', category: 'Уход за лицом', price: 550, image: '💦', description: 'Деликатное очищение' },
  { id: 11, name: 'Бальзам-кондиционер', category: 'Уход за волосами', price: 660, image: '🌿', description: 'Легкое расчесывание' },
  { id: 12, name: 'Скраб для губ', category: 'Уход за лицом', price: 440, image: '💋', description: 'Сахарный скраб с маслами' },
];

export default function Index() {
  const [currentSection, setCurrentSection] = useState<'home' | 'catalog' | 'about' | 'delivery'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', 'Уход за лицом', 'Уход за волосами', 'Аксессуары'];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">✨</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Beauty Bloom
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentSection('home')}
                className={`text-sm font-medium transition-colors ${currentSection === 'home' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setCurrentSection('catalog')}
                className={`text-sm font-medium transition-colors ${currentSection === 'catalog' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setCurrentSection('about')}
                className={`text-sm font-medium transition-colors ${currentSection === 'about' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                О бренде
              </button>
              <button 
                onClick={() => setCurrentSection('delivery')}
                className={`text-sm font-medium transition-colors ${currentSection === 'delivery' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                Доставка
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4">
                        {cart.map(item => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="text-4xl">{item.image}</div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                  <p className="text-primary font-semibold">{item.price} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="text-sm font-medium">{item.quantity}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto"
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оплатить
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {currentSection === 'home' && (
          <div className="space-y-16">
            <section className="text-center space-y-6 py-12">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
                Красота начинается с заботы
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Добро пожаловать в мир сияющей кожи и роскошных волос! Мы объединяем силу природы 
                и передовые научные разработки, чтобы предложить вам средства, которые действительно работают.
              </p>
              <Button size="lg" className="mt-4" onClick={() => setCurrentSection('catalog')}>
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🌿</div>
                  <h3 className="text-2xl font-semibold mb-3">Для кожи лица</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Инновационные сыворотки и кремы</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Натуральные компоненты: гиалуроновая кислота, витамин C</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Решения для каждого типа кожи</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">💇‍♀️</div>
                  <h3 className="text-2xl font-semibold mb-3">Для волос</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Шампуни, маски и кондиционеры премиум-класса</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Защита от повреждений и ультрафиолета</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Средства для любого типа волос</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-6 text-center">Почему выбирают нас?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h4 className="font-semibold mb-2">Безопасный состав</h4>
                  <p className="text-sm text-muted-foreground">Без парабенов и сульфатов</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🔬</div>
                  <h4 className="font-semibold mb-2">Доказанная эффективность</h4>
                  <p className="text-sm text-muted-foreground">Подтверждено исследованиями</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">👩‍⚕️</div>
                  <h4 className="font-semibold mb-2">Поддержка экспертов</h4>
                  <p className="text-sm text-muted-foreground">Консультации косметологов</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentSection === 'catalog' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Каталог продукции</h2>
              <p className="text-muted-foreground">Выберите категорию или просмотрите все товары</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 h-48 flex items-center justify-center text-7xl">
                      {product.image}
                    </div>
                    <div className="p-4 space-y-3">
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                      <h3 className="font-semibold text-sm leading-tight min-h-[40px]">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-primary">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">О бренде Beauty Bloom</h2>
              <p className="text-xl text-muted-foreground">Превратите ежедневный уход в ритуал наслаждения</p>
            </div>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="text-center text-6xl">🌸</div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Beauty Bloom</strong> — это бренд, созданный для тех, 
                    кто понимает истинную ценность качественного ухода за собой. Мы верим, что красота — 
                    это не просто внешность, это состояние души, уверенность в себе и любовь к каждой 
                    клеточке своего тела.
                  </p>
                  
                  <p>
                    Наша миссия — помочь вам раскрыть естественную красоту через профессиональную косметику, 
                    которая работает. Мы тщательно отбираем каждый продукт, следим за составами и выбираем 
                    только проверенные бренды с доказанной эффективностью.
                  </p>

                  <div className="bg-primary/5 rounded-2xl p-6 space-y-3">
                    <h3 className="text-foreground font-semibold text-lg">Наши ценности:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Icon name="Sparkles" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>Качество превыше всего — каждый продукт проходит строгий отбор</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Sparkles" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>Честность — мы никогда не преувеличиваем эффект и рассказываем о составе</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Sparkles" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>Забота о клиентах — ваша красота и комфорт для нас на первом месте</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-center text-lg font-medium text-foreground pt-4">
                    💖 Ваше отражение в зеркале скажет "спасибо"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'delivery' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Доставка и оплата</h2>
              <p className="text-xl text-muted-foreground">Быстро и удобно по всему Санкт-Петербургу</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🚚</div>
                    <h3 className="text-xl font-semibold">Доставка по СПб</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="MapPin" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Доставка по всему Санкт-Петербургу</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Clock" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Доставка в течение 1-2 дней</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Package" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Бесплатная доставка от 3000 ₽</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎁</div>
                    <h3 className="text-xl font-semibold">Специальное предложение</h3>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 space-y-2">
                    <p className="font-semibold text-primary text-lg">Скидка 5% в районе Приморского квартала!</p>
                    <p className="text-sm text-muted-foreground">
                      При оформлении заказа укажите адрес в районе Приморского квартала 
                      и получите дополнительную скидку 5% на весь заказ.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">💳</div>
                  <h3 className="text-xl font-semibold">Способы оплаты</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Icon name="CreditCard" size={32} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Банковская карта</p>
                    <p className="text-xs text-muted-foreground mt-1">Visa, MasterCard, МИР</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Icon name="Wallet" size={32} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Электронные кошельки</p>
                    <p className="text-xs text-muted-foreground mt-1">ЮMoney, QIWI, WebMoney</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Icon name="Banknote" size={32} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Наличными</p>
                    <p className="text-xs text-muted-foreground mt-1">При получении</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Контакты</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <span>+7 (812) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <span>info@beautybloom.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <span>Санкт-Петербург, Приморский район</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="font-semibold">Beauty Bloom</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Beauty Bloom. Ваша красота — наша забота
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
