import { IconType } from "react-icons";
import { FiPlay, FiPause, FiRotateCcw, FiSkipForward, FiMenu, FiX} from "react-icons/fi";

interface IconButtonProps {
  icon: IconType;
  size?: string;
}

function IconButton({ icon: Icon, size = "1rem" }: IconButtonProps) {
  return (
    <Icon
      className="text-cyan-500 hover:brightness-150 rounded-full ease-in duration-300"
      size={size}
    />
  );
}

export const PauseBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiPause} {...props} />;
export const PlayBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiPlay} {...props} />;
export const ResetBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiRotateCcw} {...props} />;
export const SkipBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiSkipForward} {...props} />;
export const MenuBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiMenu} {...props} />;
export const CloseBtn = (props: Omit<IconButtonProps, "icon">) => <IconButton icon={FiX} {...props} />;