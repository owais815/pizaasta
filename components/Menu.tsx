"use client";

import { useState } from "react";
import { useLightbox } from "@/lib/lightbox-context";

const tabs = [
  { target: "panel-pizza", label: "Pizza" },
  { target: "panel-pasta", label: "Pasta" },
  { target: "panel-fries", label: "Fries" },
  { target: "panel-rolls", label: "Rolls & Drinks" },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("panel-pizza");
  const { open } = useLightbox();

  return (
    <section className="section section-alt" id="menu">
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Our Menu</span>
          <h2>Freshly Baked, Every Time</h2>
          {/* <p>All prices in PKR. Sizes: S 7&Prime; · M 10&Prime; · L 13&Prime; · XL 16&Prime;</p> */}
        </div>

        <div className="menu-tabs" id="menuTabs">
          {tabs.map((tab) => (
            <button
              key={tab.target}
              className={`menu-tab${activeTab === tab.target ? " active" : ""}`}
              onClick={() => setActiveTab(tab.target)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PIZZA */}
        <div className={`menu-panel${activeTab === "panel-pizza" ? " active" : ""}`} id="panel-pizza">
          <div className="price-card">
            <h3>Crust Pizzas</h3>
            <p className="price-note">Stuffed crust specialties</p>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>M 10&Prime;</th>
                  <th>L 13&Prime;</th>
                  <th>XL 16&Prime;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Crown Crust</td>
                  <td>1200</td>
                  <td>1600</td>
                  <td>2100</td>
                </tr>
                <tr>
                  <td>Kabab Stuff</td>
                  <td>1200</td>
                  <td>1600</td>
                  <td>2100</td>
                </tr>
                <tr>
                  <td>Cheese Stuff</td>
                  <td>1200</td>
                  <td>1600</td>
                  <td>2100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="price-card">
            <h3>Special Pizzas</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>M 10&Prime;</th>
                  <th>L 13&Prime;</th>
                  <th>XL 16&Prime;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pizzasta Special</td>
                  <td>1100</td>
                  <td>1450</td>
                  <td>1950</td>
                </tr>
                <tr>
                  <td>Behari Kabab</td>
                  <td>1100</td>
                  <td>1450</td>
                  <td>1950</td>
                </tr>
                <tr>
                  <td>Chicken Tandoori</td>
                  <td>1100</td>
                  <td>1450</td>
                  <td>1950</td>
                </tr>
                <tr>
                  <td>Malai Boti</td>
                  <td>1100</td>
                  <td>1450</td>
                  <td>1950</td>
                </tr>
                <tr>
                  <td>Chicken Extreme</td>
                  <td>1100</td>
                  <td>1450</td>
                  <td>1950</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="price-card">
            <h3>Classic Pizzas</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>S 7&Prime;</th>
                  <th>M 10&Prime;</th>
                  <th>L 13&Prime;</th>
                  <th>XL 16&Prime;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chicken Tikka BBQ</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
                <tr>
                  <td>Fajita Sicilian</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
                <tr>
                  <td>Chicken Fajita</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
                <tr>
                  <td>Vegetarians</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
                <tr>
                  <td>Chicken Supreme</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
                <tr>
                  <td>Cheese Lover</td>
                  <td>500</td>
                  <td>1000</td>
                  <td>1350</td>
                  <td>1750</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="price-card">
            <h3>Premium Pizzas</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>L 13&Prime;</th>
                  <th>XL 16&Prime;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chicken Cheese Stuffer</td>
                  <td>1700</td>
                  <td>2250</td>
                </tr>
                <tr>
                  <td>Kabab Twister</td>
                  <td>1700</td>
                  <td>2250</td>
                </tr>
                <tr>
                  <td>Peri Peri</td>
                  <td>1700</td>
                  <td>2250</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="price-card">
            <h3>Add Ons</h3>
            <div className="addons-grid">
              <table className="price-table">
                <tbody>
                  <tr>
                    <td>Dip Sauce</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Special Sauce</td>
                    <td>130</td>
                  </tr>
                </tbody>
              </table>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Topping</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Extra Topping</td>
                    <td>150</td>
                    <td>250</td>
                    <td>350</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PASTA */}
        <div className={`menu-panel${activeTab === "panel-pasta" ? " active" : ""}`} id="panel-pasta">
          <div className="price-card">
            <h3>Cheesy Pasta</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>Half</th>
                  <th>Full</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pizzasta Special</td>
                  <td>500</td>
                  <td>950</td>
                </tr>
                <tr>
                  <td>Flaming Pasta</td>
                  <td>400</td>
                  <td>750</td>
                </tr>
                <tr>
                  <td>Kababish Pasta</td>
                  <td>450</td>
                  <td>850</td>
                </tr>
                <tr>
                  <td>Creamy Pasta</td>
                  <td>400</td>
                  <td>750</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FRIES */}
        <div className={`menu-panel${activeTab === "panel-fries" ? " active" : ""}`} id="panel-fries">
          <div className="price-card">
            <h3>Cheesy Fries</h3>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavour</th>
                  <th>Half</th>
                  <th>Full</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Plain Fries</td>
                  <td>200</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>Loaded Fries</td>
                  <td>300</td>
                  <td>600</td>
                </tr>
                <tr>
                  <td>Malai Boti Fries</td>
                  <td>400</td>
                  <td>800</td>
                </tr>
                <tr>
                  <td>Pizza Fries</td>
                  <td>—</td>
                  <td>850</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ROLLS + DRINKS */}
        <div className={`menu-panel${activeTab === "panel-rolls" ? " active" : ""}`} id="panel-rolls">
          <div className="price-card">
            <h3>Cheesy Rolls</h3>
            <table className="price-table">
              <tbody>
                <tr>
                  <td>Spin Roll</td>
                  <td>520</td>
                </tr>
                <tr>
                  <td>Behari Roll</td>
                  <td>580</td>
                </tr>
                <tr>
                  <td>Pizzasta Roll</td>
                  <td>630</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="price-card">
            <h3>Drinks</h3>
            <p className="price-note">Ask in-store for current pricing on bottle size</p>
            <table className="price-table">
              <tbody>
                <tr>
                  <td>Soft Drinks</td>
                  <td>Regular / 1L / 1.5L</td>
                </tr>
                <tr>
                  <td>Mineral Water</td>
                  <td>Regular / Large</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <a
          className="menu-ref-link btn btn-outline js-lightbox-trigger"
          href="/images/menu-board.jpg"
          onClick={(e) => {
            e.preventDefault();
            open("/images/menu-board.jpg", "Pizzasta full menu poster");
          }}
        >
          🔍 View full menu poster
        </a>
      </div>
    </section>
  );
}
