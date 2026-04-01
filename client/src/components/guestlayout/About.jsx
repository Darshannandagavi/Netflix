import React, { useEffect, useRef, useState } from "react";

// Helper component for lazy loading images with blur effect
const LazyLoadImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div
      className={`lazy-load-image-background blur ${isLoaded ? "lazy-load-image-loaded" : ""}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};


// Carousel Component
const Carousel = ({ items, isTop = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (index) => {
    const container = containerRef.current;
    if (container) {
      const slideWidth = container.clientWidth;
      container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="entertainment-carouselstyles__CarouselWrapper">
      <div
        className="embla"
        ref={containerRef}
        style={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          display: "flex",
          gap: "20px",
          padding: "20px 0",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="entertainment-carouselstyles__TitleSlideWrapper"
            style={{ flex: "0 0 auto", width: "300px" }}
          >
            <div className="image__StyledImageContainer">
              <LazyLoadImage
                src={item.keyArt.horizontal.file}
                alt={item.showName}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="carousel-dots"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${currentIndex === idx ? "active" : ""}`}
            onClick={() => scrollTo(idx)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: currentIndex === idx ? "#e50914" : "#ccc",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};


// Main About Page Component
const About = () => {
  // Data from the provided HTML
  const carouselTopItems = [
    {
      id: "5dtx93aV9CDnKIYtcw7W1h",
      showName: "Peaky Blinders: The Immortal Man",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/3fA5oZbHHZaQ5xRcqGXqc3/9627b8b962148387edbf7a3f729722c0/sdp-8917c190-fc64-11f0-b4f3-0edd795e1a63-en.jpg",
        },
      },
    },
    {
      id: "4vMRwkHsDxLWi9MutAfwpo",
      showName: "Bridgerton",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/3o2diEz9Wm7D5yVg8m52T1/044b3fa7610d895321316e7fd5de22dc/sdp-24b256b1-b9b2-11f0-bdc2-0afff92d2e17-en.jpg",
        },
      },
    },
    {
      id: "7lHKUCbd0sRcafPMGEwY6A",
      showName: "The Great Flood",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/2bjIF85ojdEWmNAbn6kYYb/8454f6a6544ab1bef0c6c185546c93d9/sdp-148d6670-830d-11f0-86b4-0e2545bcb835-en.jpg",
        },
      },
    },
    {
      id: "avAkMRVh6kMAhqYPTzYLf",
      showName: "Can This Love Be Translated?",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/3NPObvKcQ0ZpcFb4Ff6iyw/d6c95016b643c249e2aa0b379fc5b4a3/sdp-24b6b590-d463-11f0-b7a4-12fe4501c6b5-en.jpg",
        },
      },
    },
    {
      id: "4U52QubhU5HOMUBbmU43fW",
      showName: "Troll 2",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/6LUh9yQtuoh9ViGNGIP5Ak/32bbca2432ee36aa24758976aba38b95/sdp-a334e190-aa9b-11f0-9fb9-12764af76201-en.jpg",
        },
      },
    },
    {
      id: "4EeJ1Nd0Kiq4uYUq8x3bDS",
      showName: "Stranger Things",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/1gxSOA7Yk4lUH64zTI7d3H/b116cad5999e23609cc3b56ee10d42a8/sdp-fd5ba020-5b7f-11f0-b361-12852f6885c3-en.jpg",
        },
      },
    },
  ];

  const carouselBottomItems = [
    {
      id: "6wwdbvhShJDKhRzz65iOxY",
      showName: "One Piece",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/2L0EkYz7ivWMBqD19tQl22/d38bd1eaa8580a2cf6b7d9a77f95daf6/sdp-66388430-f899-11f0-af0d-0affc9078cdb-en.jpg",
        },
      },
    },
    {
      id: "1qR9HK9cWs6L0v0RcaGgbZ",
      showName: "Firebreak",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/1jwqA8fvkwLipw0kffIFDE/c6c6410bdaee2a57aa1e593c89a21874/sdp-116c1180-f8a6-11f0-a850-123121b52ce5-en.jpg",
        },
      },
    },
    {
      id: "70JkiBHRx7E5xrKHUsPcRR",
      showName: "Frankenstein",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/5NRXvEVJaY9b4CsyFCBW23/e38a5a58233c68bdb1ccd0ee8eb3ea18/sdp-de90bf41-68db-11f0-848d-1276f559b52d-en.jpg",
        },
      },
    },
    {
      id: "4rM8bCnS4YfX5tWEZjKls6",
      showName: "Rulers of Fortune",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/1anKHpwugSgggnyB8w0QIA/1cca546bc7d9c98b294da2174e4fba17/sdp-2b736fc0-953b-11f0-81a1-0e72e30ba85f-en.jpg",
        },
      },
    },
    {
      id: "LJbtKFSmbTaoHfPIUztVh",
      showName: "People We Meet on Vacation",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/aKF15wOwaBzjbgavrLdTr/8aeed877391042732235d5cdacbcc43d/sdp-51a43990-ca10-11f0-adaa-0e3c29707c25-en.jpg",
        },
      },
    },
    {
      id: "yPqbqV5rn1hRxbuKpaz1m",
      showName: "KPop Demon Hunters",
      keyArt: {
        horizontal: {
          file: "//images.ctfassets.net/4cd45et68cgf/5LWGa5H3b1N9Npcx8t6A3E/bdd88fa7ca0f28273366fad2947f872b/sdp-6ea1c350-25ec-11f0-a272-12f80588fe31-en.jpg",
        },
      },
    },
  ];

  const highlightItems = [
    {
      id: "19SmboHMfreBfpVYR9DLIW",
      header: "Reach",
      image: {
        file: "//images.ctfassets.net/4cd45et68cgf/5BOhvXIGY5oJoY72dK5ryq/ac3e9f42df6f6a7469fd8cb042dc7f28/Netflix-About_REACH_Alpha.png",
      },
      body: "We are entertaining over half a billion people in more than 190 countries and 50 languages, programmed for just about every taste and culture.",
    },
    {
      id: "64I7EaKwN1y6jpEfBB9fwE",
      header: "Recommendations",
      image: {
        file: "//images.ctfassets.net/4cd45et68cgf/6YovAO77G038ah9RV3rlFn/fdd90339e007cbf71dbbcbbee4e7164d/Netflix-About_RECOMMENDATIONS_Alpha.png",
      },
      body: "To help you discover something great every time, no matter what you're looking for.",
    },
    {
      id: "6H59THWwxnGd08lyVRi6Ok",
      header: "Fandom",
      image: {
        file: "//images.ctfassets.net/4cd45et68cgf/5FIADpDambKAVBrQGG1qtW/df2d88b0bf868c96bccb9f10731c6890/Netflix-About_FANDOM_Alpha.png",
      },
      body: "When our series and films become cultural moments, you can feel it across music, books, fashion, travel and more.",
    },
  ];

  return (
    <div className="wrappers__AppOuterWrapper">
      <div className="wrappers__AppWrapper">
        <a href="#main-content" className="wrappers__SkipToContent">
          Skip to content
        </a>
     
        <div className="containers__AppContainer">
          <div className="containers__Children">
            <main
              id="main-content"
              className="containers__Page indexstyles__CustomPage"
            >
              <div className="indexstyles__BackgroundWrapper">
                <div className="indexstyles__BackgroundLayer"></div>
                <div className="indexstyles__BackgroundLayer"></div>
              </div>
              <div className="indexstyles__Wrapper">
                {/* Hero Section */}
                <section className="indexstyles__IntroSectionSpacer">
                  <div className="indexstyles__IntroSectionFixed">
                    <div className="indexstyles__IntroTextWrapper">
                      <p className="indexstyles__BaseHeader indexstyles__IntroText">
                        We are here to
                        <br />
                        entertain the world,
                        <br />
                        one fan at a time.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Entertainment Section */}
                <section
                  data-bg-gradient="red"
                  className="indexstyles__BaseSection indexstyles__EntertainmentSection"
                >
                  <div className="indexstyles__EntertainmentCarouselWrapper">
                    <Carousel items={carouselTopItems} isTop={true} />
                    <Carousel items={carouselBottomItems} isTop={false} />
                  </div>
                  <div className="indexstyles__EntertainmentTextWrapper">
                    <p className="indexstyles__BaseHeader indexstyles__SectionHeader indexstyles__EntertainmentHeader">
                      Thrilling everyone
                      <br />
                      again and again.
                    </p>
                    <div className="indexstyles__BaseRichText indexstyles__EntertainmentText">
                      <p>
                        Whatever you're into, whatever your mood, Netflix
                        delivers the next series, films and games you'll obsess
                        over. This is entertainment the world never sees coming
                        – and can't stop talking about.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Highlights Section */}
                <section
                  data-bg-gradient="orange"
                  className="indexstyles__BaseSection indexstyles__HighlightsSection"
                >
                  <p className="indexstyles__BaseHeader indexstyles__SectionHeader indexstyles__HighlightsHeader">
                    We do this through:
                  </p>
                  <div className="indexstyles__HighlightCardsWrapper">
                    {highlightItems.map((item, idx) => (
                      <div key={idx} className="indexstyles__HighlightCard">
                        <div className="indexstyles__HighlightCardImage">
                          <img src={item.image.file} alt={item.header} />
                        </div>
                        <div className="indexstyles__HighlightCardTextWrapper">
                          <p className="indexstyles__BaseHeader indexstyles__HighlightCardHeader">
                            {item.header}
                          </p>
                          <div className="indexstyles__BaseRichText indexstyles__HighlightCardText">
                            <p>{item.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
      <style>
        {`
        /* AboutNetflix.css */

/* ========== RESET & BASE STYLES ========== */

/* ========== FONTS ========== */
@font-face {
  font-family: NetflixSansThin;
  src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff2) format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: NetflixSansLight;
  src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2) format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: NetflixSansMedium;
  src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2) format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: NetflixSansBold;
  src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Bd.woff2) format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --light-font: NetflixSansLight, Helvetica Neue, Helvetica, Arial, sans-serif;
  --medium-font: NetflixSansMedium, Helvetica Neue, Helvetica, Arial, sans-serif;
  --bold-font: NetflixSansBold, Helvetica Neue, Helvetica, Arial, sans-serif;
  --netflix-red: #e50914;
  --netflix-red-dark: #b20710;
  --netflix-black: #000000;
  --netflix-gray: #221f1f;
  --netflix-light-gray: #f5f5f1;
}

/* ========== LAZY LOAD IMAGE STYLES ========== */
.lazy-load-image-background.blur {
  filter: blur(15px);
}

.lazy-load-image-background.blur.lazy-load-image-loaded {
  filter: blur(0);
  transition: filter 0.3s;
}

.lazy-load-image-background.blur > img {
  opacity: 0;
}

.lazy-load-image-background.blur.lazy-load-image-loaded > img {
  opacity: 1;
  transition: opacity 0.3s;
}

/* ========== LINK STYLES ========== */
.link__StyledAnchor {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link__StyledAnchor:hover {
  color: var(--netflix-red);
}

/* ========== WRAPPER STYLES ========== */
.wrappers__AppOuterWrapper {
  position: relative;
  background-size:contain;
  background-image:url("./bg_red_gradient.jpeg");
}

.wrappers__AppWrapper {
  position: relative;
  overflow-x: hidden;
}

.wrappers__SkipToContent {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--netflix-red);
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 100;
  transition: top 0.2s ease;
}

.wrappers__SkipToContent:focus {
  top: 0;
}

/* ========== HEADER STYLES ========== */
.headerstyles__HeaderWrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%);
  backdrop-filter: blur(10px);
}

/* Desktop Header */
.header-desktopstyles__HeaderContainerDesktop {
  display: flex;
  flex-direction: column;
  padding: 12px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .header-desktopstyles__HeaderContainerDesktop {
    display: none;
  }
}

.headerstyles__LanguageContainer {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  list-style: none;
  margin-bottom: 10px;
}

.header-language-region-dropdownstyles__Container {
  position: relative;
}

.header-language-region-dropdownstyles__DropdownControl {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.header-language-region-dropdownstyles__DropdownControl:hover {
  border-color: var(--netflix-red);
}

.header-language-region-dropdownstyles__DropdownPlaceholder {
  font-size: 12px;
}

.headerstyles__NavContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logostyles__HeaderLogoWrapper {
  flex-shrink: 0;
}

.header-logostyles__HeaderLogoImage {
  height: 32px;
  width: auto;
}

.headerstyles__NavItemsContainer {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.header-desktopstyles__NavItemLink {
  font-size: 14px;
  font-weight: 500;
}

.header-desktop-nav-link-expandstyles__NavItemDesktopExpand {
  position: relative;
}

.header-desktop-nav-link-expandstyles__NavItemDesktopExpandButton {
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}

.header-desktop-nav-link-expandstyles__NavItemDesktopExpandButton:hover {
  color: var(--netflix-red);
}

.header-desktopstyles__NextLinkIcon {
  display: inline-block;
  margin-left: 6px;
  font-size: 12px;
}

/* Mobile Header */
.header-mobilestyles__OverlayWrapper {
  display: none;
}

@media (max-width: 768px) {
  .header-mobilestyles__OverlayWrapper {
    display: block;
  }
}

.header-mobilestyles__HeaderContainerMobile {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
}

.header-mobilestyles__Hamburger {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
}

.header-mobilestyles__Hamburger::before,
.header-mobilestyles__Hamburger::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: white;
  left: 0;
  transition: all 0.3s ease;
}

.header-mobilestyles__Hamburger::before {
  top: 8px;
}

.header-mobilestyles__Hamburger::after {
  bottom: 8px;
}

.header-mobilestyles__NavItemMobile {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.header-mobilestyles__NavItemMobileLink {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flip.external-arrow {
  font-size: 18px;
  transform: rotate(-45deg);
  display: inline-block;
}

.header-mobilestyles__NavMobileAltTextLinks {
  list-style: none;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.header-mobilestyles__NavMobileAltTextLink {
  padding: 10px 0;
}

.header-mobilestyles__NavMobileAltIconLinks {
  display: flex;
  justify-content: center;
  gap: 30px;
  list-style: none;
  padding: 20px;
}

/* ========== MAIN CONTENT ========== */
.containers__AppContainer {
  padding-top: 120px;
}

@media (max-width: 768px) {
  .containers__AppContainer {
    padding-top: 80px;
  }
}

.indexstyles__CustomPage {
  position: relative;
}

.indexstyles__BackgroundWrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.indexstyles__BackgroundLayer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.indexstyles__BackgroundLayer:first-child {
  background: radial-gradient(circle at 20% 30%, #1a1a1a 0%, #000000 100%);
}

.indexstyles__BackgroundLayer:last-child {
  background: linear-gradient(180deg, transparent 0%, #000000 80%);
}

.indexstyles__Wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .indexstyles__Wrapper {
    padding: 0 20px;
  }
}

/* ========== HERO SECTION ========== */
.indexstyles__IntroSectionSpacer {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indexstyles__IntroSectionFixed {
  text-align: center;
}

.indexstyles__IntroTextWrapper {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
 
}

.indexstyles__BaseHeader {
  font-family: var(--bold-font);
  line-height: 1.2;
}

.indexstyles__IntroText {
  font-size: 8rem;
  font-weight: 700;
  background: white;
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@media (max-width: 768px) {
  .indexstyles__IntroText {
    font-size: 2.5rem;
  }
}

/* ========== ENTERTAINMENT SECTION ========== */
.indexstyles__BaseSection {
  padding: 80px 0;
}

.indexstyles__EntertainmentSection {
  position: relative;
}

.indexstyles__EntertainmentCarouselWrapper {
  margin-bottom: 60px;
}

.entertainment-carouselstyles__CarouselWrapper {
  margin-bottom: 30px;
  overflow: hidden;
}

.entertainment-carouselstyles__TitleSlideWrapper {
  flex: 0 0 auto;
  width: 300px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: pointer;
}

.entertainment-carouselstyles__TitleSlideWrapper:hover {
  transform: scale(1.05);
}

.image__StyledImageContainer {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.image__StyledImageContainer img {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-dot {
  transition: all 0.2s ease;
}

.carousel-dot.active {
  background: var(--netflix-red) !important;
  transform: scale(1.2);
}

.indexstyles__EntertainmentTextWrapper {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.indexstyles__SectionHeader {
  font-size: 3rem;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .indexstyles__SectionHeader {
    font-size: 2rem;
  }
}

.indexstyles__EntertainmentHeader {
  background: linear-gradient(135deg, #ffffff 0%, #e50914 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.indexstyles__BaseRichText {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ccc;
}

.indexstyles__EntertainmentText {
  font-size: 1.2rem;
}

/* ========== HIGHLIGHTS SECTION ========== */
.indexstyles__HighlightsSection {
  background: rgba(0, 0, 0, 0.73);
  border-radius: 40px;
  margin: 40px 0;
}

.indexstyles__HighlightsHeader {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.indexstyles__HighlightCardsWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 20px;
}

.indexstyles__HighlightCard {
  text-align: center;
  padding: 30px;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.indexstyles__HighlightCard:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(229,9,20,0.2);
}

.indexstyles__HighlightCardImage {
  margin-bottom: 20px;
}

.indexstyles__HighlightCardImage img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.indexstyles__HighlightCardHeader {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--netflix-red);
}

.indexstyles__HighlightCardText {
  font-size: 1rem;
  line-height: 1.5;
}

/* ========== FOOTER STYLES ========== */
.footerstyles__FooterWrapper {
  background: var(--netflix-gray);
  padding: 60px 40px 40px;
  margin-top: 80px;
}

@media (max-width: 768px) {
  .footerstyles__FooterWrapper {
    padding: 40px 20px;
  }
}

.footerstyles__FooterLogoWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footerstyles__FooterLogo {
  height: 30px;
  width: auto;
}

.footerstyles__FooterSocialsWrapper {
  display: flex;
  gap: 20px;
  list-style: none;
}

.footerstyles__FooterSocialWrapper {
  transition: transform 0.2s ease;
}

.footerstyles__FooterSocialWrapper:hover {
  transform: translateY(-3px);
}

.footerstyles__FooterSocialIcon {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
  transition: filter 0.2s ease;
}

.footerstyles__FooterSocialWrapper:hover .footerstyles__FooterSocialIcon {
  filter: brightness(0) invert(0.3) sepia(1) saturate(10) hue-rotate(-10deg);
}

.footerstyles__FooterLinksCopyrightWrapper {
  text-align: center;
}

.footerstyles__FooterLinksWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  list-style: none;
  margin-bottom: 30px;
}

.footerstyles__FooterLinkWrapper a,
.footerstyles__FooterLinkWrapper {
  color: #999;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
  cursor: pointer;
}

.footerstyles__FooterLinkWrapper a:hover,
.footerstyles__FooterLinkWrapper:hover {
  color: var(--netflix-red);
}

.footerstyles__FooterCopyright {
  color: #666;
  font-size: 12px;
  margin-top: 20px;
}

/* ========== RESPONSIVE UTILITIES ========== */
@media (max-width: 768px) {
  .footerstyles__FooterLinksWrapper {
    flex-direction: column;
    gap: 15px;
  }
  
  .footerstyles__FooterLogoWrapper {
    flex-direction: column;
    text-align: center;
  }
  
  .footerstyles__FooterLogo {
    display: none;
  }
  
  .footerstyles__FooterLogoWrapper .footerstyles__FooterLogo:first-child {
    display: block;
  }
}

/* ========== SCROLLBAR STYLES ========== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: var(--netflix-red);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--netflix-red-dark);
}

/* ========== ANIMATIONS ========== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.indexstyles__HighlightCard {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}

.indexstyles__HighlightCard:nth-child(1) { animation-delay: 0.1s; }
.indexstyles__HighlightCard:nth-child(2) { animation-delay: 0.3s; }
.indexstyles__HighlightCard:nth-child(3) { animation-delay: 0.5s; }

/* ========== COOKIE PREFERENCES MODAL STYLES (simplified) ========== */
.ot-sdk-show-settings {
  cursor: pointer;
}

/* ========== UTILITY CLASSES ========== */
.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 20px;
}

.mb-4 {
  margin-bottom: 20px;
}

.hidden {
  display: none;
}

@media (min-width: 769px) {
  .mobile-only {
    display: none;
  }
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
}
        `}
      </style>
    </div>
  );
};

export default About;
