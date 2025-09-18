import ContactUs from "@/components/ui/contactus";
import FloatingCalculator from "@/components/ui/floatingcalculator";
import { projects, slides } from "@/lib/data";
import {
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Index() {
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isVisible, setIsVisible] = useState({
    hero: false,
    founder: false,
    dreamhouse: false,
    properties: false,
    whychoose: false,
    buildtogether: false,
    footer: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  const [projectCurrentSlide, setProjectCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Calculate responsive items per slide
  const getItemsPerSlide = () => {
    if (windowWidth < 640) return 1; // mobile: 1 item
    if (windowWidth < 1280) return 2; // sm to lg: 2 items  
    return 3; // xl and above: 3 items
  };
  
  const itemsPerSlide = getItemsPerSlide();
  const totalSlides = Math.ceil(projects.length / itemsPerSlide);
  
  useEffect(() => {
    const handleResize = () => {
      const prevItemsPerSlide = getItemsPerSlide();
      setWindowWidth(window.innerWidth);
      
      // Check if items per slide will change after window width update
      const newWidth = window.innerWidth;
      const newItemsPerSlide = newWidth < 640 ? 1 : newWidth < 1280 ? 2 : 3;
      
      if (prevItemsPerSlide !== newItemsPerSlide) {
        setProjectCurrentSlide(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProjectCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [projects.length, totalSlides]);

  const goToSlideProject = (slideIndex) => {
    setProjectCurrentSlide(slideIndex);
  };

  const nextSlideProject = () => {
    setProjectCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlideProject = () => {
    setProjectCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };


  return (
    <div className="min-h-screen bg-[#84C4FF] text-white overflow-x-hidden">
      {!isMinimized && (
        <FloatingCalculator
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
        />
      )}
      <header
        className={`fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-20 py-1 lg:py-4 transition-all duration-500 ${
          scrollY > 50
            ? "bg-opacity-35 backdrop-blur-md py-1"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1422px] mx-auto flex items-center justify-between">
          <div className="flex items-center animate-fade-in">
            <img
              src="/logo.png"
              alt="JGRT Builders Logo"
              className="h-16 sm:h-18 lg:h-24 w-auto transform hover:scale-105 transition-transform duration-300"
            />
            <div className="text-black font-encode text-sm sm:text-lg lg:text-xl font-bold">
              JGRT GROUP
            </div>
          </div>

          <nav className="hidden xl:flex items-center bg-[#E6E8EE] rounded-full px-2 py-2 animate-slide-down xl:mr-40">
            <a
              href="#hero"
              className="flex items-center px-4 lg:px-6 py-3 text-black hover:bg-black hover:text-white rounded-full transform hover:scale-105 transition-all duration-500 ease-in-out"
            >
              Home
            </a>
            <a
              href="#properties"
              className="flex items-center px-4 lg:px-6 py-3 text-black hover:bg-black hover:text-white rounded-full transition-all duration-500 ease-in-out"
            >
              Properties
            </a>
            <div
              className="flex items-center px-3 lg:px-4 py-3 text-black hover:bg-black hover:text-white rounded-full cursor-pointer transition-all duration-500 ease-in-out"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <span>Calculate</span>
            </div>
            <a
              href="#contactus"
              className="px-4 lg:px-6 py-3 text-black hover:bg-black hover:text-white rounded-full transition-all duration-500 ease-in-out"
            >
              Contact
            </a>
          </nav>

          <div className="hidden xl:flex items-center bg-[#E6E8EE] rounded-full px-2 py-2 animate-slide-down">
            <a
              href="#"
              className="px-4 lg:px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              FAQ
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        <div
          className={`xl:hidden absolute top-full left-0 w-full backdrop-blur-md border-t border-white/10 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="px-4 py-6 space-y-4">
            <a
              href="#hero"
              className="block px-4 py-3 bg-white text-black rounded-lg font-medium"
            >
              Home
            </a>
            <a
              href="#properties"
              className="block px-4 py-3 bg-white text-black rounded-lg transition-colors"
            >
              Properties
            </a>
            <a
              onClick={() => setIsMinimized(!isMinimized)}
              className="block px-4 py-3 bg-white text-black rounded-lg transition-colors"
            >
              Calculate
            </a>
            <a
              href="#contactus"
              className="block px-4 py-3 bg-white text-black rounded-lg transition-colors"
            >
              Contact
            </a>
            <div className="pt-4 border-t border-white/10 flex gap-4">
              <a
                href="#"
                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition-colors"
              >
                FAQ
              </a>
            </div>
          </nav>
        </div>
      </header>

      <section
        id="hero"
        className="relative min-h-screen px-4 sm:px-6 lg:px-20 pt-24 lg:pt-32 pb-12 lg:pb-20"
      >
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full opacity-5 lg:opacity-10">
          <div className="grid grid-cols-8 lg:grid-cols-12 gap-1 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="h-0 border-t border-white/10 animate-pulse"
                style={{ animationDelay: `${i * 10}ms` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-[1422px] mx-auto relative">
          <div className="relative min-h-[calc(100vh-200px)]">
            <div className="relative inline-block overflow-hidden">
              <h1
                className={`bg-clip-text text-4xl sm:text-6xl lg:text-8xl xl:text-[120px] 2xl:text-[200px]
                            font-bold font-poppins leading-none text-transparent uppercase tracking-tight
                            transform transition-all duration-1000 bg-[linear-gradient(124deg,#000_51.38%,rgba(255,255,255,0)_110.75%)]
                            ${isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                Welcome to
              </h1>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div
                className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 delay-300 ${
                  isVisible.hero
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[120px] 2xl:text-[200px] font-bold font-poppins leading-none text-black uppercase tracking-tight">
                  JGRT
                </h1>

                <p className="text-black text-base sm:text-lg lg:text-xl max-w-md font-inter leading-relaxed">
                  Your Vision, Our Experience With 20+ years in the industry,
                  we've served 5,000+ satisfied customers and delivered 30+
                  successful projects that speak for themselves.
                </p>

                <button className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-bold hover:bg-gray-100 transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                  Read more
                </button>
              </div>

              <div
                className={`relative transform transition-all duration-1000 delay-500 ${
                  isVisible.hero
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-[100px] lg:rounded-[200px] xl:rounded-[300px] border border-white overflow-hidden bg-white/90 group hover:scale-105 transition-all duration-500">
                  <img
                    src="/apartmentwithplants.jpg"
                    alt="Modern house with pool"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-[#E6E8EE] rounded-full flex items-center justify-center shadow-2xl hover:bg-white transform hover:scale-110 hover:rotate-45 transition-all duration-300 cursor-pointer">
                    <ArrowRight className="w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="founder" className="px-4 sm:px-6 lg:px-14 py-12 lg:py-20">
        <div className="max-w-[1422px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div
              className={`space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
                isVisible.founder
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-black text-3xl sm:text-4xl lg:text-[44px] font-medium font-poppins leading-tight">
                Founder &<br />
                Chairman's Speech
              </h2>

              <blockquote className="text-black text-base sm:text-lg font-poppins leading-relaxed">
                "When I founded JGRT Group over two decades ago, my vision was
                simple – to create buildings and plots that stand not just as
                structures, but as legacies of trust, quality, and innovation.
                Today, seeing our journey of 20+ years, 5,000+ happy customers,
                and over 30 landmark projects, I feel proud that our commitment
                has never wavered.
                <br />
                <br />
                Our success is not measured merely in numbers, but in the smiles
                of our clients, the strength of our partnerships, and the value
                we bring to communities. At JGRT, we believe in continuous
                learning, adapting, and pushing boundaries to set new benchmarks
                in the building industry.
                <br />
                <br />
                As we step into the future, our promise remains the same – to
                build with integrity, deliver with excellence, and grow with our
                people."
              </blockquote>

              <button className="bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-bold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
                A.Rajavel (Founder & Chairman)
              </button>
              <button className="ml-5 bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-bold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
                A.R.JayaSurya (Managing Director)
              </button>
            </div>

            <div
              className={`lg:ml-10 space-y-12 lg:space-y-16 transform transition-all duration-1000 delay-300 ${
                isVisible.founder
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-black text-3xl sm:text-4xl lg:text-5xl xl:text-[71px] font-bold font-poppins leading-none uppercase tracking-tight">
                  We don't just build projects, we build trust that lasts for
                  generations.
                </h3>

                <p className="text-black text-lg sm:text-xl font-poppins">
                  With over two decades of excellence, JGRT Group stands
                  committed to shaping spaces, empowering communities, and
                  creating lasting value for our customers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                {[
                  { number: "30", label: "Projects" },
                  { number: "20", label: "Years of Experience" },
                  { number: "5k", label: "Happy Customers" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`space-y-3 transform transition-all duration-700 ${
                      isVisible.founder
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${600 + index * 200}ms` }}
                  >
                    <div className="text-4xl sm:text-5xl lg:text-[62px] font-bold font-poppins">
                      <span className="text-white hover:text-black transition-colors duration-300">
                        {stat.number}{" "}
                      </span>
                      <span className="text-orange-500">+</span>
                    </div>
                    <p className="text-[#160101] text-lg sm:text-xl font-inter">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dreamhouse" className="px-4 sm:px-6 lg:px-20 py-12 lg:py-20">
        <div className="max-w-[1422px] mx-auto">
          <div
            className={`relative transform transition-all duration-1000`}
          >
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.4/1] rounded-[50px] sm:rounded-[100px] lg:rounded-[200px] xl:rounded-[300px] border border-white overflow-hidden bg-white/90 group transition-all duration-700">
              {/* Slides Container */}
              <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-110"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title || "Plot Image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2">
                      {slide.title && <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-[111px] font-normal font-poppins text-white uppercase tracking-tight text-center">
                        {slide.title}
                      </h2>}
                      {slide.subtitle && <p className="text-lg sm:text-xl lg:text-2xl text-white/80 text-center mt-2 sm:mt-4">
                        {slide.subtitle}
                      </p>}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group/arrow"
              >
                <ChevronLeft className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-white group-hover/arrow:scale-110 transition-transform duration-300" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group/arrow"
              >
                <ChevronRight className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-white group-hover/arrow:scale-110 transition-transform duration-300" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="properties"
        className="px-4 sm:px-6 lg:px-20 py-12 lg:py-20 bg-black/80 relative overflow-hidden"
      >
        <div className="max-w-[1422px] mx-auto">
          <div className="absolute left-0 right-0 flex justify-between px-4 sm:px-6 lg:px-20 opacity-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="w-px h-full bg-gradient-to-b from-white/10 to-black/10"
              ></div>
            ))}
          </div>

          <div className="relative">
            <div
              className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-6 transform transition-all duration-1000 ${
                isVisible.properties
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-medium font-poppins">
                Recent Properties
              </h2>
              <p className="text-white text-base sm:text-lg lg:text-xl font-poppins max-w-sm lg:max-w-md">
                "Building trust, one foundation at a time."
              </p>
            </div>

            <div className="mb-12 lg:mb-16">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${projectCurrentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                  >
                    {projects
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((property, index) => (
                        <div
                          onClick={property.link ? () => {window.open(property.link, "_blank")} : undefined}
                          key={`${slideIndex}-${index}`}
                          className={`space-y-6 transform transition-all duration-1000 hover:scale-105 ${property.link ? "cursor-pointer": ""}
                            ${
                              isVisible.properties
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                            }`
                          }
                          style={{ transitionDelay: `${300 + index * 200}ms` }}
                        >
                          <div className="aspect-[4/3] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] xl:rounded-[80px] overflow-hidden group">
                            <img
                              src={property.image}
                              alt="Modern villa with pool"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>

                          <div className="bg-gradient-to-b from-[#DDE4E1] to-[#979898] rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 text-black hover:shadow-2xl transition-all duration-500">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-poppins mb-2">
                              {property.name}
                            </h3>
                            <p className="text-sm sm:text-base lg:text-lg font-light font-poppins mb-3 sm:mb-4 lg:mb-6">
                              {property.location}
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img
                                    src="/projectarea.png"
                                    alt="Area"
                                    className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-medium text-xs sm:text-sm lg:text-base truncate">
                                      Project Area:
                                    </p>
                                    <p className="font-light text-xs sm:text-sm lg:text-base truncate">
                                      {property.area}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img
                                    src="/rate.png"
                                    alt="Units"
                                    className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-medium text-xs sm:text-sm lg:text-base truncate">
                                      Total Units:
                                    </p>
                                    <p className="font-light text-xs sm:text-sm lg:text-base truncate">
                                      {property.units}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img
                                    src="/rate.png"
                                    alt="Rate"
                                    className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-medium text-xs sm:text-sm lg:text-base truncate">
                                      Rate Per Sqft:
                                    </p>
                                    <p className="font-light text-xs sm:text-sm lg:text-base truncate">
                                      {property.rate}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img
                                    src="/size.png"
                                    alt="Size"
                                    className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-medium text-xs sm:text-sm lg:text-base truncate">
                                      Plot Sizes:
                                    </p>
                                    <p className="font-light text-xs sm:text-sm lg:text-base truncate">
                                      {property.plotSizes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlideProject}
                  className="absolute left-2 sm:left-4 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 w-10 sm:w-12 lg:w-16 xl:w-20 h-10 sm:h-12 lg:h-16 xl:h-20 
                            bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center 
                            hover:bg-white/40 transition-all duration-300 group z-10"
                >
                  <ChevronLeft className="w-5 sm:w-6 lg:w-8 xl:w-10 h-5 sm:h-6 lg:h-8 xl:h-10 text-white transform transition-transform duration-300 group-hover:scale-110" />
                </button>

                <button
                  onClick={nextSlideProject}
                  className="absolute right-2 sm:right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 w-10 sm:w-12 lg:w-16 xl:w-20 h-10 sm:h-12 lg:h-16 xl:h-20 
                            bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center 
                            hover:bg-white/40 transition-all duration-300 group z-10"
                >
                  <ChevronRight className="w-5 sm:w-6 lg:w-8 xl:w-10 h-5 sm:h-6 lg:h-8 xl:h-10 text-white transform transition-transform duration-300 group-hover:scale-110" />
                </button>

                <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlideProject(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                        index === projectCurrentSlide
                          ? 'bg-gray-200 scale-125'
                          : 'bg-gray-400 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

          </div>
          </div>
        </div>
      </section>

      <section
        id="whychoose"
        className="px-4 sm:px-6 lg:px-20 py-12 lg:py-20 bg-black/40"
      >
        <div className="max-w-[1422px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`space-y-12 lg:space-y-16 transform transition-all duration-1000 ${
                isVisible.whychoose
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium font-poppins">
                Why Choose Us?
              </h2>

              <div className="space-y-6 lg:space-y-8">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[71px] font-bold font-poppins leading-none text-white uppercase tracking-tight">
                  Your Vision, Our Foundation
                </h3>

                <p className="text-white text-lg sm:text-xl font-poppins max-w-md">
                  At JGRT Group, we don't just build structures — we build
                  lasting relationships by turning your dreams into enduring
                  landmarks
                </p>

                <button className="bg-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-bold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible.whychoose
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative z-10">
                <div className="w-full aspect-square rounded-full border border-white overflow-hidden group hover:scale-105 transition-all duration-500">
                  <img
                    src="/housewithcar.jpg"
                    alt="Modern kitchen"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="absolute top-4 sm:top-8 -right-4 sm:-right-8 z-0 blur-md opacity-60">
                <div className="w-full aspect-square rounded-full overflow-hidden">
                  <img
                    src="/kitchenbackground.png"
                    alt="Kitchen background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20">
                <div className="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 transform hover:scale-110 hover:rotate-45 transition-all duration-300 cursor-pointer">
                  <ArrowRight className="w-8 sm:w-10 lg:w-16 h-8 sm:h-10 lg:h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="buildtogether"
        className="px-4 sm:px-6 lg:px-20 py-12 lg:py-20"
      >
        <div className="max-w-[1422px] mx-auto text-center">
          <div
            className={`bg-clip-text bg-[linear-gradient(180deg,#000_51.38%,rgba(255,255,255,0)_140.75%)] 
              text-transparent text-4xl sm:text-6xl lg:text-8xl xl:text-[133px] font-medium font-poppins uppercase tracking-tight mb-12 lg:mb-16
              transition-all duration-1000 transform
              ${isVisible.buildtogether ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
            `}
          >
            <div className="leading-none">Let'sBuild</div>
            <div className="leading-none -mt-0 sm:-mt-0 lg:-mt-6 xl:-mt-8">
              Together
            </div>
          </div>

          <div
            className={`relative inline-block transform transition-all duration-1000 delay-300 ${
              isVisible.buildtogether
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }`}
          >
            <div className="relative aspect-[16/9] w-full max-w-sm sm:max-w-lg lg:max-w-2xl rounded-[50px] sm:rounded-[100px] lg:rounded-[200px] overflow-hidden group hover:scale-105 transition-all duration-500">
              <img
                src="/buildtogether.jpg"
                alt="Modern villa exterior"
                className="w-full h-full object-cover transform -rotate-1 sm:-rotate-3 group-hover:scale-110 group-hover:rotate-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F] via-transparent to-transparent"></div>
            </div>
            {/*<div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8">
                <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 transform hover:scale-110 hover:rotate-45 transition-all duration-300 cursor-pointer">
                  <ArrowRight className="w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 text-white" />
                </div>
              </div>*/}
          </div>
        </div>
      </section>
      <section id="contactus">
        <ContactUs />
      </section>

      <footer
        id="footer"
        className="bg-[#82C8E5] px-4 sm:px-6 lg:px-20 py-12 lg:py-16 relative overflow-hidden"
      >
        <div className="max-w-[1422px] mx-auto">
          <div className="absolute left-0 right-0 flex justify-between px-4 sm:px-6 lg:px-20 opacity-20">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="w-px h-full bg-gradient-to-b from-white/10 to-black/10"
              ></div>
            ))}
          </div>

          <div
            className={`relative text-center space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
              isVisible.footer
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto"></div>
              <h3 className="text-lg sm:text-xl font-bold font-encode text-black">
                JGRT GROUP
              </h3>
            </div>

            <p className="text-black text-xl sm:text-2xl font-poppins max-w-2xl mx-auto">
              We don't just create buildings, we create legacies that stand the
              test of time.
            </p>

            <div className="flex justify-center space-x-6">
              {[
                <svg key="fb" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M22.7779 11.5554C22.7779 5.41895 17.8033 0.444336 11.6668 0.444336C5.53027 0.444336 0.555664 5.41895 0.555664 11.5554C0.555664 17.1012 4.61881 21.698 9.93066 22.5316V14.7673H7.10948V11.5554H9.93066V9.10753C9.93066 6.32281 11.5895 4.78461 14.1275 4.78461C15.3428 4.78461 16.6147 5.00163 16.6147 5.00163V7.736H15.2137C13.8334 7.736 13.4029 8.59256 13.4029 9.47211V11.5554H16.4845L15.9919 14.7673H13.4029V22.5316C18.7147 21.698 22.7779 17.1012 22.7779 11.5554Z" />
                </svg>,
                <svg key="twitter" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M7.43522 20.5836C15.8189 20.5836 20.4057 13.6361 20.4057 7.61308C20.4057 7.41777 20.4014 7.21811 20.3927 7.0228C21.285 6.37752 22.055 5.57826 22.6666 4.66256C21.8356 5.03228 20.9533 5.27375 20.0498 5.3787C21.0011 4.80849 21.7133 3.91272 22.0546 2.85744C21.1597 3.3878 20.181 3.76192 19.1605 3.96377C18.4729 3.23317 17.5638 2.74943 16.5737 2.58733C15.5836 2.42523 14.5677 2.59381 13.683 3.067C12.7983 3.54019 12.0942 4.29164 11.6794 5.20516C11.2646 6.11869 11.1623 7.14341 11.3883 8.12089C9.57627 8.02996 7.80354 7.55923 6.18506 6.73922C4.56658 5.91922 3.1385 4.76824 1.99338 3.36091C1.41137 4.36436 1.23328 5.55177 1.49529 6.68181C1.7573 7.81185 2.43976 8.79973 3.40397 9.44468C2.6801 9.42169 1.97209 9.2268 1.33843 8.8761V8.93252C1.33778 9.98557 1.70183 11.0063 2.3687 11.8213C3.03556 12.6363 3.96408 13.1952 4.99642 13.403C4.32587 13.5865 3.6221 13.6132 2.93956 13.4811C3.23087 14.3868 3.79764 15.1788 4.56079 15.7468C5.32394 16.3149 6.24537 16.6304 7.19651 16.6495C5.58177 17.9179 3.58709 18.6059 1.53375 18.6027C1.1696 18.6021 0.805817 18.5798 0.444336 18.5358C2.53031 19.8741 4.95686 20.5849 7.43522 20.5836Z" />
                </svg>,
                <svg key="ig" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M11.4446 2.4452C14.4134 2.4452 14.7649 2.45822 15.9325 2.51031C17.0175 2.55805 17.6035 2.74034 17.9941 2.89225C18.5106 3.09191 18.8838 3.33496 19.2701 3.72125C19.6608 4.11187 19.8995 4.48079 20.0991 4.99729C20.251 5.38791 20.4333 5.97819 20.4811 7.05892C20.5332 8.23079 20.5462 8.58236 20.5462 11.5468C20.5462 14.5155 20.5332 14.8671 20.4811 16.0346C20.4333 17.1197 20.251 17.7056 20.0991 18.0962C19.8995 18.6127 19.6564 18.986 19.2701 19.3723C18.8795 19.7629 18.5106 20.0016 17.9941 20.2013C17.6035 20.3532 17.0132 20.5355 15.9325 20.5832C14.7606 20.6353 14.409 20.6483 11.4446 20.6483C8.47586 20.6483 8.1243 20.6353 6.95676 20.5832C5.87169 20.5355 5.28575 20.3532 4.89513 20.2013C4.37864 20.0016 4.00537 19.7586 3.61909 19.3723C3.22846 18.9817 2.98975 18.6127 2.79009 18.0962C2.63818 17.7056 2.45589 17.1153 2.40815 16.0346C2.35607 14.8627 2.34304 14.5112 2.34304 11.5468C2.34304 8.57802 2.35607 8.22645 2.40815 7.05892C2.45589 5.97385 2.63818 5.38791 2.79009 4.99729C2.98975 4.48079 3.2328 4.10753 3.61909 3.72125C4.00971 3.33062 4.37864 3.09191 4.89513 2.89225C5.28575 2.74034 5.87603 2.55805 6.95676 2.51031C8.1243 2.45822 8.47586 2.4452 11.4446 2.4452ZM11.4446 0.444336C8.42811 0.444336 8.05051 0.457357 6.86561 0.50944C5.68506 0.561523 4.87343 0.752496 4.1703 1.02593C3.43679 1.31239 2.81614 1.69 2.19982 2.31066C1.57916 2.92698 1.20155 3.54764 0.915093 4.2768C0.641656 4.98427 0.450684 5.79156 0.3986 6.97211C0.346517 8.16135 0.333496 8.53895 0.333496 11.5554C0.333496 14.5719 0.346517 14.9495 0.3986 16.1344C0.450684 17.315 0.641656 18.1266 0.915093 18.8298C1.20155 19.5633 1.57916 20.1839 2.19982 20.8002C2.81614 21.4166 3.4368 21.7985 4.16596 22.0806C4.87343 22.3541 5.68072 22.545 6.86127 22.5971C8.04617 22.6492 8.42377 22.6622 11.4403 22.6622C14.4568 22.6622 14.8344 22.6492 16.0193 22.5971C17.1998 22.545 18.0114 22.3541 18.7146 22.0806C19.4437 21.7985 20.0644 21.4166 20.6807 20.8002C21.297 20.1839 21.679 19.5633 21.9611 18.8341C22.2345 18.1266 22.4255 17.3193 22.4776 16.1388C22.5297 14.9539 22.5427 14.5763 22.5427 11.5598C22.5427 8.54329 22.5297 8.16569 22.4776 6.98079C22.4255 5.80024 22.2345 4.98861 21.9611 4.28548C21.6877 3.54763 21.3101 2.92698 20.6894 2.31066C20.0731 1.69434 19.4524 1.31239 18.7233 1.03027C18.0158 0.756836 17.2085 0.565864 16.0279 0.51378C14.8387 0.457357 14.4611 0.444336 11.4446 0.444336Z" />
                  <path d="M11.4448 5.84814C8.29373 5.84814 5.7373 8.40457 5.7373 11.5556C5.7373 14.7067 8.29373 17.2631 11.4448 17.2631C14.5958 17.2631 17.1522 14.7067 17.1522 11.5556C17.1522 8.40457 14.5958 5.84814 11.4448 5.84814ZM11.4448 15.2579C9.4005 15.2579 7.74251 13.5999 7.74251 11.5556C7.74251 9.51134 9.4005 7.85335 11.4448 7.85335C13.489 7.85335 15.147 9.51134 15.147 11.5556C15.147 13.5999 13.489 15.2579 11.4448 15.2579Z" />
                  <path d="M18.7103 5.62251C18.7103 6.36035 18.1114 6.95497 17.3779 6.95497C16.64 6.95497 16.0454 6.35601 16.0454 5.62251C16.0454 4.88466 16.6444 4.29004 17.3779 4.29004C18.1114 4.29004 18.7103 4.889 18.7103 5.62251Z" />
                </svg>,
                <svg key="linkedin" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M20.7994 0.444336H1.86279C0.955675 0.444336 0.222168 1.16048 0.222168 2.0459V21.0607C0.222168 21.9461 0.955675 22.6666 1.86279 22.6666H20.7994C21.7065 22.6666 22.4444 21.9461 22.4444 21.065V2.0459C22.4444 1.16048 21.7065 0.444336 20.7994 0.444336ZM6.81505 19.381H3.51644V8.77333H6.81505V19.381ZM5.16574 7.32802C4.10672 7.32802 3.25168 6.47298 3.25168 5.41829C3.25168 4.36361 4.10672 3.50857 5.16574 3.50857C6.22043 3.50857 7.07547 4.36361 7.07547 5.41829C7.07547 6.46864 6.22043 7.32802 5.16574 7.32802ZM19.1588 19.381H15.8645V14.2247C15.8645 12.9964 15.8428 11.4122 14.1501 11.4122C12.4357 11.4122 12.1753 12.7534 12.1753 14.1379V19.381H8.88536V8.77333H12.0451V10.223H12.0885C12.5269 9.38965 13.6032 8.50857 15.2048 8.50857C18.5425 8.50857 19.1588 10.7048 19.1588 13.5607V19.381Z" />
                </svg>,
              ].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white hover:scale-125 transition-all duration-300 transform ${
                    isVisible.footer
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="border-t border-white/20 pt-6 lg:pt-8">
              <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-16 text-white font-jakarta text-base sm:text-lg lg:text-xl">
                {["HOME", "ABOUT", "PROPERTIES", "CAREER", "CONTACT"].map(
                  (link, index) => (
                    <div
                      key={link}
                      className="flex items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-16"
                    >
                      <a
                        href="#"
                        className={`text-black transform hover:scale-105 transition-all duration-300 ${
                          isVisible.footer
                            ? "translate-y-0 opacity-100"
                            : "translate-y-5 opacity-0"
                        }`}
                        style={{ transitionDelay: `${700 + index * 100}ms` }}
                      >
                        {link}
                      </a>
                      {index < 4 && (
                        <span className="text-white/50 hidden sm:inline">
                          |
                        </span>
                      )}
                    </div>
                  ),
                )}
              </nav>
            </div>

            <div
              className={`text-black text-sm pt-6 transform transition-all duration-1000 delay-1200 ${
                isVisible.footer
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <p>© 2024 JGRT Group. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out 0.2s both;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom gradients */
        .text-gradient-white {
          background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .text-gradient-secondary {
          background: linear-gradient(135deg, #ffffff 0%, #9ca3af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .text-gradient-footer {
          background: linear-gradient(135deg, #ffffff 0%, #6b7280 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Responsive font scaling */
        @media (max-width: 640px) {
          .font-poppins {
            line-height: 1.2;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .aspect-[2.4/1] {
            aspect-ratio: 16/9;
          }
          
          .rounded-[300px] {
            border-radius: 50px;
          }
          
          .rounded-[200px] {
            border-radius: 40px;
          }
          
          .rounded-[100px] {
            border-radius: 30px;
          }
          
          .rounded-[80px] {
            border-radius: 25px;
          }
        }
      `}</style>
    </div>
  );
}
