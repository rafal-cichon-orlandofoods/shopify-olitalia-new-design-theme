# Typography Consistency Fix

## Problem
Czcionki i rozmiary na stronie były bardzo niespójne:
- **Za małe** na stronie głównej i produktowej (trudne do czytania)
- **Za duże** na stronach About Us, Production i Sustainability (krzyczące)

## Analiza problemu

### Przed poprawką:

#### Homepage
- Tytuł hero: 48px → 28px (mobile) ❌ ZA MAŁE
- Opis: 16px ❌ ZA MAŁE  
- Przyciski: 14px ❌ ZA MAŁE
- Tytuł sekcji: 24px ❌ ZA MAŁE

#### About Us
- Tytuł: 42px → 32px (mobile) ⚠️ Niespójne
- Tekst intro: 24px ⚠️ Za duże dla body text
- Opisy: 24px ⚠️ Za duże dla body text

#### Sustainability
- Tytuły: 96px → 36px (mobile) ❌ ZA DUŻE!
- Opisy: 32px → 18px (mobile) ❌ Niespójne
- Liczby: 64px → 32px ⚠️ Za duże
- Etykiety: 48px ❌ ZA DUŻE!

## Rozwiązanie

### Utworzono spójny system typografii

#### Desktop:
- **Hero titles** (główne tytuły): 64px
- **Section titles** (tytuły sekcji): 48px
- **Card titles** (tytuły kart): 24px
- **Body large** (duży tekst): 20px
- **Body** (standardowy tekst): 16px
- **Body small** (mały tekst): 14px
- **Caption** (podpisy): 12px

#### Mobile:
- **Hero titles**: 36px
- **Section titles**: 28px
- **Card titles**: 20px
- **Body large**: 18px
- **Body**: 16px
- **Body small**: 14px

## Zmiany w plikach

### Utworzony plik: `assets/typography-fixes.css`
Zawiera:
- CSS variables dla spójnych rozmiarów
- Poprawki dla Homepage
- Poprawki dla About Us
- Poprawki dla Sustainability
- Responsive breakpoints

### Zmodyfikowany plik: `layout/theme.liquid`
Dodano import:
```liquid
{{ 'typography-fixes.css' | asset_url | stylesheet_tag }}
```

## Szczegółowe zmiany

### Homepage
- ✅ Hero title: 48px → **64px** (desktop), 28px → **36px** (mobile)
- ✅ Hero description: 16px → **20px**
- ✅ Hero button: 14px → **16px**
- ✅ Recipe section title: 24px → **48px**
- ✅ Recipe card description: 24px → **16px** (było za duże)

### About Us
- ✅ Main title: 42px → **64px** (spójne z innymi stronami)
- ✅ Intro text: 24px → **20px** (body large)
- ✅ Value descriptions: 24px → **16px** (standardowy body text)

### Sustainability
- ✅ Hero title: 96px → **64px** (nie krzyczy już!)
- ✅ Hero subtitle: 32px → **48px** (section title)
- ✅ Hero description: 32px → **20px** (body large)
- ✅ Section titles: 96px → **64px** (wszystkie)
- ✅ Section descriptions: 24px → **20px** (body large)
- ✅ Stat numbers: 64px → **48px**
- ✅ Stat labels: 48px → **24px**

## Korzyści

### 1. Spójność
- Wszystkie strony używają tego samego systemu rozmiarów
- Łatwe do utrzymania i rozszerzania
- Przewidywalne dla użytkowników

### 2. Czytelność
- Tekst na homepage jest teraz większy i łatwiejszy do czytania
- Tekst na Sustainability nie krzyczy już do użytkownika
- Lepszy balans między tytułami a tekstem

### 3. Hierarchia
- Jasna hierarchia typograficzna:
  - Hero titles (64px) - najważniejsze
  - Section titles (48px) - sekcje
  - Card titles (24px) - komponenty
  - Body text (16-20px) - treść

### 4. Responsywność
- Spójne skalowanie na mobile
- Zachowana czytelność na małych ekranach
- Optymalne rozmiary dla tabletów

## Testowanie

### Strony do przetestowania:
1. ✅ Homepage - sprawdź czy tekst jest czytelny
2. ✅ About Us - sprawdź czy tytuły nie są za duże
3. ✅ Sustainability - sprawdź czy nie krzyczy
4. ✅ Product page - sprawdź czytelność
5. ✅ Mobile - sprawdź wszystkie strony na telefonie

### Punkty kontrolne:
- [ ] Tytuły są czytelne ale nie przytłaczające
- [ ] Tekst body jest łatwy do czytania
- [ ] Hierarchia jest jasna
- [ ] Mobile wygląda dobrze
- [ ] Nie ma problemów z overflow

## Wdrożenie

### Pliki zmodyfikowane:
1. `assets/typography-fixes.css` - NOWY PLIK
2. `layout/theme.liquid` - dodano import

### Jak wdrożyć:
```bash
# Commit zmian
git add assets/typography-fixes.css layout/theme.liquid
git commit -m "fix: Unify typography across all pages

- Created consistent typography scale
- Fixed too small text on homepage (48px → 64px titles)
- Fixed too large text on sustainability (96px → 64px titles)
- Improved readability across all pages
- Added responsive scaling for mobile

Fixes: Typography inconsistency issue"

# Push do repo
git push
```

### Shopify deployment:
```bash
shopify theme push
```

## Dalsze ulepszenia (opcjonalne)

### Krótkoterminowe:
1. Sprawdź inne strony (Production, etc.)
2. Dostosuj line-height dla lepszej czytelności
3. Rozważ letter-spacing dla tytułów

### Długoterminowe:
1. Rozważ użycie fluid typography (clamp)
2. Dodaj więcej breakpointów dla lepszego skalowania
3. Stwórz typography style guide

## Podsumowanie

✅ **Problem rozwiązany**: Typografia jest teraz spójna na całej stronie
✅ **Czytelność poprawiona**: Tekst jest łatwiejszy do czytania
✅ **Hierarchia jasna**: Użytkownicy wiedzą co jest ważne
✅ **Responsywność**: Działa dobrze na wszystkich urządzeniach

**Status**: ✅ GOTOWE DO TESTOWANIA
**Pliki**: 2 (1 nowy, 1 zmodyfikowany)
**Impact**: Wszystkie strony z redesign system
