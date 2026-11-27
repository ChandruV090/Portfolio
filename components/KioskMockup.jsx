"use client";

import { useState } from "react";
import { Icon } from "./Icons";

export default function KioskMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [diningMode, setDiningMode] = useState("Dine In");
  const [cartCount, setCartCount] = useState(2);
  const [selectedBurger, setSelectedBurger] = useState("Truffle Smash Burger");
  const [comboUpgrade, setComboUpgrade] = useState(true);

  const screens = [
    { id: 0, title: "1. Welcome Screen", tag: "Attract Mode" },
    { id: 1, title: "2. Visual Menu", tag: "Browse & Select" },
    { id: 2, title: "3. Item Customizer", tag: "Modifiers & Upgrades" },
    { id: 3, title: "4. Cart & Upsell", tag: "Order Review" },
    { id: 4, title: "5. Contactless Pay", tag: "NFC & QR" },
    { id: 5, title: "6. Order Token", tag: "Kitchen Ticket" },
  ];

  return (
    <div className="kiosk-container">
      {/* Top screen switcher navigation */}
      <div className="kiosk-tabs">
        {screens.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`kiosk-tab ${activeScreen === idx ? "active" : ""}`}
            onClick={() => setActiveScreen(idx)}
          >
            <span className="tab-tag">{s.tag}</span>
            <span className="tab-title">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Hardware kiosk frame representation */}
      <div className="kiosk-hardware-wrapper">
        <div className="kiosk-hardware">
          {/* Top bezel with camera / status indicator */}
          <div className="kiosk-bezel-top">
            <span className="kiosk-sensor" />
            <span className="kiosk-brand">OneHubPOS Kiosk • 32" Touch</span>
            <span className="kiosk-status-dot" />
          </div>

          {/* Interactive touch screen viewport */}
          <div className="kiosk-screen">
            {/* Screen 0: Welcome */}
            {activeScreen === 0 && (
              <div className="ks-screen ks-welcome">
                <div className="ks-header">
                  <div className="ks-logo">
                    <span className="ks-logo-mark">1P</span>
                    <strong>OneHubPOS</strong>
                  </div>
                  <div className="ks-lang-pill">
                    <span>English</span>
                    <Icon name="arrow-right" size={14} />
                  </div>
                </div>

                <div className="ks-welcome-hero">
                  <span className="ks-badge">Welcome • Touch to Order</span>
                  <h2>Choose Your Dining Preference</h2>
                  <p>Order fresh, customize your meal, and pay in seconds.</p>

                  <div className="ks-modes">
                    <button
                      type="button"
                      className={`ks-mode-card ${diningMode === "Dine In" ? "selected" : ""}`}
                      onClick={() => {
                        setDiningMode("Dine In");
                        setActiveScreen(1);
                      }}
                    >
                      <div className="ks-mode-icon">🍽️</div>
                      <h3>Dine In</h3>
                      <p>Enjoy at our table</p>
                    </button>

                    <button
                      type="button"
                      className={`ks-mode-card ${diningMode === "Take Away" ? "selected" : ""}`}
                      onClick={() => {
                        setDiningMode("Take Away");
                        setActiveScreen(1);
                      }}
                    >
                      <div className="ks-mode-icon">🛍️</div>
                      <h3>Take Away</h3>
                      <p>Packaged to go</p>
                    </button>
                  </div>
                </div>

                <div className="ks-banner-promo" onClick={() => setActiveScreen(1)}>
                  <div className="promo-text">
                    <span className="promo-tag">LIMITED SPECIAL</span>
                    <h4>Chef’s Truffle Double Combo</h4>
                    <p>Double Wagyu Patty, Truffle Aioli, Crisp Bacon &amp; Herb Fries</p>
                  </div>
                  <div className="promo-price">
                    <span>Only</span>
                    <strong>$14.50</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Screen 1: Menu */}
            {activeScreen === 1 && (
              <div className="ks-screen ks-menu">
                <div className="ks-menu-top">
                  <div className="ks-logo-sm">
                    <strong>OneHubPOS</strong> · <span>{diningMode}</span>
                  </div>
                  <button type="button" className="ks-cart-indicator" onClick={() => setActiveScreen(3)}>
                    <span>Cart ({cartCount})</span>
                    <strong>$19.80</strong>
                  </button>
                </div>

                <div className="ks-menu-body">
                  {/* Category sidebar */}
                  <div className="ks-cat-sidebar">
                    <button type="button" className="cat-btn active">🍔 Burgers</button>
                    <button type="button" className="cat-btn">🍗 Combos</button>
                    <button type="button" className="cat-btn">🍟 Sides & Dips</button>
                    <button type="button" className="cat-btn">🥤 Drinks</button>
                    <button type="button" className="cat-btn">🍦 Desserts</button>
                  </div>

                  {/* Products grid */}
                  <div className="ks-products-grid">
                    <div className="ks-product-card" onClick={() => { setSelectedBurger("Truffle Smash Burger"); setActiveScreen(2); }}>
                      <div className="prod-badge">Chef's Pick</div>
                      <div className="prod-img-box">🍔</div>
                      <h4>Truffle Smash Burger</h4>
                      <p>Aged cheddar, truffle glaze, crisp shallots</p>
                      <div className="prod-foot">
                        <strong>$11.50</strong>
                        <button type="button" className="prod-add-btn">Customize +</button>
                      </div>
                    </div>

                    <div className="ks-product-card" onClick={() => { setSelectedBurger("Crispy Chicken Deluxe"); setActiveScreen(2); }}>
                      <div className="prod-badge">Popular</div>
                      <div className="prod-img-box">🍗</div>
                      <h4>Crispy Chicken Deluxe</h4>
                      <p>Buttermilk breast, spicy slaw, honey mustard</p>
                      <div className="prod-foot">
                        <strong>$9.80</strong>
                        <button type="button" className="prod-add-btn">Customize +</button>
                      </div>
                    </div>

                    <div className="ks-product-card" onClick={() => { setSelectedBurger("Smoky BBQ Double"); setActiveScreen(2); }}>
                      <div className="prod-img-box">🥓</div>
                      <h4>Smoky BBQ Double</h4>
                      <p>Double patty, smoked bacon, BBQ drizzle</p>
                      <div className="prod-foot">
                        <strong>$12.90</strong>
                        <button type="button" className="prod-add-btn">Customize +</button>
                      </div>
                    </div>

                    <div className="ks-product-card" onClick={() => { setSelectedBurger("Garden Plant Burger"); setActiveScreen(2); }}>
                      <div className="prod-badge green">Vegan</div>
                      <div className="prod-img-box">🥗</div>
                      <h4>Garden Plant Burger</h4>
                      <p>Plant-based patty, vegan gouda, avocado</p>
                      <div className="prod-foot">
                        <strong>$10.20</strong>
                        <button type="button" className="prod-add-btn">Customize +</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ks-bottom-nav">
                  <button type="button" className="ks-secondary-btn" onClick={() => setActiveScreen(0)}>← Cancel</button>
                  <button type="button" className="ks-primary-btn" onClick={() => setActiveScreen(3)}>
                    View Order ({cartCount} items) • $19.80 →
                  </button>
                </div>
              </div>
            )}

            {/* Screen 2: Customizer */}
            {activeScreen === 2 && (
              <div className="ks-screen ks-customizer">
                <div className="ks-menu-top">
                  <button type="button" className="ks-back-link" onClick={() => setActiveScreen(1)}>← Back to Menu</button>
                  <strong>Customizing: {selectedBurger}</strong>
                </div>

                <div className="ks-customizer-scroll">
                  <div className="ks-item-preview">
                    <div className="preview-emoji">🍔</div>
                    <div>
                      <h3>{selectedBurger}</h3>
                      <p className="muted">Base price: $11.50 • 680 kcal</p>
                    </div>
                  </div>

                  {/* Step 1: Bun */}
                  <div className="ks-option-group">
                    <label className="group-title">1. Choose Your Bun</label>
                    <div className="chips-row">
                      <button type="button" className="chip active">Brioche (Standard)</button>
                      <button type="button" className="chip">Sesame Seed</button>
                      <button type="button" className="chip">Gluten-Free (+$1.00)</button>
                      <button type="button" className="chip">Lettuce Wrap</button>
                    </div>
                  </div>

                  {/* Step 2: Extra Toppings */}
                  <div className="ks-option-group">
                    <label className="group-title">2. Add Extra Indulgence</label>
                    <div className="modifiers-grid">
                      <div className="modifier-item checked">
                        <span>🥓 Crispy Smoked Bacon</span>
                        <em>+$1.80</em>
                      </div>
                      <div className="modifier-item checked">
                        <span>🧀 Extra Aged Cheddar</span>
                        <em>+$1.20</em>
                      </div>
                      <div className="modifier-item">
                        <span>🧅 Caramelized Onions</span>
                        <em>+$0.80</em>
                      </div>
                      <div className="modifier-item">
                        <span>🍄 Sautéed Mushrooms</span>
                        <em>+$1.50</em>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Meal Combo Upgrade */}
                  <div className={`ks-combo-box ${comboUpgrade ? "selected" : ""}`} onClick={() => setComboUpgrade(!comboUpgrade)}>
                    <input type="checkbox" checked={comboUpgrade} onChange={() => {}} />
                    <div>
                      <strong>Make it a Meal Combo! (+$3.50)</strong>
                      <p>Includes seasoned crinkle fries + large fountain drink</p>
                    </div>
                  </div>
                </div>

                <div className="ks-bottom-nav">
                  <div className="qty-picker">
                    <button type="button">-</button>
                    <span>1</span>
                    <button type="button">+</button>
                  </div>
                  <button
                    type="button"
                    className="ks-primary-btn"
                    onClick={() => {
                      setCartCount(cartCount + 1);
                      setActiveScreen(3);
                    }}
                  >
                    Add to Cart • ${comboUpgrade ? "18.00" : "14.50"}
                  </button>
                </div>
              </div>
            )}

            {/* Screen 3: Cart Review & Upsell */}
            {activeScreen === 3 && (
              <div className="ks-screen ks-cart">
                <div className="ks-menu-top">
                  <button type="button" className="ks-back-link" onClick={() => setActiveScreen(1)}>← Add More Items</button>
                  <strong>Review Order ({diningMode})</strong>
                </div>

                <div className="ks-cart-scroll">
                  <div className="ks-cart-item">
                    <div className="cart-item-title">
                      <strong>1x Truffle Smash Burger (Combo)</strong>
                      <span>$18.00</span>
                    </div>
                    <p className="cart-mods">Brioche Bun, Smoked Bacon, Extra Cheddar, Seasoned Fries, Diet Cola</p>
                  </div>

                  <div className="ks-cart-item">
                    <div className="cart-item-title">
                      <strong>1x Crispy Chicken Deluxe</strong>
                      <span>$9.80</span>
                    </div>
                    <p className="cart-mods">Buttermilk Fried, Spicy Slaw, Honey Mustard</p>
                  </div>

                  {/* Contextual Smart Upsell */}
                  <div className="ks-upsell-module">
                    <span className="upsell-tag">⚡ Recommended Add-ons</span>
                    <div className="upsell-items">
                      <div className="upsell-card">
                        <span>🍟 Truffle Dip</span>
                        <strong>+$0.95</strong>
                        <button type="button">+ Add</button>
                      </div>
                      <div className="upsell-card">
                        <span>🍪 Choc Chip Cookie</span>
                        <strong>+$1.50</strong>
                        <button type="button">+ Add</button>
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="ks-cost-summary">
                    <div className="cost-row"><span>Subtotal</span><span>$27.80</span></div>
                    <div className="cost-row"><span>State Tax (8%)</span><span>$2.22</span></div>
                    <div className="cost-row total"><span>Total Amount</span><strong>$30.02</strong></div>
                  </div>
                </div>

                <div className="ks-bottom-nav">
                  <button type="button" className="ks-secondary-btn" onClick={() => setActiveScreen(1)}>+ Add Items</button>
                  <button type="button" className="ks-primary-btn" onClick={() => setActiveScreen(4)}>
                    Pay $30.02 Now →
                  </button>
                </div>
              </div>
            )}

            {/* Screen 4: Contactless Payment */}
            {activeScreen === 4 && (
              <div className="ks-screen ks-payment">
                <div className="ks-menu-top">
                  <button type="button" className="ks-back-link" onClick={() => setActiveScreen(3)}>← Back to Cart</button>
                  <strong>Express Payment</strong>
                </div>

                <div className="ks-payment-body">
                  <div className="pay-amount-box">
                    <span>Total Due</span>
                    <h2>$30.02</h2>
                  </div>

                  <div className="ks-pay-methods">
                    <div className="pay-method-card active" onClick={() => setActiveScreen(5)}>
                      <div className="pay-icon">💳</div>
                      <h3>Tap / Insert Card</h3>
                      <p>Apple Pay, Google Pay, Credit or Debit</p>
                      <span className="ks-pulse-badge">Follow terminal prompt 👉</span>
                    </div>

                    <div className="pay-method-card" onClick={() => setActiveScreen(5)}>
                      <div className="pay-icon">📱</div>
                      <h3>Scan UPI / QR</h3>
                      <p>Instant phone QR payment</p>
                    </div>
                  </div>

                  <div className="pay-terminal-prompt">
                    <div className="terminal-radar" />
                    <p>Tap your contactless card or phone on the reader to the right.</p>
                  </div>
                </div>

                <div className="ks-bottom-nav">
                  <button type="button" className="ks-secondary-btn" onClick={() => setActiveScreen(3)}>Cancel</button>
                  <button type="button" className="ks-primary-btn" onClick={() => setActiveScreen(5)}>Simulate Payment Success →</button>
                </div>
              </div>
            )}

            {/* Screen 5: Order Token */}
            {activeScreen === 5 && (
              <div className="ks-screen ks-token">
                <div className="ks-token-content">
                  <div className="ks-success-icon">✓</div>
                  <span className="ks-badge green">Payment Approved</span>
                  <h2>Order Placed Successfully!</h2>

                  <div className="ks-token-card">
                    <span className="token-label">YOUR ORDER NUMBER</span>
                    <strong className="token-number">#104</strong>
                    <p className="token-meta">{diningMode} • 2 items • $30.02</p>
                  </div>

                  <div className="ks-token-instructions">
                    <p>🖨️ <strong>Please collect your printed receipt below.</strong></p>
                    <p>Watch for order #104 on the overhead kitchen display screen.</p>
                  </div>

                  <button
                    type="button"
                    className="ks-primary-btn"
                    style={{ marginTop: 20 }}
                    onClick={() => setActiveScreen(0)}
                  >
                    Start New Order (Done)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hardware bottom bezel & receipt dispenser */}
          <div className="kiosk-bezel-bottom">
            <div className="receipt-slot">
              <span className="receipt-label">RECEIPT DISPENSER</span>
              <div className="receipt-paper" />
            </div>
          </div>
        </div>

        {/* Physical card reader terminal on right of hardware */}
        <div className="kiosk-hardware-pos">
          <div className="pos-screen-mini">
            <span>READY FOR TAP</span>
            <strong>$30.02</strong>
          </div>
          <div className="pos-nfc-symbol">📶</div>
          <div className="pos-keypad">
            <span /><span /><span />
            <span /><span /><span />
            <span /><span /><span />
          </div>
          <div className="pos-card-slot" />
        </div>
      </div>
    </div>
  );
}
