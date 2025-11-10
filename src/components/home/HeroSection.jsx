import * as React from "react";
import { Input } from "../ui/input";
import { CalendarDays, CircleDollarSign, Search, Users } from "lucide-react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "../ui/calendar";
import DateRangePicker from "../dateTimePicker/DateRangePicker";


function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [listImages, setListImages] = React.useState([
    "/assets/banner/beach1.jpg",
    "/assets/banner/beach2.jpg",
    "/assets/banner/beach3.jpg",
    "/assets/banner/beach4.jpg",
  ]);

  const [dateStart, setDateStart] = React.useState();
  const [dateEnd, setDateEnd] = React.useState();
  return (
    <div className="relative w-full h-[400px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[400px] "
        onMouseEnter={plugin.current.stop()}
        onMouseLeave={plugin.current.reset()}
      >
        <CarouselContent>
          {listImages.map((_, index) => (
            <CarouselItem key={index}>
              <img
                src={listImages[index]}
                alt={`image ${index + 1}`}
                className=" w-full h-[400px] object-cover rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Khung tìm kiếm */}
      <div className="absolute left-1/2 bottom-[-100px] transform -translate-x-1/2 bg-white shadow-lg rounded-2xl w-[90%] md:w-[800px] p-6 text-center">
        <div className="relative pb-6">
          <h2 className="font-[Dancing Script] text-2xl mb-4 text-gray-800">
            Du lịch thả ga, Không lo về giá
          </h2>

          <div className="flex flex-col items-center justify-between gap-3 ">
            <div className="flex w-full justify-between gap-3 ">
              {/* Ô nhập địa điểm */}
              <div className="flex-2 gap-2 bg-gray-100 rounded-lg  px-3 py-2">
                <Input
                  placeholder="Nhập địa chỉ bạn muốn đến"
                  className="border-none bg-transparent focus-visible:ring-0 text-center "
                />
              </div>
              <div className="h-10"></div>
              {/* Ô chọn giá */}
              <div className="flex flex-1 justify-center items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 ">
                <CircleDollarSign />
                <span className="text-sm text-gray-700">1 triệu trở lên</span>
              </div>
            </div>

            <div className="flex w-full gap-3 justify-between ">
              {/* Ô ngày */}
              <div className="flex-2  gap-2 bg-gray-100 rounded-lg w-full px-3 py-2">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <DateRangePicker
                    label={"Chọn ngày đi"}
                    value={dateStart}
                    onChange={setDateStart}
                  />
                  <div className="w-px h-10 bg-gray-300 mx-2"></div>
                  <DateRangePicker
                    label={"Chọn ngày về"}
                    value={dateEnd}
                    onChange={setDateEnd}
                  />
                </div>
              </div>
              {/* Ô số người */}
              <div className="flex flex-1 justify-center items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-full ">
                <Users size={16} className="text-gray-500" />
                <div className="text-sm text-gray-700">
                  <p>2 người lớn</p>
                  <p className="text-xs text-gray-400">1 phòng</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" absolute left-1/2 transform -translate-x-1/2   ">
            {/* Nút tìm kiếm */}
            <Button className="mt-5 bg-[#22d6ff] hover:bg-[#1cc2e6] text-white rounded-3xl px-20 py-7">
              <Search className="mr-2 h-4 w-4" /> Tìm Kiếm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
