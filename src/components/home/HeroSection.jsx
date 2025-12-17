import * as React from "react";
import { Input } from "../ui/input";
import {
  CircleDollarSign,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import DateRangePicker from "@/common/DateRangePicker";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function HeroSection() {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [listImages, setListImages] = React.useState([
    "/assets/banner/beach1.jpg",
    "/assets/banner/beach2.jpg",
    "/assets/banner/beach3.jpg",
    "/assets/banner/beach4.jpg",
  ]);

  // Gom các giá trị tìm kiếm vào một state object
  const [searchCriteria, setSearchCriteria] = React.useState({
    destination: "",
    dateStart: undefined,
    dateEnd: undefined,
    priceRange: "1 triệu trở lên",
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const suggestions = ["Hà Nội", "Đà Nẵng", "Huế"];

  const priceOptions = [
    "1 triệu trở lên",
    "2 triệu trở lên",
    "3 triệu trở lên",
    "4 triệu trở lên",
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchCriteria.destination) params.append("city", searchCriteria.destination);
    if (searchCriteria.dateStart) {
      params.append("dateStart", searchCriteria.dateStart instanceof Date ? searchCriteria.dateStart.toISOString() : searchCriteria.dateStart);
    }
    if (searchCriteria.dateEnd) {
      params.append("dateEnd", searchCriteria.dateEnd instanceof Date ? searchCriteria.dateEnd.toISOString() : searchCriteria.dateEnd);
    }
    params.append("priceRange", searchCriteria.priceRange);
    params.append("adults", searchCriteria.adults);
    params.append("children", searchCriteria.children);
    params.append("rooms", searchCriteria.rooms);

    navigate(`/search?${params.toString()}`);
    console.log(searchCriteria);
  };

  const filteredSuggestions = suggestions.filter(
    (city) =>
      !searchCriteria.destination ||
      city.toLowerCase().includes(searchCriteria.destination.toLowerCase())
  );

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
          <h2 className=" text-2xl mb-4 text-gray-800">
            Du lịch thả ga, Không lo về giá
          </h2>

          <div className="flex flex-col items-center justify-between gap-3 ">
            <div className="flex w-full justify-between gap-3 ">
              {/* Ô nhập địa điểm */}
              <div className="relative flex-2 gap-2 bg-gray-100 rounded-lg  px-3 py-2">
                <Input
                  value={searchCriteria.destination}
                  onChange={(e) =>
                    setSearchCriteria({ ...searchCriteria, destination: e.target.value })
                  }
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Nhập địa chỉ bạn muốn đến"
                  className="border-none bg-transparent focus-visible:ring-0 text-start placeholder:text-center "
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 z-60 overflow-hidden text-left">
                    {filteredSuggestions.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                        onClick={() => {
                          setSearchCriteria({ ...searchCriteria, destination: city });
                          setShowSuggestions(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-10"></div>
              {/* Ô chọn giá */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-1 justify-center items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 cursor-pointer">
                    <CircleDollarSign />
                    <span className="text-sm text-gray-700">
                      {searchCriteria.priceRange}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="space-y-1">
                    {priceOptions.map((option) => (
                      <Button
                        key={option}
                        variant="ghost"
                        className={`w-full justify-start font-normal ${
                          searchCriteria.priceRange === option ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                          setSearchCriteria({ ...searchCriteria, priceRange: option })
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex w-full gap-3 justify-between ">
              {/* Ô ngày */}
              <div className="flex-2  gap-2 bg-gray-100 rounded-lg w-full px-3 py-2 relative z-50">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <DateRangePicker
                    label={"Chọn ngày đi"}
                    value={searchCriteria.dateStart}
                    onChange={(date) =>
                      setSearchCriteria({ ...searchCriteria, dateStart: date })
                    }
                  />
                  <div className="w-px h-10 bg-gray-300 mx-2"></div>
                  <DateRangePicker
                    label={"Chọn ngày về"}
                    value={searchCriteria.dateEnd}
                    onChange={(date) =>
                      setSearchCriteria({ ...searchCriteria, dateEnd: date })
                    }
                  />
                </div>
              </div>
              {/* Ô số người */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-1 justify-center items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-full cursor-pointer">
                    <Users size={16} className="text-gray-500" />
                    <div className="text-sm text-gray-700 text-left">
                      <p>
                        {searchCriteria.adults} người lớn
                        {searchCriteria.children > 0 &&
                          `, ${searchCriteria.children} trẻ em`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {searchCriteria.rooms} phòng
                      </p>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Số lượng</h4>
                      <p className="text-sm text-muted-foreground">
                        Tùy chỉnh số lượng người và phòng.
                      </p>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Người lớn</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                adults: Math.max(1, searchCriteria.adults - 1),
                              })
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{searchCriteria.adults}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                adults: searchCriteria.adults + 1,
                              })
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Trẻ em</p>
                          <p className="text-sm text-muted-foreground">
                            Dưới 12 tuổi
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                children: Math.max(0, searchCriteria.children - 1),
                              })
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{searchCriteria.children}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                children: searchCriteria.children + 1,
                              })
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Số phòng</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                rooms: Math.max(1, searchCriteria.rooms - 1),
                              })
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{searchCriteria.rooms}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setSearchCriteria({
                                ...searchCriteria,
                                rooms: searchCriteria.rooms + 1,
                              })
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className=" absolute left-1/2 transform -translate-x-1/2   ">
            {/* Nút tìm kiếm */}
            <Button
              onClick={handleSearch}
              className="mt-5 bg-[#22d6ff] hover:bg-[#1cc2e6] text-white rounded-3xl px-20 py-7"
            >
              <div className="flex items-center justify-center gap-2">
                <Search className="mr-2 h-4 w-4" /> Tìm Kiếm
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
