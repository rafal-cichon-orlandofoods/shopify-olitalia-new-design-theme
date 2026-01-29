# Recipe Product Links - Dokumentacja

## Jak to działa?

System automatycznie wykrywa nazwy produktów w **składnikach (Ingredients)** i **instrukcjach (Instructions)** przepisów i zamienia je na klikalne linki, zachowując funkcjonalność checkboxów.

## Przykłady

### W składnikach:
**Przed:**
```
¼ Cup Olitalia Extra Virgin Olive Oil, plus extra for preparing
```

**Po:**
```
¼ Cup [Olitalia Extra Virgin Olive Oil](/products/extra-virgin-olive-oil), plus extra for preparing
```

### W instrukcjach:
**Przed:**
```
Heat the Olitalia Extra Virgin Olive Oil in a large pan over medium heat.
```

**Po:**
```
Heat the [Olitalia Extra Virgin Olive Oil](/products/extra-virgin-olive-oil) in a large pan over medium heat.
```

## Jak dodać nowe produkty?

Edytuj plik: `assets/recipe-product-links.js`

Znajdź sekcję `productMap` i dodaj nowy wpis:

```javascript
this.productMap = {
  'Olitalia Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',
  'Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',
  'Caputo Semolina Flour': '/products/caputo-semolina-flour',
  
  // Dodaj nowy produkt tutaj:
  'Nazwa Produktu w Składniku': '/products/url-produktu',
};
```

## Zasady:

1. **Dokładne dopasowanie** - Nazwa musi dokładnie pasować do tekstu w składniku
2. **Pierwszeństwo** - Jeśli składnik zawiera kilka produktów, linkowany jest tylko pierwszy
3. **Case-sensitive** - Wielkość liter ma znaczenie
4. **Aliasy** - Możesz dodać kilka wpisów dla tego samego produktu (np. pełna nazwa i skrót)

## Przykłady użycia:

```javascript
// Pełna nazwa produktu
'Olitalia Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',

// Skrót
'EVOO': '/products/extra-virgin-olive-oil',

// Różne warianty
'Extra Virgin Olive Oil': '/products/extra-virgin-olive-oil',
'Oliwa z oliwek extra virgin': '/products/extra-virgin-olive-oil',

// Produkty z marką
'Caputo Semolina Flour': '/products/caputo-semolina-flour',
'Caputo "00" Flour': '/products/caputo-00-flour',
```

## Style CSS

Linki produktów mają następujące style (w `redesign-recipe-page.css`):

- **Kolor**: `#385DFF` (niebieski z design system)
- **Hover**: Podkreślenie + ciemniejszy niebieski
- **Checked**: Przekreślenie razem z resztą tekstu
- **Pointer events**: Zawsze klikalne, nawet gdy checkbox jest aktywny

## SEO Benefits

✅ Google widzi linki do produktów w kontekście przepisów (ingredients + instructions)
✅ Internal linking poprawia SEO
✅ Użytkownicy mogą łatwo znaleźć produkty w każdym kroku
✅ Nie psuje UX - checkbox działa normalnie w obu sekcjach

## Accessibility

✅ Screen readery rozpoznają linki
✅ Keyboard navigation działa poprawnie
✅ Title attribute na linkach dla tooltipów

## Testowanie

1. Otwórz stronę przepisu
2. **W sekcji Ingredients:**
   - Sprawdź czy nazwa produktu jest niebieska i podkreślona przy hover
   - Kliknij link - powinien otworzyć stronę produktu
   - Kliknij checkbox - powinien zaznaczyć składnik
   - Kliknij ponownie link - powinien działać mimo zaznaczonego checkboxa
3. **W sekcji Instructions:**
   - Sprawdź czy nazwa produktu jest niebieska i podkreślona przy hover
   - Kliknij link - powinien otworzyć stronę produktu
   - Kliknij checkbox - powinien zaznaczyć krok
   - Kliknij ponownie link - powinien działać mimo zaznaczonego checkboxa

## Troubleshooting

**Problem**: Link się nie pojawia
- Sprawdź czy nazwa produktu w `productMap` dokładnie pasuje do tekstu w składniku
- Sprawdź wielkość liter
- Sprawdź czy skrypt jest załadowany w template

**Problem**: Checkbox nie działa
- Sprawdź czy `e.stopPropagation()` jest w event listenerze linku
- Sprawdź czy `pointer-events: all` jest w CSS

**Problem**: Link nie jest klikany
- Sprawdź z-index w CSS
- Sprawdź czy label nie blokuje kliknięcia
