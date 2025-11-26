import React from "react";
import PersonalInfor from "./PersonalInfor";
import PersonalOrder from "./PersonalOrder";
import PersionalAchieve from "./PersionalAchieve";
import PersonalSetting from "./PersonalSetting";
import PersonalComment from "./PersonalComment";

function Profile() {
  const [tabActive, setTabActive] = React.useState("infor");
  return (
    <div className="flex gap-8 w-full">
      <div className="flex flex-col gap-2">
        <button
          className={`p-4 rounded-lg hover:bg-gray-200  transition-all ${
            tabActive === "infor"
              ? "bg-gray-200 text-blue-400"
              : "text-gray-400"
          } `}
          onClick={() => setTabActive("infor")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5zm0 13a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5zm10 0a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4zm0-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4z"
                fill="currentColor"
              />
            </g>
          </svg>
        </button>
        <button
          className={`p-4 rounded-lg hover:bg-gray-200  transition-all   ${
            tabActive === "order"
              ? "bg-gray-200 text-blue-400"
              : "text-gray-400"
          } `}
          onClick={() => setTabActive("order")}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="17" x="5" y="4" rx="2" />
              <path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4" />
            </g>
          </svg>
        </button>
        <button
          className={`p-4 rounded-lg hover:bg-gray-200  transition-all   ${
            tabActive === "achieve"
              ? "bg-gray-200 text-blue-400"
              : "text-gray-400"
          } `}
          onClick={() => setTabActive("achieve")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16" />
              <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6" />
            </g>
          </svg>
        </button>
        <button
          className={`p-4 rounded-lg hover:bg-gray-200  transition-all   ${
            tabActive === "chat" ? "bg-gray-200 text-blue-400" : "text-gray-400"
          } `}
          onClick={() => setTabActive("chat")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2zM4 8h12v8h-5.277L7 18.234V16H4z"
            />
            <path
              fill="currentColor"
              d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2"
            />
          </svg>
        </button>
        <button
          className={`p-4 rounded-lg hover:bg-gray-200  transition-all   ${
            tabActive === "setting"
              ? "bg-gray-200 text-blue-400"
              : "text-gray-400"
          } `}
          onClick={() => setTabActive("setting")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300 ease-in-out" key={tabActive}>
        {tabActive === "infor" && <PersonalInfor />}
        {tabActive === "order" && <PersonalOrder />}
        {tabActive === "achieve" && <PersionalAchieve />}
        {tabActive === "chat" && <PersonalComment/>}
        {tabActive === "setting" && <PersonalSetting/>}
      </div>
    </div>
  );
}

export default Profile;
