import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import MainHeader from "../components/MainHeader/MainHeader";
import MainContent from "../components/MainContent/MainContent";
import FlashSales from "../components/FlashSales/FlashSales";
import ProductList from "../components/ProductList/ProductList";
import PromoBanner from "../components/PromoBanner/PromoBanner";
import FeaturesBar from "../components/FeaturesBar/FeaturesBar";
import FooterBar from "../components/FooterBar/FooterBar";
import { Layout } from "antd";

const { Content } = Layout;

function Home() {
  const [viewAllCategory, setViewAllCategory] = useState(null);

  return (
    <Layout style={{ minHeight: "100vh", background: "#fafafa" }}>
      <HeaderBar />
      <MainHeader />
      <Layout>
        <Content style={{ padding: "32px 32px 0 32px", background: "#fafafa" }}>
          <MainContent 
            categories={["Smartphones", "Laptops", "Headphones", "Smartwatch"]}
            bannerData={{ title: "Up to 60% off", subtitle: "Special Sale", image: "/banner-image.png" }}
          />
          <FlashSales />
          {viewAllCategory ? (
            <ProductList 
              title={viewAllCategory.charAt(0).toUpperCase() + viewAllCategory.slice(1)} 
              category={viewAllCategory} 
              viewAll={true} 
              onViewAll={() => setViewAllCategory(null)} 
            />
          ) : (
            <>
              <ProductList title="Smartphones" category="smartphones" viewAll={false} onViewAll={() => setViewAllCategory('smartphones')} />
              <ProductList title="Laptops" category="laptops" viewAll={false} onViewAll={() => setViewAllCategory('laptops')} />
              <PromoBanner />
              <ProductList title="Headphones" category="headphones" viewAll={false} onViewAll={() => setViewAllCategory('headphones')} />
              <ProductList title="Smartwatch" category="smartwatches" viewAll={false} onViewAll={() => setViewAllCategory('smartwatches')} />
              <FeaturesBar />
            </>
          )}
        </Content>
      </Layout>
      <FooterBar />
    </Layout>
  );
}

export default Home;