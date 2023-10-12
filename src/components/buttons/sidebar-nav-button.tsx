import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  IoAnalyticsSharp,
  IoCallSharp,
  IoChatboxEllipsesSharp,
  IoDocumentTextSharp,
  IoPersonSharp,
  IoSettingsSharp,
} from "react-icons/io5";

type SidebarNavButtonProps = {
  title: string;
  path: string;
};

const SidebarNavButton = ({ title, path }: SidebarNavButtonProps) => {
  let icon;
  switch (title) {
    case "Overview":
      icon = <IoAnalyticsSharp size={32} />;
      break;
    case "Requests":
      icon = <IoChatboxEllipsesSharp size={32} />;
      break;
    case "Prospects":
      icon = <IoPersonSharp size={32} />;
      break;
    case "Interviews":
      icon = <IoCallSharp size={32} />;
      break;
    case "Offers":
      icon = <IoDocumentTextSharp size={32} />;
      break;
    case "Admin":
      icon = <IoSettingsSharp size={32} />;
      break;
    default:
      icon = "";
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={path}>
          <Button variant={"default"} size={"icon"} className="h-14 w-14">
            {icon}
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarNavButton;
