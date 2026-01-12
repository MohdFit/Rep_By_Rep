import Navbar from "../../components/nav";
import HeroSection from "./comp1";
import Bio  from "./about"
import StatsSection from "./stats"
import ServicesSection from "./services"
import TransformationsSection from "./transformations"
import TransformationCTA from "./TransformationCTA"
import Footer from "../../components/Footer"
export default function Home() {
    return (
        <div className="bg-homepageColor min-h-screen">
            <div className="sm:pl-12 sm:pr-12">
                <Navbar />
                <HeroSection />
                <Bio />
                <StatsSection />
                <ServicesSection />
                <TransformationsSection />
            </div>
            <TransformationCTA />
            <Footer />
        </div>
    );
}
