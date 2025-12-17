import HeroSection from "@/components/home/HeroSection";
import PopularCard from "@/components/card/PopularCard";
import FeaturedApartments from "@/components/home/FeaturedApartments";

function HomePage() {
  return (
    <div className="space-y-4 ">
      <HeroSection />
      <div className="h-40"></div>
      <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏨</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            1000+ Khách Sạn
          </h3>
          <p className="text-muted-foreground">
            Chọn từ hàng ngàn khách sạn chất lượng cao
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            Giá Tốt Nhất
          </h3>
          <p className="text-muted-foreground">
            Đảm bảo giá tốt nhất hoặc hoàn tiền 100%
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h3 className="font-semibold text-lg text-foreground mb-2">
            Thanh Toán Linh Hoạt
          </h3>
          <p className="text-muted-foreground">
            Hỗ trợ VNPay, Momo, Thẻ tín dụng
          </p>
        </div>
      </div>
      <PopularCard />
      <FeaturedApartments />
    </div>
  );
}

export default HomePage;
