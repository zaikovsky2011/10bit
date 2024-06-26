import Accordion from "@/components/Accordion";
import { VscEdit, VscTools, VscGlobe } from "react-icons/vsc";

const sections = [
  {
    title: "Создание сайтов",
    content: [
      <a key="link3" href="#">
        Link 3
      </a>,
    ],
		icon: <VscEdit className="w-[70px] h-[70px]" />
  },
  {
    title: "Сервисное обслуживание",
    content: [
      <a key="link4" href="#">
        Link 4
      </a>,
      <a key="link5" href="#">
        Link 5
      </a>,
    ],
		icon: <VscTools className="w-[70px] h-[70px]" />
  },
  {
    title: "Продвижение",
    content: [
      <a key="link6" href="#">
        Link 6
      </a>,
    ],
		icon: <VscGlobe className="w-[70px] h-[70px]" />
  },
];

export default function RootLayout({ children }) {
  return (
      <div className="z-30 absolute inset-0 flex items-center justify-center ">
        <div className="bg-violet-800/70 w-[80vw] h-[80vh] rounded-lg shadow-box">
          <div className=" bg-violet-900/70 w-full h-16 rounded-t-lg"></div>
          <div className="flex">
            <Accordion sections={sections} />
            <div className=" bg-violet-800/70 m-4 rounded-lg w-[60vw] h-[60vh] shadow-box">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}
