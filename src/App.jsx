import { useEffect, useState } from 'react'
import './App.css'

const SIZES = [6, 7, 8, 9, 10, 11, 12]
// Extra charge for larger sizes
const SIZE_EXTRA = { 6: 0, 7: 0, 8: 0, 9: 600, 10: 800, 11: 1000, 12: 1200 }

const PRODUCTS = [
  {
    id: 'cloudwalk',
    short: 'Cloudwalk',
    name: 'Cloudwalk Elite',
    desc: 'Premium full-grain leather upper with memory foam insole for all-day comfort and style.',
    price: 20999,
    colour: 'Pristine White',
    swatch: '#d9d9d9',
    accent: '#111111',
    images: ['./shoes/cloudwalk_side.webp', './shoes/cloudwalk_angle.webp'],
  },
  {
    id: 'shadow',
    short: 'Shadow',
    name: 'Shadow Strike X',
    desc: 'Adaptive knit upper with ZeroG foam midsole. Built for elite athletes who demand peak performance.',
    price: 26999,
    colour: 'Midnight Black',
    swatch: '#1c1c1c',
    accent: '#111111',
    images: ['./shoes/shadow_side.webp', './shoes/shadow_angle.webp'],
  },
  {
    id: 'aeroflow',
    short: 'Aeroflow',
    name: 'Aeroflow Pro',
    desc: 'Breathable mesh upper with carbon fibre plate and AirFoam midsole for race-day performance.',
    price: 24499,
    colour: 'Electric Blue',
    swatch: '#1463ff',
    accent: '#0a5cff',
    images: ['./shoes/aeroflow_side.webp', './shoes/aeroflow_angle.webp'],
  },
]

const inr = (n) => '₹' + n.toLocaleString('en-IN')

export default function App() {
  const [index, setIndex] = useState(2)
  const [view, setView] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [size, setSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [bag, setBag] = useState([])
  const [animKey, setAnimKey] = useState(0)

  const product = PRODUCTS[index]
  const extra = size ? SIZE_EXTRA[size] : 0
  const total = product.price + extra

  const selectProduct = (i) => {
    if (i === index) return
    setIndex(i)
    setView(0)
    setFlipped(false)
    setSize(null)
    setAdded(false)
    setAnimKey((k) => k + 1)
  }

  const selectView = (v) => {
    setView(v)
    setAnimKey((k) => k + 1)
  }

  const addToBag = () => {
    setBag((b) => [...b, { id: product.id, size, price: total }])
    setAdded(true)
  }

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(t)
  }, [added])

  return (
    <div className="page" style={{ '--accent': product.accent }}>
      <header className="topbar">
        <span className="brand">STRYDE</span>
        <span className="bag" aria-live="polite">
          Bag <b>{bag.length}</b>
        </span>
      </header>

      <main className="product">
        <section className="info">
          <h1 key={'t' + index} className="title fade-up">{product.name}</h1>
          <p key={'d' + index} className="desc fade-up">{product.desc}</p>

          <div className="price-row">
            <span key={total} className="price pop">{inr(total)}</span>
            {extra > 0 && <span className="size-price-note">+{inr(extra)}</span>}
          </div>

          <hr className="divider" />

          <p className="label">
            Colour — <b>{product.colour}</b>
          </p>
          <div className="swatches">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                className={'swatch' + (i === index ? ' active' : '')}
                style={{ background: p.swatch }}
                onClick={() => selectProduct(i)}
                aria-label={p.colour}
              >
                {i === index && <span className="tick">✓</span>}
              </button>
            ))}
          </div>

          <p className="label">
            Size — <b>{size ?? 'Select'}</b>
          </p>
          <div className="sizes">
            {SIZES.map((s) => (
              <button
                key={s}
                className={'size' + (s === size ? ' active' : '')}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button className={'add-btn' + (added ? ' added' : '')} onClick={addToBag}>
            {added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>
        </section>

        <section className="gallery">
          <div className="stage">
            <img
              key={animKey}
              src={product.images[view]}
              alt={product.name}
              className="hero-img slide-in"
              style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
            />
          </div>
          <div className="thumbs">
            {product.images.map((src, v) => (
              <button
                key={src}
                className={'thumb' + (v === view ? ' active' : '')}
                onClick={() => selectView(v)}
              >
                <img src={src} alt="" />
              </button>
            ))}
            <button
              className={'thumb flip' + (flipped ? ' active' : '')}
              onClick={() => setFlipped((f) => !f)}
              aria-label="Flip view"
            >
              ↔
            </button>
          </div>
        </section>
      </main>

      <footer className="also">
        <span className="also-label">Also available</span>
        {PRODUCTS.map((p, i) => (
          <button
            key={p.id}
            className={'also-item' + (i === index ? ' active' : '')}
            onClick={() => selectProduct(i)}
          >
            <img src={p.images[0]} alt="" />
            <span>{p.short}</span>
          </button>
        ))}
      </footer>
    </div>
  )
}
